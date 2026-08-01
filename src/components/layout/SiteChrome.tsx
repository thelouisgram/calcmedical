import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/calculators", label: "Calculators" },
  { href: "/specialty/emergency-medicine", label: "Specialties" },
  { href: "/favorites", label: "Favorites" },
];

export function Header() {
  return (
    <header className="relative z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
          />
          <span className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold tracking-tight text-teal-950 sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-wider text-slate-500 sm:inline">
              Clinical calculators
            </span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex md:gap-4"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-teal-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            {siteConfig.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Self-contained medical and surgical calculators. No account
            required. Results are educational and do not replace clinical
            judgment.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/calculators" className="hover:text-white">
                All calculators
              </Link>
            </li>
            <li>
              <Link href="/specialty/obstetrics-gynecology" className="hover:text-white">
                Obstetrics
              </Link>
            </li>
            <li>
              <Link href="/specialty/nephrology" className="hover:text-white">
                Nephrology
              </Link>
            </li>
            <li>
              <Link href="/specialty/surgery" className="hover:text-white">
                Surgery & trauma
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Legal
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/disclaimer" className="hover:text-white">
                Medical disclaimer
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. For education and
          clinical decision support only.
        </p>
      </div>
    </footer>
  );
}
