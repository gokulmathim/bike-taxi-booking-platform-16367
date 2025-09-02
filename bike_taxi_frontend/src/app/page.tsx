import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <section className="max-w-3xl text-center">
        <h1 className="text-4xl font-semibold mb-3">Bike Taxi Platform</h1>
        <p className="text-muted mb-8">
          Book rides quickly, track in real-time, and manage your payments with a modern, clean interface.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/login"><Button>Login</Button></Link>
          <Link href="/register"><Button variant="outline">Register</Button></Link>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted">Users</p>
            <h3 className="font-medium">Book and track rides</h3>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted">Drivers</p>
            <h3 className="font-medium">Manage your availability and trips</h3>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted">Payments</p>
            <h3 className="font-medium">Wallet, cards and history</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
