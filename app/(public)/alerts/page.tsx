"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UserMap = dynamic(() => import("./user-map"), { ssr: false });

export default function UserAlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(data);
    }
    fetchAlerts();
  }, []);

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Active Alerts</h1>

      {/* Map */}
      <UserMap alerts={alerts} />

      {/* Alerts List */}
      <div className="space-y-4 mt-6">
        {alerts.map((a: any) => (
          <div key={a.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-bold">{a.type}</h2>
            <p className="text-gray-700">{a.description}</p>

            <span className={`inline-block mt-2 px-3 py-1 rounded text-white
              ${a.severity === "CRITICAL" ? "bg-red-600" :
                a.severity === "HIGH" ? "bg-orange-500" :
                a.severity === "MEDIUM" ? "bg-yellow-500" :
                "bg-green-600"}`}
            >
              {a.severity}
            </span>

            <p className="text-sm text-gray-500 mt-2">
              Posted: {new Date(a.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
