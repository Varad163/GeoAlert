"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock } from "lucide-react";

// -------------- TYPES --------------
type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface AlertType {
  id: string;
  type: string;
  severity: AlertSeverity;
  description: string;
  createdAt: string;
}

// -------------- COLORS --------------
const severityColors: Record<AlertSeverity, string> = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-orange-500",
  CRITICAL: "bg-red-600",
};

export default function ActiveAlertsPage() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  // Load active alerts
  async function loadAlerts() {
    try {
      const res = await fetch("/api/admin/alerts/list");
      const data = await res.json();
      setAlerts(data.alerts);
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }
  }

  // Mark alert as resolved
  async function resolveAlert(id: string) {
    await fetch("/api/admin/alerts/resolve", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    loadAlerts();
  }

  // Delete alert
  async function deleteAlert(id: string) {
    if (!confirm("Delete this alert?")) return;

    await fetch("/api/admin/alerts/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadAlerts();
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        <AlertTriangle className="w-8 h-8" /> Active Alerts
      </h1>

      {/* Alerts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.length === 0 && (
          <p className="text-gray-600">No active alerts</p>
        )}

        {alerts.map((alert) => (
          <Card key={alert.id} className="rounded-2xl shadow p-4">
            <CardContent className="flex flex-col gap-3">
              {/* Header Row */}
              <div className="flex justify-between items-center">
                {/* Severity Badge */}
                <span
                  className={`px-3 py-1 text-white text-xs rounded-full ${severityColors[alert.severity]}`}
                >
                  {alert.severity}
                </span>

                {/* Created At */}
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(alert.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Alert Type */}
              <h2 className="text-xl font-semibold capitalize">
                {alert.type.toLowerCase()}
              </h2>

              {/* Description */}
              <p className="text-gray-700 text-sm">{alert.description}</p>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Resolve
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
