export const specialties = [
  {
    slug: "emergency-medicine",
    name: "Emergency Medicine",
    description: "Trauma, triage, and acute risk scores used in the ED.",
  },
  {
    slug: "obstetrics-gynecology",
    name: "Obstetrics & Gynecology",
    description: "Pregnancy dating, labor scores, and perinatal tools.",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    description: "Kidney function, electrolytes, and renal dosing helpers.",
  },
  {
    slug: "critical-care",
    name: "Critical Care",
    description: "ICU severity scores and organ dysfunction tools.",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    description: "Stroke prevention, ACS risk, and cardiac indices.",
  },
  {
    slug: "surgery",
    name: "Surgery & Trauma",
    description: "Burn resuscitation, surgical risk, and fluids.",
  },
  {
    slug: "neurology",
    name: "Neurology",
    description: "Coma scales and neurologic assessment scores.",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    description: "Neonatal and pediatric clinical calculators.",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    description: "Respiratory severity and pneumonia scores.",
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    description: "Liver disease and GI bleed risk tools.",
  },
  {
    slug: "general",
    name: "General Medicine",
    description: "Everyday internal medicine calculators.",
  },
] as const;

export type SpecialtySlug = (typeof specialties)[number]["slug"];

export function getSpecialty(slug: string) {
  return specialties.find((s) => s.slug === slug);
}
