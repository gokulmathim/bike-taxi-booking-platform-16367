"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, API_BASE } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const Map = dynamic(() => import("@/components/map/LeafletMap"), { ssr: false });

type RideData = {
  id: string | number;
  status: string;
  pickup: { lat: number; lng: number };
  dropoff: { lat: number; lng: number };
  driver?: { name: string; vehicle: string };
  driver_location?: { lat: number; lng: number };
};

export default function TrackingPage() {
  const params = useParams<{ rideId: string }>();
  const router = useRouter();
  const rideId = params.rideId;

  const [ride, setRide] = useState<RideData | null>(null);
  const [connecting, setConnecting] = useState(true);

  // Attempt SSE if backend supports it at /rides/{id}/stream/
  useEffect(() => {
    let es: EventSource | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;

    async function fetchOnce() {
      try {
        const data = await api.get(`/rides/${rideId}/`);
        setRide(data);
      } catch {
        // ignore
      }
    }

    try {
      const url = `${API_BASE.replace(/\/$/, "")}/rides/${rideId}/stream/`;
      es = new EventSource(url, { withCredentials: false });
      es.onopen = () => setConnecting(false);
      es.onmessage = (evt) => {
        try {
          const payload = JSON.parse(evt.data);
          setRide(payload);
        } catch {
          // ignore
        }
      };
      es.onerror = () => {
        es?.close();
        // fallback to polling
        setConnecting(false);
        interval = setInterval(fetchOnce, 3000);
      };
    } catch {
      setConnecting(false);
      interval = setInterval(fetchOnce, 3000);
    }

    // initial fetch
    fetchOnce();

    return () => {
      es?.close();
      if (interval) clearInterval(interval);
    };
  }, [rideId]);

  const positions = useMemo(() => {
    const pts: { label: string; lat: number; lng: number; color?: string }[] = [];
    if (ride?.pickup) pts.push({ label: "Pickup", ...ride.pickup, color: "#34A853" });
    if (ride?.dropoff) pts.push({ label: "Drop-off", ...ride.dropoff, color: "#1A73E8" });
    if (ride?.driver_location) pts.push({ label: "Driver", ...ride.driver_location, color: "#FFB300" });
    return pts;
  }, [ride]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 overflow-hidden">
        <div className="h-[420px]">
          <Map points={positions} />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium mb-2">Ride #{rideId}</h2>
        <p className="text-sm text-muted">Status: <span className="text-fg font-medium">{ride?.status || "Loading..."}</span></p>
        {ride?.driver && (
          <div className="mt-4 space-y-1 text-sm">
            <p className="text-muted">Driver</p>
            <p className="text-fg font-medium">{ride.driver.name}</p>
            <p className="text-muted">{ride.driver.vehicle}</p>
          </div>
        )}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => router.push("/rides")}>View History</Button>
          <Button onClick={() => router.push("/payments")}>Payments</Button>
        </div>
        {connecting && <p className="text-xs text-muted mt-4">Connecting to live updates...</p>}
      </Card>
    </div>
  );
}
