"use client";

import { useFavorites, useHasMounted } from "@/lib/favorites";
import { cn } from "@/lib/utils";

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.6l1-5.8-4.2-4.1 5.9-.9L12 3.5z"
      />
    </svg>
  );
}

export function FavoriteButton({
  slug,
  title,
  className,
  variant = "default",
}: {
  slug: string;
  title?: string;
  className?: string;
  variant?: "default" | "icon";
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const mounted = useHasMounted();
  const active = mounted && isFavorite(slug);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(slug);
        }}
        aria-pressed={active}
        aria-label={
          active
            ? `Remove ${title ?? "calculator"} from favorites`
            : `Save ${title ?? "calculator"} to favorites`
        }
        className={cn(
          "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition",
          active
            ? "border-teal-900 bg-teal-900 text-white"
            : "border-slate-200 bg-white text-slate-500 hover:border-teal-800/40 hover:text-teal-900",
          className,
        )}
      >
        <StarIcon filled={active} className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${title ?? "calculator"} from favorites`
          : `Save ${title ?? "calculator"} to favorites`
      }
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition",
        active
          ? "border-teal-900 bg-teal-900 text-white"
          : "border-slate-300 bg-white text-slate-800 hover:border-teal-800/50",
        className,
      )}
    >
      <StarIcon filled={active} />
      {active ? "Favorited" : "Favorite"}
    </button>
  );
}
