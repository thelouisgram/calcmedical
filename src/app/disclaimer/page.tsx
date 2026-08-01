import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: `Medical disclaimer for ${siteConfig.name} clinical calculators.`,
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950">
        Medical disclaimer
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
        <p>
          Content and calculators on {siteConfig.name} are for education and
          clinical decision support only. They are not medical advice, diagnosis,
          or a substitute for professional judgment, local protocols, or primary
          literature.
        </p>
        <p>
          Drug dosing, resuscitation volumes, risk scores, and lab
          interpretations can be wrong if inputs are incorrect, units differ, or
          patient factors fall outside validation populations. Always verify
          critical calculations independently.
        </p>
        <p>
          By using this site you agree that the operators are not liable for
          decisions made based on calculator output. If you are a patient, seek
          care from a licensed clinician.
        </p>
      </div>
    </div>
  );
}
