import type { CalculatorMeta } from "@/lib/calculators/types";
import { ApgarCalculator } from "@/components/calculators/ApgarCalculator";
import { BmiCalculator } from "@/components/calculators/BmiCalculator";
import {
  BsaCalculator,
  IbwCalculator,
} from "@/components/calculators/BsaIbwCalculators";
import { BurnsCalculator } from "@/components/calculators/BurnsCalculator";
import { Cha2ds2VascCalculator } from "@/components/calculators/Cha2ds2VascCalculator";
import { Curb65Calculator } from "@/components/calculators/Curb65Calculator";
import { EddEgaCalculator } from "@/components/calculators/EddEgaCalculator";
import { EgfrCalculator } from "@/components/calculators/EgfrCalculator";
import {
  AaGradientCalculator,
  AncCalculator,
  BishopScoreCalculator,
  CockcroftGaultCalculator,
  CorrectedPhenytoinCalculator,
  CorrectedSodiumCalculator,
  FenaCalculator,
  FreeWaterDeficitCalculator,
  GlasgowBlatchfordCalculator,
  HomaIrCalculator,
  LdlFriedewaldCalculator,
  MaintenanceFluidsCalculator,
  OsmolalityCalculator,
  PercCalculator,
  Phq9Calculator,
  TimiUaNstemiCalculator,
} from "@/components/calculators/ExtraCalculators";
import { GcsCalculator } from "@/components/calculators/GcsCalculator";
import { HasBledCalculator } from "@/components/calculators/HasBledCalculator";
import {
  AnionGapCalculator,
  CorrectedQtCalculator,
  MapCalculator,
} from "@/components/calculators/MiscCalculators";
import {
  AlvaradoCalculator,
  ChildPughCalculator,
  CorrectedCalciumCalculator,
  HeartScoreCalculator,
  MeldCalculator,
  QsofaCalculator,
  WellsPeCalculator,
} from "@/components/calculators/MoreCalculators";
import {
  AllowableBloodLossCalculator,
  BicarbDeficitCalculator,
  CentorMcisaacCalculator,
  CorrectedAgeCalculator,
  CorrectedReticCalculator,
  Gad7Calculator,
  InfusionRateCalculator,
  MgPerKgCalculator,
  NexusCspineCalculator,
  OttawaAnkleCalculator,
  PediatricEttCalculator,
  PediatricWeightCalculator,
  SchwartzEgfrCalculator,
  SodiumDeficitCalculator,
  WellsDvtCalculator,
} from "@/components/calculators/PediatricAndMore";

const calculatorList: CalculatorMeta[] = [
  {
    slug: "aa-gradient",
    title: "A–a Oxygen Gradient",
    shortName: "A–a Gradient",
    specialties: ["pulmonology", "critical-care", "emergency-medicine"],
    keywords: ["a-a gradient", "alveolar arterial", "hypoxemia"],
    description:
      "Calculate the alveolar–arterial oxygen gradient from ABG values and compare with age-expected normals.",
    formulaSummary:
      "PAO₂ = FiO₂×(Patm−47) − PaCO₂/RQ; A–a = PAO₂ − PaO₂. Expected ≈ age/4 + 4.",
    interpretation:
      "Elevated A–a suggests V/Q mismatch, shunt, or diffusion limitation; normal A–a with hypoxemia suggests hypoventilation or low FiO₂.",
    limitations:
      "Assumes steady state and accurate FiO₂/Patm. Expected formulas are approximate.",
    references: [{ label: "Classic respiratory physiology A–a gradient" }],
    faqs: [
      {
        question: "What FiO₂ is room air?",
        answer: "0.21 (21%).",
      },
    ],
    related: ["map", "qsofa"],
    Component: AaGradientCalculator,
  },
  {
    slug: "anc",
    title: "Absolute Neutrophil Count (ANC)",
    shortName: "ANC",
    specialties: ["general", "pediatrics", "emergency-medicine"],
    keywords: ["anc", "neutropenia", "absolute neutrophil count"],
    description:
      "Compute absolute neutrophil count from WBC and neutrophil/band percentages or fractions.",
    formulaSummary: "ANC = WBC × (neutrophils + bands) × 1000 when WBC is ×10³/µL.",
    interpretation:
      "Mild neutropenia <1500, moderate <1000, severe <500 /µL (thresholds vary by context).",
    limitations:
      "Assay reporting units differ; confirm with your lab format.",
    references: [{ label: "Standard hematology ANC definition" }],
    faqs: [
      {
        question: "Do bands count?",
        answer: "Yes — include bands with segmented neutrophils in the ANC.",
      },
    ],
    related: ["bmi", "ibw"],
    Component: AncCalculator,
  },
  {
    slug: "alvarado",
    title: "Alvarado Score (Appendicitis)",
    shortName: "Alvarado",
    specialties: ["surgery", "emergency-medicine"],
    keywords: ["alvarado", "appendicitis score", "mantrels"],
    description:
      "Score clinical likelihood of acute appendicitis using the Alvarado (MANTRELS) criteria.",
    formulaSummary: "Symptoms, signs, and labs scored to a maximum of 10.",
    interpretation:
      "Low scores make appendicitis less likely; mid-range suggests observation/imaging; high scores support surgical evaluation.",
    limitations:
      "Imaging and clinical judgment remain essential; performance varies by population and sex.",
    references: [{ label: "Alvarado A. Ann Emerg Med." }],
    faqs: [
      {
        question: "What does MANTRELS stand for?",
        answer:
          "Migration, Anorexia, Nausea, Tenderness RLQ, Rebound, Elevated temperature, Leukocytosis, Shift of left (neutrophils).",
      },
    ],
    related: ["wells-pe", "heart-score"],
    Component: AlvaradoCalculator,
  },
  {
    slug: "anion-gap",
    title: "Anion Gap Calculator",
    shortName: "Anion Gap",
    specialties: ["nephrology", "critical-care", "general", "emergency-medicine"],
    keywords: ["anion gap", "metabolic acidosis", "electrolytes"],
    description:
      "Calculate serum anion gap with optional albumin correction for acid-base workups.",
    formulaSummary:
      "AG = Na − (Cl + HCO₃). Corrected AG ≈ AG + 2.5 × (4 − albumin).",
    interpretation:
      "Elevated gap suggests HAGMA etiologies (e.g., MUDPILES/GOLDMARK frameworks).",
    limitations:
      "Assay reference ranges vary; always interpret with clinical context and ABG/VBG.",
    references: [{ label: "Classic acid-base / anion gap reviews" }],
    faqs: [
      {
        question: "When should I correct for albumin?",
        answer:
          "Hypoalbuminemia lowers the observed gap; correction helps avoid missing a hidden elevated gap.",
      },
    ],
    related: ["osmolality", "corrected-calcium", "egfr-ckd-epi"],
    Component: AnionGapCalculator,
  },
  {
    slug: "apgar",
    title: "Apgar Score Calculator",
    shortName: "Apgar",
    specialties: ["pediatrics", "obstetrics-gynecology"],
    keywords: ["apgar", "newborn score", "neonatal assessment"],
    description:
      "Compute the 1- and 5-minute Apgar score from appearance, pulse, grimace, activity, and respiration.",
    formulaSummary: "Sum of five domains scored 0–2 each; total 0–10.",
    interpretation:
      "7–10 generally reassuring; 4–6 moderately abnormal; 0–3 critically low and warrants resuscitation focus.",
    limitations:
      "Apgar does not diagnose asphyxia alone and should not be used to predict individual neurologic outcome.",
    references: [
      { label: "Apgar V. Anesthesia & Analgesia / classic Apgar scoring" },
      { label: "AAP / ACOG neonatal assessment guidance" },
    ],
    faqs: [
      {
        question: "When is Apgar assigned?",
        answer:
          "Standardly at 1 and 5 minutes of life, and repeated if the score remains low.",
      },
    ],
    related: ["edd-ega", "bishop-score", "gcs"],
    Component: ApgarCalculator,
  },
  {
    slug: "bishop-score",
    title: "Bishop Score (Cervical Favorability)",
    shortName: "Bishop",
    specialties: ["obstetrics-gynecology"],
    keywords: ["bishop score", "cervical ripening", "induction"],
    description:
      "Assess cervical favorability for labor induction using the Bishop score.",
    formulaSummary:
      "Dilation, effacement, station, consistency, and position scored and summed.",
    interpretation:
      "Higher scores (≥8) favor successful vaginal delivery after induction; low scores suggest unfavorable cervix.",
    limitations:
      "Modified Bishop variants exist; clinical context and parity matter.",
    references: [{ label: "Bishop EH. Pelvic scoring for elective induction" }],
    faqs: [
      {
        question: "What is a favorable Bishop score?",
        answer: "Often ≥8 is considered favorable; 6–7 intermediate.",
      },
    ],
    related: ["edd-ega", "apgar"],
    Component: BishopScoreCalculator,
  },
  {
    slug: "bmi",
    title: "BMI Calculator",
    shortName: "BMI",
    specialties: ["general"],
    keywords: ["bmi", "body mass index", "obesity"],
    description:
      "Calculate body mass index from metric or imperial measurements with WHO category labels.",
    formulaSummary: "BMI = kg / m² (metric) or 703 × lb / in² (imperial).",
    interpretation:
      "WHO adult categories: <18.5 underweight, 18.5–24.9 healthy, 25–29.9 overweight, ≥30 obesity.",
    limitations:
      "BMI does not distinguish fat vs muscle and thresholds differ for children and some populations.",
    references: [{ label: "WHO BMI classification" }],
    faqs: [
      {
        question: "Is BMI diagnostic of health?",
        answer:
          "No. It is a screening anthropometric index and must be interpreted clinically.",
      },
    ],
    related: ["bsa", "ibw", "egfr-ckd-epi"],
    Component: BmiCalculator,
  },
  {
    slug: "bsa",
    title: "Body Surface Area (BSA)",
    shortName: "BSA",
    specialties: ["general", "surgery", "critical-care", "pediatrics"],
    keywords: [
      "bsa",
      "body surface area",
      "mosteller",
      "dubois",
      "haycock",
      "chemotherapy dosing",
    ],
    description:
      "Calculate body surface area with Mosteller, DuBois & DuBois, Haycock, or Gehan & George formulas. Compare all methods side by side.",
    formulaSummary:
      "Mosteller: √([Ht(cm)×Wt(kg)]/3600). DuBois: 0.007184×Ht^0.725×Wt^0.425. Haycock and Gehan formulas also available.",
    interpretation:
      "Mosteller is widely used for simplicity; DuBois is classic; Haycock is often preferred in pediatrics.",
    limitations:
      "BSA dosing must follow drug-specific references. Extreme body habitus reduces accuracy of all equations.",
    references: [
      { label: "Mosteller RD. N Engl J Med. Simplified BSA." },
      { label: "DuBois D, DuBois EF. 1916 BSA formula." },
      { label: "Haycock GB et al. Pediatric BSA." },
      { label: "Gehan EA, George SL. BSA estimation." },
    ],
    faqs: [
      {
        question: "Which BSA formula should I use?",
        answer:
          "Follow your protocol or drug label. Mosteller is common in adults; Haycock is frequently used in children.",
      },
      {
        question: "Can I switch units?",
        answer:
          "Yes — enter cm/kg or in/lb; values are converted internally before applying the equation.",
      },
    ],
    related: ["ibw", "bmi", "burns-parkland", "maintenance-fluids"],
    Component: BsaCalculator,
  },
  {
    slug: "burns-parkland",
    title: "Burns TBSA & Parkland Formula",
    shortName: "Burns / Parkland",
    specialties: ["surgery", "emergency-medicine", "critical-care"],
    keywords: [
      "parkland formula",
      "rule of nines",
      "tbsa",
      "burn resuscitation",
      "fluid resuscitation",
    ],
    description:
      "Estimate percent TBSA with Rule of Nines and calculate Parkland crystalloid resuscitation volumes.",
    formulaSummary:
      "Parkland 24h volume (mL) = 4 × weight(kg) × %TBSA. Give half in first 8 hours from time of burn, half over next 16 hours.",
    interpretation:
      "Use as an initial guide and titrate to urine output and perfusion. Major burns need burn-center pathways.",
    limitations:
      "Rule of Nines is less accurate in infants; Lund-Browder is preferred for pediatrics. Do not include superficial (first-degree) burns in Parkland %TBSA.",
    references: [
      { label: "Baxter CR. Parkland formula (historical)" },
      { label: "ABA burn shock resuscitation guidance" },
    ],
    faqs: [
      {
        question: "What fluid is used in Parkland?",
        answer:
          "Lactated Ringer’s (or equivalent isotonic crystalloid) is the classic choice; follow local protocol.",
      },
    ],
    related: ["gcs", "bsa", "ibw", "map", "maintenance-fluids"],
    Component: BurnsCalculator,
  },
  {
    slug: "cha2ds2-vasc",
    title: "CHA₂DS₂-VASc Score",
    shortName: "CHA₂DS₂-VASc",
    specialties: ["cardiology", "general"],
    keywords: ["cha2ds2-vasc", "atrial fibrillation", "stroke risk"],
    description:
      "Estimate stroke risk in nonvalvular atrial fibrillation to guide anticoagulation decisions.",
    formulaSummary:
      "Points for CHF, HTN, age, diabetes, prior stroke/TIA/TE, vascular disease, and sex category.",
    interpretation:
      "Higher scores indicate higher annual stroke risk; guidelines typically favor anticoagulation at ≥2 (men) or ≥3 (women), with individualized decisions at intermediate scores.",
    limitations:
      "Not validated for valvular AF / mechanical valves. Always weigh bleeding risk (e.g., HAS-BLED).",
    references: [
      { label: "Lip GYH et al. Chest / CHA₂DS₂-VASc derivation" },
      { label: "AHA/ACC/HRS AF guidelines" },
    ],
    faqs: [
      {
        question: "Does female sex always add a point?",
        answer:
          "Yes in the score definition; guidelines interpret female sex as a risk modifier rather than a sole indication for anticoagulation.",
      },
    ],
    related: ["has-bled", "heart-score", "timi-ua-nstemi"],
    Component: Cha2ds2VascCalculator,
  },
  {
    slug: "child-pugh",
    title: "Child-Pugh Score",
    shortName: "Child-Pugh",
    specialties: ["gastroenterology", "surgery"],
    keywords: ["child-pugh", "cirrhosis class", "liver disease"],
    description:
      "Classify cirrhosis severity (A/B/C) using bilirubin, albumin, INR, ascites, and encephalopathy.",
    formulaSummary: "Five domains scored 1–3; total 5–15 maps to class A/B/C.",
    interpretation:
      "Class A (5–6), B (7–9), C (10–15). Used for operative risk and disease severity framing.",
    limitations:
      "Subjective ascites/encephalopathy grading; MELD-Na preferred for transplant listing.",
    references: [{ label: "Child CG, Turcotte / Pugh modification" }],
    faqs: [
      {
        question: "Child-Pugh vs MELD?",
        answer:
          "Child-Pugh is clinical/class-based; MELD-Na is continuous and used in allocation systems.",
      },
    ],
    related: ["meld-na", "glasgow-blatchford"],
    Component: ChildPughCalculator,
  },
  {
    slug: "cockcroft-gault",
    title: "Cockcroft–Gault CrCl",
    shortName: "CrCl",
    specialties: ["nephrology", "general"],
    keywords: [
      "cockcroft gault",
      "creatinine clearance",
      "crcl",
      "drug dosing",
    ],
    description:
      "Estimate creatinine clearance with the Cockcroft–Gault equation for drug-dosing contexts.",
    formulaSummary:
      "CrCl = [(140 − age) × weight] / (72 × Scr) × (0.85 if female).",
    interpretation:
      "Used when product labeling specifies CrCl. For CKD staging, prefer CKD-EPI eGFR.",
    limitations:
      "Weight choice (ABW vs IBW vs AdjBW) changes results; follow the drug monograph.",
    references: [{ label: "Cockcroft DW, Gault MH. Nephron 1976." }],
    faqs: [
      {
        question: "Which weight should I use?",
        answer:
          "Follow the specific medication’s dosing guidance — often IBW or AdjBW in obesity.",
      },
    ],
    related: ["egfr-ckd-epi", "ibw", "corrected-phenytoin"],
    Component: CockcroftGaultCalculator,
  },
  {
    slug: "corrected-calcium",
    title: "Corrected Calcium",
    shortName: "Corrected Ca",
    specialties: ["nephrology", "general", "critical-care"],
    keywords: ["corrected calcium", "albumin calcium"],
    description:
      "Estimate albumin-corrected serum calcium for hypoalbuminemic patients.",
    formulaSummary: "Corrected Ca = measured Ca + 0.8 × (4 − albumin).",
    interpretation:
      "Use when albumin is abnormal; prefer ionized calcium when available in critical illness.",
    limitations:
      "Correction equations are imperfect; acid-base status affects ionized fraction.",
    references: [{ label: "Payne et al. / classic albumin correction" }],
    faqs: [
      {
        question: "Is ionized calcium better?",
        answer:
          "Yes in many ICU and acute settings—directly measures physiologically active calcium.",
      },
    ],
    related: ["anion-gap", "egfr-ckd-epi", "corrected-sodium"],
    Component: CorrectedCalciumCalculator,
  },
  {
    slug: "corrected-phenytoin",
    title: "Corrected Phenytoin",
    shortName: "Phenytoin",
    specialties: ["neurology", "critical-care", "general"],
    keywords: ["corrected phenytoin", "sheiner-tozer", "dilantin level"],
    description:
      "Adjust total phenytoin concentration for hypoalbuminemia using the Sheiner–Tozer equation.",
    formulaSummary:
      "Corrected = measured / [(0.2 or 0.1)×albumin + 0.1]. Use 0.1 when CrCl <20.",
    interpretation:
      "Compare corrected level to usual therapeutic range (~10–20 µg/mL) and clinical effect.",
    limitations:
      "Free phenytoin levels are preferred when available. Equations are estimates.",
    references: [{ label: "Sheiner–Tozer phenytoin correction" }],
    faqs: [
      {
        question: "When use the 0.1 factor?",
        answer: "Typically when creatinine clearance is below 20 mL/min.",
      },
    ],
    related: ["cockcroft-gault", "corrected-calcium"],
    Component: CorrectedPhenytoinCalculator,
  },
  {
    slug: "corrected-qt",
    title: "Corrected QT (QTc)",
    shortName: "QTc",
    specialties: ["cardiology", "emergency-medicine"],
    keywords: ["qtc", "corrected qt", "bazett", "fridericia"],
    description:
      "Correct the QT interval for heart rate using Bazett or Fridericia formulas.",
    formulaSummary:
      "Bazett: QTc = QT / √RR. Fridericia: QTc = QT / RR^(1/3), with RR in seconds.",
    interpretation:
      "Prolongation thresholds vary by sex and setting; ≥500 ms raises concern for arrhythmia risk.",
    limitations:
      "Bazett overcorrects at high HR; measurement technique and U waves matter.",
    references: [
      { label: "Bazett HC; Fridericia LS (historical formulas)" },
      { label: "AHA/ACC QT measurement statements" },
    ],
    faqs: [
      {
        question: "How do I get RR from heart rate?",
        answer: "RR (ms) ≈ 60,000 / heart rate (bpm).",
      },
    ],
    related: ["heart-score", "cha2ds2-vasc"],
    Component: CorrectedQtCalculator,
  },
  {
    slug: "corrected-sodium",
    title: "Corrected Sodium (Hyperglycemia)",
    shortName: "Corrected Na",
    specialties: ["nephrology", "critical-care", "emergency-medicine", "general"],
    keywords: ["corrected sodium", "hyperglycemia sodium", "pseudohyponatremia"],
    description:
      "Correct measured sodium for hyperglycemia using Katz (1.6) or Hillier (2.4) factors.",
    formulaSummary:
      "Corrected Na ≈ measured Na + factor × (glucose − 100) / 100.",
    interpretation:
      "Helps interpret true sodium status in marked hyperglycemia (e.g., HHS).",
    limitations:
      "Does not replace clinical assessment of volume status or tonicity.",
    references: [
      { label: "Katz MA. Hyperglycemia correction factor" },
      { label: "Hillier TA et al. Alternative 2.4 factor" },
    ],
    faqs: [
      {
        question: "Which factor is better?",
        answer:
          "1.6 is classic; 2.4 may better fit higher glucose ranges. Follow institutional preference.",
      },
    ],
    related: ["osmolality", "free-water-deficit", "anion-gap"],
    Component: CorrectedSodiumCalculator,
  },
  {
    slug: "curb-65",
    title: "CURB-65 Pneumonia Severity",
    shortName: "CURB-65",
    specialties: ["pulmonology", "emergency-medicine", "general"],
    keywords: ["curb-65", "pneumonia severity", "cap"],
    description:
      "Stratify community-acquired pneumonia severity and site-of-care decisions using CURB-65.",
    formulaSummary:
      "Confusion, Urea >7 mmol/L, RR ≥30, low BP, age ≥65 — one point each.",
    interpretation:
      "0–1 often outpatient candidates; 2 consider short stay / supervised care; ≥3 higher mortality risk and likely inpatient / critical care assessment.",
    limitations:
      "Does not replace clinical judgment, oxygenation, comorbidities, or social factors.",
    references: [
      { label: "Lim WS et al. CURB-65. Thorax." },
      { label: "ATS/IDSA CAP guidelines" },
    ],
    faqs: [
      {
        question: "What urea cutoff is used?",
        answer: "Urea >7 mmol/L (approximately BUN >19 mg/dL).",
      },
    ],
    related: ["qsofa", "wells-pe", "aa-gradient"],
    Component: Curb65Calculator,
  },
  {
    slug: "edd-ega",
    title: "EDD & EGA Calculator (from LMP)",
    shortName: "EDD / EGA",
    specialties: ["obstetrics-gynecology"],
    keywords: [
      "edd",
      "ega",
      "estimated due date",
      "gestational age",
      "pregnancy wheel",
      "lmp",
    ],
    description:
      "Calculate estimated due date and current estimated gestational age from the first day of the last menstrual period.",
    formulaSummary:
      "EDD = LMP + 280 days (Naegele). EGA = days from LMP to the as-of date, expressed as weeks + days.",
    interpretation:
      "Dating by certain LMP assumes a 28-day cycle with ovulation on day 14. Prefer early ultrasound dating when dates are uncertain.",
    limitations:
      "Irregular cycles, recent hormonal contraception, and breastfeeding can make LMP dating unreliable.",
    references: [
      { label: "ACOG Committee Opinion on dating pregnancy" },
      { label: "Naegele’s rule (classic obstetric dating)" },
    ],
    faqs: [
      {
        question: "How is EDD calculated?",
        answer:
          "Add 280 days (40 weeks) to the first day of the last menstrual period.",
      },
      {
        question: "Should ultrasound override LMP?",
        answer:
          "When LMP is uncertain or ultrasound differs substantially, follow institutional / ACOG dating criteria.",
      },
    ],
    related: ["apgar", "bishop-score", "bmi"],
    Component: EddEgaCalculator,
  },
  {
    slug: "egfr-ckd-epi",
    title: "eGFR Calculator (CKD-EPI 2021)",
    shortName: "eGFR",
    specialties: ["nephrology", "general"],
    keywords: ["egfr", "ckd-epi", "kidney function", "creatinine clearance"],
    description:
      "Estimate glomerular filtration rate with the race-free CKD-EPI 2021 creatinine equation and view CKD stage banding.",
    formulaSummary:
      "eGFR = 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^Age × (1.012 if female), where κ/α differ by sex.",
    interpretation:
      "Map eGFR to KDIGO G stages (G1–G5). Staging also depends on albuminuria and clinical context.",
    limitations:
      "Less accurate at extremes of muscle mass, amputation, pregnancy, and rapidly changing creatinine. Confirm with measured GFR when decisions are high-stakes.",
    references: [
      {
        label: "Inker LA et al. CKD-EPI 2021. NEJM.",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2107347",
      },
      { label: "KDIGO CKD Guideline" },
    ],
    faqs: [
      {
        question: "Is this the race-free eGFR equation?",
        answer:
          "Yes. This tool uses CKD-EPI 2021 creatinine, which does not include a race coefficient.",
      },
      {
        question: "What units does creatinine use?",
        answer:
          "Enter serum creatinine in mg/dL. Convert µmol/L by dividing by 88.4.",
      },
    ],
    related: ["cockcroft-gault", "corrected-calcium", "fena", "ibw"],
    Component: EgfrCalculator,
  },
  {
    slug: "fena",
    title: "FENa (Fractional Excretion of Sodium)",
    shortName: "FENa",
    specialties: ["nephrology", "critical-care"],
    keywords: ["fena", "fractional excretion sodium", "aki"],
    description:
      "Calculate fractional excretion of sodium to help differentiate prerenal from intrinsic AKI patterns.",
    formulaSummary: "FENa (%) = (UNa/PNa) ÷ (UCr/PCr) × 100.",
    interpretation:
      "In oliguric AKI, FENa <1% often suggests prerenal physiology; >2% often suggests ATN — many exceptions.",
    limitations:
      "Diuretics, CKD, contrast, and sepsis confound FENa. Not definitive alone.",
    references: [{ label: "Classic FENa literature in AKI" }],
    faqs: [
      {
        question: "Can I use FENa on diuretics?",
        answer:
          "Loop diuretics raise FENa; consider FEUrea or clinical context instead.",
      },
    ],
    related: ["egfr-ckd-epi", "free-water-deficit", "anion-gap"],
    Component: FenaCalculator,
  },
  {
    slug: "free-water-deficit",
    title: "Free Water Deficit",
    shortName: "Free Water Deficit",
    specialties: ["nephrology", "critical-care", "emergency-medicine"],
    keywords: ["free water deficit", "hypernatremia", "tbw"],
    description:
      "Estimate free water deficit in hypernatremia for replacement planning.",
    formulaSummary: "Deficit = TBW × (Na/desired Na − 1); TBW ≈ 0.6×wt (men) or 0.5×wt (women).",
    interpretation:
      "Guides total free water need; correct sodium slowly to avoid cerebral edema.",
    limitations:
      "TBW fraction varies with age and habitus; ongoing losses must be replaced separately.",
    references: [{ label: "Standard hypernatremia free water deficit formula" }],
    faqs: [
      {
        question: "How fast should sodium fall?",
        answer:
          "Typically aim for cautious correction (often ≤10–12 mEq/L/day unless acute and symptomatic — follow guidelines).",
      },
    ],
    related: ["corrected-sodium", "osmolality", "maintenance-fluids"],
    Component: FreeWaterDeficitCalculator,
  },
  {
    slug: "gcs",
    title: "Glasgow Coma Scale (GCS)",
    shortName: "GCS",
    specialties: ["neurology", "critical-care", "emergency-medicine", "surgery"],
    keywords: ["gcs", "glasgow coma scale", "coma score", "trauma"],
    description:
      "Score eye, verbal, and motor responses for rapid neurologic assessment in trauma and critical care.",
    formulaSummary: "GCS = Eye (1–4) + Verbal (1–5) + Motor (1–6); total 3–15.",
    interpretation:
      "13–15 mild, 9–12 moderate, ≤8 severe (often airway protection threshold in trauma protocols).",
    limitations:
      "Intubation, sedation, facial trauma, and language barriers confound components—document modifiers.",
    references: [
      { label: "Teasdale G, Jennett B. Lancet 1974." },
      { label: "GCS official site / NICE head injury guidance" },
    ],
    faqs: [
      {
        question: "What is a normal GCS?",
        answer: "A fully alert person scores 15 (E4 V5 M6).",
      },
    ],
    related: ["qsofa", "burns-parkland"],
    Component: GcsCalculator,
  },
  {
    slug: "glasgow-blatchford",
    title: "Glasgow-Blatchford Score (UGIB)",
    shortName: "GBS",
    specialties: ["gastroenterology", "emergency-medicine"],
    keywords: ["glasgow blatchford", "gbs", "upper gi bleed"],
    description:
      "Risk-stratify upper GI bleeding for need for intervention and safe outpatient management.",
    formulaSummary:
      "Points from BUN, hemoglobin, SBP, heart rate, melena, syncope, liver disease, and heart failure.",
    interpretation:
      "Score 0 identifies very low-risk patients often suitable for outpatient care in validated pathways.",
    limitations:
      "Does not replace resuscitation or endoscopy judgment for unstable patients.",
    references: [{ label: "Blatchford O et al. Lancet. GBS." }],
    faqs: [
      {
        question: "What does score 0 mean?",
        answer:
          "Very low risk of needing hospital-based intervention in appropriate low-risk pathways.",
      },
    ],
    related: ["child-pugh", "meld-na", "map"],
    Component: GlasgowBlatchfordCalculator,
  },
  {
    slug: "has-bled",
    title: "HAS-BLED Bleeding Risk Score",
    shortName: "HAS-BLED",
    specialties: ["cardiology", "general"],
    keywords: ["has-bled", "bleeding risk", "anticoagulation"],
    description:
      "Estimate major bleeding risk in patients on anticoagulation for atrial fibrillation.",
    formulaSummary:
      "One point each for hypertension, abnormal renal/liver function, stroke, bleeding history, labile INR, elderly, drugs, and alcohol (max 9).",
    interpretation:
      "Scores ≥3 indicate high bleeding risk and warrant caution, reversible risk-factor modification, and closer follow-up—not automatic exclusion of anticoagulation.",
    limitations:
      "Labile INR applies mainly to warfarin. DOAC-specific bleeding tools may add nuance.",
    references: [{ label: "Pisters R et al. HAS-BLED. Chest." }],
    faqs: [
      {
        question: "Should a high HAS-BLED stop anticoagulation?",
        answer:
          "Not automatically. Address modifiable risks and compare with stroke risk (CHA₂DS₂-VASc).",
      },
    ],
    related: ["cha2ds2-vasc"],
    Component: HasBledCalculator,
  },
  {
    slug: "heart-score",
    title: "HEART Score for Chest Pain",
    shortName: "HEART",
    specialties: ["emergency-medicine", "cardiology"],
    keywords: ["heart score", "chest pain", "acs risk"],
    description:
      "Risk-stratify ED chest pain for short-term major adverse cardiac events using HEART.",
    formulaSummary:
      "History, ECG, Age, Risk factors, Troponin — each 0–2; total 0–10.",
    interpretation:
      "0–3 low risk, 4–6 moderate, 7–10 high risk pathways for disposition and further testing.",
    limitations:
      "Requires reliable troponin assay interpretation and ECG skill; not for STEMI pathways.",
    references: [{ label: "Six AJ et al. HEART score" }],
    faqs: [
      {
        question: "Can low HEART discharge everyone?",
        answer:
          "Only within validated institutional pathways that include follow-up and exclusion criteria.",
      },
    ],
    related: ["timi-ua-nstemi", "wells-pe", "cha2ds2-vasc", "corrected-qt"],
    Component: HeartScoreCalculator,
  },
  {
    slug: "homa-ir",
    title: "HOMA-IR",
    shortName: "HOMA-IR",
    specialties: ["general"],
    keywords: ["homa-ir", "insulin resistance", "diabetes"],
    description:
      "Estimate insulin resistance from fasting glucose and insulin (HOMA-IR).",
    formulaSummary: "HOMA-IR = (glucose mg/dL × insulin µU/mL) / 405.",
    interpretation:
      "Higher values suggest greater insulin resistance; cutoffs are assay- and population-specific.",
    limitations:
      "Not a diagnostic criterion for diabetes; fasting samples required.",
    references: [{ label: "Matthews DR et al. HOMA model" }],
    faqs: [
      {
        question: "What is a normal HOMA-IR?",
        answer:
          "Often <1.9–2.0 is considered more insulin-sensitive, but local reference ranges vary.",
      },
    ],
    related: ["bmi", "ldl-friedewald"],
    Component: HomaIrCalculator,
  },
  {
    slug: "ibw",
    title: "Ideal Body Weight (Devine)",
    shortName: "IBW",
    specialties: ["general", "surgery", "critical-care"],
    keywords: ["ideal body weight", "devine", "adjusted body weight", "ibw"],
    description:
      "Calculate Devine ideal body weight, adjusted body weight, and estimated lean body weight.",
    formulaSummary:
      "IBW men = 50 + 2.3×(in−60); women = 45.5 + 2.3×(in−60). AdjBW = IBW + 0.4×(ABW−IBW).",
    interpretation:
      "Used for tidal volume targets, some antimicrobial dosing, and nutrition estimates.",
    limitations:
      "Always follow drug-specific dosing references; IBW is an estimate.",
    references: [
      { label: "Devine BJ. Ideal body weight" },
      { label: "Boer P. Lean body mass estimation" },
    ],
    faqs: [
      {
        question: "When use adjusted body weight?",
        answer:
          "Often for hydrophilic drugs in obesity when policy specifies AdjBW = IBW + 0.4×(ABW−IBW).",
      },
    ],
    related: ["bsa", "bmi", "cockcroft-gault", "burns-parkland"],
    Component: IbwCalculator,
  },
  {
    slug: "ldl-friedewald",
    title: "LDL Cholesterol (Friedewald)",
    shortName: "LDL",
    specialties: ["cardiology", "general"],
    keywords: ["ldl", "friedewald", "cholesterol"],
    description:
      "Estimate LDL-C from total cholesterol, HDL, and triglycerides using Friedewald.",
    formulaSummary: "LDL = TC − HDL − TG/5 (mg/dL). Invalid if TG ≥400.",
    interpretation:
      "Use for routine lipid panels when triglycerides are not markedly elevated.",
    limitations:
      "Inaccurate with TG ≥400, non-fasting extremes, and some dyslipidemias — use direct LDL.",
    references: [{ label: "Friedewald WT et al. Clin Chem." }],
    faqs: [
      {
        question: "Why invalid above TG 400?",
        answer:
          "The VLDL ≈ TG/5 assumption breaks down at high triglyceride levels.",
      },
    ],
    related: ["homa-ir", "bmi", "cha2ds2-vasc"],
    Component: LdlFriedewaldCalculator,
  },
  {
    slug: "maintenance-fluids",
    title: "Maintenance Fluids (4-2-1)",
    shortName: "Maintenance Fluids",
    specialties: ["pediatrics", "general", "surgery", "critical-care"],
    keywords: ["maintenance fluids", "holiday segar", "4-2-1", "iv fluids"],
    description:
      "Estimate hourly and daily maintenance IV fluid rates with the Holiday–Segar / 4-2-1 rule.",
    formulaSummary:
      "4 mL/kg/h for first 10 kg, 2 mL/kg/h for next 10 kg, 1 mL/kg/h thereafter.",
    interpretation:
      "Starting maintenance estimate only — adjust for deficits, losses, cardiac/renal disease, and electrolytes.",
    limitations:
      "Not for resuscitation. Neonatal and ICU patients need tailored regimens.",
    references: [{ label: "Holiday MA, Segar WE. Pediatrics. Maintenance fluids." }],
    faqs: [
      {
        question: "Is 4-2-1 the same as Holiday–Segar?",
        answer:
          "Yes — 4-2-1 is the hourly form of the classic Holiday–Segar daily method.",
      },
    ],
    related: ["burns-parkland", "free-water-deficit", "bsa"],
    Component: MaintenanceFluidsCalculator,
  },
  {
    slug: "map",
    title: "Mean Arterial Pressure (MAP)",
    shortName: "MAP",
    specialties: ["critical-care", "emergency-medicine", "cardiology"],
    keywords: ["map", "mean arterial pressure", "perfusion"],
    description:
      "Compute mean arterial pressure from systolic and diastolic blood pressure.",
    formulaSummary: "MAP = (SBP + 2×DBP) / 3",
    interpretation:
      "Many septic shock protocols target MAP ≥65 mmHg, individualized to patient.",
    limitations:
      "Noninvasive cuff MAP may differ from arterial-line measurements.",
    references: [{ label: "Surviving Sepsis Campaign blood pressure targets" }],
    faqs: [
      {
        question: "Why weight diastolic pressure more?",
        answer:
          "Diastole occupies roughly two-thirds of the cardiac cycle at normal heart rates.",
      },
    ],
    related: ["qsofa", "burns-parkland", "glasgow-blatchford"],
    Component: MapCalculator,
  },
  {
    slug: "meld-na",
    title: "MELD-Na Score",
    shortName: "MELD-Na",
    specialties: ["gastroenterology", "critical-care"],
    keywords: ["meld", "meld-na", "liver transplant", "cirrhosis"],
    description:
      "Calculate MELD and sodium-adjusted MELD-Na for chronic liver disease severity.",
    formulaSummary:
      "MELD from creatinine, bilirubin, and INR (dialysis sets creatinine to 4). MELD-Na adjusts for hyponatremia.",
    interpretation:
      "Higher scores correlate with short-term mortality and transplant waitlist priority frameworks.",
    limitations:
      "Exceptions and regional allocation policies apply. Not a complete substitute for specialist assessment.",
    references: [
      { label: "OPTN MELD / MELD-Na documentation" },
      { label: "Kim WR et al. MELD-Na" },
    ],
    faqs: [
      {
        question: "What labs are required?",
        answer: "Bilirubin, INR, creatinine, and sodium; dialysis status.",
      },
    ],
    related: ["child-pugh", "anion-gap", "glasgow-blatchford"],
    Component: MeldCalculator,
  },
  {
    slug: "osmolality",
    title: "Serum Osmolality & Osmolar Gap",
    shortName: "Osmolality",
    specialties: ["nephrology", "critical-care", "emergency-medicine"],
    keywords: ["osmolality", "osmolar gap", "toxic alcohol"],
    description:
      "Calculate serum osmolality and optional osmolar gap for toxic alcohol and hyperosmolar workups.",
    formulaSummary:
      "Calculated = 2×Na + glucose/18 + BUN/2.8 (+ ethanol/4.6). Gap = measured − calculated.",
    interpretation:
      "Elevated gap raises concern for alcohols, acetone, or other osmoles — integrate with clinical picture.",
    limitations:
      "Units and ethanol terms vary; confirm lab methods.",
    references: [{ label: "Classic osmolar gap toxicology approach" }],
    faqs: [
      {
        question: "What gap is abnormal?",
        answer:
          "Often >10 is notable and ≥20 more concerning, depending on lab normals.",
      },
    ],
    related: ["anion-gap", "corrected-sodium", "free-water-deficit"],
    Component: OsmolalityCalculator,
  },
  {
    slug: "perc",
    title: "PERC Rule for PE",
    shortName: "PERC",
    specialties: ["emergency-medicine", "pulmonology"],
    keywords: ["perc", "pulmonary embolism rule out", "pe"],
    description:
      "Apply the PERC rule to help rule out pulmonary embolism in low-risk patients.",
    formulaSummary:
      "Eight criteria; PERC negative only if all are absent and pretest probability is already low.",
    interpretation:
      "PERC negative may avoid D-dimer/imaging in truly low-risk patients; any positive criterion means PERC cannot rule out PE.",
    limitations:
      "Do not apply when suspicion is moderate/high. Gestalt of low risk is required.",
    references: [{ label: "Kline JA et al. PERC rule" }],
    faqs: [
      {
        question: "Can PERC replace Wells?",
        answer:
          "No — PERC is a rule-out tool after you already judge risk to be low.",
      },
    ],
    related: ["wells-pe", "heart-score"],
    Component: PercCalculator,
  },
  {
    slug: "phq-9",
    title: "PHQ-9 Depression Score",
    shortName: "PHQ-9",
    specialties: ["general"],
    keywords: ["phq-9", "depression screening", "mental health"],
    description:
      "Screen and monitor depression symptom severity with the Patient Health Questionnaire-9.",
    formulaSummary: "Nine items scored 0–3; total 0–27.",
    interpretation:
      "5 mild, 10 moderate, 15 moderately severe, 20 severe. Positive item 9 requires safety assessment.",
    limitations:
      "Screening tool — not a standalone diagnosis. Follow local mental-health pathways.",
    references: [{ label: "Kroenke K et al. PHQ-9. J Gen Intern Med." }],
    faqs: [
      {
        question: "What if item 9 is positive?",
        answer:
          "Assess suicide risk immediately and follow emergency / psychiatric protocols.",
      },
    ],
    related: ["bmi", "heart-score"],
    Component: Phq9Calculator,
  },
  {
    slug: "qsofa",
    title: "qSOFA Score",
    shortName: "qSOFA",
    specialties: ["critical-care", "emergency-medicine"],
    keywords: ["qsofa", "sepsis", "sofa"],
    description:
      "Quick bedside screen for patients with suspected infection at higher risk of poor outcomes.",
    formulaSummary: "RR ≥22, SBP ≤100, altered mentation — one point each.",
    interpretation:
      "qSOFA ≥2 should prompt closer evaluation for sepsis and organ dysfunction (SOFA), not a standalone diagnosis.",
    limitations:
      "Sepsis-3 emphasizes SOFA rise; qSOFA alone has imperfect sensitivity as a screen.",
    references: [{ label: "Singer M et al. Sepsis-3. JAMA." }],
    faqs: [
      {
        question: "Is qSOFA a sepsis definition?",
        answer:
          "No. It is a bedside risk prompt; sepsis is defined by infection plus acute organ dysfunction.",
      },
    ],
    related: ["gcs", "map", "curb-65"],
    Component: QsofaCalculator,
  },
  {
    slug: "timi-ua-nstemi",
    title: "TIMI Risk Score (UA/NSTEMI)",
    shortName: "TIMI",
    specialties: ["cardiology", "emergency-medicine"],
    keywords: ["timi", "ua nstemi", "acs risk"],
    description:
      "Estimate risk in unstable angina / NSTEMI using the TIMI risk score.",
    formulaSummary: "Seven dichotomous predictors; score 0–7.",
    interpretation:
      "Higher scores correlate with higher short-term adverse cardiac event rates and inform acuity of management.",
    limitations:
      "Not for STEMI reperfusion decisions. Use with troponin pathway and guidelines.",
    references: [{ label: "Antman EM et al. TIMI UA/NSTEMI. JAMA." }],
    faqs: [
      {
        question: "Is this the STEMI TIMI score?",
        answer: "No — this is the UA/NSTEMI version (0–7).",
      },
    ],
    related: ["heart-score", "cha2ds2-vasc", "corrected-qt"],
    Component: TimiUaNstemiCalculator,
  },
  {
    slug: "wells-pe",
    title: "Wells Score for PE",
    shortName: "Wells PE",
    specialties: ["emergency-medicine", "pulmonology", "cardiology"],
    keywords: ["wells score", "pulmonary embolism", "pe probability"],
    description:
      "Estimate pretest probability of pulmonary embolism with the Wells PE criteria.",
    formulaSummary:
      "Weighted clinical criteria (DVT signs, alternative diagnosis less likely, HR >100, immobilization/surgery, prior VTE, hemoptysis, malignancy).",
    interpretation:
      "Traditional three-tier: <2 low, 2–6 moderate, >6 high. Pair with D-dimer or definitive imaging per pathway.",
    limitations:
      "Performance depends on prevalence and clinician gestalt for “alternative diagnosis less likely.”",
    references: [{ label: "Wells PS et al. PE prediction rules" }],
    faqs: [
      {
        question: "Can Wells replace imaging?",
        answer:
          "No. It guides testing strategy (D-dimer vs CTPA/VQ) within validated pathways.",
      },
    ],
    related: ["perc", "heart-score", "curb-65", "wells-dvt"],
    Component: WellsPeCalculator,
  },
  {
    slug: "pediatric-weight",
    title: "Pediatric Weight Estimation",
    shortName: "Peds Weight",
    specialties: ["pediatrics", "emergency-medicine"],
    keywords: [
      "pediatric weight",
      "apls weight",
      "luscombe",
      "best guess",
      "broselow",
      "age to weight",
    ],
    description:
      "Estimate pediatric weight from age using APLS, Luscombe & Owens, and Best Guess formulas — plus infant and neonate modes.",
    formulaSummary:
      "APLS child: (age+4)×2. Infant: age(months)/2 + 4. Luscombe: 3×age + 7. Best Guess: 2×age+8 (1–4y) or 4×age (5–14y).",
    interpretation:
      "Use as an emergency estimate when a scale is unavailable. Prefer measured weight for drug dosing whenever possible.",
    limitations:
      "Population growth changes over time; obese/underweight children diverge. Not a substitute for weighing.",
    references: [
      { label: "APLS / EPALS weight estimation teaching" },
      { label: "Luscombe M, Owens B. Arch Dis Child. Weight estimation." },
      { label: "Tinning K, Acworth J. Best Guess. Emerg Med Australas." },
    ],
    faqs: [
      {
        question: "Which formula should I use?",
        answer:
          "APLS is widely taught for ages 1–10. Luscombe & Owens and Best Guess are alternatives — compare and use local guidance.",
      },
      {
        question: "What about Broselow tape?",
        answer:
          "Broselow is length-based and preferred in many EDs when available; this tool is age-based when length is unknown.",
      },
    ],
    related: [
      "pediatric-ett",
      "mg-per-kg",
      "maintenance-fluids",
      "bsa",
      "schwartz-egfr",
    ],
    Component: PediatricWeightCalculator,
  },
  {
    slug: "pediatric-ett",
    title: "Pediatric ETT Size",
    shortName: "Peds ETT",
    specialties: ["pediatrics", "emergency-medicine", "critical-care"],
    keywords: ["ett size", "endotracheal tube", "pediatric airway"],
    description:
      "Estimate pediatric endotracheal tube internal diameter and approximate oral insertion depth from age.",
    formulaSummary:
      "Uncuffed ID ≈ age/4 + 4; cuffed ID ≈ age/4 + 3.5. Oral depth (cm) ≈ age/2 + 12.",
    interpretation:
      "Starting size only — adjust for leak, auscultation, and age-specific airway anatomy.",
    limitations:
      "Formulas are less reliable in neonates and adolescents; follow local airway carts.",
    references: [{ label: "Standard pediatric airway sizing formulas" }],
    faqs: [
      {
        question: "Cuffed or uncuffed?",
        answer:
          "Modern practice often uses cuffed tubes with careful pressure monitoring; follow local protocol.",
      },
    ],
    related: ["pediatric-weight", "gcs", "mg-per-kg"],
    Component: PediatricEttCalculator,
  },
  {
    slug: "corrected-age",
    title: "Corrected Age (Preterm)",
    shortName: "Corrected Age",
    specialties: ["pediatrics"],
    keywords: ["corrected age", "adjusted age", "preterm", "gestational age"],
    description:
      "Calculate corrected (adjusted) age for preterm infants used in growth and developmental assessment.",
    formulaSummary:
      "Corrected age = chronological age − (40 weeks − gestational age at birth).",
    interpretation:
      "Use corrected age for milestones and growth charts typically until 2 years (follow local guidance).",
    limitations:
      "Extremely preterm infants may need individualized developmental framing.",
    references: [{ label: "AAP / standard corrected-age practice" }],
    faqs: [
      {
        question: "Until what age do I correct?",
        answer:
          "Commonly until 24 months chronological age, but practices vary.",
      },
    ],
    related: ["edd-ega", "pediatric-weight", "apgar"],
    Component: CorrectedAgeCalculator,
  },
  {
    slug: "schwartz-egfr",
    title: "Schwartz Pediatric eGFR",
    shortName: "Schwartz eGFR",
    specialties: ["pediatrics", "nephrology"],
    keywords: ["schwartz", "pediatric egfr", "ckid"],
    description:
      "Estimate pediatric GFR with the Schwartz bedside equation (k × height / creatinine).",
    formulaSummary: "eGFR ≈ k × height(cm) / Scr(mg/dL).",
    interpretation:
      "k=0.413 is commonly used with IDMS-traceable creatinine (CKiD bedside).",
    limitations:
      "Less accurate at extremes; confirmatory testing may be needed for dosing/transplant decisions.",
    references: [
      { label: "Schwartz GJ et al. CKiD bedside eGFR" },
    ],
    faqs: [
      {
        question: "Adult vs Schwartz?",
        answer:
          "Use CKD-EPI for adults; Schwartz (or pediatric equations) for children.",
      },
    ],
    related: ["egfr-ckd-epi", "pediatric-weight", "cockcroft-gault"],
    Component: SchwartzEgfrCalculator,
  },
  {
    slug: "mg-per-kg",
    title: "mg/kg Dose Calculator",
    shortName: "mg/kg",
    specialties: ["pediatrics", "emergency-medicine", "general"],
    keywords: ["mg/kg", "pediatric dose", "weight based dosing"],
    description:
      "Convert a mg/kg dose and patient weight into a total milligram dose and optional volume.",
    formulaSummary: "Total mg = weight(kg) × dose(mg/kg). Volume = total mg ÷ concentration(mg/mL).",
    interpretation:
      "Generic arithmetic helper — always apply drug-specific maxima and indications.",
    limitations:
      "Does not include therapeutic ranges, renal adjustment, or formulation checks.",
    references: [{ label: "Standard weight-based dosing arithmetic" }],
    faqs: [
      {
        question: "Can this replace a formulary?",
        answer: "No — confirm every dose with an approved reference.",
      },
    ],
    related: ["pediatric-weight", "infusion-rate", "ibw"],
    Component: MgPerKgCalculator,
  },
  {
    slug: "infusion-rate",
    title: "Infusion Rate (mL/h)",
    shortName: "Infusion Rate",
    specialties: ["critical-care", "emergency-medicine", "pediatrics"],
    keywords: ["infusion rate", "mcg/kg/min", "drip rate", "pump rate"],
    description:
      "Convert mcg/kg/min or mg/kg/h infusions and bag concentration into mL/h pump rates.",
    formulaSummary:
      "mL/h = (dose in mcg/min ÷ concentration in mcg/mL) × 60.",
    interpretation:
      "Useful for vasoactive and sedative infusions once concentration is known.",
    limitations:
      "Double-check units (mcg vs mg). Confirm with pharmacy labeling.",
    references: [{ label: "Standard infusion mathematics" }],
    faqs: [
      {
        question: "What if my bag is mg/mL?",
        answer: "Select mg/mL concentration unit; the calculator converts internally.",
      },
    ],
    related: ["mg-per-kg", "pediatric-weight", "map"],
    Component: InfusionRateCalculator,
  },
  {
    slug: "allowable-blood-loss",
    title: "Allowable Blood Loss & EBV",
    shortName: "ABL / EBV",
    specialties: ["surgery", "pediatrics", "critical-care", "emergency-medicine"],
    keywords: [
      "allowable blood loss",
      "estimated blood volume",
      "abl",
      "ebv",
      "transfusion",
    ],
    description:
      "Estimate blood volume by age group and calculate allowable blood loss before a target hematocrit.",
    formulaSummary:
      "EBV = weight × age-group factor. ABL = EBV × (Hct_start − Hct_min) / Hct_start.",
    interpretation:
      "Supports intraoperative and trauma transfusion planning as a starting estimate.",
    limitations:
      "Factors vary by source; clinical bleeding and oxygen delivery dominate decisions.",
    references: [{ label: "Classic EBV/ABL perioperative estimates" }],
    faqs: [
      {
        question: "What EBV factor for children?",
        answer: "Often ~75–80 mL/kg; this tool uses 75 for child and 80 for infant.",
      },
    ],
    related: ["pediatric-weight", "burns-parkland", "anc"],
    Component: AllowableBloodLossCalculator,
  },
  {
    slug: "wells-dvt",
    title: "Wells Score for DVT",
    shortName: "Wells DVT",
    specialties: ["emergency-medicine", "general", "surgery"],
    keywords: ["wells dvt", "deep vein thrombosis", "dvt score"],
    description:
      "Estimate pretest probability of lower-extremity deep vein thrombosis with the Wells DVT criteria.",
    formulaSummary:
      "Nine clinical items (+1 each) and −2 if an alternative diagnosis is as likely.",
    interpretation:
      "<1 low, 1–2 moderate, ≥3 high probability (traditional three-tier).",
    limitations:
      "Combine with D-dimer / ultrasound pathways; gestalt still matters.",
    references: [{ label: "Wells PS et al. DVT prediction rule" }],
    faqs: [
      {
        question: "How does this differ from Wells PE?",
        answer: "Different criteria set for DVT vs pulmonary embolism.",
      },
    ],
    related: ["wells-pe", "perc"],
    Component: WellsDvtCalculator,
  },
  {
    slug: "ottawa-ankle",
    title: "Ottawa Ankle Rules",
    shortName: "Ottawa Ankle",
    specialties: ["emergency-medicine", "surgery"],
    keywords: ["ottawa ankle", "ankle xray", "foot injury"],
    description:
      "Decide whether ankle or foot radiographs are indicated after acute blunt injury using Ottawa rules.",
    formulaSummary:
      "Ankle or midfoot pain plus specified bone tenderness or inability to bear weight triggers imaging.",
    interpretation:
      "Highly sensitive for clinically significant fractures when applied correctly in adults.",
    limitations:
      "Caution in intoxication, multiple injuries, diminished sensation, and pediatric use varies.",
    references: [{ label: "Stiell IG et al. Ottawa ankle rules" }],
    faqs: [
      {
        question: "Do the rules include the foot?",
        answer: "Yes — separate midfoot criteria guide foot series imaging.",
      },
    ],
    related: ["nexus-cspine", "alvarado"],
    Component: OttawaAnkleCalculator,
  },
  {
    slug: "centor-mcisaac",
    title: "Centor / McIsaac Strep Score",
    shortName: "Centor",
    specialties: ["emergency-medicine", "pediatrics", "general"],
    keywords: ["centor", "mcisaac", "strep throat", "pharyngitis"],
    description:
      "Estimate group A strep pharyngitis probability with the modified Centor (McIsaac) score.",
    formulaSummary:
      "Exudate, nodes, fever, absent cough (+1 each) plus age modifier.",
    interpretation:
      "Low scores often need no test/antibiotics; mid scores suggest testing; high scores may warrant treatment pathways.",
    limitations:
      "Viral syndromes overlap; follow local antibiotic stewardship guidance.",
    references: [
      { label: "Centor RM et al." },
      { label: "McIsaac WJ et al. modified Centor" },
    ],
    faqs: [
      {
        question: "Why does absent cough add a point?",
        answer: "Cough suggests viral illness; its absence raises GAS likelihood.",
      },
    ],
    related: ["curb-65", "phq-9", "gad-7"],
    Component: CentorMcisaacCalculator,
  },
  {
    slug: "gad-7",
    title: "GAD-7 Anxiety Score",
    shortName: "GAD-7",
    specialties: ["general"],
    keywords: ["gad-7", "anxiety screening", "mental health"],
    description:
      "Screen and monitor generalized anxiety symptom severity with GAD-7.",
    formulaSummary: "Seven items scored 0–3; total 0–21.",
    interpretation: "5 mild, 10 moderate, 15 severe anxiety symptoms.",
    limitations: "Screening tool — not a standalone diagnosis.",
    references: [{ label: "Spitzer RL et al. GAD-7. Arch Intern Med." }],
    faqs: [
      {
        question: "How often to repeat GAD-7?",
        answer: "Often used to track response over weeks in primary care pathways.",
      },
    ],
    related: ["phq-9"],
    Component: Gad7Calculator,
  },
  {
    slug: "corrected-reticulocyte",
    title: "Corrected Reticulocyte Count",
    shortName: "Corrected Retic",
    specialties: ["general", "pediatrics"],
    keywords: ["corrected reticulocyte", "retic count", "anemia"],
    description:
      "Correct the reticulocyte percentage for anemia severity using hematocrit.",
    formulaSummary: "Corrected retic % = retic % × (patient Hct / normal Hct).",
    interpretation:
      "Helps interpret marrow response in anemia; further indices (RPI) may be used.",
    limitations:
      "Does not replace clinical hematology workup.",
    references: [{ label: "Standard hematology reticulocyte correction" }],
    faqs: [
      {
        question: "What normal Hct should I use?",
        answer: "Often 45% in adults; adjust for age/sex norms if preferred.",
      },
    ],
    related: ["anc", "allowable-blood-loss"],
    Component: CorrectedReticCalculator,
  },
  {
    slug: "sodium-deficit",
    title: "Sodium Deficit",
    shortName: "Na Deficit",
    specialties: ["nephrology", "critical-care", "emergency-medicine"],
    keywords: ["sodium deficit", "hyponatremia", "sodium replacement"],
    description:
      "Estimate sodium deficit for hyponatremia replacement planning.",
    formulaSummary: "Deficit ≈ TBW × (desired Na − current Na).",
    interpretation:
      "Guides total sodium need; correction rate and etiology dominate safe management.",
    limitations:
      "Does not account for ongoing losses or Adrogue–Madias change predictions.",
    references: [{ label: "Standard hyponatremia sodium deficit estimate" }],
    faqs: [
      {
        question: "How fast can I correct?",
        answer:
          "Limits depend on chronicity and symptoms — follow current electrolyte guidelines.",
      },
    ],
    related: ["free-water-deficit", "corrected-sodium", "osmolality"],
    Component: SodiumDeficitCalculator,
  },
  {
    slug: "bicarb-deficit",
    title: "Bicarbonate Deficit",
    shortName: "HCO₃ Deficit",
    specialties: ["nephrology", "critical-care", "emergency-medicine"],
    keywords: ["bicarbonate deficit", "metabolic acidosis", "hco3"],
    description:
      "Estimate bicarbonate deficit from weight, current HCO₃, and target.",
    formulaSummary: "Deficit ≈ weight × Vd × (desired − measured HCO₃).",
    interpretation:
      "Supports rare, selective bicarbonate therapy decisions — treat the underlying cause first.",
    limitations:
      "Vd varies with severity; overcorrection risks are real.",
    references: [{ label: "Standard bicarbonate deficit estimate" }],
    faqs: [
      {
        question: "When is bicarbonate indicated?",
        answer:
          "Selected scenarios (e.g., certain toxidromes, severe acidosis with specific indications) — not routine for all acidosis.",
      },
    ],
    related: ["anion-gap", "aa-gradient", "sodium-deficit"],
    Component: BicarbDeficitCalculator,
  },
  {
    slug: "nexus-cspine",
    title: "NEXUS C-Spine Rule",
    shortName: "NEXUS",
    specialties: ["emergency-medicine", "surgery"],
    keywords: ["nexus", "c-spine", "cervical spine clearance"],
    description:
      "Apply NEXUS low-risk criteria to help decide whether cervical spine imaging is needed after trauma.",
    formulaSummary:
      "Low risk if no midline tenderness, no intoxication, normal alertness, no focal neuro deficit, and no distracting injury.",
    interpretation:
      "If all low-risk criteria met, imaging may be unnecessary; otherwise consider imaging pathways.",
    limitations:
      "Canadian C-spine rules differ. Use judgment with extremes of age and unreliable exams.",
    references: [{ label: "Hoffman JR et al. NEXUS. NEJM." }],
    faqs: [
      {
        question: "NEXUS vs Canadian C-spine?",
        answer:
          "Both validated; institutions choose one pathway. This tool implements NEXUS.",
      },
    ],
    related: ["ottawa-ankle", "gcs"],
    Component: NexusCspineCalculator,
  },
];

/** Alphabetically sorted by title (A–Z). */
export const calculators: CalculatorMeta[] = [...calculatorList].sort((a, b) =>
  a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
);

export function getCalculator(slug: string) {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsBySpecialty(specialty: string) {
  return calculators.filter((c) =>
    c.specialties.includes(specialty as CalculatorMeta["specialties"][number]),
  );
}

export function searchCalculators(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return calculators;
  return calculators.filter((c) => {
    const hay = [
      c.title,
      c.shortName,
      c.description,
      ...c.keywords,
      ...c.specialties,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
