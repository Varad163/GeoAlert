"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚨 Prevent logged-in users from viewing login page
  useEffect(() => {
    if (!session?.user) return;

    if (session.user.role === "ADMIN") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/dashboard");
    }
  }, [session]);

  async function handleLogin() {
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      alert("Invalid credentials");
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const ses = await sessionRes.json();

    if (ses?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-black/10">
        
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-black/60">
          Login
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 border-2 border-black text-black rounded-xl placeholder-black focus:border-black focus:ring-0 transition"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 border-2 border-black text-black rounded-xl placeholder-black focus:border-black focus:ring-0 transition"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full p-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition active:scale-95"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-800">
          Don’t have an account?
          <a href="/register" className="text-black font-medium ml-1 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
