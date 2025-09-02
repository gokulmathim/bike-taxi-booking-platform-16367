"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className, ...props }: Props) {
  const id = props.id || `input-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm text-fg/80">
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={clsx(
          "block w-full h-10 rounded-md border border-border bg-white px-3 text-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30",
          className
        )}
      />
    </div>
  );
}
