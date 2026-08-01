import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { HomeFeaturedSection } from "@/components/HomeFeaturedSection";
import { calculators } from "@/lib/calculators/registry";
import { websiteJsonLd } from "@/lib/seo/jsonld";
import { specialties } from "@/lib/specialties";
import { siteConfig } from "@/lib/site";

const featuredSlugs = [
  "pediatric-weight",
  "egfr-ckd-epi",
  "edd-ega",
  "bsa",
  "gcs",
  "burns-parkland",
];

export default function HomePage() {
  const catalog = calculators.map((c) => ({
    slug: c.slug,
    title: c.title,
    shortName: c.shortName,
    description: c.description,
  }));

  const featured = featuredSlugs
    .map((slug) => catalog.find((c) => c.slug === slug))
    .filter((c): c is (typeof catalog)[number] => Boolean(c));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-24">
          <div>
            <p className="font-display text-4xl font-semibold tracking-tight text-teal-950 sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </p>
            <h1 className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              Fast clinical calculators for medicine and surgery — eGFR, EDD,
              GCS, Apgar, burns, risk scores, and more. Runs in your browser.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/calculators"
                className="inline-flex h-12 items-center rounded-md bg-teal-900 px-5 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                Browse all calculators
              </Link>
              <Link
                href="/calculators#calc-search"
                className="inline-flex h-12 items-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-teal-700"
              >
                Search calculators
              </Link>
            </div>
          </div>
          <div className="relative min-h-55 overflow-hidden rounded-lg border border-teal-900/10 bg-linear-to-br from-teal-950 via-teal-800 to-slate-800 p-6 text-teal-50 shadow-lg sm:min-h-70">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-teal-200/80">
              Instant · Offline-capable formulas 
            </p>
            <p className="relative mt-6 font-display text-3xl font-semibold leading-snug sm:text-4xl">
              {calculators.length}+ tools built for the ward, clinic, and OR
              pathway.
            </p>
            <p className="relative mt-4 max-w-md text-sm leading-relaxed text-teal-100/85">
              No accounts. Clear inputs, immediate results, cited formulas.
              Save favorites on this device.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <AdSlot format="horizontal" />
      </div>

      <HomeFeaturedSection featured={featured} catalog={catalog} />

      <section className="border-y border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-teal-950 sm:text-3xl">
            Browse by specialty
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Medicine, surgery, obstetrics, critical care, and more — each hub
            links to focused calculators.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/specialty/${s.slug}`}
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <AdSlot format="rectangle" className="mx-auto max-w-md" />
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          Educational decision-support only. Verify against primary literature
          and local protocols. See the{" "}
          <Link href="/disclaimer" className="underline hover:text-slate-700">
            medical disclaimer
          </Link>
          .
        </p>
      </section>
    </>
  );
}
