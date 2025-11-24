"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPinned, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ManageSafeZones() {
  const [zones, setZones] = useState([]);

  async function loadZones() {
    const res = await fetch("/api/admin/safe-zones/list");
    const data = await res.json();
    setZones(data.zones || []);
  }

  useEffect(() => {
    loadZones();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        <MapPinned className="w-8 h-8" /> Manage Safe Zones
      </h1>

      {/* Create New Safe Zone Button */}
      <div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" /> Add New Safe Zone
        </Button>
      </div>

      {/* Safe Zones List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.length === 0 && (
          <p className="text-gray-600">No safe zones available. Add one above.</p>
        )}

        {zones.map((zone: any) => (
          <Card key={zone.id} className="rounded-2xl shadow p-4">
            <CardContent className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{zone.name}</h2>

              <p className="text-gray-700 text-sm">Lat: {zone.lat}</p>
              <p className="text-gray-700 text-sm">Lng: {zone.lng}</p>

              <div className="flex gap-3 mt-3">
                <Button variant="secondary" className="flex items-center gap-2 flex-1">
                  <Pencil className="w-4 h-4" /> Edit
                </Button>
                <Button variant="destructive" className="flex items-center gap-2 flex-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
