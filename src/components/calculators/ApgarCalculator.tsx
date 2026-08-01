"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  ResetButton,
  ResultPanel,
  Segmented,
} from "@/components/calc/fields";

type Score = 0 | 1 | 2;

export function ApgarCalculator() {
  const [appearance, setAppearance] = useState<Score>(2);
  const [pulse, setPulse] = useState<Score>(2);
  const [grimace, setGrimace] = useState<Score>(2);
  const [activity, setActivity] = useState<Score>(2);
  const [respiration, setRespiration] = useState<Score>(2);

  const result = useMemo(() => {
    const total = appearance + pulse + grimace + activity + respiration;
    let interpretation = "Reassuring";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (total <= 3) {
      interpretation = "Critically low — immediate resuscitation";
      tone = "critical";
    } else if (total <= 6) {
      interpretation = "Moderately abnormal — support needed";
      tone = "warn";
    }
    return { total, interpretation, tone };
  }, [activity, appearance, grimace, pulse, respiration]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.total} / 10`}
          secondary={result.interpretation}
          tone={result.tone}
          detail="Assign at 1 and 5 minutes (and further intervals if low)."
        />
      }
    >
      <Field label="Appearance (color)">
        <Segmented
          value={appearance}
          onChange={setAppearance}
          options={[
            { value: 2, label: "2 Pink" },
            { value: 1, label: "1 Acrocyanosis" },
            { value: 0, label: "0 Blue/pale" },
          ]}
        />
      </Field>
      <Field label="Pulse (heart rate)">
        <Segmented
          value={pulse}
          onChange={setPulse}
          options={[
            { value: 2, label: "2 ≥100" },
            { value: 1, label: "1 <100" },
            { value: 0, label: "0 Absent" },
          ]}
        />
      </Field>
      <Field label="Grimace (reflex)">
        <Segmented
          value={grimace}
          onChange={setGrimace}
          options={[
            { value: 2, label: "2 Cry/active" },
            { value: 1, label: "1 Grimace" },
            { value: 0, label: "0 None" },
          ]}
        />
      </Field>
      <Field label="Activity (tone)">
        <Segmented
          value={activity}
          onChange={setActivity}
          options={[
            { value: 2, label: "2 Active" },
            { value: 1, label: "1 Some flexion" },
            { value: 0, label: "0 Limp" },
          ]}
        />
      </Field>
      <Field label="Respiration">
        <Segmented
          value={respiration}
          onChange={setRespiration}
          options={[
            { value: 2, label: "2 Strong cry" },
            { value: 1, label: "1 Weak/irregular" },
            { value: 0, label: "0 Absent" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setAppearance(2);
          setPulse(2);
          setGrimace(2);
          setActivity(2);
          setRespiration(2);
        }}
      />
    </CalcLayout>
  );
}
