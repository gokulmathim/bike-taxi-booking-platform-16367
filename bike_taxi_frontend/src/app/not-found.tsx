import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <section className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold">404 – Page Not Found</h1>
        <p className="text-muted mt-2">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
