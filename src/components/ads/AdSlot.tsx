import { siteConfig } from "@/lib/site";

type AdSlotProps = {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
  label?: string;
};

const heights = {
  horizontal: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  vertical: "min-h-[600px]",
} as const;

/**
 * CLS-safe AdSense placeholder. Wire NEXT_PUBLIC_ADSENSE_CLIENT + data-ad-slot
 * in production. Reserved min-height prevents layout shift.
 */
export function AdSlot({
  slot = "0000000000",
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const client = siteConfig.adsenseClient;

  return (
    <aside
      className={`w-full overflow-hidden rounded-md border border-dashed border-slate-300 bg-slate-50/80 ${heights[format]} ${className}`}
      aria-label={label}
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center px-3 py-4 text-center">
        {client ? (
          <ins
            className="adsbygoogle block w-full"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {label}
            </p>
            <p className="mt-1 max-w-sm text-xs text-slate-400">
              Ad slot reserved ({format}). Set NEXT_PUBLIC_ADSENSE_CLIENT to
              enable Google AdSense.
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
