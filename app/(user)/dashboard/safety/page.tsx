"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";

type UserStatus = {
  id: string;
  userId: string;
  isSafe: boolean;
  lastUpdated: string;
};

export default function SafetyStatusPage() {
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadStatus() {
    const res = await fetch("/api/user/status/get");
    const data = await res.json();
    setStatus(data.status);
    setLoading(false);
  }

  async function updateStatus(isSafe: boolean) {
    const res = await fetch("/api/user/status/update", {
      method: "POST",
      body: JSON.stringify({ isSafe }),
    });

    const data = await res.json();
    setStatus(data.status); 
  }

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 hero-gradient rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Your Safety Status</h1>

      <div className="flex flex-col items-center gap-4 bg-white/80 p-6 rounded-xl shadow">
        {status?.isSafe ? (
          <>
            <ShieldCheck className="w-20 h-20 text-green-600" />
            <p className="text-xl text-green-700 font-semibold">
              You are marked SAFE
            </p>
          </>
        ) : (
          <>
            <ShieldAlert className="w-20 h-20 text-red-600" />
            <p className="text-xl text-red-700 font-semibold">
              You are NOT marked safe
            </p>
          </>
        )}

        <p className="text-gray-600 text-sm">
          Last updated:{" "}
          {status?.lastUpdated
            ? new Date(status.lastUpdated).toLocaleString()
            : "Never"}
        </p>

        <div className="flex gap-4 mt-4">
          <Button className="bg-green-600 text-white" onClick={() => updateStatus(true)}>
            Mark Safe
          </Button>

          <Button className="bg-red-600 text-white" onClick={() => updateStatus(false)}>
            Mark Unsafe
          </Button>
        </div>
      </div>
    </div>
  );
}
