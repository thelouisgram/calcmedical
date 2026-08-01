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

const REGIONS = [
  { key: "head", label: "Head / neck", adult: 9, child: 18 },
  { key: "armL", label: "Left arm", adult: 9, child: 9 },
  { key: "armR", label: "Right arm", adult: 9, child: 9 },
  { key: "trunkAnt", label: "Anterior trunk", adult: 18, child: 18 },
  { key: "trunkPost", label: "Posterior trunk", adult: 18, child: 18 },
  { key: "legL", label: "Left leg", adult: 18, child: 14 },
  { key: "legR", label: "Right leg", adult: 18, child: 14 },
  { key: "genitals", label: "Genitalia / perineum", adult: 1, child: 1 },
] as const;

type RegionKey = (typeof REGIONS)[number]["key"];

export function BurnsCalculator() {
  const [ageGroup, setAgeGroup] = useState<"adult" | "child">("adult");
  const [weight, setWeight] = useState("70");
  const [partial, setPartial] = useState<Record<RegionKey, number>>(
    Object.fromEntries(REGIONS.map((r) => [r.key, 0])) as Record<
      RegionKey,
      number
    >,
  );

  const result = useMemo(() => {
    const w = Number(weight);
    if (!Number.isFinite(w) || w <= 0) return null;

    let tbsa = 0;
    for (const region of REGIONS) {
      const max = ageGroup === "adult" ? region.adult : region.child;
      const pct = Math.min(Math.max(partial[region.key] || 0, 0), max);
      tbsa += pct;
    }
    tbsa = round(tbsa, 1);
    const parkland24 = round(4 * w * tbsa, 0);
    const first8 = round(parkland24 / 2, 0);
    const next16 = parkland24 - first8;

    let tone: "ok" | "warn" | "critical" | "neutral" = "neutral";
    if (tbsa >= 40) tone = "critical";
    else if (tbsa >= 15) tone = "warn";
    else if (tbsa > 0) tone = "ok";

    return { tbsa, parkland24, first8, next16, tone };
  }, [ageGroup, partial, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.tbsa}% TBSA` : "—"}
          secondary={
            result
              ? `Parkland 24h: ${result.parkland24} mL crystalloid`
              : "Enter weight and burned areas"
          }
          tone={result?.tone ?? "neutral"}
          detail={
            result ? (
              <ul className="list-disc space-y-1 pl-4">
                <li>First 8 hours from burn: {result.first8} mL</li>
                <li>Next 16 hours: {result.next16} mL</li>
                <li>Titrate to urine output; formula is a starting guide.</li>
              </ul>
            ) : null
          }
        />
      }
    >
      <Field label="Age group (Rule of Nines)">
        <Segmented
          value={ageGroup}
          onChange={setAgeGroup}
          options={[
            { value: "adult", label: "Adult" },
            { value: "child", label: "Child" },
          ]}
        />
      </Field>
      <Field label="Weight (kg)">
        <NumberInput
          min={1}
          step={0.1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-800">
          Burned area by region (% of body)
        </p>
        {REGIONS.map((region) => {
          const max = ageGroup === "adult" ? region.adult : region.child;
          return (
            <Field
              key={region.key}
              label={`${region.label} (max ${max}%)`}
            >
              <NumberInput
                min={0}
                max={max}
                step={0.5}
                value={partial[region.key] || ""}
                onChange={(e) =>
                  setPartial((prev) => ({
                    ...prev,
                    [region.key]: Number(e.target.value) || 0,
                  }))
                }
              />
            </Field>
          );
        })}
      </div>
      <ResetButton
        onClick={() => {
          setAgeGroup("adult");
          setWeight("70");
          setPartial(
            Object.fromEntries(REGIONS.map((r) => [r.key, 0])) as Record<
              RegionKey,
              number
            >,
          );
        }}
      />
    </CalcLayout>
  );
}
