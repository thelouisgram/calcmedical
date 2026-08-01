"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  NumberInput,
  ResetButton,
  ResultPanel,
  Segmented,
} from "@/components/calc/fields";
import { round } from "@/lib/utils";

export function MapCalculator() {
  const [sbp, setSbp] = useState("120");
  const [dbp, setDbp] = useState("80");

  const result = useMemo(() => {
    const s = Number(sbp);
    const d = Number(dbp);
    if (!Number.isFinite(s) || !Number.isFinite(d) || s <= 0 || d <= 0)
      return null;
    const map = round((s + 2 * d) / 3, 0);
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (map < 65) tone = "critical";
    else if (map < 70) tone = "warn";
    return { map, tone };
  }, [dbp, sbp]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.map} mmHg` : "—"}
          secondary="MAP = (SBP + 2×DBP) / 3"
          tone={result?.tone ?? "neutral"}
          detail="Often target MAP ≥65 mmHg in septic shock (individualize)."
        />
      }
    >
      <Field label="Systolic BP (mmHg)">
        <NumberInput value={sbp} onChange={(e) => setSbp(e.target.value)} />
      </Field>
      <Field label="Diastolic BP (mmHg)">
        <NumberInput value={dbp} onChange={(e) => setDbp(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setSbp("120");
          setDbp("80");
        }}
      />
    </CalcLayout>
  );
}

export function AnionGapCalculator() {
  const [na, setNa] = useState("140");
  const [cl, setCl] = useState("104");
  const [hco3, setHco3] = useState("24");
  const [albumin, setAlbumin] = useState("4.0");

  const result = useMemo(() => {
    const n = Number(na);
    const c = Number(cl);
    const h = Number(hco3);
    const alb = Number(albumin);
    if (![n, c, h].every(Number.isFinite)) return null;
    const gap = round(n - (c + h), 1);
    const corrected =
      Number.isFinite(alb) && alb > 0
        ? round(gap + 2.5 * (4 - alb), 1)
        : null;
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (gap > 16) tone = "critical";
    else if (gap > 12) tone = "warn";
    return { gap, corrected, tone };
  }, [albumin, cl, hco3, na]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.gap} mEq/L` : "—"}
          secondary={
            result?.corrected != null
              ? `Albumin-corrected: ${result.corrected}`
              : "Na − (Cl + HCO₃)"
          }
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="Sodium (mEq/L)">
        <NumberInput value={na} onChange={(e) => setNa(e.target.value)} />
      </Field>
      <Field label="Chloride (mEq/L)">
        <NumberInput value={cl} onChange={(e) => setCl(e.target.value)} />
      </Field>
      <Field label="Bicarbonate (mEq/L)">
        <NumberInput value={hco3} onChange={(e) => setHco3(e.target.value)} />
      </Field>
      <Field label="Albumin (g/dL)" hint="Optional correction">
        <NumberInput
          step={0.1}
          value={albumin}
          onChange={(e) => setAlbumin(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setNa("140");
          setCl("104");
          setHco3("24");
          setAlbumin("4.0");
        }}
      />
    </CalcLayout>
  );
}

export function CorrectedQtCalculator() {
  const [qt, setQt] = useState("400");
  const [rr, setRr] = useState("1000");
  const [method, setMethod] = useState<"bazett" | "fridericia">("bazett");

  const result = useMemo(() => {
    const q = Number(qt);
    const r = Number(rr);
    if (!Number.isFinite(q) || !Number.isFinite(r) || q <= 0 || r <= 0)
      return null;
    const sec = r / 1000;
    const qtc =
      method === "bazett"
        ? q / Math.sqrt(sec)
        : q / sec ** (1 / 3);
    const value = round(qtc, 0);
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (value >= 500) tone = "critical";
    else if (value >= 460) tone = "warn";
    return { value, tone };
  }, [method, qt, rr]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.value} ms` : "—"}
          secondary={method === "bazett" ? "Bazett" : "Fridericia"}
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="Formula">
        <Segmented
          value={method}
          onChange={setMethod}
          options={[
            { value: "bazett", label: "Bazett" },
            { value: "fridericia", label: "Fridericia" },
          ]}
        />
      </Field>
      <Field label="QT interval (ms)">
        <NumberInput value={qt} onChange={(e) => setQt(e.target.value)} />
      </Field>
      <Field label="RR interval (ms)" hint="Or 60,000 / HR">
        <NumberInput value={rr} onChange={(e) => setRr(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setQt("400");
          setRr("1000");
          setMethod("bazett");
        }}
      />
    </CalcLayout>
  );
}
