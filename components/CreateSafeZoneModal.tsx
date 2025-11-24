"use client";


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle } from "lucide-react";
import { MapPicker } from "./MapPicker";


export function CreateSafeZoneModal({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void; }) {
  const [name, setName] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setLat(null);
      setLng(null);
      setLoading(false);
    }
  }, [open]);


  async function createZone() {
    if (!name || lat === null || lng === null) return alert("Please fill name and choose coordinates");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/safe-zones/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lat, lng }),
      });

const data = await res.json();
if (res.ok) {
onCreated();
onClose();
} else {
alert(data.error || "Failed to create safe zone");
}
} catch (err) {
console.error(err);
alert("Error creating safe zone");
} finally {
setLoading(false);
}
}


return (
<div
className={`fixed inset-0 z-50 flex items-center justify-center ${open ? "" : "pointer-events-none opacity-0"}`}
aria-hidden={!open}
>
<div className="absolute inset-0 bg-black/40" onClick={onClose} />


<div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold">Create Safe Zone</h3>
<Button variant="ghost" onClick={onClose}>Close</Button>
</div>


<div className="grid grid-cols-1 gap-4">
<input
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Name (e.g. 'Civic Park Shelter')"
className="p-2 border rounded"
/>


<div>
<label className="block text-sm mb-2">Pick location on map</label>
<MapPicker
initial={lat && lng ? { lat, lng } : null}
onSelect={(newLat, newLng) => {
setLat(newLat);
setLng(newLng);
}}
/>
</div>


<div className="flex gap-2">
<input value={lat ?? ""} readOnly placeholder="Latitude" className="p-2 border rounded flex-1" />
<input value={lng ?? ""} readOnly placeholder="Longitude" className="p-2 border rounded flex-1" />
</div>


<div className="flex justify-end gap-2 mt-2">
<Button variant="secondary" onClick={onClose}>Cancel</Button>
<Button onClick={createZone} disabled={loading}>{loading ? "Saving..." : "Create"}</Button>
</div>
</div>
</div>
</div>
);
}