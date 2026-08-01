"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  ResetButton,
  ResultPanel,
  Segmented,
} from "@/components/calc/fields";

export function GcsCalculator() {
  const [eye, setEye] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motor, setMotor] = useState(6);

  const result = useMemo(() => {
    const total = eye + verbal + motor;
    let severity = "Mild";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (total <= 8) {
      severity = "Severe";
      tone = "critical";
    } else if (total <= 12) {
      severity = "Moderate";
      tone = "warn";
    }
    return {
      total,
      severity,
      tone,
      breakdown: `E${eye} V${verbal} M${motor}`,
    };
  }, [eye, motor, verbal]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.total} / 15`}
          secondary={`${result.severity} · ${result.breakdown}`}
          tone={result.tone}
          detail="Standard adult Glasgow Coma Scale. Document best response."
        />
      }
    >
      <Field label="Eye opening">
        <Segmented
          value={eye}
          onChange={setEye}
          options={[
            { value: 4, label: "4 Spontaneous" },
            { value: 3, label: "3 To speech" },
            { value: 2, label: "2 To pain" },
            { value: 1, label: "1 None" },
          ]}
        />
      </Field>
      <Field label="Verbal response">
        <Segmented
          value={verbal}
          onChange={setVerbal}
          options={[
            { value: 5, label: "5 Oriented" },
            { value: 4, label: "4 Confused" },
            { value: 3, label: "3 Words" },
            { value: 2, label: "2 Sounds" },
            { value: 1, label: "1 None" },
          ]}
        />
      </Field>
      <Field label="Motor response">
        <Segmented
          value={motor}
          onChange={setMotor}
          options={[
            { value: 6, label: "6 Obeys" },
            { value: 5, label: "5 Localizes" },
            { value: 4, label: "4 Withdraws" },
            { value: 3, label: "3 Flexion" },
            { value: 2, label: "2 Extension" },
            { value: 1, label: "1 None" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setEye(4);
          setVerbal(5);
          setMotor(6);
        }}
      />
    </CalcLayout>
  );
}
