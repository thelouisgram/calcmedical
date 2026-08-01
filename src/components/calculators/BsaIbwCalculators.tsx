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

type Formula = "mosteller" | "dubois" | "haycock" | "gehan";
type Units = "metric" | "imperial";

function toMetric(units: Units, height: number, weight: number) {
  if (units === "metric") return { cm: height, kg: weight };
  return { cm: height * 2.54, kg: weight * 0.45359237 };
}

function calcBsa(formula: Formula, cm: number, kg: number): number {
  switch (formula) {
    case "mosteller":
      return Math.sqrt((cm * kg) / 3600);
    case "dubois":
      // DuBois & DuBois 1916
      return 0.007184 * Math.pow(cm, 0.725) * Math.pow(kg, 0.425);
    case "haycock":
      return 0.024265 * Math.pow(cm, 0.3964) * Math.pow(kg, 0.5378);
    case "gehan":
      return 0.0235 * Math.pow(cm, 0.42246) * Math.pow(kg, 0.51456);
  }
}

const FORMULA_LABEL: Record<Formula, string> = {
  mosteller: "Mosteller",
  dubois: "DuBois & DuBois",
  haycock: "Haycock",
  gehan: "Gehan & George",
};

/**
 * Dedicated BSA calculator with multiple validated formulas and unit toggle.
 */
export function BsaCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [formula, setFormula] = useState<Formula>("mosteller");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");

  const result = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0)
      return null;

    const { cm, kg } = toMetric(units, h, w);
    if (cm < 30 || cm > 250 || kg < 1 || kg > 400) return null;

    const primary = round(calcBsa(formula, cm, kg), 3);
    const all = (["mosteller", "dubois", "haycock", "gehan"] as Formula[]).map(
      (f) => ({
        key: f,
        label: FORMULA_LABEL[f],
        value: round(calcBsa(f, cm, kg), 3),
      }),
    );

    return { primary, all, cm: round(cm, 1), kg: round(kg, 1) };
  }, [formula, height, units, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.primary} m²` : "—"}
          secondary={result ? FORMULA_LABEL[formula] : "Enter height and weight"}
          detail={
            result ? (
              <ul className="space-y-1.5">
                {result.all.map((row) => (
                  <li
                    key={row.key}
                    className={
                      row.key === formula
                        ? "font-semibold text-slate-800"
                        : undefined
                    }
                  >
                    {row.label}: {row.value} m²
                  </li>
                ))}
                <li className="pt-1 text-xs text-slate-500">
                  Using {result.cm} cm · {result.kg} kg
                </li>
              </ul>
            ) : null
          }
        />
      }
    >
      <Field label="Units">
        <Segmented
          value={units}
          onChange={(v) => {
            setUnits(v);
            if (v === "metric") {
              setHeight("170");
              setWeight("70");
            } else {
              setHeight("67");
              setWeight("154");
            }
          }}
          options={[
            { value: "metric", label: "cm / kg" },
            { value: "imperial", label: "in / lb" },
          ]}
        />
      </Field>
      <Field label="Formula (primary result)">
        <Segmented
          value={formula}
          onChange={setFormula}
          options={[
            { value: "mosteller", label: "Mosteller" },
            { value: "dubois", label: "DuBois" },
            { value: "haycock", label: "Haycock" },
            { value: "gehan", label: "Gehan" },
          ]}
        />
      </Field>
      <Field label={units === "metric" ? "Height (cm)" : "Height (in)"}>
        <NumberInput
          min={1}
          step={0.1}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Field>
      <Field label={units === "metric" ? "Weight (kg)" : "Weight (lb)"}>
        <NumberInput
          min={0.1}
          step={0.1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setUnits("metric");
          setFormula("mosteller");
          setHeight("170");
          setWeight("70");
        }}
      />
    </CalcLayout>
  );
}

export function IbwCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("70");

  const result = useMemo(() => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0)
      return null;
    const inches = h / 2.54;
    const ibw =
      sex === "male"
        ? 50 + 2.3 * (inches - 60)
        : 45.5 + 2.3 * (inches - 60);
    const adj = ibw + 0.4 * (w - ibw);
    const lean =
      sex === "male" ? 1.1 * w - 128 * (w / h) ** 2 : 1.07 * w - 148 * (w / h) ** 2;
    return {
      ibw: round(ibw, 1),
      adj: round(adj, 1),
      lean: round(lean, 1),
      pctIdeal: round((w / ibw) * 100, 0),
    };
  }, [heightCm, sex, weightKg]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.ibw} kg` : "—"}
          secondary={
            result
              ? `AdjBW ${result.adj} kg · ${result.pctIdeal}% of IBW`
              : "Devine ideal body weight"
          }
          detail={
            result ? (
              <p>Estimated LBW (Boer): {result.lean} kg</p>
            ) : null
          }
        />
      }
    >
      <Field label="Sex">
        <Segmented
          value={sex}
          onChange={setSex}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
      </Field>
      <Field label="Height (cm)">
        <NumberInput
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
        />
      </Field>
      <Field label="Actual body weight (kg)">
        <NumberInput
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setSex("male");
          setHeightCm("175");
          setWeightKg("70");
        }}
      />
    </CalcLayout>
  );
}
