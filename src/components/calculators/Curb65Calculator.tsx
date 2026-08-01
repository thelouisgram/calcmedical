"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  ResetButton,
  ResultPanel,
  Segmented,
} from "@/components/calc/fields";

type YN = 0 | 1;

export function Curb65Calculator() {
  const [confusion, setConfusion] = useState<YN>(0);
  const [urea, setUrea] = useState<YN>(0);
  const [rr, setRr] = useState<YN>(0);
  const [bp, setBp] = useState<YN>(0);
  const [age, setAge] = useState<YN>(0);

  const result = useMemo(() => {
    const score = confusion + urea + rr + bp + age;
    let advice = "Consider outpatient treatment";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 3) {
      advice = "High severity — consider ICU / urgent admission";
      tone = "critical";
    } else if (score === 2) {
      advice = "Moderate — consider short inpatient / supervised care";
      tone = "warn";
    } else if (score === 1) {
      advice = "Low-moderate — consider hospital-based care options";
      tone = "warn";
    }
    return { score, advice, tone };
  }, [age, bp, confusion, rr, urea]);

  const yn = (v: YN, set: (x: YN) => void, yesLabel: string) => (
    <Segmented
      value={v}
      onChange={set}
      options={[
        { value: 1, label: yesLabel },
        { value: 0, label: "No" },
      ]}
    />
  );

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score} / 5`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="Confusion (new)">{yn(confusion, setConfusion, "Yes (+1)")}</Field>
      <Field label="Urea >7 mmol/L (BUN >19 mg/dL)">
        {yn(urea, setUrea, "Yes (+1)")}
      </Field>
      <Field label="Respiratory rate ≥30">{yn(rr, setRr, "Yes (+1)")}</Field>
      <Field label="BP: SBP <90 or DBP ≤60">{yn(bp, setBp, "Yes (+1)")}</Field>
      <Field label="Age ≥65">{yn(age, setAge, "Yes (+1)")}</Field>
      <ResetButton
        onClick={() => {
          setConfusion(0);
          setUrea(0);
          setRr(0);
          setBp(0);
          setAge(0);
        }}
      />
    </CalcLayout>
  );
}
