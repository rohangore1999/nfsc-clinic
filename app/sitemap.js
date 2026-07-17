import { SITE_URL } from "@/lib/seo";
import { treatmentsDetail, treatmentSlugs } from "@/content/treatments-detail";
import { toSlug } from "@/lib/strings";

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/treatments", changeFrequency: "monthly", priority: 0.9 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
    { path: "/testimonials", changeFrequency: "weekly", priority: 0.7 },
  ];

  const categoryRoutes = treatmentSlugs.map((slug) => ({
    path: `/treatments/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const procedureRoutes = treatmentSlugs.flatMap((slug) =>
    treatmentsDetail[slug].procedures.map((proc) => ({
      path: `/treatments/${slug}/${toSlug(proc.title)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...procedureRoutes].map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );
}
