import Link from "next/link";
import { site } from "@/content/site";
import { treatmentSlugs, treatmentsDetail } from "@/content/treatments-detail";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-gold">
        404 — Page Not Found
      </p>
      <h1 className="mb-6 font-serif text-4xl font-semibold text-navy md:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mb-12 max-w-md text-lg text-text-secondary">
        The page you&apos;re looking for may have moved or doesn&apos;t exist.
        Explore our treatments or head back to the homepage.
      </p>

      <div className="mb-16 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-navy px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90"
        >
          Back to Home
        </Link>
        <Link
          href="/treatments"
          className="rounded-full border border-gold px-8 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
        >
          View Treatments
        </Link>
        <Link
          href="#contact"
          className="rounded-full border border-hairline px-8 py-3 text-sm font-medium text-navy transition-colors hover:border-gold"
        >
          Book Consultation
        </Link>
      </div>

      <nav aria-label="Popular treatments" className="w-full max-w-2xl">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
          Popular Treatments in {site.city}
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {treatmentSlugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/treatments/${slug}`}
                className="inline-block rounded-full border border-hairline px-4 py-2 text-xs font-medium text-navy transition-colors hover:border-gold hover:text-gold"
              >
                {treatmentsDetail[slug].title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
