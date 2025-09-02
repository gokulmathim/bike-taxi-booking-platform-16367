"use client";

import { Card } from "./Card";

export function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <p className="text-sm text-muted">{title}</p>
      <p className="text-2xl font-semibold text-fg mt-1">{value}</p>
    </Card>
  );
}
