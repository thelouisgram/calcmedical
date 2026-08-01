import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950">
        Privacy policy
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
        <p>
          {siteConfig.name} calculator inputs are processed in your browser and
          are not intentionally transmitted to our servers as patient data. We do
          not ask you to enter names, medical record numbers, or other direct
          identifiers. Favorite calculators are stored only in your browser
          local storage on this device.
        </p>
        <p>
          Like most websites, hosting providers and analytics or advertising
          partners (including Google AdSense, when enabled) may collect standard
          technical data such as IP address, browser type, cookies, and pages
          visited. Google may use cookies to serve ads based on prior visits to
          this or other sites. You can manage ad personalization via Google ad
          settings.
        </p>
        <p>
          We may use aggregated, non-identifying traffic data to improve the
          site. Contact us via the site operator if you have privacy questions.
        </p>
        <p className="text-xs text-slate-500">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </div>
  );
}
