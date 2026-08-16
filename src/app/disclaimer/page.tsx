import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: `Medical disclaimer for ${siteConfig.name}: educational use only, not medical advice.`,
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
        Medical disclaimer
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
        <p>
          Content on {siteConfig.name} — including calculators, formula
          summaries, interpretation text, and FAQs — is provided for{" "}
          <strong>education and clinical decision support only</strong>. It is
          not medical advice, diagnosis, treatment, or a doctor–patient
          relationship.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            No substitute for professional judgment
          </h2>
          <p className="mt-3">
            Clinical scores and equations simplify complex physiology. They can
            be wrong when inputs are incorrect, units differ, populations differ
            from validation cohorts, or disease evolves during care. Always
            verify critical results independently before dosing, transfusing,
            transferring, or discharging patients.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Emergency situations
          </h2>
          <p className="mt-3">
            If you think you or someone else may have a medical emergency, call
            your local emergency number immediately. Do not rely on this website
            for urgent care decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Patients and caregivers
          </h2>
          <p className="mt-3">
            These tools are written for clinicians and trained users. Patients
            and caregivers should discuss results and treatment options with a
            licensed healthcare professional who knows the full clinical
            context.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Accuracy and updates
          </h2>
          <p className="mt-3">
            We work to keep formulas aligned with current references, but medicine
            changes. {siteConfig.name} makes no warranty that content is complete,
            current, or error-free. Use institutional protocols and primary
            literature for high-stakes decisions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Limitation of liability
          </h2>
          <p className="mt-3">
            By using this site you agree that {siteConfig.operatorName} and its
            operators are not liable for any harm, loss, or decisions arising from
            use of the calculators or content. If you do not agree, do not use
            the site.
          </p>
        </section>

        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          Questions or corrections?{" "}
          <Link href="/contact" className="font-medium underline">
            Contact us
          </Link>
          . See also our{" "}
          <Link href="/about" className="font-medium underline">
            about page
          </Link>{" "}
          for editorial standards.
        </p>
      </div>
    </div>
  );
}
