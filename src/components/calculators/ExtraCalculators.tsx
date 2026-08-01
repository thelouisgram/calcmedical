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

export function CockcroftGaultCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("65");
  const [weight, setWeight] = useState("70");
  const [creat, setCreat] = useState("1.0");

  const result = useMemo(() => {
    const a = Number(age);
    const w = Number(weight);
    const c = Number(creat);
    if (![a, w, c].every(Number.isFinite) || a <= 0 || w <= 0 || c <= 0)
      return null;
    let crcl = ((140 - a) * w) / (72 * c);
    if (sex === "female") crcl *= 0.85;
    return { crcl: round(crcl, 0) };
  }, [age, creat, sex, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.crcl} mL/min` : "—"}
          secondary="Cockcroft–Gault creatinine clearance"
          detail="Often used for drug dosing when the label specifies CrCl. Prefer eGFR for CKD staging."
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
      <Field label="Age (years)">
        <NumberInput value={age} onChange={(e) => setAge(e.target.value)} />
      </Field>
      <Field label="Weight (kg)" hint="Use IBW or AdjBW per drug monograph">
        <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>
      <Field label="Serum creatinine (mg/dL)">
        <NumberInput
          step={0.01}
          value={creat}
          onChange={(e) => setCreat(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setSex("male");
          setAge("65");
          setWeight("70");
          setCreat("1.0");
        }}
      />
    </CalcLayout>
  );
}

export function CorrectedSodiumCalculator() {
  const [na, setNa] = useState("130");
  const [glucose, setGlucose] = useState("300");
  const [factor, setFactor] = useState<"1.6" | "2.4">("1.6");

  const result = useMemo(() => {
    const n = Number(na);
    const g = Number(glucose);
    const f = Number(factor);
    if (![n, g, f].every(Number.isFinite)) return null;
    const corrected = round(n + f * ((g - 100) / 100), 1);
    return { corrected };
  }, [factor, glucose, na]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.corrected} mEq/L` : "—"}
          secondary={`Corrected for glucose (factor ${factor})`}
          detail="Corrected Na ≈ measured Na + factor × (glucose − 100) / 100."
        />
      }
    >
      <Field label="Measured sodium (mEq/L)">
        <NumberInput value={na} onChange={(e) => setNa(e.target.value)} />
      </Field>
      <Field label="Glucose (mg/dL)">
        <NumberInput
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
        />
      </Field>
      <Field label="Correction factor">
        <Segmented
          value={factor}
          onChange={setFactor}
          options={[
            { value: "1.6", label: "1.6 (Katz)" },
            { value: "2.4", label: "2.4 (Hillier)" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setNa("130");
          setGlucose("300");
          setFactor("1.6");
        }}
      />
    </CalcLayout>
  );
}

export function OsmolalityCalculator() {
  const [na, setNa] = useState("140");
  const [glucose, setGlucose] = useState("100");
  const [bun, setBun] = useState("14");
  const [ethanol, setEthanol] = useState("0");
  const [measured, setMeasured] = useState("");

  const result = useMemo(() => {
    const n = Number(na);
    const g = Number(glucose);
    const b = Number(bun);
    const e = Number(ethanol) || 0;
    if (![n, g, b].every(Number.isFinite)) return null;
    const calculated = round(2 * n + g / 18 + b / 2.8 + e / 4.6, 1);
    const m = Number(measured);
    const gap =
      Number.isFinite(m) && measured !== "" ? round(m - calculated, 1) : null;
    let tone: "ok" | "warn" | "critical" | "neutral" = "neutral";
    if (gap != null) {
      if (gap >= 20) tone = "critical";
      else if (gap >= 10) tone = "warn";
      else tone = "ok";
    }
    return { calculated, gap, tone };
  }, [bun, ethanol, glucose, measured, na]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.calculated} mOsm/kg` : "—"}
          secondary={
            result?.gap != null
              ? `Osmolar gap ${result.gap}`
              : "Calculated serum osmolality"
          }
          tone={result?.tone ?? "neutral"}
          detail="2×Na + glucose/18 + BUN/2.8 (+ ethanol/4.6). Gap = measured − calculated."
        />
      }
    >
      <Field label="Sodium (mEq/L)">
        <NumberInput value={na} onChange={(e) => setNa(e.target.value)} />
      </Field>
      <Field label="Glucose (mg/dL)">
        <NumberInput
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
        />
      </Field>
      <Field label="BUN (mg/dL)">
        <NumberInput value={bun} onChange={(e) => setBun(e.target.value)} />
      </Field>
      <Field label="Ethanol (mg/dL)" hint="Optional">
        <NumberInput
          value={ethanol}
          onChange={(e) => setEthanol(e.target.value)}
        />
      </Field>
      <Field label="Measured osmolality (mOsm/kg)" hint="Optional for gap">
        <NumberInput
          value={measured}
          onChange={(e) => setMeasured(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setNa("140");
          setGlucose("100");
          setBun("14");
          setEthanol("0");
          setMeasured("");
        }}
      />
    </CalcLayout>
  );
}

export function FenaCalculator() {
  const [una, setUna] = useState("40");
  const [pna, setPna] = useState("140");
  const [ucr, setUcr] = useState("50");
  const [pcr, setPcr] = useState("2.0");

  const result = useMemo(() => {
    const a = Number(una);
    const b = Number(pna);
    const c = Number(ucr);
    const d = Number(pcr);
    if (![a, b, c, d].every(Number.isFinite) || b === 0 || d === 0) return null;
    const fena = round(((a / b) / (c / d)) * 100, 2);
    let interp = "Indeterminate — interpret clinically";
    let tone: "ok" | "warn" | "critical" | "neutral" = "neutral";
    if (fena < 1) {
      interp = "Often suggests prerenal physiology (if oliguric AKI)";
      tone = "warn";
    } else if (fena > 2) {
      interp = "Often suggests intrinsic renal / ATN pattern";
      tone = "critical";
    }
    return { fena, interp, tone };
  }, [pcr, pna, ucr, una]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.fena}%` : "—"}
          secondary={result?.interp}
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="Urine Na (mEq/L)">
        <NumberInput value={una} onChange={(e) => setUna(e.target.value)} />
      </Field>
      <Field label="Plasma Na (mEq/L)">
        <NumberInput value={pna} onChange={(e) => setPna(e.target.value)} />
      </Field>
      <Field label="Urine creatinine (mg/dL)">
        <NumberInput value={ucr} onChange={(e) => setUcr(e.target.value)} />
      </Field>
      <Field label="Plasma creatinine (mg/dL)">
        <NumberInput value={pcr} onChange={(e) => setPcr(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setUna("40");
          setPna("140");
          setUcr("50");
          setPcr("2.0");
        }}
      />
    </CalcLayout>
  );
}

export function MaintenanceFluidsCalculator() {
  const [weight, setWeight] = useState("20");

  const result = useMemo(() => {
    const w = Number(weight);
    if (!Number.isFinite(w) || w <= 0) return null;
    let hourly: number;
    if (w <= 10) hourly = 4 * w;
    else if (w <= 20) hourly = 40 + 2 * (w - 10);
    else hourly = 60 + 1 * (w - 20);
    const daily = hourly * 24;
    return { hourly: round(hourly, 0), daily: round(daily, 0) };
  }, [weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.hourly} mL/h` : "—"}
          secondary={result ? `${result.daily} mL/day` : "Holiday–Segar / 4-2-1"}
          detail="4 mL/kg/h for first 10 kg, 2 for next 10 kg, 1 thereafter. Maintenance estimate only."
        />
      }
    >
      <Field label="Weight (kg)">
        <NumberInput
          step={0.1}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Field>
      <ResetButton onClick={() => setWeight("20")} />
    </CalcLayout>
  );
}

export function AncCalculator() {
  const [wbc, setWbc] = useState("5.0");
  const [neutrophils, setNeutrophils] = useState("60");
  const [bands, setBands] = useState("0");
  const [unit, setUnit] = useState<"percent" | "fraction">("percent");

  const result = useMemo(() => {
    const w = Number(wbc);
    let n = Number(neutrophils);
    let b = Number(bands) || 0;
    if (!Number.isFinite(w) || !Number.isFinite(n) || w < 0) return null;
    if (unit === "percent") {
      n /= 100;
      b /= 100;
    }
    const anc = round(w * (n + b) * 1000, 0);
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    let label = "Normal / not neutropenic";
    if (anc < 500) {
      tone = "critical";
      label = "Severe neutropenia";
    } else if (anc < 1000) {
      tone = "critical";
      label = "Moderate neutropenia";
    } else if (anc < 1500) {
      tone = "warn";
      label = "Mild neutropenia";
    }
    return { anc, tone, label };
  }, [bands, neutrophils, unit, wbc]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.anc.toLocaleString()} /µL` : "—"}
          secondary={result?.label}
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="WBC (×10³/µL)">
        <NumberInput
          step={0.1}
          value={wbc}
          onChange={(e) => setWbc(e.target.value)}
        />
      </Field>
      <Field label="Neutrophil / band input">
        <Segmented
          value={unit}
          onChange={setUnit}
          options={[
            { value: "percent", label: "Percent" },
            { value: "fraction", label: "Fraction (0–1)" },
          ]}
        />
      </Field>
      <Field
        label={
          unit === "percent" ? "Neutrophils (%)" : "Neutrophils (fraction)"
        }
      >
        <NumberInput
          step={0.1}
          value={neutrophils}
          onChange={(e) => setNeutrophils(e.target.value)}
        />
      </Field>
      <Field label={unit === "percent" ? "Bands (%)" : "Bands (fraction)"}>
        <NumberInput
          step={0.1}
          value={bands}
          onChange={(e) => setBands(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setWbc("5.0");
          setNeutrophils("60");
          setBands("0");
          setUnit("percent");
        }}
      />
    </CalcLayout>
  );
}

export function PercCalculator() {
  const [age50, setAge50] = useState<YN>(0);
  const [hr100, setHr100] = useState<YN>(0);
  const [o2, setO2] = useState<YN>(0);
  const [leg, setLeg] = useState<YN>(0);
  const [hemoptysis, setHemoptysis] = useState<YN>(0);
  const [hormone, setHormone] = useState<YN>(0);
  const [surgery, setSurgery] = useState<YN>(0);
  const [prior, setPrior] = useState<YN>(0);

  const result = useMemo(() => {
    const positives =
      age50 + hr100 + o2 + leg + hemoptysis + hormone + surgery + prior;
    const passes = positives === 0;
    return {
      positives,
      passes,
      tone: passes ? ("ok" as const) : ("warn" as const),
      text: passes
        ? "PERC negative — PE unlikely if pretest probability is low"
        : "PERC positive — do not use to rule out PE",
    };
  }, [age50, hemoptysis, hormone, hr100, leg, o2, prior, surgery]);

  const yn = (v: YN, set: (x: YN) => void) => (
    <Segmented
      value={v}
      onChange={set}
      options={[
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ]}
    />
  );

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result.passes ? "Negative" : "Positive"}
          secondary={result.text}
          tone={result.tone}
          detail={`${result.positives} criterion(s) present. Only apply when clinical suspicion is already low.`}
        />
      }
    >
      <Field label="Age ≥50 years">{yn(age50, setAge50)}</Field>
      <Field label="Heart rate ≥100">{yn(hr100, setHr100)}</Field>
      <Field label="O₂ sat on room air <95%">{yn(o2, setO2)}</Field>
      <Field label="Unilateral leg swelling">{yn(leg, setLeg)}</Field>
      <Field label="Hemoptysis">{yn(hemoptysis, setHemoptysis)}</Field>
      <Field label="Recent surgery or trauma (≤4 weeks requiring anesthesia)">
        {yn(surgery, setSurgery)}
      </Field>
      <Field label="Prior PE or DVT">{yn(prior, setPrior)}</Field>
      <Field label="Hormone use (OCP, HRT, estrogen)">{yn(hormone, setHormone)}</Field>
      <ResetButton
        onClick={() => {
          setAge50(0);
          setHr100(0);
          setO2(0);
          setLeg(0);
          setHemoptysis(0);
          setHormone(0);
          setSurgery(0);
          setPrior(0);
        }}
      />
    </CalcLayout>
  );
}

export function TimiUaNstemiCalculator() {
  const [age65, setAge65] = useState<YN>(0);
  const [risk3, setRisk3] = useState<YN>(0);
  const [knownCad, setKnownCad] = useState<YN>(0);
  const [asa, setAsa] = useState<YN>(0);
  const [severeAngina, setSevereAngina] = useState<YN>(0);
  const [st, setSt] = useState<YN>(0);
  const [marker, setMarker] = useState<YN>(0);

  const result = useMemo(() => {
    const score =
      age65 + risk3 + knownCad + asa + severeAngina + st + marker;
    let risk = "Low risk";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 5) {
      risk = "High risk of events";
      tone = "critical";
    } else if (score >= 3) {
      risk = "Intermediate risk";
      tone = "warn";
    }
    return { score, risk, tone };
  }, [age65, asa, knownCad, marker, risk3, severeAngina, st]);

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
          primary={`${result.score} / 7`}
          secondary={result.risk}
          tone={result.tone}
          detail="TIMI risk score for UA/NSTEMI (Antman)."
        />
      }
    >
      <Field label="Age ≥65">{yn(age65, setAge65)}</Field>
      <Field label="≥3 CAD risk factors (HTN, DM, dyslipidemia, smoking, family Hx)">
        {yn(risk3, setRisk3)}
      </Field>
      <Field label="Known CAD (stenosis ≥50%)">{yn(knownCad, setKnownCad)}</Field>
      <Field label="Aspirin use in past 7 days">{yn(asa, setAsa)}</Field>
      <Field label="Severe angina (≥2 episodes in 24h)">
        {yn(severeAngina, setSevereAngina)}
      </Field>
      <Field label="ST deviation ≥0.5 mm">{yn(st, setSt)}</Field>
      <Field label="Positive cardiac marker">{yn(marker, setMarker)}</Field>
      <ResetButton
        onClick={() => {
          setAge65(0);
          setRisk3(0);
          setKnownCad(0);
          setAsa(0);
          setSevereAngina(0);
          setSt(0);
          setMarker(0);
        }}
      />
    </CalcLayout>
  );
}

export function GlasgowBlatchfordCalculator() {
  const [bun, setBun] = useState<0 | 2 | 3 | 4 | 6>(0);
  const [sexHb, setSexHb] = useState<"m" | "f">("m");
  const [hb, setHb] = useState<0 | 1 | 3 | 6>(0);
  const [sbp, setSbp] = useState<0 | 1 | 2 | 3>(0);
  const [hr100, setHr100] = useState<YN>(0);
  const [melena, setMelena] = useState<YN>(0);
  const [syncope, setSyncope] = useState<0 | 2>(0);
  const [liver, setLiver] = useState<0 | 2>(0);
  const [heart, setHeart] = useState<0 | 2>(0);

  const result = useMemo(() => {
    const score =
      bun + hb + sbp + hr100 + melena + syncope + liver + heart;
    let advice = "Low score — consider outpatient management if 0";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score === 0) {
      advice = "Score 0 — very low risk; outpatient pathway often safe";
      tone = "ok";
    } else if (score >= 6) {
      advice = "Higher risk — likely needs intervention / admission";
      tone = "critical";
    } else {
      advice = "Non-zero — typically warrants hospital-based care";
      tone = "warn";
    }
    return { score, advice, tone, sexHb };
  }, [bun, hb, heart, hr100, liver, melena, sbp, sexHb, syncope]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="BUN (mg/dL)">
        <Segmented
          value={bun}
          onChange={setBun}
          options={[
            { value: 0, label: "<18.2 (0)" },
            { value: 2, label: "18.2–22.3 (+2)" },
            { value: 3, label: "22.4–28 (+3)" },
            { value: 4, label: "28.1–70 (+4)" },
            { value: 6, label: ">70 (+6)" },
          ]}
        />
      </Field>
      <Field label="Sex (for hemoglobin banding)">
        <Segmented
          value={sexHb}
          onChange={setSexHb}
          options={[
            { value: "m", label: "Male" },
            { value: "f", label: "Female" },
          ]}
        />
      </Field>
      <Field
        label={
          sexHb === "m"
            ? "Hemoglobin male (g/dL)"
            : "Hemoglobin female (g/dL)"
        }
      >
        <Segmented
          value={hb}
          onChange={setHb}
          options={
            sexHb === "m"
              ? [
                  { value: 0, label: "≥13 (0)" },
                  { value: 1, label: "12–12.9 (+1)" },
                  { value: 3, label: "10–11.9 (+3)" },
                  { value: 6, label: "<10 (+6)" },
                ]
              : [
                  { value: 0, label: "≥12 (0)" },
                  { value: 1, label: "10–11.9 (+1)" },
                  { value: 6, label: "<10 (+6)" },
                ]
          }
        />
      </Field>
      <Field label="Systolic BP (mmHg)">
        <Segmented
          value={sbp}
          onChange={setSbp}
          options={[
            { value: 0, label: "≥110 (0)" },
            { value: 1, label: "100–109 (+1)" },
            { value: 2, label: "90–99 (+2)" },
            { value: 3, label: "<90 (+3)" },
          ]}
        />
      </Field>
      <Field label="Heart rate ≥100">
        <Segmented
          value={hr100}
          onChange={setHr100}
          options={[
            { value: 1, label: "Yes (+1)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Melena present">
        <Segmented
          value={melena}
          onChange={setMelena}
          options={[
            { value: 1, label: "Yes (+1)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Syncope">
        <Segmented
          value={syncope}
          onChange={setSyncope}
          options={[
            { value: 2, label: "Yes (+2)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Hepatic disease">
        <Segmented
          value={liver}
          onChange={setLiver}
          options={[
            { value: 2, label: "Yes (+2)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Cardiac failure">
        <Segmented
          value={heart}
          onChange={setHeart}
          options={[
            { value: 2, label: "Yes (+2)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setBun(0);
          setSexHb("m");
          setHb(0);
          setSbp(0);
          setHr100(0);
          setMelena(0);
          setSyncope(0);
          setLiver(0);
          setHeart(0);
        }}
      />
    </CalcLayout>
  );
}

export function Phq9Calculator() {
  const [scores, setScores] = useState<number[]>(Array(9).fill(0));

  const items = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling/staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly / being fidgety or restless",
    "Thoughts that you would be better off dead, or of hurting yourself",
  ];

  const result = useMemo(() => {
    const total = scores.reduce((a, b) => a + b, 0);
    let severity = "None–minimal";
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (total >= 20) {
      severity = "Severe";
      tone = "critical";
    } else if (total >= 15) {
      severity = "Moderately severe";
      tone = "critical";
    } else if (total >= 10) {
      severity = "Moderate";
      tone = "warn";
    } else if (total >= 5) {
      severity = "Mild";
      tone = "warn";
    }
    return { total, severity, tone };
  }, [scores]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.total} / 27`}
          secondary={result.severity}
          tone={result.tone}
          detail="PHQ-9 over the last 2 weeks. Item 9 positive requires safety assessment."
        />
      }
    >
      {items.map((label, i) => (
        <Field key={label} label={`${i + 1}. ${label}`}>
          <Segmented
            value={scores[i]}
            onChange={(v) =>
              setScores((prev) => {
                const next = [...prev];
                next[i] = v;
                return next;
              })
            }
            options={[
              { value: 0, label: "0 Not at all" },
              { value: 1, label: "1 Several days" },
              { value: 2, label: "2 More than half" },
              { value: 3, label: "3 Nearly every day" },
            ]}
          />
        </Field>
      ))}
      <ResetButton onClick={() => setScores(Array(9).fill(0))} />
    </CalcLayout>
  );
}

export function FreeWaterDeficitCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [na, setNa] = useState("160");
  const [desired, setDesired] = useState("140");

  const result = useMemo(() => {
    const w = Number(weight);
    const n = Number(na);
    const d = Number(desired);
    if (![w, n, d].every(Number.isFinite) || w <= 0 || d <= 0) return null;
    const tbwFrac = sex === "male" ? 0.6 : 0.5;
    const deficit = round(tbwFrac * w * (n / d - 1), 0);
    return { deficit: Math.max(deficit, 0) };
  }, [desired, na, sex, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.deficit} L` : "—"}
          secondary="Free water deficit"
          detail="TBW × (Na/desired Na − 1). Replace slowly; watch sodium change rate."
        />
      }
    >
      <Field label="Sex">
        <Segmented
          value={sex}
          onChange={setSex}
          options={[
            { value: "male", label: "Male (TBW 0.6)" },
            { value: "female", label: "Female (TBW 0.5)" },
          ]}
        />
      </Field>
      <Field label="Weight (kg)">
        <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>
      <Field label="Current Na (mEq/L)">
        <NumberInput value={na} onChange={(e) => setNa(e.target.value)} />
      </Field>
      <Field label="Desired Na (mEq/L)">
        <NumberInput
          value={desired}
          onChange={(e) => setDesired(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setSex("male");
          setWeight("70");
          setNa("160");
          setDesired("140");
        }}
      />
    </CalcLayout>
  );
}

export function AaGradientCalculator() {
  const [fio2, setFio2] = useState("0.21");
  const [patm, setPatm] = useState("760");
  const [pao2, setPao2] = useState("90");
  const [paco2, setPaco2] = useState("40");
  const [rq, setRq] = useState("0.8");
  const [age, setAge] = useState("40");

  const result = useMemo(() => {
    const f = Number(fio2);
    const atm = Number(patm);
    const o2 = Number(pao2);
    const co2 = Number(paco2);
    const r = Number(rq);
    const a = Number(age);
    if (![f, atm, o2, co2, r, a].every(Number.isFinite) || r === 0) return null;
    const PAO2 = f * (atm - 47) - co2 / r;
    const Aa = round(PAO2 - o2, 1);
    const expected = round(a / 4 + 4, 0);
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (Aa > expected + 20) tone = "critical";
    else if (Aa > expected) tone = "warn";
    return { Aa, PAO2: round(PAO2, 1), expected, tone };
  }, [age, fio2, paco2, pao2, patm, rq]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.Aa} mmHg` : "—"}
          secondary={
            result
              ? `PAO₂ ${result.PAO2} · expected ≈ ${result.expected}`
              : "A–a oxygen gradient"
          }
          tone={result?.tone ?? "neutral"}
        />
      }
    >
      <Field label="FiO₂ (fraction)" hint="0.21 = room air">
        <NumberInput
          step={0.01}
          value={fio2}
          onChange={(e) => setFio2(e.target.value)}
        />
      </Field>
      <Field label="Atmospheric pressure (mmHg)">
        <NumberInput value={patm} onChange={(e) => setPatm(e.target.value)} />
      </Field>
      <Field label="PaO₂ (mmHg)">
        <NumberInput value={pao2} onChange={(e) => setPao2(e.target.value)} />
      </Field>
      <Field label="PaCO₂ (mmHg)">
        <NumberInput value={paco2} onChange={(e) => setPaco2(e.target.value)} />
      </Field>
      <Field label="Respiratory quotient (RQ)">
        <NumberInput
          step={0.01}
          value={rq}
          onChange={(e) => setRq(e.target.value)}
        />
      </Field>
      <Field label="Age (years)" hint="For expected A–a ≈ age/4 + 4">
        <NumberInput value={age} onChange={(e) => setAge(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setFio2("0.21");
          setPatm("760");
          setPao2("90");
          setPaco2("40");
          setRq("0.8");
          setAge("40");
        }}
      />
    </CalcLayout>
  );
}

export function LdlFriedewaldCalculator() {
  const [tc, setTc] = useState("200");
  const [hdl, setHdl] = useState("50");
  const [tg, setTg] = useState("150");

  const result = useMemo(() => {
    const t = Number(tc);
    const h = Number(hdl);
    const g = Number(tg);
    if (![t, h, g].every(Number.isFinite)) return null;
    if (g >= 400) {
      return { ldl: null as number | null, invalid: true };
    }
    const ldl = round(t - h - g / 5, 0);
    return { ldl, invalid: false };
  }, [hdl, tc, tg]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={
            result?.invalid
              ? "Invalid"
              : result?.ldl != null
                ? `${result.ldl} mg/dL`
                : "—"
          }
          secondary={
            result?.invalid
              ? "TG ≥400 — use direct LDL"
              : "Friedewald LDL-C"
          }
          tone={result?.invalid ? "warn" : "neutral"}
        />
      }
    >
      <Field label="Total cholesterol (mg/dL)">
        <NumberInput value={tc} onChange={(e) => setTc(e.target.value)} />
      </Field>
      <Field label="HDL (mg/dL)">
        <NumberInput value={hdl} onChange={(e) => setHdl(e.target.value)} />
      </Field>
      <Field label="Triglycerides (mg/dL)">
        <NumberInput value={tg} onChange={(e) => setTg(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setTc("200");
          setHdl("50");
          setTg("150");
        }}
      />
    </CalcLayout>
  );
}

export function HomaIrCalculator() {
  const [glucose, setGlucose] = useState("90");
  const [insulin, setInsulin] = useState("10");

  const result = useMemo(() => {
    const g = Number(glucose);
    const i = Number(insulin);
    if (![g, i].every(Number.isFinite) || g <= 0 || i < 0) return null;
    const homa = round((g * i) / 405, 2);
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (homa >= 2.9) tone = "critical";
    else if (homa >= 1.9) tone = "warn";
    return { homa, tone };
  }, [glucose, insulin]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? String(result.homa) : "—"}
          secondary="HOMA-IR (fasting glucose × insulin / 405)"
          tone={result?.tone ?? "neutral"}
          detail="Cutoffs vary by assay and population; interpret locally."
        />
      }
    >
      <Field label="Fasting glucose (mg/dL)">
        <NumberInput
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
        />
      </Field>
      <Field label="Fasting insulin (µU/mL)">
        <NumberInput
          value={insulin}
          onChange={(e) => setInsulin(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setGlucose("90");
          setInsulin("10");
        }}
      />
    </CalcLayout>
  );
}

export function CorrectedPhenytoinCalculator() {
  const [phenytoin, setPhenytoin] = useState("10");
  const [albumin, setAlbumin] = useState("2.5");
  const [crcl, setCrcl] = useState("90");

  const result = useMemo(() => {
    const p = Number(phenytoin);
    const a = Number(albumin);
    const c = Number(crcl);
    if (![p, a, c].every(Number.isFinite) || a <= 0) return null;
    // Sheiner-Tozer; renal adjustment when CrCl < 20
    const factor = c < 20 ? 0.1 : 0.2;
    const corrected = round(p / (factor * a + 0.1), 1);
    return { corrected, factor };
  }, [albumin, crcl, phenytoin]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.corrected} µg/mL` : "—"}
          secondary="Sheiner–Tozer corrected phenytoin"
          detail={
            result
              ? `Using albumin factor ${result.factor} (renal CrCl <20 uses 0.1).`
              : null
          }
        />
      }
    >
      <Field label="Measured phenytoin (µg/mL)">
        <NumberInput
          step={0.1}
          value={phenytoin}
          onChange={(e) => setPhenytoin(e.target.value)}
        />
      </Field>
      <Field label="Albumin (g/dL)">
        <NumberInput
          step={0.1}
          value={albumin}
          onChange={(e) => setAlbumin(e.target.value)}
        />
      </Field>
      <Field label="CrCl (mL/min)" hint="Uses 0.1 factor if <20">
        <NumberInput value={crcl} onChange={(e) => setCrcl(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setPhenytoin("10");
          setAlbumin("2.5");
          setCrcl("90");
        }}
      />
    </CalcLayout>
  );
}

export function BishopScoreCalculator() {
  const [dilation, setDilation] = useState<0 | 1 | 2 | 3>(0);
  const [effacement, setEffacement] = useState<0 | 1 | 2 | 3>(0);
  const [station, setStation] = useState<0 | 1 | 2 | 3>(0);
  const [consistency, setConsistency] = useState<0 | 1 | 2>(0);
  const [position, setPosition] = useState<0 | 1 | 2>(0);

  const result = useMemo(() => {
    const score = dilation + effacement + station + consistency + position;
    let advice = "Unfavorable cervix";
    let tone: "ok" | "warn" | "critical" | "neutral" = "warn";
    if (score >= 8) {
      advice = "Favorable — high likelihood of vaginal delivery";
      tone = "ok";
    } else if (score >= 6) {
      advice = "Intermediate — induction may succeed";
      tone = "neutral";
    }
    return { score, advice, tone };
  }, [consistency, dilation, effacement, position, station]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.advice}
          tone={result.tone}
        />
      }
    >
      <Field label="Dilation (cm)">
        <Segmented
          value={dilation}
          onChange={setDilation}
          options={[
            { value: 0, label: "Closed (0)" },
            { value: 1, label: "1–2 (+1)" },
            { value: 2, label: "3–4 (+2)" },
            { value: 3, label: "≥5 (+3)" },
          ]}
        />
      </Field>
      <Field label="Effacement (%)">
        <Segmented
          value={effacement}
          onChange={setEffacement}
          options={[
            { value: 0, label: "0–30 (0)" },
            { value: 1, label: "40–50 (+1)" },
            { value: 2, label: "60–70 (+2)" },
            { value: 3, label: "≥80 (+3)" },
          ]}
        />
      </Field>
      <Field label="Station">
        <Segmented
          value={station}
          onChange={setStation}
          options={[
            { value: 0, label: "−3 (0)" },
            { value: 1, label: "−2 (+1)" },
            { value: 2, label: "−1 / 0 (+2)" },
            { value: 3, label: "+1 / +2 (+3)" },
          ]}
        />
      </Field>
      <Field label="Consistency">
        <Segmented
          value={consistency}
          onChange={setConsistency}
          options={[
            { value: 0, label: "Firm (0)" },
            { value: 1, label: "Medium (+1)" },
            { value: 2, label: "Soft (+2)" },
          ]}
        />
      </Field>
      <Field label="Position">
        <Segmented
          value={position}
          onChange={setPosition}
          options={[
            { value: 0, label: "Posterior (0)" },
            { value: 1, label: "Mid (+1)" },
            { value: 2, label: "Anterior (+2)" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setDilation(0);
          setEffacement(0);
          setStation(0);
          setConsistency(0);
          setPosition(0);
        }}
      />
    </CalcLayout>
  );
}
