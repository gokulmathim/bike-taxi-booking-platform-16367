"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function BookingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    payment_method: "wallet",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const ride = await api.post<{ id: number | string }>("/rides/book/", form);
      if (ride?.id) router.push(`/tracking/${ride.id}`);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Booking failed";
      setErr(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <h2 className="text-lg font-medium mb-4">Book a Ride</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            label="Pickup Location"
            placeholder="Enter pickup"
            value={form.pickup}
            onChange={(e) => setForm((f) => ({ ...f, pickup: e.target.value }))}
            required
          />
          <Input
            label="Drop-off Location"
            placeholder="Enter drop-off"
            value={form.dropoff}
            onChange={(e) => setForm((f) => ({ ...f, dropoff: e.target.value }))}
            required
          />
          <Select
            label="Payment Method"
            value={form.payment_method}
            onChange={(e) => setForm((f) => ({ ...f, payment_method: e.target.value }))}
            options={[
              { label: "Wallet", value: "wallet" },
              { label: "Card", value: "card" },
              { label: "Cash", value: "cash" },
            ]}
          />
          <Input
            label="Notes (optional)"
            placeholder="Any additional details"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <Button type="submit" loading={loading}>Confirm Booking</Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-medium mb-4">Estimate</h2>
        <p className="text-sm text-muted">
          You will see fare estimate and driver details once a driver accepts your ride.
        </p>
      </Card>
    </div>
  );
}
