import { site } from "@/content/site";

/**
 * Bottom-of-gallery disclaimer band.
 * Italic body copy, top hairline border, centered.
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Photo authenticity disclaimer"
      className="bg-background px-6 pb-16 md:px-8"
    >
      <div className="mx-auto max-w-3xl border-t border-gold/40 pt-12 text-center">
        <p className="text-base italic leading-relaxed text-text-muted">
          {site.gallery.disclaimer}
        </p>
      </div>
    </section>
  );
}
