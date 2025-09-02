"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import Link from "next/link";

type Ride = {
  id: number | string;
  status: string;
  fare?: number;
  created_at?: string;
};

export default function RidesPage() {
  const [items, setItems] = useState<Ride[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/rides/");
        setItems(res || []);
      } catch {
        // ignore
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Ride History</h1>
      <div className="grid gap-4">
        {items.map((r) => (
          <Card key={r.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="font-medium">Ride #{r.id}</p>
              <p className="text-sm text-muted">Status: {r.status}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted">Fare: {r.fare ? `$${r.fare}` : "—"}</p>
              <Link href={`/tracking/${r.id}`} className="text-primary text-sm hover:underline">
                Track
              </Link>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted">No rides found.</p>
        )}
      </div>
    </div>
  );
}
