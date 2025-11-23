"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const MapWithDraw = dynamic(() => import("./map"), { ssr: false });

export default function CreateAlertPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("FLOOD");
  const [severity, setSeverity] = useState("LOW");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [polygon, setPolygon] = useState(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!polygon) {
      alert("Please draw a polygon on the map.");
      return;
    }

    const res = await fetch("/api/alerts/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        type,
        severity,
        description,
        expiresAt,
        polygon,
        adminId: session?.user?.id,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Alert created successfully");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Create New Alert</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          className="border p-2 w-full"
          placeholder="Alert Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <select className="border p-2" onChange={(e) => setType(e.target.value)}>
            <option value="FLOOD">Flood</option>
            <option value="FIRE">Fire</option>
            <option value="ACCIDENT">Accident</option>
            <option value="WEATHER">Weather</option>
            <option value="ROADBLOCK">Roadblock</option>
            <option value="OTHER">Other</option>
          </select>

          <select className="border p-2" onChange={(e) => setSeverity(e.target.value)}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          className="border p-2 w-full"
          onChange={(e) => setExpiresAt(e.target.value)}
        />

        <MapWithDraw setPolygon={setPolygon} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow w-full"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
}
