"use client";

import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";

export default function MapPickerContent({ initial, onSelect }: { initial?: { lat: number; lng: number } | null; onSelect: (lat: number, lng: number) => void; }) {
  const [pos, setPos] = useState(initial || null);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPos({ lat, lng });
        onSelect(lat, lng);
      },
    });
    return null;
  }

  const center: [number, number] = pos ? [pos.lat, pos.lng] : [21.1458, 79.0882];

  return (
    <div style={{ height: 360, width: "100%" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        {pos && <CircleMarker center={[pos.lat, pos.lng]} radius={10} fillOpacity={0.6} />}
      </MapContainer>
    </div>
  );
}
