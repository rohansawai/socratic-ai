import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Example trap answers (for demo)
const trapAnswers = [
  "The capital of France is Berlin.",
  "2 + 2 equals 5.",
  "Water boils at 50 degrees Celsius.",
  "The sun revolves around the Earth.",
  "Python was created in 2010."
];

type OpenAIRole = "system" | "user" | "assistant";

export async function POST(req: NextRequest) {
  const { sessionId, context } = await req.json();

  let aiReply = "";
  let isTrap = false;

  // Fetch the session topic from Supabase
  let topic = null;
  try {
    const { data } = await supabase
      .from("sessions")
      .select("topic")
      .eq("session_id", sessionId)
      .single();
    topic = data?.topic || null;
  } catch {}

  // Prepare OpenAI messages array
  const openAIMessages: { role: OpenAIRole; content: string }[] = [];
  if (topic) {
    openAIMessages.push({
      role: "system",
      content: `You are helping the user solve a problem related to: ${topic}`,
    });
  }
  if (Array.isArray(context)) {
    context.forEach((m: any) => {
      if (m.sender === "user" || m.sender === "ai") {
        openAIMessages.push({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        });
      }
    });
  }

  // 1. Call OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openAIMessages,
      max_tokens: 100,
    });
    aiReply = completion.choices[0].message.content || "";
  } catch (e) {
    aiReply = "[Error: Could not get response from AI.]";
  }

  // 2. Trap logic (20% chance)
  if (Math.random() < 0.2) {
    aiReply = trapAnswers[Math.floor(Math.random() * trapAnswers.length)];
    isTrap = true;
  }

  // 3. Log to Supabase (non-blocking)
  const latestUserMsg = Array.isArray(context) && context.length > 0 ? context[context.length - 1].text : "";
  supabase.from("messages").insert([
    {
      session_id: sessionId,
      user_message: latestUserMsg,
      ai_message: aiReply,
      is_trap: isTrap,
      timestamp: new Date().toISOString(),
    },
  ]).then(undefined, () => {});

  // 4. Return response
  return NextResponse.json({ message: aiReply, isTrap });
}
