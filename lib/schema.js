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

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#local`,
    name: site.fullName,
    url: SITE_URL,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: "Kandivali West",
      addressRegion: "Maharashtra",
      postalCode: site.contact.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.200452,
      longitude: 72.841788,
    },
    hasMap: site.contact.mapDirectionsUrl,
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
 * @param {{ name: string, slug: string, description: string, bodyLocation?: string, procedureType?: "PercutaneousProcedure" | "SurgicalProcedure" | "NoninvasiveProcedure" }} input
 */
export function procedureSchema({
  name,
  slug,
  description,
  bodyLocation,
  procedureType = "SurgicalProcedure",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${SITE_URL}/treatments/${slug}#procedure`,
    name,
    description,
    procedureType,
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
