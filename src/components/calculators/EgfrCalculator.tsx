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

/** CKD-EPI 2021 creatinine equation (race-free). */
export function EgfrCalculator() {
  const [sex, setSex] = useState<"female" | "male">("female");
  const [age, setAge] = useState("55");
  const [creatinine, setCreatinine] = useState("1.0");

  const result = useMemo(() => {
    const a = Number(age);
    const scr = Number(creatinine);
    if (!Number.isFinite(a) || a <= 0 || a > 120) return null;
    if (!Number.isFinite(scr) || scr <= 0) return null;

    const kappa = sex === "female" ? 0.7 : 0.9;
    const alpha = sex === "female" ? -0.241 : -0.302;
    const sexFactor = sex === "female" ? 1.012 : 1;
    const ratio = scr / kappa;
    const egfr =
      142 *
      Math.min(ratio, 1) ** alpha *
      Math.max(ratio, 1) ** -1.2 *
      0.9938 ** a *
      sexFactor;

    const value = round(egfr, 0);
    let stage = "G1 (normal or high)";
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (value < 15) {
      stage = "G5 (kidney failure)";
      tone = "critical";
    } else if (value < 30) {
      stage = "G4 (severely decreased)";
      tone = "critical";
    } else if (value < 45) {
      stage = "G3b (moderately to severely decreased)";
      tone = "warn";
    } else if (value < 60) {
      stage = "G3a (mildly to moderately decreased)";
      tone = "warn";
    } else if (value < 90) {
      stage = "G2 (mildly decreased)";
      tone = "neutral";
    }

    return { value, stage, tone };
  }, [age, creatinine, sex]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.value} mL/min/1.73 m²` : "—"}
          secondary={result?.stage}
          tone={result?.tone ?? "neutral"}
          detail="CKD-EPI 2021 creatinine equation (race-free)."
        />
      }
    >
      <Field label="Sex">
        <Segmented
          value={sex}
          onChange={setSex}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        />
      </Field>
      <Field label="Age (years)">
        <NumberInput
          min={1}
          max={120}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Field>
      <Field label="Serum creatinine (mg/dL)" hint="Convert µmol/L ÷ 88.4">
        <NumberInput
          min={0.1}
          step={0.01}
          value={creatinine}
          onChange={(e) => setCreatinine(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setSex("female");
          setAge("55");
          setCreatinine("1.0");
        }}
      />
    </CalcLayout>
  );
}
