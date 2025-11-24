"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import{ CreateSafeZoneModal } from "@/components/CreateSafeZoneModal";

export default function ManageSafeZonesPage() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  async function loadZones() {
    setLoading(true);
    try {
const res = await fetch("/api/admin/safe-zones/list");
const data = await res.json();
setZones(data.zones || []);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
}


useEffect(() => {
loadZones();
}, []);


return (
<div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
<div className="flex items-center justify-between">
<h1 className="text-3xl font-semibold flex items-center gap-2"><MapPin className="w-8 h-8"/> Manage Safe Zones</h1>
<Button onClick={() => setOpenModal(true)} className="flex items-center gap-2"><PlusCircle/> Add New Safe Zone</Button>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{zones.length === 0 && !loading && <p className="text-gray-600">No safe zones — create one.</p>}


{zones.map((zone: any) => (
<Card key={zone.id} className="rounded-2xl shadow p-4">
<CardContent className="flex flex-col gap-3">
<h2 className="text-xl font-semibold">{zone.name}</h2>
<p className="text-gray-700 text-sm">Lat: {zone.lat}</p>
<p className="text-gray-700 text-sm">Lng: {zone.lng}</p>


<div className="flex gap-3 mt-3">
<Button variant="secondary" className="flex-1">Edit</Button>
<Button variant="destructive" className="flex-1" onClick={async () => {
if(!confirm('Delete this safe zone?')) return;
await fetch('/api/admin/safe-zones/delete', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: zone.id }) });
loadZones();
}}>Delete</Button>
</div>
</CardContent>
</Card>
))}
</div>


<CreateSafeZoneModal open={openModal} onClose={() => setOpenModal(false)} onCreated={() => { setOpenModal(false); loadZones(); }} />
</div>
);
}