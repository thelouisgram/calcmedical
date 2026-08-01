import type { SpecialtySlug } from "@/lib/specialties";
import type { ComponentType } from "react";

export type CalculatorMeta = {
  slug: string;
  title: string;
  shortName: string;
  specialties: SpecialtySlug[];
  keywords: string[];
  description: string;
  formulaSummary: string;
  interpretation: string;
  limitations: string;
  references: { label: string; url?: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
  Component: ComponentType;
};
