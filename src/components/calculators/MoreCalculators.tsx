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

type YN = 0 | 1;

export function WellsPeCalculator() {
  const [dvt, setDvt] = useState<0 | 3>(0);
  const [alt, setAlt] = useState<0 | 3>(0);
  const [hr, setHr] = useState<0 | 1.5>(0);
  const [immob, setImmob] = useState<0 | 1.5>(0);
  const [prior, setPrior] = useState<0 | 1.5>(0);
  const [hemoptysis, setHemoptysis] = useState<YN>(0);
  const [malignancy, setMalignancy] = useState<YN>(0);

  const result = useMemo(() => {
    const score = dvt + alt + hr + immob + prior + hemoptysis + malignancy;
    let risk = "Low probability";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score > 6) {
      risk = "High probability";
      tone = "critical";
    } else if (score >= 2) {
      risk = "Moderate probability";
      tone = "warn";
    }
    return { score, risk, tone };
  }, [alt, dvt, hemoptysis, hr, immob, malignancy, prior]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.risk}
          tone={result.tone}
          detail="Wells score for pulmonary embolism (traditional cutoffs)."
        />
      }
    >
      <Field label="Clinical signs of DVT">
        <Segmented value={dvt} onChange={setDvt} options={[{ value: 3, label: "Yes (+3)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="PE is #1 diagnosis or equally likely">
        <Segmented value={alt} onChange={setAlt} options={[{ value: 3, label: "Yes (+3)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Heart rate >100">
        <Segmented value={hr} onChange={setHr} options={[{ value: 1.5, label: "Yes (+1.5)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Immobilization ≥3 days or surgery in 4 weeks">
        <Segmented value={immob} onChange={setImmob} options={[{ value: 1.5, label: "Yes (+1.5)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Previous DVT/PE">
        <Segmented value={prior} onChange={setPrior} options={[{ value: 1.5, label: "Yes (+1.5)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Hemoptysis">
        <Segmented value={hemoptysis} onChange={setHemoptysis} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Malignancy (treatment within 6 months / palliative)">
        <Segmented value={malignancy} onChange={setMalignancy} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <ResetButton
        onClick={() => {
          setDvt(0);
          setAlt(0);
          setHr(0);
          setImmob(0);
          setPrior(0);
          setHemoptysis(0);
          setMalignancy(0);
        }}
      />
    </CalcLayout>
  );
}

export function QsofaCalculator() {
  const [rr, setRr] = useState<YN>(0);
  const [sbp, setSbp] = useState<YN>(0);
  const [ams, setAms] = useState<YN>(0);

  const result = useMemo(() => {
    const score = rr + sbp + ams;
    let advice = "qSOFA negative";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 2) {
      advice = "qSOFA ≥2 — higher risk of poor outcome; evaluate for sepsis";
      tone = "critical";
    } else if (score === 1) {
      advice = "Monitor closely";
      tone = "warn";
    }
    return { score, advice, tone };
  }, [ams, rr, sbp]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score} / 3`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="Respiratory rate ≥22">
        <Segmented value={rr} onChange={setRr} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="SBP ≤100 mmHg">
        <Segmented value={sbp} onChange={setSbp} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Altered mentation">
        <Segmented value={ams} onChange={setAms} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <ResetButton
        onClick={() => {
          setRr(0);
          setSbp(0);
          setAms(0);
        }}
      />
    </CalcLayout>
  );
}

export function MeldCalculator() {
  const [bili, setBili] = useState("2.0");
  const [inr, setInr] = useState("1.5");
  const [creat, setCreat] = useState("1.2");
  const [dialysis, setDialysis] = useState<"no" | "yes">("no");
  const [na, setNa] = useState("137");

  const result = useMemo(() => {
    let biliN = Math.max(Number(bili), 1);
    let inrN = Math.max(Number(inr), 1);
    let creatN = Math.max(Number(creat), 1);
    const naN = Number(na);
    if (![biliN, inrN, creatN, naN].every(Number.isFinite)) return null;
    if (dialysis === "yes") creatN = 4;
    creatN = Math.min(creatN, 4);

    const meld =
      0.957 * Math.log(creatN) +
      0.378 * Math.log(biliN) +
      1.12 * Math.log(inrN) +
      0.643;
    let score = Math.round(meld * 10);
    score = Math.max(6, Math.min(40, score));

    // MELD-Na adjustment (OPTN-style)
    const sodium = Math.max(125, Math.min(137, naN));
    const meldNa = Math.round(
      score + 1.32 * (137 - sodium) - 0.033 * score * (137 - sodium),
    );
    const finalScore = Math.max(6, Math.min(40, meldNa));

    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (finalScore >= 30) tone = "critical";
    else if (finalScore >= 20) tone = "warn";
    else if (finalScore >= 15) tone = "neutral";

    return { meld: score, meldNa: finalScore, tone };
  }, [bili, creat, dialysis, inr, na]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `MELD-Na ${result.meldNa}` : "—"}
          secondary={result ? `Original MELD ${result.meld}` : undefined}
          tone={result?.tone ?? "neutral"}
          detail="Adult MELD / MELD-Na for liver transplant prioritization context."
        />
      }
    >
      <Field label="Bilirubin (mg/dL)">
        <NumberInput step={0.1} value={bili} onChange={(e) => setBili(e.target.value)} />
      </Field>
      <Field label="INR">
        <NumberInput step={0.1} value={inr} onChange={(e) => setInr(e.target.value)} />
      </Field>
      <Field label="Creatinine (mg/dL)">
        <NumberInput step={0.1} value={creat} onChange={(e) => setCreat(e.target.value)} />
      </Field>
      <Field label="Dialysis ≥2× in past week">
        <Segmented
          value={dialysis}
          onChange={setDialysis}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </Field>
      <Field label="Sodium (mEq/L)">
        <NumberInput value={na} onChange={(e) => setNa(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setBili("2.0");
          setInr("1.5");
          setCreat("1.2");
          setDialysis("no");
          setNa("137");
        }}
      />
    </CalcLayout>
  );
}

export function ChildPughCalculator() {
  const [bili, setBili] = useState<1 | 2 | 3>(1);
  const [albumin, setAlbumin] = useState<1 | 2 | 3>(1);
  const [inr, setInr] = useState<1 | 2 | 3>(1);
  const [ascites, setAscites] = useState<1 | 2 | 3>(1);
  const [enceph, setEnceph] = useState<1 | 2 | 3>(1);

  const result = useMemo(() => {
    const score = bili + albumin + inr + ascites + enceph;
    let grade = "A";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 10) {
      grade = "C";
      tone = "critical";
    } else if (score >= 7) {
      grade = "B";
      tone = "warn";
    }
    return { score, grade, tone };
  }, [albumin, ascites, bili, enceph, inr]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`Class ${result.grade}`}
          secondary={`Score ${result.score} / 15`}
          tone={result.tone}
        />
      }
    >
      <Field label="Bilirubin">
        <Segmented
          value={bili}
          onChange={setBili}
          options={[
            { value: 1, label: "<2 (+1)" },
            { value: 2, label: "2–3 (+2)" },
            { value: 3, label: ">3 (+3)" },
          ]}
        />
      </Field>
      <Field label="Albumin (g/dL)">
        <Segmented
          value={albumin}
          onChange={setAlbumin}
          options={[
            { value: 1, label: ">3.5 (+1)" },
            { value: 2, label: "2.8–3.5 (+2)" },
            { value: 3, label: "<2.8 (+3)" },
          ]}
        />
      </Field>
      <Field label="INR">
        <Segmented
          value={inr}
          onChange={setInr}
          options={[
            { value: 1, label: "<1.7 (+1)" },
            { value: 2, label: "1.7–2.3 (+2)" },
            { value: 3, label: ">2.3 (+3)" },
          ]}
        />
      </Field>
      <Field label="Ascites">
        <Segmented
          value={ascites}
          onChange={setAscites}
          options={[
            { value: 1, label: "None (+1)" },
            { value: 2, label: "Mild (+2)" },
            { value: 3, label: "Moderate (+3)" },
          ]}
        />
      </Field>
      <Field label="Encephalopathy">
        <Segmented
          value={enceph}
          onChange={setEnceph}
          options={[
            { value: 1, label: "None (+1)" },
            { value: 2, label: "Grade 1–2 (+2)" },
            { value: 3, label: "Grade 3–4 (+3)" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setBili(1);
          setAlbumin(1);
          setInr(1);
          setAscites(1);
          setEnceph(1);
        }}
      />
    </CalcLayout>
  );
}

export function CorrectedCalciumCalculator() {
  const [ca, setCa] = useState("8.5");
  const [albumin, setAlbumin] = useState("3.0");

  const result = useMemo(() => {
    const c = Number(ca);
    const a = Number(albumin);
    if (!Number.isFinite(c) || !Number.isFinite(a)) return null;
    const corrected = round(c + 0.8 * (4 - a), 2);
    return { corrected };
  }, [albumin, ca]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.corrected} mg/dL` : "—"}
          secondary="Corrected Ca = measured + 0.8×(4 − albumin)"
        />
      }
    >
      <Field label="Measured calcium (mg/dL)">
        <NumberInput step={0.1} value={ca} onChange={(e) => setCa(e.target.value)} />
      </Field>
      <Field label="Albumin (g/dL)">
        <NumberInput step={0.1} value={albumin} onChange={(e) => setAlbumin(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setCa("8.5");
          setAlbumin("3.0");
        }}
      />
    </CalcLayout>
  );
}

export function AlvaradoCalculator() {
  const [migration, setMigration] = useState<YN>(0);
  const [anorexia, setAnorexia] = useState<YN>(0);
  const [nausea, setNausea] = useState<YN>(0);
  const [tender, setTender] = useState<0 | 2>(0);
  const [rebound, setRebound] = useState<YN>(0);
  const [fever, setFever] = useState<YN>(0);
  const [leukocytosis, setLeukocytosis] = useState<0 | 2>(0);
  const [leftShift, setLeftShift] = useState<YN>(0);

  const result = useMemo(() => {
    const score =
      migration +
      anorexia +
      nausea +
      tender +
      rebound +
      fever +
      leukocytosis +
      leftShift;
    let advice = "Appendicitis unlikely";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 7) {
      advice = "High probability — surgical evaluation";
      tone = "critical";
    } else if (score >= 5) {
      advice = "Possible — observe / image";
      tone = "warn";
    }
    return { score, advice, tone };
  }, [
    anorexia,
    fever,
    leftShift,
    leukocytosis,
    migration,
    nausea,
    rebound,
    tender,
  ]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score} / 10`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="Migration of pain to RLQ">
        <Segmented value={migration} onChange={setMigration} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Anorexia">
        <Segmented value={anorexia} onChange={setAnorexia} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Nausea / vomiting">
        <Segmented value={nausea} onChange={setNausea} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="RLQ tenderness">
        <Segmented value={tender} onChange={setTender} options={[{ value: 2, label: "Yes (+2)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Rebound tenderness">
        <Segmented value={rebound} onChange={setRebound} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Fever ≥37.3°C">
        <Segmented value={fever} onChange={setFever} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Leukocytosis (WBC >10)">
        <Segmented value={leukocytosis} onChange={setLeukocytosis} options={[{ value: 2, label: "Yes (+2)" }, { value: 0, label: "No" }]} />
      </Field>
      <Field label="Left shift (neutrophilia)">
        <Segmented value={leftShift} onChange={setLeftShift} options={[{ value: 1, label: "Yes (+1)" }, { value: 0, label: "No" }]} />
      </Field>
      <ResetButton
        onClick={() => {
          setMigration(0);
          setAnorexia(0);
          setNausea(0);
          setTender(0);
          setRebound(0);
          setFever(0);
          setLeukocytosis(0);
          setLeftShift(0);
        }}
      />
    </CalcLayout>
  );
}

export function HeartScoreCalculator() {
  const [history, setHistory] = useState<0 | 1 | 2>(0);
  const [ecg, setEcg] = useState<0 | 1 | 2>(0);
  const [age, setAge] = useState<0 | 1 | 2>(0);
  const [risk, setRisk] = useState<0 | 1 | 2>(0);
  const [troponin, setTroponin] = useState<0 | 1 | 2>(0);

  const result = useMemo(() => {
    const score = history + ecg + age + risk + troponin;
    let advice = "Low risk (0–3) — short-term MACE ~0.9–1.7%";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 7) {
      advice = "High risk (7–10) — early invasive strategy";
      tone = "critical";
    } else if (score >= 4) {
      advice = "Moderate risk (4–6) — admit / observe";
      tone = "warn";
    }
    return { score, advice, tone };
  }, [age, ecg, history, risk, troponin]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score} / 10`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="History">
        <Segmented
          value={history}
          onChange={setHistory}
          options={[
            { value: 2, label: "Highly suspicious (+2)" },
            { value: 1, label: "Moderately (+1)" },
            { value: 0, label: "Slightly (0)" },
          ]}
        />
      </Field>
      <Field label="ECG">
        <Segmented
          value={ecg}
          onChange={setEcg}
          options={[
            { value: 2, label: "Significant ST deviation (+2)" },
            { value: 1, label: "Nonspecific repolarization (+1)" },
            { value: 0, label: "Normal (0)" },
          ]}
        />
      </Field>
      <Field label="Age">
        <Segmented
          value={age}
          onChange={setAge}
          options={[
            { value: 2, label: "≥65 (+2)" },
            { value: 1, label: "45–64 (+1)" },
            { value: 0, label: "<45 (0)" },
          ]}
        />
      </Field>
      <Field label="Risk factors (≥3 HTN/HL/DM/obesity/smoking/FH/atherosclerosis = 2; 1–2 = 1)">
        <Segmented
          value={risk}
          onChange={setRisk}
          options={[
            { value: 2, label: "≥3 or known athero (+2)" },
            { value: 1, label: "1–2 (+1)" },
            { value: 0, label: "None (0)" },
          ]}
        />
      </Field>
      <Field label="Troponin">
        <Segmented
          value={troponin}
          onChange={setTroponin}
          options={[
            { value: 2, label: "≥3× normal (+2)" },
            { value: 1, label: "1–3× normal (+1)" },
            { value: 0, label: "≤normal (0)" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setHistory(0);
          setEcg(0);
          setAge(0);
          setRisk(0);
          setTroponin(0);
        }}
      />
    </CalcLayout>
  );
}
