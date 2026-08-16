import type { CalculatorMeta } from "@/lib/calculators/types";
import { getSpecialty } from "@/lib/specialties";

const specialtyContext: Record<string, string> = {
  "emergency-medicine":
    "Emergency clinicians use this at triage, resuscitation, and disposition to standardize risk communication across shifts.",
  nephrology:
    "Nephrology and medicine teams use this when interpreting renal function, electrolytes, or fluid plans.",
  "critical-care":
    "ICU teams apply this alongside hemodynamic data, labs, and serial exams — not as a stand-alone decision rule.",
  cardiology:
    "Cardiology and medicine teams use this with ECG, biomarkers, and guideline-directed therapy context.",
  surgery:
    "Surgical and trauma teams use this for operative planning, resuscitation, and perioperative risk framing.",
  pediatrics:
    "Pediatric teams must confirm age-appropriate references and weight-based dosing with local protocols.",
  "obstetrics-gynecology":
    "Obstetric teams pair dating and labor scores with ultrasound data and institutional obstetric pathways.",
  pulmonology:
    "Pulmonary teams interpret results with ABG context, imaging, and ventilator parameters.",
  gastroenterology:
    "GI and hepatology teams use this with endoscopy findings, labs, and transplant referral criteria.",
  neurology:
    "Neurology and acute care teams combine scores with imaging and serial neurologic exams.",
  general:
    "Primary and hospital medicine teams use this for everyday internal medicine workflows.",
};

export function getClinicalContext(calc: CalculatorMeta): string[] {
  const primary = calc.specialties[0];
  const spec = primary ? getSpecialty(primary) : undefined;
  const contextLine =
    (primary && specialtyContext[primary]) ||
    "Clinicians use this tool as structured decision support alongside the full clinical picture.";

  return [
    calc.description,
    contextLine,
    `This page explains the ${calc.shortName} formula, how to interpret the output, known limitations, and peer-reviewed references so you can verify results against primary sources and local protocols.`,
    spec
      ? `It is grouped under ${spec.name} because ${spec.description.toLowerCase()}`
      : "Browse related calculators below when you need adjacent lab values, risk scores, or dosing helpers.",
  ];
}

export function getHowToUseSteps(calc: CalculatorMeta): string[] {
  return [
    `Enter the values requested by the ${calc.shortName} calculator using the units shown beside each field.`,
    "Review the calculated result and read the interpretation section before acting on the output.",
    "Check limitations and references if the result will change management, dosing, or disposition.",
    "Use the related calculators section when you need supporting values (for example electrolytes, weight, or complementary risk scores).",
  ];
}

export function getSupplementalFaqs(
  calc: CalculatorMeta,
): { question: string; answer: string }[] {
  const extras: { question: string; answer: string }[] = [];

  if (calc.faqs.length < 3) {
    extras.push({
      question: `Is the ${calc.shortName} result enough to make a treatment decision?`,
      answer:
        "No. Calculators support medical decision-making but do not replace examination, shared decision-making, institutional protocols, or consultant input when stakes are high.",
    });
  }

  if (calc.faqs.length < 3) {
    extras.push({
      question: "Does Calcmedical store the values I type in?",
      answer:
        "Inputs are processed in your browser for this session. We do not ask for patient names or medical record numbers. See our privacy policy for hosting and analytics details.",
    });
  }

  if (calc.faqs.length < 2) {
    extras.push({
      question: `When should I avoid relying on ${calc.shortName}?`,
      answer: calc.limitations,
    });
  }

  const seen = new Set(calc.faqs.map((f) => f.question));
  return extras.filter((f) => !seen.has(f.question)).slice(0, 3 - calc.faqs.length);
}
