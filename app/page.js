"use client";

import { useState, useEffect } from "react";
import axios from "axios";

// hydration-safe page
export default function Page() {
  const [topic, setTopic] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false); // 👈 hydration guard

  useEffect(() => {
    setMounted(true);
  }, []);

  const getQuote = async () => {
    setLoading(true);
    setQuote("");
    setError("");
    try {
      const res = await axios.post("/api/quote", { topic });
      setQuote(res.data.quote);
    } catch (err) {
      setError("⚠️ Error fetching quote. Check your API key and try again.");
    }
    setLoading(false);
  };

  if (!mounted) return null; // 👈 prevents hydration mismatch

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 p-6">
      <div className="bg-gray-950 border border-blue-700 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-6">
          AI Quote Generator
        </h1>

        <input
          type="text"
          placeholder="Enter a topic (e.g. success, life)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-black border border-blue-600 rounded-lg p-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={getQuote}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg p-3 font-semibold transition"
        >
          {loading ? "Generating..." : "Get Quote"}
        </button>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {quote && (
          <p className="mt-6 text-xl italic text-blue-200 border-t border-gray-700 pt-4">
            “{quote}”
          </p>
        )}
      </div>
    </main>
  );
}
