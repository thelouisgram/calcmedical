"use client";

import { useMemo, useState } from "react";
import {
  CalcLayout,
  Field,
  NumberInput,
  ResetButton,
  ResultPanel,
  Segmented,
  SelectInput,
} from "@/components/calc/fields";
import { round } from "@/lib/utils";

type YN = 0 | 1;

/** Pediatric weight estimation — APLS, Luscombe & Owens, Best Guess. */
export function PediatricWeightCalculator() {
  const [mode, setMode] = useState<"years" | "months" | "neonate">("years");
  const [ageYears, setAgeYears] = useState("5");
  const [ageMonths, setAgeMonths] = useState("6");

  const result = useMemo(() => {
    if (mode === "neonate") {
      return {
        primary: "3.5 kg",
        secondary: "Typical term neonate estimate",
        detail: [
          { label: "Term neonate (typical)", value: "3.5 kg" },
          { label: "Range often cited", value: "2.5–4.5 kg" },
        ],
      };
    }

    if (mode === "months") {
      const m = Number(ageMonths);
      if (!Number.isFinite(m) || m < 0 || m > 12) return null;
      // APLS infant: (age months / 2) + 4
      const apls = round(m / 2 + 4, 1);
      return {
        primary: `${apls} kg`,
        secondary: "APLS infant formula (0–12 months)",
        detail: [
          { label: "APLS infant (m/2 + 4)", value: `${apls} kg` },
          {
            label: "Note",
            value: "Use measured weight whenever possible",
          },
        ],
      };
    }

    const age = Number(ageYears);
    if (!Number.isFinite(age) || age < 1 || age > 14) return null;

    // APLS 1–10y: (age + 4) × 2
    const apls =
      age >= 1 && age <= 10 ? round((age + 4) * 2, 1) : null;
    // Luscombe & Owens 1–16y: 3×age + 7
    const luscombe = round(3 * age + 7, 1);
    // Best Guess (ARC): <1 already handled; 1–4: 2×age+8; 5–14: 4×age
    const bestGuess =
      age <= 4 ? round(2 * age + 8, 1) : round(4 * age, 1);

    const primary = apls ?? luscombe;
    return {
      primary: `${primary} kg`,
      secondary: apls != null ? `APLS estimate · age ${age} y` : `Luscombe estimate · age ${age} y`,
      detail: [
        ...(apls != null
          ? [{ label: "APLS (age+4)×2", value: `${apls} kg` }]
          : [{ label: "APLS", value: "Use for ages 1–10 years" }]),
        { label: "Luscombe & Owens (3×age+7)", value: `${luscombe} kg` },
        {
          label:
            age <= 4
              ? "Best Guess 1–4 y (2×age+8)"
              : "Best Guess 5–14 y (4×age)",
          value: `${bestGuess} kg`,
        },
      ],
    };
  }, [ageMonths, ageYears, mode]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result?.primary ?? "—"}
          secondary={result?.secondary}
          detail={
            result ? (
              <ul className="space-y-1">
                {result.detail.map((row) => (
                  <li key={row.label}>
                    <span className="font-medium text-slate-800">
                      {row.label}:
                    </span>{" "}
                    {row.value}
                  </li>
                ))}
              </ul>
            ) : (
              "Enter a valid age"
            )
          }
        />
      }
    >
      <Field label="Age input">
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { value: "years", label: "Years (1–14)" },
            { value: "months", label: "Months (<1 y)" },
            { value: "neonate", label: "Neonate" },
          ]}
        />
      </Field>
      {mode === "years" ? (
        <Field label="Age (years)" hint="APLS validated roughly 1–10 years">
          <NumberInput
            min={1}
            max={14}
            step={1}
            value={ageYears}
            onChange={(e) => setAgeYears(e.target.value)}
          />
        </Field>
      ) : null}
      {mode === "months" ? (
        <Field label="Age (months)">
          <NumberInput
            min={0}
            max={12}
            step={1}
            value={ageMonths}
            onChange={(e) => setAgeMonths(e.target.value)}
          />
        </Field>
      ) : null}
      <ResetButton
        onClick={() => {
          setMode("years");
          setAgeYears("5");
          setAgeMonths("6");
        }}
      />
    </CalcLayout>
  );
}

export function PediatricEttCalculator() {
  const [age, setAge] = useState("4");
  const [cuffed, setCuffed] = useState<"uncuffed" | "cuffed">("uncuffed");

  const result = useMemo(() => {
    const a = Number(age);
    if (!Number.isFinite(a) || a < 0 || a > 16) return null;
    // Uncuffed: age/4 + 4; Cuffed: age/4 + 3.5 (common teaching)
    const size =
      cuffed === "uncuffed"
        ? round(a / 4 + 4, 1)
        : round(a / 4 + 3.5, 1);
    const depth = round(a / 2 + 12, 0); // oral tube length at lips (cm) teaching estimate
    return { size, depth };
  }, [age, cuffed]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.size} mm ID` : "—"}
          secondary={
            result
              ? `Approx. oral depth ${result.depth} cm at lips`
              : "Pediatric ETT size"
          }
          detail="Uncuffed ≈ age/4 + 4; cuffed ≈ age/4 + 3.5. Confirm with clinical sizing and institution."
        />
      }
    >
      <Field label="Age (years)">
        <NumberInput
          min={0}
          max={16}
          step={0.5}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Field>
      <Field label="Tube type">
        <Segmented
          value={cuffed}
          onChange={setCuffed}
          options={[
            { value: "uncuffed", label: "Uncuffed" },
            { value: "cuffed", label: "Cuffed" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setAge("4");
          setCuffed("uncuffed");
        }}
      />
    </CalcLayout>
  );
}

export function CorrectedAgeCalculator() {
  const [gestWeeks, setGestWeeks] = useState("28");
  const [gestDays, setGestDays] = useState("0");
  const [chronoWeeks, setChronoWeeks] = useState("12");

  const result = useMemo(() => {
    const gw = Number(gestWeeks);
    const gd = Number(gestDays) || 0;
    const cw = Number(chronoWeeks);
    if (![gw, gd, cw].every(Number.isFinite) || gw <= 0 || cw < 0) return null;
    const prematurityWeeks = Math.max(0, 40 - (gw + gd / 7));
    const corrected = round(cw - prematurityWeeks, 1);
    return {
      corrected: Math.max(corrected, 0),
      prematurityWeeks: round(prematurityWeeks, 1),
    };
  }, [chronoWeeks, gestDays, gestWeeks]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.corrected} weeks` : "—"}
          secondary={
            result
              ? `Corrected age · born ${result.prematurityWeeks} w early`
              : "Corrected / adjusted age"
          }
          detail="Corrected age = chronological age − (40 − gestational age at birth). Used for growth/development in preterm infants."
        />
      }
    >
      <Field label="Gestational age at birth (weeks)">
        <NumberInput
          value={gestWeeks}
          onChange={(e) => setGestWeeks(e.target.value)}
        />
      </Field>
      <Field label="Extra days">
        <NumberInput
          min={0}
          max={6}
          value={gestDays}
          onChange={(e) => setGestDays(e.target.value)}
        />
      </Field>
      <Field label="Chronological age (weeks since birth)">
        <NumberInput
          value={chronoWeeks}
          onChange={(e) => setChronoWeeks(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setGestWeeks("28");
          setGestDays("0");
          setChronoWeeks("12");
        }}
      />
    </CalcLayout>
  );
}

export function SchwartzEgfrCalculator() {
  const [height, setHeight] = useState("100");
  const [creat, setCreat] = useState("0.5");
  const [k, setK] = useState<"0.413" | "0.55" | "0.70">("0.413");

  const result = useMemo(() => {
    const h = Number(height);
    const c = Number(creat);
    const kappa = Number(k);
    if (![h, c, kappa].every(Number.isFinite) || c <= 0 || h <= 0) return null;
    const egfr = round((kappa * h) / c, 0);
    return { egfr };
  }, [creat, height, k]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.egfr} mL/min/1.73 m²` : "—"}
          secondary={`Schwartz bedside · k = ${k}`}
          detail="eGFR ≈ k × height(cm) / Scr(mg/dL). k=0.413 common with IDMS creatinine (CKiD)."
        />
      }
    >
      <Field label="Height (cm)">
        <NumberInput value={height} onChange={(e) => setHeight(e.target.value)} />
      </Field>
      <Field label="Serum creatinine (mg/dL)">
        <NumberInput
          step={0.01}
          value={creat}
          onChange={(e) => setCreat(e.target.value)}
        />
      </Field>
      <Field label="k constant">
        <Segmented
          value={k}
          onChange={setK}
          options={[
            { value: "0.413", label: "0.413 CKiD" },
            { value: "0.55", label: "0.55 child" },
            { value: "0.70", label: "0.70 adolescent ♂" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setHeight("100");
          setCreat("0.5");
          setK("0.413");
        }}
      />
    </CalcLayout>
  );
}

export function MgPerKgCalculator() {
  const [weight, setWeight] = useState("20");
  const [dose, setDose] = useState("15");
  const [conc, setConc] = useState("");

  const result = useMemo(() => {
    const w = Number(weight);
    const d = Number(dose);
    if (![w, d].every(Number.isFinite) || w <= 0 || d < 0) return null;
    const totalMg = round(w * d, 2);
    const c = Number(conc);
    const volume =
      Number.isFinite(c) && c > 0 && conc !== ""
        ? round(totalMg / c, 2)
        : null;
    return { totalMg, volume };
  }, [conc, dose, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.totalMg} mg` : "—"}
          secondary={
            result?.volume != null
              ? `Volume ${result.volume} mL`
              : `${dose || "—"} mg/kg × weight`
          }
          detail="Generic mg/kg helper — always confirm indication, max dose, and concentration with a formulary."
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
      <Field label="Dose (mg/kg)">
        <NumberInput
          step={0.1}
          value={dose}
          onChange={(e) => setDose(e.target.value)}
        />
      </Field>
      <Field label="Concentration (mg/mL)" hint="Optional — for volume">
        <NumberInput
          step={0.1}
          value={conc}
          onChange={(e) => setConc(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setWeight("20");
          setDose("15");
          setConc("");
        }}
      />
    </CalcLayout>
  );
}

export function InfusionRateCalculator() {
  const [weight, setWeight] = useState("70");
  const [dose, setDose] = useState("5");
  const [doseUnit, setDoseUnit] = useState<"mcg/kg/min" | "mg/kg/h">(
    "mcg/kg/min",
  );
  const [conc, setConc] = useState("200");
  const [concUnit, setConcUnit] = useState<"mcg/mL" | "mg/mL">("mcg/mL");

  const result = useMemo(() => {
    const w = Number(weight);
    const d = Number(dose);
    const c = Number(conc);
    if (![w, d, c].every(Number.isFinite) || w <= 0 || c <= 0) return null;

    // Convert everything to mcg and minutes
    const doseMcgPerMin =
      doseUnit === "mcg/kg/min" ? d * w : (d * w * 1000) / 60;
    const concMcgPerMl = concUnit === "mcg/mL" ? c : c * 1000;
    const mlPerHour = round((doseMcgPerMin / concMcgPerMl) * 60, 2);
    return { mlPerHour };
  }, [conc, concUnit, dose, doseUnit, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.mlPerHour} mL/h` : "—"}
          secondary="Infusion pump rate"
          detail="Converts weight-based infusion dose and bag concentration to mL/h."
        />
      }
    >
      <Field label="Weight (kg)">
        <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>
      <Field label="Dose unit">
        <Segmented
          value={doseUnit}
          onChange={setDoseUnit}
          options={[
            { value: "mcg/kg/min", label: "mcg/kg/min" },
            { value: "mg/kg/h", label: "mg/kg/h" },
          ]}
        />
      </Field>
      <Field label="Dose">
        <NumberInput
          step={0.1}
          value={dose}
          onChange={(e) => setDose(e.target.value)}
        />
      </Field>
      <Field label="Concentration unit">
        <Segmented
          value={concUnit}
          onChange={setConcUnit}
          options={[
            { value: "mcg/mL", label: "mcg/mL" },
            { value: "mg/mL", label: "mg/mL" },
          ]}
        />
      </Field>
      <Field label="Concentration">
        <NumberInput value={conc} onChange={(e) => setConc(e.target.value)} />
      </Field>
      <ResetButton
        onClick={() => {
          setWeight("70");
          setDose("5");
          setDoseUnit("mcg/kg/min");
          setConc("200");
          setConcUnit("mcg/mL");
        }}
      />
    </CalcLayout>
  );
}

export function AllowableBloodLossCalculator() {
  const [ageGroup, setAgeGroup] = useState<
    "neonate" | "infant" | "child" | "adult-m" | "adult-f"
  >("child");
  const [weight, setWeight] = useState("20");
  const [hctStart, setHctStart] = useState("36");
  const [hctMin, setHctMin] = useState("25");

  const ebvFactor: Record<typeof ageGroup, number> = {
    neonate: 90,
    infant: 80,
    child: 75,
    "adult-m": 70,
    "adult-f": 65,
  };

  const result = useMemo(() => {
    const w = Number(weight);
    const hs = Number(hctStart);
    const hm = Number(hctMin);
    if (![w, hs, hm].every(Number.isFinite) || w <= 0 || hs <= 0) return null;
    const ebv = round(w * ebvFactor[ageGroup], 0);
    const abl = round(ebv * ((hs - hm) / hs), 0);
    return { ebv, abl };
  }, [ageGroup, hctMin, hctStart, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.abl} mL` : "—"}
          secondary={result ? `EBV ${result.ebv} mL` : "Allowable blood loss"}
          detail="ABL ≈ EBV × (Hct_start − Hct_min) / Hct_start. Estimate only — guide transfusion decisions clinically."
        />
      }
    >
      <Field label="Age group (EBV mL/kg)">
        <SelectInput
          value={ageGroup}
          onChange={(e) =>
            setAgeGroup(e.target.value as typeof ageGroup)
          }
        >
          <option value="neonate">Neonate (90)</option>
          <option value="infant">Infant (80)</option>
          <option value="child">Child (75)</option>
          <option value="adult-m">Adult male (70)</option>
          <option value="adult-f">Adult female (65)</option>
        </SelectInput>
      </Field>
      <Field label="Weight (kg)">
        <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>
      <Field label="Starting hematocrit (%)">
        <NumberInput
          value={hctStart}
          onChange={(e) => setHctStart(e.target.value)}
        />
      </Field>
      <Field label="Minimum acceptable hematocrit (%)">
        <NumberInput
          value={hctMin}
          onChange={(e) => setHctMin(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setAgeGroup("child");
          setWeight("20");
          setHctStart("36");
          setHctMin("25");
        }}
      />
    </CalcLayout>
  );
}

export function WellsDvtCalculator() {
  const [cancer, setCancer] = useState<YN>(0);
  const [paralysis, setParalysis] = useState<YN>(0);
  const [bedridden, setBedridden] = useState<YN>(0);
  const [tenderness, setTenderness] = useState<YN>(0);
  const [entireLeg, setEntireLeg] = useState<YN>(0);
  const [calf, setCalf] = useState<YN>(0);
  const [pitting, setPitting] = useState<YN>(0);
  const [collateral, setCollateral] = useState<YN>(0);
  const [prior, setPrior] = useState<YN>(0);
  const [alt, setAlt] = useState<0 | -2>(0);

  const result = useMemo(() => {
    const score =
      cancer +
      paralysis +
      bedridden +
      tenderness +
      entireLeg +
      calf +
      pitting +
      collateral +
      prior +
      alt;
    let risk = "Low probability";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 3) {
      risk = "High probability";
      tone = "critical";
    } else if (score >= 1) {
      risk = "Moderate probability";
      tone = "warn";
    }
    return { score, risk, tone };
  }, [
    alt,
    bedridden,
    calf,
    cancer,
    collateral,
    entireLeg,
    paralysis,
    pitting,
    prior,
    tenderness,
  ]);

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
          detail="Wells score for lower-extremity DVT (three-tier)."
        />
      }
    >
      <Field label="Active cancer">{yn(cancer, setCancer)}</Field>
      <Field label="Paralysis / paresis / recent cast">{yn(paralysis, setParalysis)}</Field>
      <Field label="Bedridden ≥3 days or major surgery <12 weeks">
        {yn(bedridden, setBedridden)}
      </Field>
      <Field label="Localized tenderness along deep veins">
        {yn(tenderness, setTenderness)}
      </Field>
      <Field label="Entire leg swollen">{yn(entireLeg, setEntireLeg)}</Field>
      <Field label="Calf swelling ≥3 cm vs other leg">{yn(calf, setCalf)}</Field>
      <Field label="Pitting edema (symptomatic leg)">{yn(pitting, setPitting)}</Field>
      <Field label="Collateral superficial veins (nonvaricose)">
        {yn(collateral, setCollateral)}
      </Field>
      <Field label="Previously documented DVT">{yn(prior, setPrior)}</Field>
      <Field label="Alternative diagnosis at least as likely">
        <Segmented
          value={alt}
          onChange={setAlt}
          options={[
            { value: -2, label: "Yes (−2)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setCancer(0);
          setParalysis(0);
          setBedridden(0);
          setTenderness(0);
          setEntireLeg(0);
          setCalf(0);
          setPitting(0);
          setCollateral(0);
          setPrior(0);
          setAlt(0);
        }}
      />
    </CalcLayout>
  );
}

export function OttawaAnkleCalculator() {
  const [malleolar, setMalleolar] = useState<YN>(0);
  const [bonePain, setBonePain] = useState<YN>(0);
  const [bearWeight, setBearWeight] = useState<YN>(0);
  const [midfoot, setMidfoot] = useState<YN>(0);
  const [navicular, setNavicular] = useState<YN>(0);
  const [base5, setBase5] = useState<YN>(0);
  const [bearFoot, setBearFoot] = useState<YN>(0);

  const result = useMemo(() => {
    const ankleXray =
      malleolar === 1 && (bonePain === 1 || bearWeight === 1);
    const footXray =
      midfoot === 1 && (navicular === 1 || base5 === 1 || bearFoot === 1);
    const needed = ankleXray || footXray;
    return {
      needed,
      ankleXray,
      footXray,
      tone: needed ? ("warn" as const) : ("ok" as const),
      text: needed
        ? "X-ray indicated by Ottawa rules"
        : "X-ray not indicated if rules applied correctly",
    };
  }, [base5, bearFoot, bearWeight, bonePain, malleolar, midfoot, navicular]);

  const yn = (v: YN, set: (x: YN) => void, yes = "Yes") => (
    <Segmented
      value={v}
      onChange={set}
      options={[
        { value: 1, label: yes },
        { value: 0, label: "No" },
      ]}
    />
  );

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result.needed ? "Image" : "No X-ray"}
          secondary={result.text}
          tone={result.tone}
          detail={
            <ul className="list-disc space-y-1 pl-4">
              <li>Ankle series: {result.ankleXray ? "Yes" : "No"}</li>
              <li>Foot series: {result.footXray ? "Yes" : "No"}</li>
            </ul>
          }
        />
      }
    >
      <p className="text-sm font-medium text-slate-800">Ankle assessment</p>
      <Field label="Pain in malleolar zone">{yn(malleolar, setMalleolar)}</Field>
      <Field label="Bone tenderness at posterior edge/tip of malleolus">
        {yn(bonePain, setBonePain)}
      </Field>
      <Field label="Unable to bear weight immediately and in ED (4 steps)">
        {yn(bearWeight, setBearWeight)}
      </Field>
      <p className="pt-2 text-sm font-medium text-slate-800">Foot assessment</p>
      <Field label="Pain in midfoot zone">{yn(midfoot, setMidfoot)}</Field>
      <Field label="Bone tenderness at navicular">{yn(navicular, setNavicular)}</Field>
      <Field label="Bone tenderness at base of 5th metatarsal">
        {yn(base5, setBase5)}
      </Field>
      <Field label="Unable to bear weight immediately and in ED (4 steps)">
        {yn(bearFoot, setBearFoot)}
      </Field>
      <ResetButton
        onClick={() => {
          setMalleolar(0);
          setBonePain(0);
          setBearWeight(0);
          setMidfoot(0);
          setNavicular(0);
          setBase5(0);
          setBearFoot(0);
        }}
      />
    </CalcLayout>
  );
}

export function CentorMcisaacCalculator() {
  const [tonsillar, setTonsillar] = useState<YN>(0);
  const [nodes, setNodes] = useState<YN>(0);
  const [fever, setFever] = useState<YN>(0);
  const [cough, setCough] = useState<YN>(0);
  const [ageBand, setAgeBand] = useState<1 | 0 | -1>(0);

  const result = useMemo(() => {
    const score = tonsillar + nodes + fever + (cough ? 0 : 1) + ageBand;
    // cough absent = +1 in Centor
    let advice = "Low risk — no testing/antibiotics typically";
    let tone: "ok" | "warn" | "critical" = "ok";
    if (score >= 4) {
      advice = "High risk — consider empiric antibiotics / testing per protocol";
      tone = "critical";
    } else if (score >= 2) {
      advice = "Intermediate — consider RADT / culture";
      tone = "warn";
    }
    return { score, advice, tone };
  }, [ageBand, cough, fever, nodes, tonsillar]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={`${result.score}`}
          secondary={result.advice}
          tone={result.tone}
          detail="Modified Centor / McIsaac for GAS pharyngitis probability."
        />
      }
    >
      <Field label="Tonsillar exudate or swelling">
        <Segmented
          value={tonsillar}
          onChange={setTonsillar}
          options={[
            { value: 1, label: "Yes (+1)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Tender anterior cervical nodes">
        <Segmented
          value={nodes}
          onChange={setNodes}
          options={[
            { value: 1, label: "Yes (+1)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="History of fever">
        <Segmented
          value={fever}
          onChange={setFever}
          options={[
            { value: 1, label: "Yes (+1)" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Cough present">
        <Segmented
          value={cough}
          onChange={setCough}
          options={[
            { value: 1, label: "Yes (0)" },
            { value: 0, label: "No (+1)" },
          ]}
        />
      </Field>
      <Field label="Age (McIsaac)">
        <Segmented
          value={ageBand}
          onChange={setAgeBand}
          options={[
            { value: 1, label: "3–14 (+1)" },
            { value: 0, label: "15–44 (0)" },
            { value: -1, label: "≥45 (−1)" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setTonsillar(0);
          setNodes(0);
          setFever(0);
          setCough(0);
          setAgeBand(0);
        }}
      />
    </CalcLayout>
  );
}

export function Gad7Calculator() {
  const [scores, setScores] = useState<number[]>(Array(7).fill(0));
  const items = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
  ];

  const result = useMemo(() => {
    const total = scores.reduce((a, b) => a + b, 0);
    let severity = "Minimal";
    let tone: "ok" | "warn" | "critical" | "neutral" = "ok";
    if (total >= 15) {
      severity = "Severe";
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
          primary={`${result.total} / 21`}
          secondary={result.severity}
          tone={result.tone}
          detail="GAD-7 over the last 2 weeks."
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
      <ResetButton onClick={() => setScores(Array(7).fill(0))} />
    </CalcLayout>
  );
}

export function CorrectedReticCalculator() {
  const [retic, setRetic] = useState("2.0");
  const [hct, setHct] = useState("30");
  const [normalHct, setNormalHct] = useState("45");

  const result = useMemo(() => {
    const r = Number(retic);
    const h = Number(hct);
    const n = Number(normalHct);
    if (![r, h, n].every(Number.isFinite) || n <= 0) return null;
    const corrected = round(r * (h / n), 2);
    return { corrected };
  }, [hct, normalHct, retic]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.corrected}%` : "—"}
          secondary="Corrected reticulocyte count"
          detail="Corrected retic % = retic % × (patient Hct / normal Hct)."
        />
      }
    >
      <Field label="Reticulocyte count (%)">
        <NumberInput
          step={0.1}
          value={retic}
          onChange={(e) => setRetic(e.target.value)}
        />
      </Field>
      <Field label="Patient hematocrit (%)">
        <NumberInput value={hct} onChange={(e) => setHct(e.target.value)} />
      </Field>
      <Field label="Normal hematocrit (%)" hint="Often 45">
        <NumberInput
          value={normalHct}
          onChange={(e) => setNormalHct(e.target.value)}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setRetic("2.0");
          setHct("30");
          setNormalHct("45");
        }}
      />
    </CalcLayout>
  );
}

export function SodiumDeficitCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("70");
  const [na, setNa] = useState("120");
  const [desired, setDesired] = useState("130");

  const result = useMemo(() => {
    const w = Number(weight);
    const n = Number(na);
    const d = Number(desired);
    if (![w, n, d].every(Number.isFinite) || w <= 0) return null;
    const tbw = (sex === "male" ? 0.6 : 0.5) * w;
    const deficit = round(tbw * (d - n), 0);
    return { deficit: Math.max(deficit, 0) };
  }, [desired, na, sex, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.deficit} mEq` : "—"}
          secondary="Sodium deficit estimate"
          detail="TBW × (desired Na − current Na). Replace carefully; monitor sodium change rate."
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
          setNa("120");
          setDesired("130");
        }}
      />
    </CalcLayout>
  );
}

export function BicarbDeficitCalculator() {
  const [weight, setWeight] = useState("70");
  const [hco3, setHco3] = useState("10");
  const [desired, setDesired] = useState("15");
  const [vd, setVd] = useState("0.5");

  const result = useMemo(() => {
    const w = Number(weight);
    const h = Number(hco3);
    const d = Number(desired);
    const v = Number(vd);
    if (![w, h, d, v].every(Number.isFinite) || w <= 0) return null;
    const deficit = round(w * v * (d - h), 0);
    return { deficit: Math.max(deficit, 0) };
  }, [desired, hco3, vd, weight]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result ? `${result.deficit} mEq` : "—"}
          secondary="Bicarbonate deficit estimate"
          detail="Deficit ≈ weight × Vd × (desired − measured HCO₃). Vd often 0.4–0.5. Treat cause; bicarbonate use is selective."
        />
      }
    >
      <Field label="Weight (kg)">
        <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Field>
      <Field label="Measured HCO₃ (mEq/L)">
        <NumberInput value={hco3} onChange={(e) => setHco3(e.target.value)} />
      </Field>
      <Field label="Desired HCO₃ (mEq/L)">
        <NumberInput
          value={desired}
          onChange={(e) => setDesired(e.target.value)}
        />
      </Field>
      <Field label="Volume of distribution">
        <Segmented
          value={vd}
          onChange={setVd}
          options={[
            { value: "0.4", label: "0.4" },
            { value: "0.5", label: "0.5" },
            { value: "0.6", label: "0.6" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setWeight("70");
          setHco3("10");
          setDesired("15");
          setVd("0.5");
        }}
      />
    </CalcLayout>
  );
}

export function NexusCspineCalculator() {
  const [tenderness, setTenderness] = useState<YN>(0);
  const [intox, setIntox] = useState<YN>(0);
  const [alert, setAlert] = useState<YN>(1);
  const [neuro, setNeuro] = useState<YN>(0);
  const [distracting, setDistracting] = useState<YN>(0);

  const result = useMemo(() => {
    // NEXUS low risk if ALL: no midline tenderness, no intoxication, normal alertness, no focal neuro, no distracting injury
    const lowRisk =
      tenderness === 0 &&
      intox === 0 &&
      alert === 1 &&
      neuro === 0 &&
      distracting === 0;
    return {
      lowRisk,
      tone: lowRisk ? ("ok" as const) : ("warn" as const),
      text: lowRisk
        ? "NEXUS low-risk — imaging may be unnecessary"
        : "Not NEXUS low-risk — consider imaging",
    };
  }, [alert, distracting, intox, neuro, tenderness]);

  return (
    <CalcLayout
      result={
        <ResultPanel
          primary={result.lowRisk ? "Low risk" : "Not low risk"}
          secondary={result.text}
          tone={result.tone}
        />
      }
    >
      <Field label="Midline cervical tenderness">
        <Segmented
          value={tenderness}
          onChange={setTenderness}
          options={[
            { value: 1, label: "Present" },
            { value: 0, label: "Absent" },
          ]}
        />
      </Field>
      <Field label="Evidence of intoxication">
        <Segmented
          value={intox}
          onChange={setIntox}
          options={[
            { value: 1, label: "Yes" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Normal level of alertness">
        <Segmented
          value={alert}
          onChange={setAlert}
          options={[
            { value: 1, label: "Yes" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Focal neurologic deficit">
        <Segmented
          value={neuro}
          onChange={setNeuro}
          options={[
            { value: 1, label: "Yes" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <Field label="Painful distracting injury">
        <Segmented
          value={distracting}
          onChange={setDistracting}
          options={[
            { value: 1, label: "Yes" },
            { value: 0, label: "No" },
          ]}
        />
      </Field>
      <ResetButton
        onClick={() => {
          setTenderness(0);
          setIntox(0);
          setAlert(1);
          setNeuro(0);
          setDistracting(0);
        }}
      />
    </CalcLayout>
  );
}
