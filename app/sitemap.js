import { SITE_URL } from "@/lib/seo";

/**
 * Add a route here when the page actually exists.
 * Don't list 404s — Search Console flags them as errors.
 */
const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/treatments", changeFrequency: "monthly", priority: 0.9 },
  { path: "/treatments/facial-surgery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/treatments/hair-treatments", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/testimonials", changeFrequency: "weekly", priority: 0.7 },
  // Uncomment as pages are built:
  // { path: "/treatments", changeFrequency: "monthly", priority: 0.9 },
  // { path: "/treatments/facial-surgery", changeFrequency: "monthly", priority: 0.8 },
  // { path: "/treatments/hair-treatments", changeFrequency: "monthly", priority: 0.8 },
  // { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  // { path: "/testimonials", changeFrequency: "weekly", priority: 0.7 },
  // { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
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
