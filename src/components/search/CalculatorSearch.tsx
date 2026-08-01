"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { SpecialtiesBar } from "@/components/SpecialtiesBar";
import type { CalculatorMeta } from "@/lib/calculators/types";

export type SearchableCalculator = Pick<
  CalculatorMeta,
  "slug" | "title" | "shortName" | "description" | "keywords" | "specialties"
>;

export function CalculatorSearch({
  items,
  initialQuery = "",
  placeholder = "Search eGFR, GCS, Parkland, CHA2DS2-VASc...",
  inputId = "calc-search",
  emptyLabel = "No calculators match that search.",
  activeSpecialty,
}: {
  items: SearchableCalculator[];
  initialQuery?: string;
  placeholder?: string;
  inputId?: string;
  emptyLabel?: string;
  activeSpecialty?: string;
}) {
  const [q, setQ] = useState(initialQuery);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((c) => {
      const hay = [
        c.title,
        c.shortName,
        c.description,
        ...c.keywords,
        ...c.specialties,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [items, q]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor={inputId} className="sr-only">
          Search calculators
        </label>
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        />
        <p className="mt-2 text-sm text-slate-500">
          {filtered.length} calculator{filtered.length === 1 ? "" : "s"}
          {q.trim() ? ` matching “${q.trim()}”` : ""}
        </p>
      </div>

      <SpecialtiesBar activeSlug={activeSpecialty} />

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {filtered.map((c) => (
          <li
            key={c.slug}
            className="flex items-stretch gap-2 px-3 py-3 transition-colors hover:bg-slate-50 sm:gap-3 sm:px-4 sm:py-4"
          >
            <Link href={`/calculators/${c.slug}`} className="min-w-0 flex-1 py-1">
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
            <div className="flex shrink-0 items-center">
              <FavoriteButton
                slug={c.slug}
                title={c.title}
                variant="icon"
              />
            </div>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="px-5 py-10 text-center text-sm text-slate-500">
            {emptyLabel}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
