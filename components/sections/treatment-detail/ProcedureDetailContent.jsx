"use client";

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle } from "lucide-react";
import {
  itemVariant,
  containerVariant,
  makeContainerVariant,
  SCROLL_VIEWPORT,
  EASE,
} from "@/lib/motion";

const bulletContainerVariant = makeContainerVariant({ stagger: 0.07, delay: 0.15 });

/**
 * Procedure detail page body — dynamically renders content sections if provided,
 * otherwise falls back to intro paragraph + styled bullet list + optional closing paragraph.
 * No FAQ or "Procedures We Offer" sections.
 *
 * @param {Object} props
 * @param {string} props.description - Short intro paragraph
 * @param {string[]} [props.bullets] - Key points / highlights
 * @param {string} [props.additionalInfo] - Optional closing paragraph
 * @param {Object[]} [props.contentSections] - Rich content array containing text, lists, and tables
 */
export function ProcedureDetailContent({ description, bullets = [], additionalInfo, contentSections = [] }) {
  const reduceMotion = useReducedMotion();

  const sectionRevealProps = reduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport: SCROLL_VIEWPORT };
  const headerProps = reduceMotion ? {} : { variants: containerVariant };
  const itemProps = reduceMotion ? {} : { variants: itemVariant };
  const bulletGridProps = reduceMotion ? {} : { variants: bulletContainerVariant };

  // If we have rich content sections, render them dynamically
  if (contentSections && contentSections.length > 0) {
    return (
      <div className="bg-background">
        {/* Render the main description first if it exists as an intro */}
        {description && (
          <section className="bg-background px-6 py-16 md:px-8 md:py-20">
            <motion.div
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 16 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.6, ease: EASE },
                  })}
              className="mx-auto max-w-4xl text-center md:text-left"
            >
              <p className="whitespace-pre-wrap text-lg font-light leading-relaxed text-text-secondary md:text-xl md:leading-[1.7]">
                {description}
              </p>
            </motion.div>
          </section>
        )}

        {/* Iterate over all content sections */}
        {contentSections.map((section, idx) => {
          // Alternate background colors for visual separation
          const isEven = idx % 2 === 0;
          const sectionBg = isEven ? "bg-section-alt" : "bg-background";

          return (
            <section
              key={idx}
              className={`${sectionBg} px-6 py-16 md:px-8 md:py-20`}
            >
              <div className="mx-auto max-w-4xl">
                <motion.div
                  {...sectionRevealProps}
                  {...headerProps}
                  className="mb-10 flex flex-col items-start"
                >
                  <motion.h2
                    {...itemProps}
                    className="mb-4 font-serif text-2xl font-semibold text-navy md:text-3xl"
                  >
                    {section.heading}
                  </motion.h2>
                  <motion.div
                    {...itemProps}
                    aria-hidden="true"
                    className="h-px w-[60px] bg-gold"
                  />
                </motion.div>

                {section.intro && (
                  <motion.p
                    {...(reduceMotion ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: SCROLL_VIEWPORT })}
                    className="mb-8 whitespace-pre-wrap text-base font-light leading-relaxed text-text-secondary md:text-lg"
                  >
                    {section.intro}
                  </motion.p>
                )}

                {section.type === "text" && (
                  <motion.div
                    {...sectionRevealProps}
                    {...headerProps}
                    className="space-y-6"
                  >
                    {section.content.map((paragraph, i) => (
                      <motion.p
                        key={i}
                        {...itemProps}
                        className="text-base font-light leading-relaxed text-text-secondary md:text-lg"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </motion.div>
                )}

                {section.type === "list" && (
                  <motion.ul
                    {...sectionRevealProps}
                    {...bulletGridProps}
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                  >
                    {section.content.map((item, i) => (
                      <motion.li
                        key={i}
                        variants={reduceMotion ? undefined : itemVariant}
                        className="flex items-start gap-4 rounded-xl border border-hairline bg-background p-5 transition-shadow duration-300 hover:shadow-md"
                      >
                        {section.listType === "ordered" ? (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-medium text-white">
                            {i + 1}
                          </div>
                        ) : (
                          <CheckCircle
                            className="mt-0.5 h-6 w-6 shrink-0 text-gold"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-base font-light leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {section.type === "table" && (
                  <motion.div
                    {...sectionRevealProps}
                    {...headerProps}
                    className="overflow-x-auto rounded-xl border border-hairline bg-background shadow-sm"
                  >
                    <table className="w-full min-w-[600px] text-left">
                      <thead className="bg-navy text-white">
                        <tr>
                          {section.headers.map((header, i) => (
                            <th key={i} className="px-6 py-4 font-serif font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {section.rows.map((row, i) => (
                          <tr key={i} className="transition-colors hover:bg-section-alt">
                            {row.map((cell, j) => (
                              <td key={j} className="px-6 py-4 text-base font-light text-text-secondary">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {section.outro && (
                  <motion.p
                    {...(reduceMotion ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: SCROLL_VIEWPORT })}
                    className="mt-8 text-base font-light leading-relaxed text-text-secondary md:text-lg"
                  >
                    {section.outro}
                  </motion.p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Legacy layout fallback
  return (
    <>
      {/* Description section */}
      <section className="bg-background px-6 py-20 md:px-8 md:py-24">
        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.3 },
                transition: { duration: 0.6, ease: EASE },
              })}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="whitespace-pre-wrap text-lg font-light leading-relaxed text-text-secondary md:text-xl md:leading-[1.7]">
            {description}
          </p>
        </motion.div>
      </section>

      {/* Bullet points section */}
      {bullets.length > 0 && (
        <section
          aria-labelledby="key-highlights-heading"
          className="bg-section-alt px-6 py-24 md:px-8 md:py-32"
        >
          <div className="mx-auto max-w-4xl">
            <motion.div
              {...sectionRevealProps}
              {...headerProps}
              className="mb-16 flex flex-col items-center text-center"
            >
              <motion.h2
                {...itemProps}
                id="key-highlights-heading"
                className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl"
              >
                Key Highlights
              </motion.h2>
              <motion.div
                {...itemProps}
                aria-hidden="true"
                className="h-px w-[60px] bg-gold"
              />
            </motion.div>

            <motion.ul
              {...sectionRevealProps}
              {...bulletGridProps}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  variants={reduceMotion ? undefined : itemVariant}
                  className="flex items-start gap-4 rounded-xl border border-hairline bg-background p-5 transition-shadow duration-300 hover:shadow-md"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-base font-light leading-relaxed text-text-secondary">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* Additional info section */}
      {additionalInfo && (
        <section className="bg-background px-6 py-20 md:px-8 md:py-24">
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.6, ease: EASE },
                })}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="whitespace-pre-wrap text-lg font-light leading-relaxed text-text-secondary md:text-xl md:leading-[1.7]">
              {additionalInfo}
            </p>
          </motion.div>
        </section>
      )}
    </>
  );
}
