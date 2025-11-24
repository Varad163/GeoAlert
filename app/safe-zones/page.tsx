"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SafeZoneMap = dynamic(() => import("./SafeZoneMap"), {
  ssr: false,
});

export default function UserSafeZonesPage() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/safe-zones/list");
      const data = await res.json();
      console.log("Safe zones loaded:", data.zones); // debug
      setZones(data.zones);
    }
    load();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SafeZoneMap zones={zones} />
    </div>
  );
}
