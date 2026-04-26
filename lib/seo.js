import { site } from "@/content/site";

// Use || (not ??) so an empty string in .env.local still falls back to
// localhost — env vars come through as "" when present-but-blank, which
// would otherwise crash `new URL("")` below.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const DEFAULT_TITLE = `${site.fullName}`;

// Tight meta description (~150 chars) — used in Google search snippets and
// browser tab tooltips. Google truncates beyond ~155 so this stays terse.
export const DEFAULT_DESCRIPTION = `Premium facial surgery, hair transplant, dermatology & aesthetic dentistry by ${site.doctor.name} — rhinoplasty, facelift, Botox, smile design in ${site.city}.`;

// Richer description (~240 chars) for openGraph / Twitter card unfurls when
// the link is shared on iMessage, WhatsApp, Facebook, LinkedIn, Slack, etc.
// These surfaces show longer copy than search snippets.
export const SHARE_DESCRIPTION = `${site.fullName} — premium facial plastic surgery, hair transplant, dermatology and aesthetic dentistry. Expert rhinoplasty, facelift, Botox, fillers, skin rejuvenation, laser treatments and smile design with refined, natural-looking results in ${site.city}.`;

const SITE_KEYWORDS = [
  "facial surgery",
  "facial plastic surgery",
  "aesthetic clinic",
  "aesthetic dentistry",
  "smile design",
  "dermatology",
  "rhinoplasty",
  "facelift",
  "blepharoplasty",
  "jaw contouring",
  "Botox",
  "fillers",
  "skin rejuvenation",
  "laser treatments",
  "hair transplant",
  "PRP therapy",
  "maxillofacial surgeon",
  site.city,
  site.doctor.name,
  site.fullName,
];

/**
 * @param {{ title: string, description: string, path: string, image?: string, noIndex?: boolean }} input
 */
export function buildMetadata({ title, description, path, image, noIndex }) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.fullName,
      type: "website",
      locale: "en_IN",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

export const ROOT_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${site.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: site.name,
  keywords: SITE_KEYWORDS,
  authors: [{ name: site.doctor.name }],
  creator: site.fullName,
  publisher: site.fullName,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: site.fullName,
    title: DEFAULT_TITLE,
    description: SHARE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SHARE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
