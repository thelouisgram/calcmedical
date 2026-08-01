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

export function HasBledCalculator() {
  const [htn, setHtn] = useState<YN>(0);
  const [renal, setRenal] = useState<YN>(0);
  const [liver, setLiver] = useState<YN>(0);
  const [stroke, setStroke] = useState<YN>(0);
  const [bleeding, setBleeding] = useState<YN>(0);
  const [labile, setLabile] = useState<YN>(0);
  const [elderly, setElderly] = useState<YN>(0);
  const [drugs, setDrugs] = useState<YN>(0);
  const [alcohol, setAlcohol] = useState<YN>(0);

  const result = useMemo(() => {
    const score =
      htn + renal + liver + stroke + bleeding + labile + elderly + drugs + alcohol;
    let risk = "Low bleeding risk";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 3) {
      risk = "High bleeding risk — caution with anticoagulation";
      tone = "critical";
    } else if (score === 2) {
      risk = "Moderate bleeding risk";
      tone = "warn";
    }
    return { score, risk, tone };
  }, [alcohol, bleeding, drugs, elderly, htn, labile, liver, renal, stroke]);

  const yn = (v: YN, set: (x: YN) => void) => (
    <Segmented
      value={v}
      onChange={set}
      options={[
        { value: 1, label: "Yes (+1)" },
        { value: 0, label: "No" },
      ]}
    />
  );

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.risk}
          tone={result.tone}
          detail="HAS-BLED estimates major bleeding risk on anticoagulation."
        />
      }
    >
      <Field label="Hypertension (uncontrolled, SBP >160)">{yn(htn, setHtn)}</Field>
      <Field label="Abnormal renal function">{yn(renal, setRenal)}</Field>
      <Field label="Abnormal liver function">{yn(liver, setLiver)}</Field>
      <Field label="Stroke history">{yn(stroke, setStroke)}</Field>
      <Field label="Bleeding history or predisposition">{yn(bleeding, setBleeding)}</Field>
      <Field label="Labile INR">{yn(labile, setLabile)}</Field>
      <Field label="Elderly (age >65)">{yn(elderly, setElderly)}</Field>
      <Field label="Drugs (antiplatelet / NSAID)">{yn(drugs, setDrugs)}</Field>
      <Field label="Alcohol excess">{yn(alcohol, setAlcohol)}</Field>
      <ResetButton
        onClick={() => {
          setHtn(0);
          setRenal(0);
          setLiver(0);
          setStroke(0);
          setBleeding(0);
          setLabile(0);
          setElderly(0);
          setDrugs(0);
          setAlcohol(0);
        }}
      />
    </CalcLayout>
  );
}
