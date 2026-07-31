/**
 * JSON-LD builders for NFSC.
 * Render with <JsonLd data={schema} /> from components/seo/JsonLd.
 *
 * Schema choices:
 * - MedicalClinic on every page (root layout)
 * - Physician on /about
 * - MedicalProcedure on each treatment page
 * - BreadcrumbList on inner pages
 * - FAQPage on treatment pages with FAQs
 */
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";

const SOCIAL_LINKS = site.footer.socials
  .map((s) => s.href)
  .filter((h) => h !== "#");

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}#clinic`,
    name: site.fullName,
    alternateName: site.name,
    url: SITE_URL,
    description: `Expert facial surgery and aesthetic treatments by ${site.doctor.name} in ${site.city}.`,
    medicalSpecialty: ["PlasticSurgery", "CosmeticSurgery"],
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: "Kandivali West",
      addressRegion: "MH",
      postalCode: site.contact.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.200452,
      longitude: 72.841788,
    },
    hasMap: site.contact.mapDirectionsUrl,
    areaServed: [
      {
        "@type": "City",
        name: "Mumbai",
        sameAs: "https://en.wikipedia.org/wiki/Mumbai",
      },
      { "@type": "Place", name: "Kandivali West" },
      { "@type": "Place", name: "Kandivali East" },
      { "@type": "Place", name: "Borivali" },
      { "@type": "Place", name: "Malad" },
      { "@type": "Place", name: "Goregaon" },
      { "@type": "Place", name: "Andheri" },
      { "@type": "Place", name: "Dahisar" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$$",
    image: `${SITE_URL}/opengraph-image`,
    ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS } : {}),
  };
}

/**
 * Aggregate rating + individual reviews, attached to the clinic entity via
 * its `@id`. Render ONLY on /testimonials, where the reviews are actually
 * visible on the page — this keeps the review markup policy-compliant (the
 * markup mirrors on-page content) and avoids self-serving-review warnings.
 * Google merges this node with the global MedicalClinic via the shared @id.
 */
export function clinicReviewsSchema() {
  const reviews = [
    ...(site.testimonials.featured || []).map((r) => ({
      author: r.author,
      rating: r.rating,
      body: r.quote,
    })),
    ...(site.testimonials.reviews || []).map((r) => ({
      author: r.author,
      rating: r.rating,
      body: r.text,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}#clinic`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      // ratingCount reflects the real Google Business Profile total; reviewCount
      // matches the number of written reviews shown on this page.
      ratingCount: "12",
      reviewCount: String(reviews.length),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.body,
    })),
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/about#physician`,
    name: site.doctor.name,
    url: `${SITE_URL}/about`,
    medicalSpecialty: ["PlasticSurgery", "CosmeticSurgery"],
    description: site.doctor.bioLong,
    knowsAbout: [
      "Rhinoplasty",
      "Facelift",
      "Blepharoplasty",
      "Jaw Contouring",
      "Otoplasty",
      "Hair Transplant",
      "PRP Therapy",
      "Mesotherapy",
      "GFC Treatment",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: site.doctor.credentials,
    },
    worksFor: { "@id": `${SITE_URL}#clinic` },
  };
}

/**
 * Maps a simple `kind` to the correct schema.org shape.
 *
 * Note: "SurgicalProcedure" is its own @type (a subtype of MedicalProcedure),
 * NOT a valid `procedureType` value. Only "NoninvasiveProcedure" and
 * "PercutaneousProcedure" are members of the MedicalProcedureType enumeration.
 */
const PROCEDURE_KIND_SCHEMA = {
  surgical: { "@type": "SurgicalProcedure" },
  noninvasive: {
    "@type": "MedicalProcedure",
    procedureType: "https://schema.org/NoninvasiveProcedure",
  },
  percutaneous: {
    "@type": "MedicalProcedure",
    procedureType: "https://schema.org/PercutaneousProcedure",
  },
};

/**
 * @param {{ name: string, slug: string, description: string, bodyLocation?: string, kind?: "surgical" | "noninvasive" | "percutaneous" }} input
 */
export function procedureSchema({
  name,
  slug,
  description,
  bodyLocation,
  kind = "surgical",
}) {
  const { "@type": atType, procedureType } =
    PROCEDURE_KIND_SCHEMA[kind] || PROCEDURE_KIND_SCHEMA.surgical;

  return {
    "@context": "https://schema.org",
    "@type": atType,
    "@id": `${SITE_URL}/treatments/${slug}#procedure`,
    name,
    description,
    ...(procedureType ? { procedureType } : {}),
    ...(bodyLocation ? { bodyLocation } : {}),
    url: `${SITE_URL}/treatments/${slug}`,
    performer: { "@id": `${SITE_URL}/about#physician` },
    location: { "@id": `${SITE_URL}#clinic` },
  };
}

/**
 * @param {Array<{ name: string, path: string }>} items
 */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/**
 * @param {Array<{ question: string, answer: string }>} items
 */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
