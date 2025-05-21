"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Message {
  sender: "user" | "ai";
  text: string;
  isTrap?: boolean;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getSessionId() {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const [topicLoading, setTopicLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTopic() {
      setTopicLoading(true);
      const sessionId = getSessionId();
      const { data, error } = await supabase
        .from("sessions")
        .select("topic")
        .eq("session_id", sessionId)
        .single();
      if (data && data.topic) {
        setTopic(data.topic);
      }
      setTopicLoading(false);
    }
    fetchTopic();
  }, []);

  const handleSetTopic = async () => {
    if (!topicInput.trim()) return;
    const sessionId = getSessionId();
    // Upsert topic for this session
    await supabase.from("sessions").upsert([
      { session_id: sessionId, topic: topicInput.trim() },
    ], { onConflict: "session_id" });
    setTopic(topicInput.trim());
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user" as const, text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      // Fetch last 10 messages for this session from Supabase
      const sessionId = getSessionId();
      const { data: history, error } = await supabase
        .from("messages")
        .select("user_message, ai_message, is_trap")
        .eq("session_id", sessionId)
        .order("timestamp", { ascending: true })
        .limit(4);
      // Format context for OpenAI
      let context: { sender: "user" | "ai"; text: string; isTrap?: boolean }[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((row: any) => {
          context.push({ sender: "user", text: row.user_message });
          context.push({ sender: "ai", text: row.ai_message, isTrap: row.is_trap });
        });
      }
      // Add the new user message to the context
      context.push({ sender: "user", text: input });
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId: getSessionId(), context }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: data.message, isTrap: data.isTrap },
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error: Could not get response." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with Socratic AI</h1>
      {topicLoading ? (
        <div>Loading session...</div>
      ) : !topic ? (
        <div className="flex flex-col gap-4 items-center justify-center flex-1">
          <label className="text-lg font-medium mb-2">What topic or task are you trying to solve today?</label>
          <input
            className="border rounded px-3 py-2 w-full max-w-md"
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="e.g. Data Structures, Marketing Plan, etc."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSetTopic}
            disabled={!topicInput.trim()}
          >
            Start Chat
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2 text-sm text-gray-600">Topic: <span className="font-semibold">{topic}</span></div>
          <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-4 mb-4 border">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg max-w-xs break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                  {msg.sender === "ai" && msg.isTrap && (
                    <span className="ml-2 text-xs text-red-600 font-bold">Trap</span>
                  )}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
} 