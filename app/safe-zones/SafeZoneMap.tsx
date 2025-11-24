"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function SafeZoneMap({ zones }: { zones: { id: string | number; lat: number; lng: number; name: string }[] }) {
  return (
    <MapContainer
      center={[18.52, 73.85]} // Default Pune center
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {zones.map((z) => (
        <CircleMarker
          key={z.id}
          center={[z.lat, z.lng]}
          radius={12}
          fillOpacity={0.8}
          pathOptions={{ color: "green" }}
        >
          <Popup>
            <b>{z.name}</b>
            <br />
            Lat: {z.lat}
            <br />
            Lng: {z.lng}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
