"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({ variant = "primary", loading, className, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        variant === "primary" && "bg-primary text-white hover:bg-primary/90",
        variant === "outline" && "border border-border text-fg hover:bg-muted/40",
        className
      )}
      aria-busy={loading || undefined}
    >
      {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
      {children}
    </button>
  );
}
