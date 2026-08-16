export const specialties = [
  {
    slug: "emergency-medicine",
    name: "Emergency Medicine",
    description: "Trauma, triage, and acute risk scores used in the ED.",
    overview:
      "Emergency medicine calculators help standardize triage, risk stratification, and rule-out pathways when time is limited. Tools here include Wells and PERC for pulmonary embolism, HEART and TIMI for chest pain, qSOFA for sepsis screening, Ottawa ankle rules, and pediatric weight estimation for resuscitation. Each page documents the score components, evidence limitations, and when a negative result still requires clinical follow-up.",
  },
  {
    slug: "obstetrics-gynecology",
    name: "Obstetrics & Gynecology",
    description: "Pregnancy dating, labor scores, and perinatal tools.",
    overview:
      "Obstetric calculators support dating, labor assessment, and neonatal evaluation. Estimated due date and gestational age from LMP, Bishop score for cervical favorability, Apgar scoring, and corrected age for preterm infants are common ward and clinic tasks. These tools assume standard dating conventions; ultrasound dating should override LMP when available per local obstetric guidelines.",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    description: "Kidney function, electrolytes, and renal dosing helpers.",
    overview:
      "Renal calculators estimate glomerular filtration rate, fractional excretion of sodium, free water deficit, and sodium correction needs. CKD-EPI 2021, Cockcroft–Gault, Schwartz pediatric eGFR, and electrolyte helpers appear frequently on medicine and ICU rounds. Results must be interpreted with muscle mass, diuretic use, and acute versus chronic kidney injury context.",
  },
  {
    slug: "critical-care",
    name: "Critical Care",
    description: "ICU severity scores and organ dysfunction tools.",
    overview:
      "Critical care scores summarize organ dysfunction, bleeding risk, and illness severity for communication across teams. qSOFA, CURB-65, MAP, anion gap, and resuscitation calculators support—but do not replace—bedside assessment, lactate trends, imaging, and source control. Always document the clinical picture alongside any numeric score.",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    description: "Stroke prevention, ACS risk, and cardiac indices.",
    overview:
      "Cardiology calculators include CHA₂DS₂-VASc and HAS-BLED for anticoagulation discussions, HEART and TIMI for acute coronary syndromes, corrected QT, LDL estimation, and hemodynamic indices. Scores guide shared decision-making with patients; they should be applied with ECG, troponin, echocardiography, and guideline-directed therapy.",
  },
  {
    slug: "surgery",
    name: "Surgery & Trauma",
    description: "Burn resuscitation, surgical risk, and fluids.",
    overview:
      "Surgical and trauma calculators cover burn TBSA and Parkland resuscitation, allowable blood loss, Alvarado appendicitis score, Wells DVT, and perioperative fluid estimates. Burn and blood loss tools in particular require frequent reassessment as exam findings and response to resuscitation evolve.",
  },
  {
    slug: "neurology",
    name: "Neurology",
    description: "Coma scales and neurologic assessment scores.",
    overview:
      "Neurology tools include the Glasgow Coma Scale for serial neurologic assessment and related scores used in acute care. GCS should be trended over time and paired with pupil exam, imaging, and cause-specific treatment pathways.",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Neonatal and pediatric medical calculators.",
    overview:
      "Pediatric calculators emphasize weight-based dosing, airway sizing, and age-adjusted renal function. Weight estimation, ETT size, mg/kg dosing, maintenance fluids, Schwartz eGFR, and corrected age tools are included with explicit notes on when measured weight or length must be used instead of formulas.",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    description: "Respiratory severity and pneumonia scores.",
    overview:
      "Pulmonary calculators support A–a gradient interpretation, pneumonia severity with CURB-65, and related respiratory indices. FiO₂, ventilator settings, and underlying cardiopulmonary disease modify how these results should be applied.",
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    description: "Liver disease and GI bleed risk tools.",
    overview:
      "Gastroenterology and hepatology calculators include MELD-Na, Child-Pugh, Glasgow-Blatchford for upper GI bleed risk, and HOMA-IR. Transplant referral and endoscopy timing depend on institutional pathways in addition to calculated scores.",
  },
  {
    slug: "general",
    name: "General Medicine",
    description: "Everyday internal medicine calculators.",
    overview:
      "General medicine calculators cover BMI, BSA, ideal body weight, anion gap, corrected calcium and sodium, PHQ-9, GAD-7, and other everyday ward and clinic tools. They are intended for adult medicine workflows unless a pediatric-specific page is linked.",
  },
] as const;

export type SpecialtySlug = (typeof specialties)[number]["slug"];

export function getSpecialty(slug: string) {
  return specialties.find((s) => s.slug === slug);
}
