"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { auth, logout } = useAuth();
  const router = useRouter();

  if (!auth?.token) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
              <Link href="/booking" className="hover:text-primary">Book Ride</Link>
              <Link href="/rides" className="hover:text-primary">Ride History</Link>
              <Link href="/payments" className="hover:text-primary">Payments</Link>
              {auth.user?.role === "driver" && (
                <Link href="/driver" className="hover:text-primary">Driver</Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted">
              {auth.user?.name || auth.user?.email}
            </span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Bike Taxi. All rights reserved.
      </footer>
    </div>
  );
}
