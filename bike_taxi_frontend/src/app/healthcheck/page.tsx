"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HealthcheckPage() {
  const [status, setStatus] = useState<string>("pending...");
  const [time, setTime] = useState<string>("");

  const check = async () => {
    try {
      const res = await api.get<string | { status?: string }>("/health/");
      const text = typeof res === "string" ? res : res?.status ?? "ok";
      setStatus(String(text));
      setTime(new Date().toLocaleTimeString());
    } catch (e) {
      const msg = e instanceof Error ? e.message : "error";
      setStatus(`error: ${msg}`);
      setTime(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <main className="min-h-screen bg-bg px-4 py-10">
      <div className="mx-auto max-w-xl">
        <Card className="space-y-3">
          <h1 className="text-xl font-semibold">Backend Health Check</h1>
          <p className="text-sm text-muted">Checks Django API at /health/</p>
          <p className="text-sm">
            Status: <span className="font-medium text-fg">{status}</span>
          </p>
          <p className="text-xs text-muted">Last checked: {time || "—"}</p>
          <div>
            <Button onClick={check}>Re-check</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
