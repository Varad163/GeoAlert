
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle } from "lucide-react";


// React-Leaflet imports
import { MapContainer, TileLayer, CircleMarker, Marker, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";


// ---------------- MapPickerModal.tsx ----------------
export function MapPicker({ initial, onSelect }: { initial?: { lat: number; lng: number } | null; onSelect: (lat: number, lng: number) => void; }) {
const [pos, setPos] = useState<{ lat: number; lng: number } | null>(initial || null);


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


const center: LatLngExpression = pos ? [pos.lat, pos.lng] : [21.1458, 79.0882]; // fallback center (India)


return (
<div style={{ height: 360, width: "100%" }}>
<MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
<TileLayer
attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


<MapClickHandler />


{pos && (
<CircleMarker center={[pos.lat, pos.lng]} radius={10} fillOpacity={0.6} />
)}
</MapContainer>
</div>
);
}