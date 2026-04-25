import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { FooterColumn } from "./FooterColumn";
import { SocialLinks } from "./SocialLinks";

/**
 * Site-wide footer. Composition matches Stitch:
 *   1. Top — centered logo mark + social row, gold-tinted bottom border
 *   2. Middle — 4 columns: About / Quick Links / Treatments / Visit Us (+ map)
 *   3. Bottom — copyright
 *
 * Server-rendered. Renders on every page via app/layout.jsx.
 */
export function Footer() {
  const telHref = `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`;
  const mailHref = `mailto:${site.contact.email}`;

  return (
    <footer className="w-full border-t border-gold bg-navy">
      {/* Top: brand mark + socials */}
      <div className="mx-auto flex max-w-7xl flex-col items-center border-b border-gold/30 px-6 pt-12 pb-8 md:px-8">
        <Link
          href="/"
          aria-label={site.fullName}
          className="mb-4 inline-block transition-transform duration-300 hover:scale-105"
        >
          {/* JPG has a white background — wrapping in `rounded-full bg-white`
              treats it as an intentional circular badge against the navy.
              Swap for a transparent SVG/PNG to render the medallion bare. */}
          <Image
            src="/images/nfsc-logo.jpg"
            alt=""
            width={160}
            height={160}
            className="h-20 w-20 rounded-full bg-white object-cover shadow-lg shadow-black/30"
          />
        </Link>
        {/* <span className="mb-6 mt-1 text-2xl font-bold uppercase tracking-[0.2em] text-gold">
          {site.name}
        </span> */}
        <SocialLinks items={site.footer.socials} />
      </div>

      {/* Middle: 4 columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* About */}
        <div>
          <Logo variant="footer" className="mb-4" />
          <p className="text-sm leading-relaxed text-white/50">
            {site.footer.about}
          </p>
        </div>

        <FooterColumn title="Quick Links" items={site.footer.quickLinks} />
        <FooterColumn title="Treatments" items={site.footer.treatments} />

        {/* Visit Us */}
        <div>
          <h4 className="mb-6 font-serif text-sm uppercase tracking-[0.18em] text-white">
            Visit Us
          </h4>
          <ul className="mb-6 space-y-3 text-sm tracking-wide text-white/60">
            <li>{site.contact.address}</li>
            <li>
              <a
                href={telHref}
                className="transition-colors duration-200 hover:text-gold"
              >
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={mailHref}
                className="transition-colors duration-200 hover:text-gold"
              >
                {site.contact.email}
              </a>
            </li>
            <li className="text-gold">{site.contact.hours}</li>
          </ul>

          {/* Live Google Maps embed. Filter tints the light-themed Google map
              toward the dark navy footer palette so it doesn't clash. */}
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <iframe
              title={`${site.fullName} — clinic location`}
              src={site.contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
              style={{
                filter:
                  "invert(90%) hue-rotate(180deg) contrast(85%) grayscale(60%)",
              }}
            />
          </div>

          <a
            href={site.contact.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold transition-colors duration-200 hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            Get Directions
          </a>
        </div>
      </div>

      {/* Bottom: copyright */}
      <div className="mx-auto max-w-7xl px-6 pt-4 pb-8 md:px-8">
        <p className="text-center text-sm text-white/40">
          {site.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
