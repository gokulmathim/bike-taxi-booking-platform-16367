"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";

type Payment = {
  id: number | string;
  amount: number;
  status: string;
  ride_id?: number | string;
  created_at?: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState<string>("20");

  const load = async () => {
    try {
      const res = await api.get("/payments/");
      setPayments(res || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addFunds = async () => {
    try {
      await api.post("/payments/wallet/topup/", { amount: Number(amount) });
      await load();
    } catch {
      // ignore
    }
  };

  const payPending = async (paymentId: number | string) => {
    try {
      await api.post(`/payments/${paymentId}/pay/`);
      await load();
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Payments</h1>

      <Card className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <Input
            label="Add funds to wallet"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
          />
        </div>
        <Button onClick={addFunds}>Add Funds</Button>
      </Card>

      <div className="grid gap-4">
        {payments.map((p) => (
          <Card key={p.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="font-medium">${p.amount.toFixed(2)}</p>
              <p className="text-sm text-muted">
                {p.status} {p.ride_id ? `• Ride #${p.ride_id}` : ""}
              </p>
            </div>
            {p.status === "pending" && (
              <Button onClick={() => payPending(p.id)}>Pay Now</Button>
            )}
          </Card>
        ))}
        {payments.length === 0 && <p className="text-sm text-muted">No payments found.</p>}
      </div>
    </div>
  );
}
