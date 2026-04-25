"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/content/site";
import { TestimonialFilters } from "./TestimonialFilters";
import { ReviewCard } from "./ReviewCard";

/**
 * Reviews grid + filter controls.
 * Filters:
 *   - "All Reviews"  → all
 *   - "Facial Surgery" / "Hair Treatments" → match `category`
 *   - "5 Star Only"  → match `rating === 5`
 *
 * No load-more; all reviews render at once (matches the gallery decision).
 */
export function ReviewsGrid() {
  const [filter, setFilter] = useState("All Reviews");

  const filtered = site.testimonials.reviews.filter((r) => {
    if (filter === "All Reviews") return true;
    if (filter === "5 Star Only") return r.rating === 5;
    return r.category === filter;
  });

  return (
    <section
      aria-label="Patient reviews"
      className="bg-background px-6 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <TestimonialFilters
            options={site.testimonials.filters}
            value={filter}
            onChange={setFilter}
          />
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((review) => (
              <motion.div
                key={review.author + review.treatment}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ReviewCard {...review} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-text-muted">
            No reviews match this filter yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}
