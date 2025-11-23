"use client";

import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

export default function MapWithDraw({ setPolygon }: any) {
  useEffect(() => {
   
    const existingMap = (L as any).map?.instances?.find(
      (m: any) => m._container?.id === "alertMap"
    );

    if (existingMap) {
      existingMap.remove();
    }

   
    const map = L.map("alertMap").setView([18.5204, 73.8567], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new (L as any).Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on((L as any).Draw.Event.CREATED, (e: any) => {
      drawnItems.clearLayers();
      drawnItems.addLayer(e.layer);

      const coords = e.layer.getLatLngs()[0].map((p: any) => ({
        lat: p.lat,
        lng: p.lng,
      }));

      setPolygon(coords);
    });

    return () => {
      map.remove();
    };
  }, [setPolygon]);

  return <div id="alertMap" className="w-full h-80 rounded border"></div>;
}
