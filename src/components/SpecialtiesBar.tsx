import Link from "next/link";
import { specialties } from "@/lib/specialties";
import { cn } from "@/lib/utils";

export function SpecialtiesBar({
  activeSlug,
  activeSlugs,
}: {
  activeSlug?: string;
  activeSlugs?: string[];
}) {
  const active = new Set(
    activeSlugs?.length
      ? activeSlugs
      : activeSlug
        ? [activeSlug]
        : [],
  );

  return (
    <nav aria-label="Specialties">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Specialties
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {specialties.map((s) => {
          const isActive = active.has(s.slug);
          return (
            <li key={s.slug} className="min-w-0">
              <Link
                href={`/specialty/${s.slug}`}
                className={cn(
                  "flex h-full min-h-10 items-center justify-center rounded-md border px-2 py-2 text-center text-xs font-medium leading-snug transition sm:text-sm",
                  isActive
                    ? "border-teal-900 bg-teal-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-800/40 hover:text-teal-950",
                )}
              >
                {s.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
