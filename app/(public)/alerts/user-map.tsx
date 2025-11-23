"use client";

import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function UserMap({ alerts }: any) {
  useEffect(() => {
    // Remove previous map
    const oldMap = (L as any).map?.instances?.find(
      (m: any) => m._container.id === "userAlertsMap"
    );
    if (oldMap) oldMap.remove();

    const map = L.map("userAlertsMap").setView([18.5204, 73.8567], 12);

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Render polygons
    alerts.forEach((alert: any) => {
      alert.zones.forEach((zone: any) => {
        const layer = L.polygon(
          zone.polygon.map((p: any) => [p.lat, p.lng]),
          {
            color:
              alert.severity === "CRITICAL"
                ? "red"
                : alert.severity === "HIGH"
                ? "orange"
                : alert.severity === "MEDIUM"
                ? "yellow"
                : "green",
            fillOpacity: 0.4,
          }
        );
        layer.addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, [alerts]);

  return <div id="userAlertsMap" className="w-full h-80 rounded border"></div>;
}
