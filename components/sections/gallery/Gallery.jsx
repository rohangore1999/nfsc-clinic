"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/content/site";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

/**
 * /gallery — sticky filter row + filtered before/after grid + lightbox.
 *
 * "All" shows everything; other filters match either `category` or `title`
 * (so "Rhinoplasty" filter shows only Rhinoplasty items, while "Facial Surgery"
 * shows everything in that category).
 *
 * Click any card → opens the GalleryLightbox at that index. Prev/Next inside
 * the lightbox cycle the (filtered) list with wrap-around.
 *
 * No load-more / pagination — all items render at once per project decision.
 */
export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    filter === "All"
      ? site.gallery.items
      : site.gallery.items.filter(
          (item) => item.category === filter || item.title === filter
        );

  function handleFilterChange(next) {
    setFilter(next);
    // The filtered array length / contents may change, so the current
    // lightbox index would no longer be meaningful — close it.
    setLightboxIndex(null);
  }

  return (
    <>
      <GalleryFilters
        options={site.gallery.filters}
        value={filter}
        onChange={handleFilterChange}
      />

      <section
        aria-label="Gallery"
        className="bg-background px-6 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GalleryCard
                    {...item}
                    onClick={() => setLightboxIndex(i)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 ? (
            <p className="mt-12 text-center text-sm text-text-muted">
              No transformations available for this filter yet.
            </p>
          ) : null}
        </div>
      </section>

      <GalleryLightbox
        open={lightboxIndex !== null}
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex(
            (i) => (i - 1 + filtered.length) % filtered.length
          )
        }
        onNext={() =>
          setLightboxIndex((i) => (i + 1) % filtered.length)
        }
      />
    </>
  );
}
