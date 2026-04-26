"use client";

import { motion, useReducedMotion } from "motion/react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { containerVariant, itemVariant } from "@/lib/motion";

/**
 * Default decoration: 3 gold dots with decreasing opacity.
 * Pages can override via the `decoration` prop.
 */
function DefaultDecoration() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold/25" />
    </div>
  );
}

/**
 * Reusable page hero / title block for inner pages.
 * Renders: Breadcrumb → big serif H1 → optional Playfair italic subtitle → decoration.
 *
 * Used at the top of /about, /treatments, /gallery, /testimonials, /contact, etc.
 *
 * @param {Object} props
 * @param {Array<{ label: string, href?: string }>} props.breadcrumbs
 *   Last item should omit `href` (it's the current page).
 * @param {string} props.title
 * @param {string} [props.subtitle]    - optional Playfair italic line under the H1
 * @param {React.ReactNode} [props.decoration]
 *   - defaults to 3 gold dots; pass null to omit, or any node to customize
 * @param {string} [props.id]          - DOM id for the H1 (drives aria-labelledby)
 */
export function PageHero({
  breadcrumbs,
  title,
  subtitle,
  decoration,
  id = "page-heading",
}) {
  const reduceMotion = useReducedMotion();

  const containerProps = reduceMotion
    ? {}
    : {
        variants: containerVariant,
        initial: "hidden",
        animate: "show",
      };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };

  // `decoration === null` means "omit"; `undefined` means "use default".
  const decorationNode =
    decoration === undefined ? <DefaultDecoration /> : decoration;

  return (
    <section
      aria-labelledby={id}
      className="border-b border-hairline bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <motion.div
        {...containerProps}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div {...itemProps} className="mb-8">
          <Breadcrumb items={breadcrumbs} />
        </motion.div>

        <motion.h1
          {...itemProps}
          id={id}
          className="font-serif text-5xl font-semibold leading-tight text-navy md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.p
            {...itemProps}
            className="mt-6 text-xl italic text-text-secondary"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {decorationNode ? (
          <motion.div {...itemProps} className="mt-10">
            {decorationNode}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
