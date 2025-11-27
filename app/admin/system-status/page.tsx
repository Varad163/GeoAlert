"use client";

import { useEffect, useState } from "react";

export default function SystemStatusPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch APIs
  async function loadData() {
    try {
      const [h, s] = await Promise.all([
        fetch("/api/system/health").then((r) => r.json()),
        fetch("/api/system/stats").then((r) => r.json()),
      ]);

      setHealth(h);
      setStats(s);
      setLoading(false);
    } catch (err) {
      console.error("Error loading system status:", err);
    }
  }

  // Auto refresh every 5 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${
        status === "UP"
          ? "bg-green-100 text-green-600"
          : status === "DOWN"
          ? "bg-red-100 text-red-600"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">System Status</h1>

      {loading ? (
        <p className="text-gray-500">Loading system data...</p>
      ) : (
        <>
          {/* HEALTH SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Health Checks</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Server Status */}
              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="font-semibold text-lg mb-2">Next.js Server</h3>
                <StatusBadge status={health?.server?.status || "UNKNOWN"} />
                <p className="text-xs text-gray-400 mt-2">
                  Last update: {new Date().toLocaleTimeString()}
                </p>
              </div>

              {/* Database */}
              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="font-semibold text-lg mb-2">Database</h3>
                <StatusBadge status={health?.database?.status || "UNKNOWN"} />
              </div>

              {/* Socket Server */}
              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="font-semibold text-lg mb-2">Socket Server</h3>
                <StatusBadge status={health?.socket?.status || "UNKNOWN"} />
              </div>
            </div>
          </div>

          {/* STATS SECTION */}
          <div>
            <h2 className="text-xl font-semibold mb-3">System Metrics</h2>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="text-sm text-gray-500">Total Users</h3>
                <p className="text-3xl font-bold">{stats?.users}</p>
              </div>

              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="text-sm text-gray-500">Active Alerts</h3>
                <p className="text-3xl font-bold">{stats?.alerts}</p>
              </div>

              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="text-sm text-gray-500">Chat Sessions</h3>
                <p className="text-3xl font-bold">{stats?.sessions}</p>
              </div>

              <div className="p-5 border rounded-xl shadow bg-white">
                <h3 className="text-sm text-gray-500">Safe Zones</h3>
                <p className="text-3xl font-bold">{stats?.safezones}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
