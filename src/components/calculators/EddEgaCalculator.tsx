"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  ResetButton,
  ResultPanel,
  TextInput,
} from "@/components/calc/fields";

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / 86400000);
}

/** Estimated due date from LMP (Naegele) and current EGA. */
export function EddEgaCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [lmp, setLmp] = useState("");
  const [asOf, setAsOf] = useState(today);

  const result = useMemo(() => {
    const lmpDate = parseDate(lmp);
    const asOfDate = parseDate(asOf);
    if (!lmpDate || !asOfDate) return null;
    if (asOfDate < lmpDate) return null;

    const edd = addDays(lmpDate, 280);
    const gestationalDays = daysBetween(lmpDate, asOfDate);
    const weeks = Math.floor(gestationalDays / 7);
    const days = gestationalDays % 7;
    const remaining = daysBetween(asOfDate, edd);

    return {
      edd: formatDate(edd),
      ega: `${weeks}w ${days}d`,
      gestationalDays,
      remaining,
    };
  }, [asOf, lmp]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          title="Estimated gestational age"
          primary={result ? result.ega : "—"}
          secondary={result ? `EDD: ${result.edd}` : "Enter LMP date"}
          detail={
            result ? (
              <p>
                {result.gestationalDays} days from LMP.{" "}
                {result.remaining >= 0
                  ? `${result.remaining} days until EDD.`
                  : `${Math.abs(result.remaining)} days past EDD.`}
              </p>
            ) : null
          }
          tone="neutral"
        />
      }
    >
      <Field label="Last menstrual period (LMP)" hint="First day of LMP">
        <TextInput
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
        />
      </Field>
      <Field label="As of date">
        <TextInput
          type="date"
          value={asOf}
          onChange={(e) => setAsOf(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setLmp("");
          setAsOf(today);
        }}
      />
    </CalcLayout>
  );
}
