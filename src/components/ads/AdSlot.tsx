"use client";

import { useEffect, useRef } from "react";
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

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * CLS-safe AdSense slot. Disabled until siteConfig.adsenseEnabled is true.
 */
export function AdSlot({
  slot = "0000000000",
  format = "horizontal",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const client = siteConfig.adsenseClient;
  const enabled = siteConfig.adsenseEnabled;
  const pushed = useRef(false);

  useEffect(() => {
    if (!enabled || !client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense may block locally / before approval
    }
  }, [client, enabled]);

  if (!enabled) return null;

  return (
    <aside
      className={`w-full overflow-hidden rounded-md border border-dashed border-slate-300 bg-slate-50/80 ${heights[format]} ${className}`}
      aria-label={label}
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center px-3 py-4 text-center">
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
