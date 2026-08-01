"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function NumberInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={cn(
        "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20",
        className,
      )}
      {...props}
    />
  );
}

export function TextInput({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20",
        className,
      )}
      {...props}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-11 rounded-md border px-2 text-sm font-medium transition",
              active
                ? "border-teal-800 bg-teal-800 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-teal-700/50",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function ResultPanel({
  title = "Result",
  primary,
  secondary,
  detail,
  tone = "neutral",
}: {
  title?: string;
  primary: string;
  secondary?: string;
  detail?: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "critical";
}) {
  const toneClass =
    tone === "ok"
      ? "border-emerald-700/30 bg-emerald-50"
      : tone === "warn"
        ? "border-amber-700/30 bg-amber-50"
        : tone === "critical"
          ? "border-rose-700/30 bg-rose-50"
          : "border-slate-300 bg-slate-50";

  return (
    <div
      className={cn(
        "sticky top-4 rounded-lg border p-5 shadow-sm",
        toneClass,
      )}
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        {title}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {primary}
      </p>
      {secondary ? (
        <p className="mt-2 text-sm font-medium text-slate-700">{secondary}</p>
      ) : null}
      {detail ? <div className="mt-3 text-sm text-slate-600">{detail}</div> : null}
    </div>
  );
}

export function CalcLayout({
  children,
  result,
}: {
  children: ReactNode;
  result: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {children}
      </div>
      <div>{result}</div>
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 text-sm font-medium text-teal-800 underline-offset-2 hover:underline"
    >
      Reset inputs
    </button>
  );
}
