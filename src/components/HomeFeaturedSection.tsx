"use client";

import Link from "next/link";
import { useFavorites, useHasMounted } from "@/lib/favorites";

export type HomeCalcCard = {
  slug: string;
  title: string;
  shortName: string;
  description: string;
};

export function HomeFeaturedSection({
  featured,
  catalog,
}: {
  featured: HomeCalcCard[];
  catalog: HomeCalcCard[];
}) {
  const { favorites } = useFavorites();
  const mounted = useHasMounted();

  const favoriteCalcs = mounted
    ? favorites
        .map((slug) => catalog.find((c) => c.slug === slug))
        .filter((c): c is HomeCalcCard => Boolean(c))
    : [];

  const showFavorites = mounted && favoriteCalcs.length > 0;
  const cards = showFavorites ? favoriteCalcs : featured;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-teal-950 sm:text-3xl">
            {showFavorites ? "Your favorites" : "High-use calculators"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {showFavorites
              ? "Saved on this device. Favorites stay in local storage only."
              : "Start with the scores clinicians open most often. Save any calculator as a favorite to pin it here."}
          </p>
        </div>
        <Link
          href="/calculators"
          className="hidden text-sm font-semibold text-teal-800 hover:underline sm:inline"
        >
          View directory
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.slug}
            href={`/calculators/${c.slug}`}
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-700/40 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800/80">
              {c.shortName}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-teal-950">
              {c.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-600">
              {c.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
