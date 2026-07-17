import { SITE_URL } from "@/lib/seo";

/**
 * Add a route here when the page actually exists.
 * Don't list 404s — Search Console flags them as errors.
 */
const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/treatments", changeFrequency: "monthly", priority: 0.9 },
  { path: "/treatments/facial-plastic-surgery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/non-surgical-facial-aesthetics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/cosmetic-treatments", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/maxillofacial-and-oral-surgery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/dental", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/dermatology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/hair-treatments", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/testimonials", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
