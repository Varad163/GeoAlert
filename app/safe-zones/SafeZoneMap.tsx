"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function SafeZoneMap({ zones }: any) {
  useEffect(() => {
    if (!zones || zones.length === 0) return;

    const map = L.map("safeZoneMap").setView([18.5204, 73.8567], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    zones.forEach((zone: any) => {
      if (!zone.coordinates) return;

      let coords;
      try {
        coords = JSON.parse(zone.coordinates);
      } catch (e) {
        console.warn("Invalid JSON:", zone);
        return;
      }

      if (Array.isArray(coords) && coords[0]?.lat) {
        L.polygon(coords, { color: "green" })
          .addTo(map)
          .bindPopup(`<b>${zone.name}</b><br>${zone.description}`);
      } else if (coords.lat && coords.lng) {
        L.marker([coords.lat, coords.lng])
          .addTo(map)
          .bindPopup(`<b>${zone.name}</b><br>${zone.description}`);
      }
    });

    return () => {
      map.remove();
    };
  }, [zones]);

  return (
    <div
      id="safeZoneMap"
      className="w-full h-[500px] rounded-xl border shadow-lg"
    ></div>
  );
}
