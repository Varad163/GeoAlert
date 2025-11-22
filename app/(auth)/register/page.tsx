"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created! Login now.");
      router.push("/login");
    } else {
      alert(data.error || "Failed to register");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-black/10"
      >
        {/* FAINT BLACK HEADING */}
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-black/60">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border-2 border-black text-black rounded-xl placeholder-black focus:border-black focus:ring-0 transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-black text-black rounded-xl placeholder-black focus:border-black focus:ring-0 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-black text-black rounded-xl placeholder-black focus:border-black focus:ring-0 transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full p-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition active:scale-95"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-800">
          Already have an account?
          <a href="/login" className="text-black font-medium ml-1 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
