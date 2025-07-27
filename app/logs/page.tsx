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
    <div className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Chat Logs
            </h1>
            <p className="text-gray-400">Monitor all AI interactions and trap responses</p>
          </div>
          <a 
            href="/" 
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            ← Back to Home
          </a>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-gray-400">Loading logs...</div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50">
                    <th className="p-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Timestamp</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Session ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">User Message</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">AI Message</th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Trap?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12">
                        <div className="text-gray-400">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <p className="text-lg font-medium mb-2">No logs yet</p>
                          <p>Start a conversation to see logs here</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="p-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(msg.timestamp).toLocaleString()}
                        </td>
                        <td className="p-4 font-mono text-xs text-gray-400 bg-gray-800/50 rounded-lg">
                          {msg.session_id}
                        </td>
                        <td className="p-4 text-sm text-gray-200 max-w-xs">
                          <div className="break-words">{msg.user_message}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-200 max-w-xs">
                          <div className="break-words">{msg.ai_message}</div>
                        </td>
                        <td className="p-4 text-center">
                          {msg.is_trap ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="mt-6 text-center text-gray-400 text-sm">
            Showing {messages.length} log entries
          </div>
        )}
      </div>
    </div>
  );
} 