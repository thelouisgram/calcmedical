import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";
import { getCalculatorsBySpecialty } from "@/lib/calculators/registry";
import { specialtyJsonLd } from "@/lib/seo/jsonld";
import { getSpecialty, specialties } from "@/lib/specialties";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ specialty: string }>;
};

export function generateStaticParams() {
  return specialties.map((s) => ({ specialty: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty } = await params;
  const spec = getSpecialty(specialty);
  if (!spec) return {};

  const calcs = getCalculatorsBySpecialty(spec.slug);
  const names = calcs
    .slice(0, 8)
    .map((c) => c.shortName)
    .join(", ");
  const title = `${spec.name} Medical Calculators`;
  const description = `${spec.description} Browse ${calcs.length} free ${spec.name.toLowerCase()} calculators${names ? ` including ${names}` : ""} on ${siteConfig.name}.`;
  const url = `${siteConfig.url}/specialty/${spec.slug}`;

  return {
    title,
    description,
    keywords: [
      `${spec.name} calculators`,
      `${spec.name} medical calculator`,
      ...calcs.flatMap((c) => c.keywords).slice(0, 12),
      "medical calculator",
      "medical calculator",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SpecialtyPage({ params }: Props) {
  const { specialty } = await params;
  const spec = getSpecialty(specialty);
  if (!spec) notFound();

  const calcs = getCalculatorsBySpecialty(spec.slug);
  const items = calcs.map(
    ({ slug, title, shortName, description, keywords, specialties: specs }) => ({
      slug,
      title,
      shortName,
      description,
      keywords,
      specialties: specs,
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(specialtyJsonLd(spec, calcs)),
        }}
      />

      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link href="/" className="hover:text-teal-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/calculators" className="hover:text-teal-800">
              Calculators
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700">{spec.name}</li>
        </ol>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
          {spec.name} medical calculators
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {spec.description}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          {spec.overview}
        </p>
      </header>

      <section className="mt-8" aria-label={`${spec.name} calculator search`}>
        {calcs.length > 0 ? (
          <CalculatorSearch
            items={items}
            inputId={`search-${spec.slug}`}
            placeholder={`Search ${spec.name.toLowerCase()} calculators...`}
            emptyLabel={`No ${spec.name.toLowerCase()} calculators match that search.`}
            activeSpecialty={spec.slug}
          />
        ) : (
          <p className="rounded-lg border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">
            Calculators for this specialty are coming soon.{" "}
            <Link href="/calculators" className="text-teal-800 underline">
              Browse all calculators
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  );
}
