import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}: cookies, analytics, advertising, and how calculator data is handled.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-3xl font-semibold text-teal-950 sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Last updated: August 2, 2026
      </p>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-slate-700">
        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Overview
          </h2>
          <p className="mt-3">
            {siteConfig.name} ({siteConfig.url}) is operated by{" "}
            {siteConfig.operatorName}. This policy explains what information is
            collected when you visit the site, how calculator inputs are handled,
            and how third-party services such as Google AdSense may use cookies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Calculator and favorites data
          </h2>
          <p className="mt-3">
            Values you type into calculators are processed locally in your web
            browser to produce results. We do not intentionally collect those
            values as patient health information on our servers. The contact form
            is the only place we ask you to submit personal information
            voluntarily (name, email, message).
          </p>
          <p className="mt-3">
            Saved favorites are stored in your browser&apos;s local storage on
            your device. Clearing site data or using another device will remove
            them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Log and hosting data
          </h2>
          <p className="mt-3">
            Our hosting provider (Vercel) may process standard server logs
            including IP address, user agent, requested URL, and timestamps for
            security, performance, and abuse prevention. These logs are retained
            according to the provider&apos;s policies and are not used to build
            clinical profiles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Cookies and Google AdSense
          </h2>
          <p className="mt-3">
            When advertising is enabled, Google AdSense and its partners may use
            cookies or similar technologies to serve and measure ads, including
            personalized ads based on prior visits to this or other websites.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Google&apos;s use of advertising cookies enables it and its
              partners to serve ads based on your visit to this site and/or
              other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-teal-800 underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              Third-party vendors, including Google, use cookies to serve ads
              based on a user&apos;s prior visits to your website or other
              websites.
            </li>
          </ul>
          <p className="mt-3">
            See Google&apos;s{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-teal-800 underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              How Google uses data when you use our partners&apos; sites or apps
            </a>{" "}
            for more information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Your choices
          </h2>
          <p className="mt-3">
            You can block or delete cookies in your browser settings. You can
            contact us to ask questions about this policy at{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-teal-800 underline"
            >
              {siteConfig.contactEmail}
            </a>{" "}
            or via the{" "}
            <Link href="/contact" className="text-teal-800 underline">
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Children
          </h2>
          <p className="mt-3">
            This site is intended for clinicians and educated adults. It is not
            directed at children under 13, and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-teal-950">
            Changes
          </h2>
          <p className="mt-3">
            We may update this policy when features, hosting, or advertising
            partners change. Material updates will be reflected in the date
            above.
          </p>
        </section>
      </div>
    </div>
  );
}
