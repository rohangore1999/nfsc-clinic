"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Award, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Single team member card.
 * Top: 3:4 portrait area with dark gradient overlay + floating name/role.
 * Bottom: degree, 3 specialty pills, gold "Award" + experience line.
 *
 * If `image` is provided, renders an <Image>; otherwise shows the
 * gradient placeholder with a User icon.
 */
export function TeamMemberCard({
  name,
  role,
  degree,
  specialties,
  experience,
  image,
  className,
}) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-hairline bg-background",
        "transition-colors duration-300 hover:border-gold",
        className
      )}
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-section-alt to-hairline">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User
              className="h-16 w-16 text-gold/30"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        )}
        {/* Bottom-only scrim so floating name/role stays legible without darkening the whole image */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/85 to-transparent"
        />
        {/* Floating name + role */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-lg font-bold text-white">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">
            {role}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          {degree}
        </p>
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <span
              key={s}
              className="rounded-full border border-gold bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-gold"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-hairline pt-3">
          <Award
            className="h-4 w-4 shrink-0 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-xs uppercase tracking-[0.1em] text-text-muted">
            {experience}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
