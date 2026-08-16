import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/calculators/registry";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}: editorial standards, how medical calculators are built, and who maintains the site.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
        About {siteConfig.name}
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            What this site is
          </h2>
          <p className="mt-3">
            {siteConfig.name} is a free reference library of{" "}
            {calculators.length} medical and surgical calculators for clinicians,
            trainees, and educators. Each tool runs entirely in your browser —
            no account, no patient identifiers, and no server-side calculation
            of medical inputs.
          </p>
          <p className="mt-3">
            The goal is practical decision support at the bedside: clear inputs,
            immediate results, cited formulas, and honest limitations — not a
            substitute for examination, institutional protocols, or consultant
            judgment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            How pages are structured
          </h2>
          <p className="mt-3">
            Every calculator page includes medical context, step-by-step usage
            guidance, the interactive tool, formula summary, interpretation
            notes, limitations, frequently asked questions, and references.
            Specialty hubs group related tools (for example nephrology, emergency
            medicine, or obstetrics) with overview text explaining when those
            scores are commonly used.
          </p>
          <p className="mt-3">
            We prioritize widely validated equations and scores used in hospital
            medicine — CKD-EPI eGFR, Parkland burns resuscitation, GCS, CHA₂DS₂-VASc,
            Wells criteria, and similar staples — and document when pediatric,
            pregnancy, or local unit conventions require extra caution.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Editorial standards
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Formulas are traced to primary literature or widely accepted
              clinical references linked on each page.
            </li>
            <li>
              Limitations and confounders are stated explicitly rather than
              hidden in footnotes.
            </li>
            <li>
              Pages are written for clinicians; we do not provide personalized
              medical advice or patient-specific treatment plans.
            </li>
            <li>
              When guidelines or equations change (for example race-free eGFR),
              affected pages are updated and dated in release notes via site
              updates.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Privacy and data
          </h2>
          <p className="mt-3">
            Calculator values you enter stay on your device for that session.
            Favorites are stored in browser local storage only. We do not
            collect names, dates of birth, or medical record numbers through
            the calculators. Read the full{" "}
            <Link href="/privacy" className="text-teal-800 underline">
              privacy policy
            </Link>{" "}
            for hosting, analytics, and advertising disclosures.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Contact and corrections
          </h2>
          <p className="mt-3">
            Found an error, outdated equation, or unclear wording? We welcome
            corrections. Reach us through the{" "}
            <Link href="/contact" className="text-teal-800 underline">
              contact form
            </Link>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-teal-800 underline"
            >
              {siteConfig.contactEmail}
            </a>
            . Please include the calculator name, what you expected, and a
            reference if available.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="font-display text-lg font-semibold text-teal-950">
            Important notice
          </h2>
          <p className="mt-2 text-sm">
            {siteConfig.name} is for education and clinical decision support
            only. See the{" "}
            <Link href="/disclaimer" className="text-teal-800 underline">
              medical disclaimer
            </Link>
            . If you are a patient, contact a licensed clinician — do not use
            these tools to self-diagnose or change treatment without medical
            supervision.
          </p>
        </section>
      </div>
    </div>
  );
}
