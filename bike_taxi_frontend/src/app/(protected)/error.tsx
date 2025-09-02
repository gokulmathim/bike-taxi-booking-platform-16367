"use client";

export default function ProtectedError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-lg font-medium">Something went wrong</h2>
      <p className="text-sm text-muted">{error.message}</p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 transition-colors bg-primary text-white hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
