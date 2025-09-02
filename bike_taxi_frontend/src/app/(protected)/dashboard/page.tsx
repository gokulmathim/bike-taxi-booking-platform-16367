"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { api } from "@/lib/api";

export default function DashboardPage() {
  type Summary = {
    total_rides?: number;
    pending_payments?: number;
    last_ride?: { status?: string } | null;
  };
  const [stats, setStats] = useState<{ totalRides: number; pendingPayments: number; lastRide?: { status?: string } | null }>({
    totalRides: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const s = await api.get<Summary>("/users/me/summary/");
        setStats({
          totalRides: s?.total_rides ?? 0,
          pendingPayments: s?.pending_payments ?? 0,
          lastRide: s?.last_ride ?? null,
        });
      } catch {
        // silent fail for demo
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your Dashboard</h1>
          <p className="text-muted">Plan rides, view statuses and manage payments.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/booking"><Button>Book a Ride</Button></Link>
          <Link href="/rides"><Button variant="outline">View Rides</Button></Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Rides" value={stats.totalRides} />
        <StatCard title="Pending Payments" value={stats.pendingPayments} />
        <StatCard title="Last Ride" value={stats.lastRide ? stats.lastRide.status : "N/A"} />
      </section>
    </div>
  );
}
