"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SafeZoneMap = dynamic(() => import("./SafeZoneMap"), {
  ssr: false,
});

export default function UserSafeZonesPage() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function loadZones() {
      const res = await fetch("/api/safe-zones");
      const data = await res.json();
      setZones(data.zones || []);
    }
    loadZones();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Nearby Safe Zones 🟢</h1>
      <p className="text-gray-600 mb-6">
        These are safe locations marked by your city administrators.
      </p>

      {/* Map */}
      <SafeZoneMap zones={zones} />
    </div>
  );
}
