"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface MessageRow {
  id: string;
  session_id: string;
  user_message: string;
  ai_message: string;
  is_trap: boolean;
  timestamp: string;
}

export default function LogsPage() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("timestamp", { ascending: false });
      if (!error && data) setMessages(data as MessageRow[]);
      setLoading(false);
    }
    fetchLogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Chat Logs</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Timestamp</th>
                <th className="p-2 border">Session ID</th>
                <th className="p-2 border">User Message</th>
                <th className="p-2 border">AI Message</th>
                <th className="p-2 border">Trap?</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border whitespace-nowrap">{new Date(msg.timestamp).toLocaleString()}</td>
                  <td className="p-2 border font-mono text-xs">{msg.session_id}</td>
                  <td className="p-2 border">{msg.user_message}</td>
                  <td className="p-2 border">{msg.ai_message}</td>
                  <td className="p-2 border text-center">{msg.is_trap ? <span className="text-red-600 font-bold">Yes</span> : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 