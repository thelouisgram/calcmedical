import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  calculators,
  getCalculator,
} from "@/lib/calculators/registry";
import { calculatorJsonLd } from "@/lib/seo/jsonld";
import { getSpecialty } from "@/lib/specialties";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) return {};
  const title = `${calc.title}`;
  const url = `${siteConfig.url}/calculators/${calc.slug}`;
  return {
    title,
    description: calc.description,
    keywords: [
      ...calc.keywords,
      `${calc.shortName} calculator`,
      calc.title,
      "medical calculator",
      "clinical calculator",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${calc.title} | ${siteConfig.name}`,
      description: calc.description,
      url,
      type: "article",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: calc.title,
      description: calc.description,
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

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculator(slug);
  if (!calc) notFound();

  const related = calc.related
    .map((s) => getCalculator(s))
    .filter(Boolean);
  const Component = calc.Component;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorJsonLd(calc)),
        }}
      />

      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-teal-800">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-teal-800">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{calc.shortName}</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
            {calc.title}
          </h1>
          <FavoriteButton slug={calc.slug} title={calc.title} />
        </div>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {calc.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {calc.specialties.map((s) => {
            const spec = getSpecialty(s);
            return (
              <Link
                key={s}
                href={`/specialty/${s}`}
                className="rounded-md bg-teal-950/5 px-2.5 py-1 text-xs font-medium text-teal-900 hover:bg-teal-950/10"
              >
                {spec?.name ?? s}
              </Link>
            );
          })}
        </div>
      </header>

        <div className="mt-6">
          <AdSlot format="horizontal" />
        </div>

        <section className="mt-8" aria-label="Calculator">
          <Component />
        </section>

        <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Educational use only. Confirm results with clinical judgment, primary
          sources, and local protocols. Not a substitute for professional medical
          advice.{" "}
          <Link href="/disclaimer" className="font-medium underline">
            Full disclaimer
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl font-semibold text-teal-950">
                Formula
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {calc.formulaSummary}
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-teal-950">
                Interpretation
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {calc.interpretation}
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-semibold text-teal-950">
                Limitations
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {calc.limitations}
              </p>
            </section>

            <div>
              <AdSlot format="rectangle" />
            </div>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-950">
                Frequently asked questions
              </h2>
              <dl className="mt-4 space-y-4">
                {calc.faqs.map((f) => (
                  <div
                    key={f.question}
                    className="rounded-md border border-slate-200 bg-white p-4"
                  >
                    <dt className="font-semibold text-slate-900">{f.question}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-teal-950">
                References
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {calc.references.map((r) => (
                  <li key={r.label}>
                    {r.url ? (
                      <a
                        href={r.url}
                        className="text-teal-800 underline-offset-2 hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {r.label}
                      </a>
                    ) : (
                      r.label
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <AdSlot format="vertical" className="hidden lg:flex" />
            {related.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Related calculators
                </h2>
                <ul className="mt-3 space-y-2">
                  {related.map((r) =>
                    r ? (
                      <li key={r.slug}>
                        <Link
                          href={`/calculators/${r.slug}`}
                          className="text-sm font-medium text-teal-900 hover:underline"
                        >
                          {r.shortName}
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
  );
}
