"use client";

import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorites, useHasMounted } from "@/lib/favorites";

export type FavoriteCatalogItem = {
  slug: string;
  title: string;
  shortName: string;
  description: string;
};

export function FavoritesList({ catalog }: { catalog: FavoriteCatalogItem[] }) {
  const { favorites } = useFavorites();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">
        Loading favorites…
      </p>
    );
  }

  const items = favorites
    .map((slug) => catalog.find((c) => c.slug === slug))
    .filter((c): c is FavoriteCatalogItem => Boolean(c));

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-5 py-10 text-center">
        <p className="text-sm text-slate-600">
          No favorites yet. Open any calculator and tap Favorite to save it on
          this device.
        </p>
        <Link
          href="/calculators"
          className="mt-4 inline-flex h-10 items-center rounded-md bg-teal-900 px-4 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Browse calculators
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((c) => (
        <li
          key={c.slug}
          className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
        >
          <Link href={`/calculators/${c.slug}`} className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-teal-950">
                {c.title}
              </h2>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {c.shortName}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {c.description}
            </p>
          </Link>
          <FavoriteButton slug={c.slug} title={c.title} className="shrink-0" />
        </li>
      ))}
    </ul>
  );
}
