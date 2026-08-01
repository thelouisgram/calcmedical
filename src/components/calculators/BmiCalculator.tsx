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

export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const result = useMemo(() => {
    const w = Number(weight);
    const h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0)
      return null;

    let bmi: number;
    if (unit === "metric") {
      bmi = w / (h / 100) ** 2;
    } else {
      bmi = (703 * w) / h ** 2;
    }
    bmi = round(bmi, 1);

    let category = "Healthy weight";
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (bmi < 18.5) {
      category = "Underweight";
      tone = "warn";
    } else if (bmi < 25) {
      category = "Healthy weight";
      tone = "ok";
    } else if (bmi < 30) {
      category = "Overweight";
      tone = "warn";
    } else {
      category = "Obesity";
      tone = "critical";
    }

    return { bmi, category, tone };
  }, [height, unit, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? String(result.bmi) : "—"}
          secondary={result?.category}
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="Units">
        <Segmented
          value={unit}
          onChange={setUnit}
          options={[
            { value: "metric", label: "kg / cm" },
            { value: "imperial", label: "lb / in" },
          ]}
        />
      </Field>
      <Field label={unit === "metric" ? "Weight (kg)" : "Weight (lb)"}>
        <NumberInput
          min={1}
          step={0.1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <Field label={unit === "metric" ? "Height (cm)" : "Height (in)"}>
        <NumberInput
          min={1}
          step={0.1}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setUnit("metric");
          setWeight("70");
          setHeight("170");
        }}
      />
    </CalcLayout>
  );
}
