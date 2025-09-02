"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";

type Point = { label: string; lat: number; lng: number; color?: string };

const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    html: `<span style="background:${color};width:12px;height:12px;display:inline-block;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2)"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

export default function LeafletMap({ points = [] as Point[] }: { points?: Point[] }) {
  const center = useMemo(() => {
    if (points.length > 0) return [points[0].lat, points[0].lng] as [number, number];
    return [12.9716, 77.5946] as [number, number]; // default to Bengaluru
  }, [points]);

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]} icon={createIcon(p.color || "#1A73E8")}>
          <Popup>{p.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
