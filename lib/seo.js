import { site } from "@/content/site";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const DEFAULT_TITLE = `${site.fullName}`;
export const DEFAULT_DESCRIPTION = `Expert facial surgery and aesthetic treatments by ${site.doctor.name} — rhinoplasty, facelift, hair transplant, PRP therapy and more, in ${site.city}.`;

const SITE_KEYWORDS = [
  "facial surgery",
  "aesthetic clinic",
  "rhinoplasty",
  "facelift",
  "hair transplant",
  "PRP therapy",
  "blepharoplasty",
  "jaw contouring",
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
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
