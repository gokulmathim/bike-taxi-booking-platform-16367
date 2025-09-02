"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

type DriverState = {
  status: "offline" | "available" | "on_ride";
  active_ride?: { id: number | string; pickup?: string; dropoff?: string; user_name?: string };
  name?: string;
};

export default function DriverPage() {
  const [state, setState] = useState<DriverState>({ status: "offline" });

  const load = async () => {
    try {
      const res = await api.get("/driver/me/");
      setState(res);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    load();
    const i = setInterval(load, 5000);
    return () => clearInterval(i);
  }, []);

  const goOnline = async () => {
    await api.post("/driver/online/", {});
    await load();
  };

  const goOffline = async () => {
    await api.post("/driver/offline/", {});
    await load();
  };

  // Accept ride can be enabled when new ride requests are shown
  // const acceptRide = async (id: number | string) => {
  //   await api.post(`/driver/rides/${id}/accept/`, {});
  //   await load();
  // };

  const completeRide = async (id: number | string) => {
    await api.post(`/driver/rides/${id}/complete/`, {});
    await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Driver Dashboard</h1>
      <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="font-medium">{state.name || "Driver"}</p>
          <p className="text-sm text-muted">Status: {state.status}</p>
        </div>
        <div className="flex gap-3">
          {state.status !== "available" && <Button onClick={goOnline}>Go Online</Button>}
          {state.status !== "offline" && <Button variant="outline" onClick={goOffline}>Go Offline</Button>}
        </div>
      </Card>

      {state.active_ride ? (
        <Card className="space-y-2">
          <p className="font-medium">Active Ride #{state.active_ride.id}</p>
          <p className="text-sm text-muted">Rider: {state.active_ride.user_name || "—"}</p>
          <p className="text-sm text-muted">Pickup: {state.active_ride.pickup || "—"}</p>
          <p className="text-sm text-muted">Drop-off: {state.active_ride.dropoff || "—"}</p>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => completeRide(state.active_ride!.id)}>Complete</Button>
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-muted">No active ride. You will be notified when a new ride is assigned.</p>
        </Card>
      )}

      {/* Example new ride requests list (optional, if API supports) */}
      {/* <Card> ... </Card> */}
    </div>
  );
}
