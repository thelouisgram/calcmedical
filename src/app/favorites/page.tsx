import type { Metadata } from "next";
import Link from "next/link";
import { FavoritesList } from "@/components/FavoritesList";
import { calculators } from "@/lib/calculators/registry";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Your saved medical calculators on this device. Favorites are stored in local storage only.",
  alternates: { canonical: `${siteConfig.url}/favorites` },
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesPage() {
  const catalog = calculators.map((c) => ({
    slug: c.slug,
    title: c.title,
    shortName: c.shortName,
    description: c.description,
  }));

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
          <li className="text-slate-700">Favorites</li>
        </ol>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
        Favorites
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Calculators you save stay on this device only. Nothing is synced to an
        account.
      </p>

      <div className="mt-8">
        <FavoritesList catalog={catalog} />
      </div>
    </div>
  );
}
