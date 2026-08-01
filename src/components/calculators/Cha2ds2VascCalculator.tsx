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

export function Cha2ds2VascCalculator() {
  const [chf, setChf] = useState<YN>(0);
  const [htn, setHtn] = useState<YN>(0);
  const [age, setAge] = useState<0 | 1 | 2>(0);
  const [diabetes, setDiabetes] = useState<YN>(0);
  const [stroke, setStroke] = useState<0 | 2>(0);
  const [vascular, setVascular] = useState<YN>(0);
  const [sex, setSex] = useState<YN>(0);

  const result = useMemo(() => {
    const score = chf + htn + age + diabetes + stroke + vascular + sex;
    let risk = "Low annual stroke risk";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score === 0) {
      risk = "Low risk — anticoagulation generally not indicated";
      tone = "ok";
    } else if (score === 1) {
      risk = "Intermediate — consider anticoagulation (especially men)";
      tone = "warn";
    } else {
      risk = "Elevated risk — anticoagulation generally recommended";
      tone = "critical";
    }
    return { score, risk, tone };
  }, [age, chf, diabetes, htn, sex, stroke, vascular]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.risk}
          tone={result.tone}
          detail="CHA₂DS₂-VASc for nonvalvular AF stroke risk. Pair with bleeding risk assessment."
        />
      }
    >
      <Field label="Congestive heart failure">
        <Segmented value={chf} onChange={setChf} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Hypertension">
        <Segmented value={htn} onChange={setHtn} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Age">
        <Segmented
          value={age}
          onChange={setAge}
          options={[
            { value: 2, label: "≥75 (+2)" },
            { value: 1, label: "65–74 (+1)" },
            { value: 0, label: "<65 (0)" },
          ]}
        />
      </Field>
      <Field label="Diabetes mellitus">
        <Segmented value={diabetes} onChange={setDiabetes} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Prior stroke / TIA / thromboembolism">
        <Segmented value={stroke} onChange={setStroke} options={[{ value: 2, label: "Yes (+2)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Vascular disease (MI, PAD, aortic plaque)">
        <Segmented value={vascular} onChange={setVascular} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Sex category">
        <Segmented value={sex} onChange={setSex} options={[{ value: 1, label: "Female (+1)" }, { value: 0, label: "Male (0)" }]} />
      </Field>
      <ResetButton
        onClick={() => {
          setChf(0);
          setHtn(0);
          setAge(0);
          setDiabetes(0);
          setStroke(0);
          setVascular(0);
          setSex(0);
        }}
      />
    </CalcLayout>
  );
}
