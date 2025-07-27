"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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
  const [showDemo, setShowDemo] = useState(false);
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
        body: JSON.stringify({ sessionId: getSessionId(), context }),
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setTopic(null);
    setTopicInput("");
    localStorage.removeItem("sessionId");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/50">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-white">Socratic AI Assessment</h2>
            </div>
            <div className="flex items-center space-x-4">
              {topic && (
                <div className="text-sm text-gray-400">
                  Topic: {topic}
                </div>
              )}
              <button
                onClick={startNewChat}
                className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
              >
                New Chat
              </button>
              <a
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                ← Home
              </a>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col">
            {topicLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <div className="text-gray-400">Loading session...</div>
                </div>
              </div>
            ) : !topic ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-4xl w-full">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">See It In Action</h2>
                    <p className="text-xl text-gray-400 mb-8">Watch how our AI agent assesses critical thinking through a real microservices debugging scenario</p>
                  </div>

                  {/* Demo Challenge Card */}
                  <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">💼 Demo Challenge: Diagnose Latency in Microservices</h3>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        <strong>Scenario:</strong> Your team is receiving complaints of high API latency from users. You're working on a distributed system with:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-blue-400 font-semibold">React Frontend</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-green-400 font-semibold">API Gateway</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-purple-400 font-semibold">Service A (Auth)</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-yellow-400 font-semibold">Service B (User Data)</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-pink-400 font-semibold">Service C (Analytics)</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-red-400 font-semibold">Redis Cache</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-indigo-400 font-semibold">PostgreSQL DB</div>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        <strong>Problem:</strong> Users report that even cached endpoints are sometimes slow. Walk us through how you'd identify and resolve the issue.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Chat Demo */}
                  <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden mb-8">
                    <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-4"></div>
                        <span className="text-gray-300 font-medium">Socratic AI Agent - Assessment Session</span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {/* Step 1 */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AI</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-blue-500">
                            <p className="text-gray-300 mb-2">
                              <span className="text-blue-400 font-semibold">Step 1 - Entry Reasoning:</span> Let's start with obvious suspects. If the endpoint is cached and still slow, that clearly rules out the database, right?
                            </p>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                              <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Trap: Premature elimination of DB
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-green-500">
                            <p className="text-gray-300">
                              <span className="text-green-400 font-semibold">Candidate Response:</span> Not necessarily. If cache misses are happening or data in Redis is stale, the request might still hit the DB.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AI</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-blue-500">
                            <p className="text-gray-300 mb-2">
                              <span className="text-blue-400 font-semibold">Step 2 - System-Level Debugging:</span> Fair. But assuming cache hits, could it be a frontend rendering issue?
                            </p>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                              <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Trap: Diverts to non-bottleneck layer
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-green-500">
                            <p className="text-gray-300">
                              <span className="text-green-400 font-semibold">Candidate Response:</span> If the API latency itself is high even before rendering, frontend rendering wouldn't be the main problem. I'd want to trace the request at the API Gateway level.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AI</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-blue-500">
                            <p className="text-gray-300 mb-2">
                              <span className="text-blue-400 font-semibold">Step 3 - Introducing Misinformation:</span> Makes sense. One of our interns mentioned that analytics writes in Service C could be causing the slowdown. Should we optimize that first?
                            </p>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                              <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Trap: Service C is async and shouldn't affect API latency
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-green-500">
                            <p className="text-gray-300">
                              <span className="text-green-400 font-semibold">Candidate Response:</span> Since analytics is asynchronous, it shouldn't block the response path. I'd confirm that it's properly decoupled — maybe a queue like Kafka is delayed, but that shouldn't delay API responses.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">AI</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-blue-500">
                            <p className="text-gray-300">
                              <span className="text-blue-400 font-semibold">Step 4 - Insightful Suggestion:</span> If not the DB or analytics, what would you look at next?
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-xl p-4 border-l-4 border-green-500">
                            <p className="text-gray-300">
                              <span className="text-green-400 font-semibold">Candidate Response:</span> I'd instrument distributed tracing with something like OpenTelemetry or Zipkin to find which service is causing the latency. Also check Redis hit/miss ratio, API Gateway load, and network latency between services.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assessment Report */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 mb-8">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">📊 AI Assessment Report</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">🧠 What This Reveals</h4>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Candidate challenges misleading assumptions</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Thinks system-wide and considers architecture</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Prioritizes instrumentation over guessing</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Demonstrates deep systems intuition</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">📝 Final Verdict</h4>
                        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                          <div className="flex items-center mb-3">
                            <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-green-400 font-semibold">Strong Systems Thinker</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Demonstrated deep understanding of latency root-cause analysis, handled traps with clarity, and maintained architectural perspective throughout the assessment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-2">Ready to Start Your Assessment?</h3>
                        <p className="text-gray-400 mb-4">Enter a topic below to begin your personalized AI assessment</p>
                        <div className="flex gap-3 max-w-md mx-auto">
                          <input
                            className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            placeholder="e.g. Data Structures, Marketing Plan, etc."
                          />
                          <button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                            onClick={handleSetTopic}
                            disabled={!topicInput.trim()}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p>Start your conversation with our AI agent</p>
                    </div>
                  )}
                  
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-800/80 text-gray-100 border border-gray-700/50"
                      }`}>
                        <div className="break-words whitespace-pre-wrap">{msg.text}</div>
                        {msg.sender === "ai" && msg.isTrap && (
                          <div className="mt-2 flex items-center">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Trap Response
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/80 text-gray-100 border border-gray-700/50 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                          <span className="text-gray-400 text-sm">AI agent is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={bottomRef} />
                </div>
                
                {/* Input Area */}
                <div className="border-t border-gray-700 p-4 bg-gray-900/50">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3">
                      <textarea
                        className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message... (Shift+Enter for new line)"
                        disabled={loading}
                        style={{ minHeight: '44px', maxHeight: '200px' }}
                      />
                      <button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Press Enter to send, Shift+Enter for new line
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Demo Section */}
        {showDemo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900/95 rounded-2xl border border-gray-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    See It In Action
                  </h2>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-xl text-gray-400 max-w-3xl mb-8">
                  Watch how our AI agent assesses critical thinking through a real microservices debugging scenario
                </p>

                {/* Demo Challenge Card */}
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mr-3">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">💼 Demo Challenge: Diagnose Latency in Microservices</h3>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-gray-300 text-base leading-relaxed mb-3">
                      <strong>Scenario:</strong> Your team is receiving complaints of high API latency from users. You're working on a distributed system with:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-blue-400 font-semibold">React Frontend</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-green-400 font-semibold">API Gateway</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-purple-400 font-semibold">Service A (Auth)</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-yellow-400 font-semibold">Service B (User Data)</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-pink-400 font-semibold">Service C (Analytics)</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-red-400 font-semibold">Redis Cache</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                        <div className="text-indigo-400 font-semibold">PostgreSQL DB</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      <strong>Problem:</strong> Users report that even cached endpoints are sometimes slow. Walk us through how you'd identify and resolve the issue.
                    </p>
                  </div>
                </div>

                {/* Interactive Chat Demo */}
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden mb-8">
                  <div className="bg-gray-700/50 px-4 py-3 border-b border-gray-600">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm font-medium">Socratic AI Agent - Assessment Session</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                    {/* Step 1 */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-blue-500">
                          <p className="text-gray-300 text-sm mb-2">
                            <span className="text-blue-400 font-semibold">Step 1 - Entry Reasoning:</span> Let's start with obvious suspects. If the endpoint is cached and still slow, that clearly rules out the database, right?
                          </p>
                          <div className="bg-red-500/20 border border-red-500/30 rounded p-2 mt-2">
                            <div className="flex items-center text-red-400 text-xs font-medium">
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Trap: Premature elimination of DB
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-green-500">
                          <p className="text-gray-300 text-sm">
                            <span className="text-green-400 font-semibold">Candidate Response:</span> Not necessarily. If cache misses are happening or data in Redis is stale, the request might still hit the DB.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-blue-500">
                          <p className="text-gray-300 text-sm mb-2">
                            <span className="text-blue-400 font-semibold">Step 2 - System-Level Debugging:</span> Fair. But assuming cache hits, could it be a frontend rendering issue?
                          </p>
                          <div className="bg-red-500/20 border border-red-500/30 rounded p-2 mt-2">
                            <div className="flex items-center text-red-400 text-xs font-medium">
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Trap: Diverts to non-bottleneck layer
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-green-500">
                          <p className="text-gray-300 text-sm">
                            <span className="text-green-400 font-semibold">Candidate Response:</span> If the API latency itself is high even before rendering, frontend rendering wouldn't be the main problem. I'd want to trace the request at the API Gateway level.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-blue-500">
                          <p className="text-gray-300 text-sm mb-2">
                            <span className="text-blue-400 font-semibold">Step 3 - Introducing Misinformation:</span> Makes sense. One of our interns mentioned that analytics writes in Service C could be causing the slowdown. Should we optimize that first?
                          </p>
                          <div className="bg-red-500/20 border border-red-500/30 rounded p-2 mt-2">
                            <div className="flex items-center text-red-400 text-xs font-medium">
                              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Trap: Service C is async and shouldn't affect API latency
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-green-500">
                          <p className="text-gray-300 text-sm">
                            <span className="text-green-400 font-semibold">Candidate Response:</span> Since analytics is asynchronous, it shouldn't block the response path. I'd confirm that it's properly decoupled — maybe a queue like Kafka is delayed, but that shouldn't delay API responses.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-blue-500">
                          <p className="text-gray-300 text-sm">
                            <span className="text-blue-400 font-semibold">Step 4 - Insightful Suggestion:</span> If not the DB or analytics, what would you look at next?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-700/50 rounded-lg p-3 border-l-3 border-green-500">
                          <p className="text-gray-300 text-sm">
                            <span className="text-green-400 font-semibold">Candidate Response:</span> I'd instrument distributed tracing with something like OpenTelemetry or Zipkin to find which service is causing the latency. Also check Redis hit/miss ratio, API Gateway load, and network latency between services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assessment Report */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 mr-3">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">📊 AI Assessment Report</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">🧠 What This Reveals</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Candidate challenges misleading assumptions</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Thinks system-wide and considers architecture</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Prioritizes instrumentation over guessing</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Demonstrates deep systems intuition</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">📝 Final Verdict</h4>
                      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center mb-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-green-400 font-semibold text-sm">Strong Systems Thinker</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          Demonstrated deep understanding of latency root-cause analysis, handled traps with clarity, and maintained architectural perspective throughout the assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <button
                    onClick={() => setShowDemo(false)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Start Your Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 