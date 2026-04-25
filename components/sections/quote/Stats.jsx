"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/** Splits "10+" → { value: 10, suffix: "+" }; falls back to a string if no leading digits. */
function parseStat(raw) {
  const match = String(raw).match(/^(\d+)(.*)$/);
  if (!match) return { value: 0, suffix: String(raw) };
  return { value: Number(match[1]), suffix: match[2] ?? "" };
}

/**
 * Animated counter that rolls from 0 → value once it scrolls into view.
 * Visually animated; screen readers see the final value via sr-only.
 * Reduced-motion users get the final value instantly.
 */
function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {/* What sighted users see: the rolling number */}
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      {/* What screen readers hear: the final value, announced once */}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}

/**
 * Side-by-side gold stat blocks with a thin separator between.
 * Reusable on /about, /contact, etc.
 *
 * Each `number` string can include a leading integer + arbitrary suffix
 * (e.g. "10+", "500+", "98%"). The integer rolls up; the suffix is static.
 *
 * @param {Object} props
 * @param {Array<{ number: string, label: string }>} props.items
 * @param {string} [props.className]
 */
export function Stats({ items, className }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-12 md:flex-row md:gap-24",
        className
      )}
    >
      {items.map((stat, i) => {
        const { value, suffix } = parseStat(stat.number);
        return (
          <Fragment key={stat.label}>
            {i > 0 ? (
              <>
                <div
                  aria-hidden="true"
                  className="hidden h-24 w-px bg-gold/30 md:block"
                />
                <div
                  aria-hidden="true"
                  className="h-px w-24 bg-gold/30 md:hidden"
                />
              </>
            ) : null}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 font-serif text-5xl font-light text-gold md:text-6xl">
                <CountUp value={value} suffix={suffix} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
                {stat.label}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
