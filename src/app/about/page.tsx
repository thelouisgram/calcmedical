import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}: fast, self-contained medical and surgical calculators for clinicians.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950">
        About {siteConfig.name}
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
        <p>
          {siteConfig.name} is a collection of clinical calculators spanning
          medicine and surgery. Every formula runs in your browser — no account,
          no patient data upload, and no dependency on a live calculation API.
        </p>
        <p>
          Pages are structured for clarity and search: each tool includes the
          interactive calculator, formula summary, interpretation notes,
          limitations, FAQs, and references.
        </p>
        <p>
          The project is built with Next.js and Tailwind CSS, statically
          generated for speed, and open to indexing by search engines and AI
          retrieval crawlers.
        </p>
      </div>
    </div>
  );
}
