"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Reusable FAQ accordion. Click a question to expand its answer; clicking
 * the same question (or another) handles single-open behavior.
 *
 * Smooth height animation via motion `AnimatePresence` + height keyframes.
 * Reduced-motion users get an instant toggle (no height animation).
 *
 * @param {Object} props
 * @param {Array<{ question: string, answer: string }>} props.faqs
 * @param {string} [props.title="Frequently Asked Questions"]
 * @param {string} [props.id="faq-heading"]
 */
export function FaqAccordion({
  faqs,
  title = "Frequently Asked Questions",
  id = "faq-heading",
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby={id}
      className="bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            id={id}
            className="mb-4 font-serif text-3xl font-semibold text-navy md:text-4xl"
          >
            {title}
          </h2>
          <div aria-hidden="true" className="h-px w-[60px] bg-gold" />
        </div>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className={cn(
                    "flex w-full items-center justify-between gap-6 py-6 text-left",
                    "transition-colors duration-200 hover:text-gold",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-lg font-medium md:text-xl",
                      isOpen ? "text-gold" : "text-navy"
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={cn(
                      "h-5 w-5 shrink-0 text-gold transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={
                        reduceMotion ? false : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduceMotion
                          ? false
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduceMotion ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base font-light leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
