import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero/PageHero";
import { FeaturedTestimonial } from "@/components/sections/testimonials/FeaturedTestimonial";
import { TestimonialStatsStrip } from "@/components/sections/testimonials/TestimonialStatsStrip";
import { ReviewsGrid } from "@/components/sections/testimonials/ReviewsGrid";
import { GoogleReviewCta } from "@/components/sections/testimonials/GoogleReviewCta";

export const metadata = buildMetadata({
  title: "Testimonials",
  description: `Patient stories and reviews from ${site.doctor.name}'s facial surgery and hair restoration patients at NFSC, ${site.city}.`,
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
      <main>
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Testimonials" },
          ]}
          title={site.testimonials.title}
          subtitle={
            <span className="inline-flex flex-wrap items-center justify-center gap-2">
              {site.testimonials.subtitleParts.map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {part}
                  {i < site.testimonials.subtitleParts.length - 1 ? (
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
        <FeaturedTestimonial />
        <TestimonialStatsStrip />
        <ReviewsGrid />
        <GoogleReviewCta />
      </main>
    </>
  );
}
