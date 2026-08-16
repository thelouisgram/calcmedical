import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";
import { calculators } from "@/lib/calculators/registry";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Medical Calculators",
  description:
    "Searchable directory of medical and surgical calculators: eGFR, EDD, GCS, Apgar, Parkland burns, CHA₂DS₂-VASc, MELD, pediatric weight, and more.",
  keywords: [
    "medical calculators",
    "surgical calculators",
    "egfr calculator",
    "gcs score",
    "pediatric weight",
  ],
  alternates: { canonical: `${siteConfig.url}/calculators` },
  openGraph: {
    title: `All Medical Calculators | ${siteConfig.name}`,
    description:
      "Searchable directory of medical and surgical calculators for clinicians.",
    url: `${siteConfig.url}/calculators`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function CalculatorsPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const items = calculators.map(
    ({ slug, title, shortName, description, keywords, specialties }) => ({
      slug,
      title,
      shortName,
      description,
      keywords,
      specialties,
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link href="/" className="hover:text-teal-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700">Calculators</li>
        </ol>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
        All calculators
      </h1>
      <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-slate-700">
        <p>
          Browse {items.length} self-contained medical and surgical calculators.
          Each page includes medical context, the interactive tool, formula
          details, interpretation guidance, limitations, FAQs, and references.
        </p>
        <p>
          Search by name or keyword, or filter by specialty using the links
          below the search box. For editorial standards and how we verify
          formulas, see{" "}
          <Link href="/about" className="text-teal-800 underline">
            About {siteConfig.name}
          </Link>
          .
        </p>
      </div>
      <div className="mt-8">
        <CalculatorSearch items={items} initialQuery={q} />
      </div>
    </div>
  );
}
