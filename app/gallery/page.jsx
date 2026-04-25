import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { Gallery } from "@/components/sections/gallery/Gallery";
import { TrustStrip } from "@/components/sections/gallery/TrustStrip";

export const metadata = buildMetadata({
  title: "Gallery",
  description: `Real before-and-after transformations from ${site.doctor.name} — facial surgery, hair restoration, and aesthetic procedures at NFSC, ${site.city}.`,
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <main>
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery" },
          ]}
          title={site.gallery.title}
          subtitle={
            <span className="inline-flex flex-wrap items-center justify-center gap-2">
              {site.gallery.subtitleParts.map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {part}
                  {i < site.gallery.subtitleParts.length - 1 ? (
                    <span aria-hidden="true" className="text-gold">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </span>
          }
          decoration={null}
        />
        <Gallery />
        <TrustStrip />
      </main>
    </>
  );
}
