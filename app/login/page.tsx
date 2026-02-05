"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      if (data.token) localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#001219] text-white">
      <div className="w-full max-w-md bg-white/6 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-md px-3 py-2 bg-white/5"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-md px-3 py-2 bg-white/5"
            />
          </div>

          {error && <div className="text-rose-400 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn bg-amber-400 text-amber-900 px-6 py-2"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-white/80"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-white/80">
          Don't have an account?{' '}
          <button onClick={() => router.push('/signup')} className="underline ml-1">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
