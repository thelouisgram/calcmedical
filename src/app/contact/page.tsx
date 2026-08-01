import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hadesanoye01@gmail.com";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} about feedback, partnerships, corrections, or site questions.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}.`,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link href="/" className="hover:text-teal-800">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700">Contact</li>
        </ol>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-teal-950 sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Feedback on a formula, partnership ideas, or a site issue — send a
          note. For urgent clinical questions, use your own clinical pathway;
          this form is for the product, not patient care.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Prefer email?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-teal-800 underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </header>

      <div className="relative mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
