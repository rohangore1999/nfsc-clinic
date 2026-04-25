import { MapPin } from "lucide-react";
import { site } from "@/content/site";
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
        <span className="mb-6 text-2xl font-bold uppercase tracking-[0.2em] text-gold">
          {site.name}
        </span>
        <SocialLinks items={site.footer.socials} />
      </div>

      {/* Middle: 4 columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* About */}
        <div>
          <h3 className="mb-2 text-xl font-bold text-gold">{site.name}</h3>
          <p className="mb-4 text-sm text-white">{site.fullName}</p>
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

          {/* Map placeholder — swap for <iframe src="<google-maps-embed>" /> when real coords ready */}
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <div className="flex h-full w-full items-center justify-center">
              <MapPin
                className="h-8 w-8 text-gold/40"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </div>
          </div>
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
