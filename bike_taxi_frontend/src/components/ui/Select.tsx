"use client";

import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Option = { label: string; value: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
};

export function Select({ label, options, className, ...props }: Props) {
  const id = props.id || `select-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-sm text-fg/80">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        className={clsx(
          "block w-full h-10 rounded-md border border-border bg-white px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-primary/30",
          className
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
