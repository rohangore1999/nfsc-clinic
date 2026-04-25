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
    // TODO: replace placeholders with real clinic details before launch
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.city,
      addressRegion: "MH",
      postalCode: site.contact.postalCode,
      addressCountry: "IN",
    },
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
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$$",
    image: `${SITE_URL}/opengraph-image`,
    sameAs: [
      // TODO: add real social links before launch
      // "https://instagram.com/nfsc",
      // "https://facebook.com/nfsc",
    ],
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
