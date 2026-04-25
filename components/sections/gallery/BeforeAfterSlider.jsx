"use client";

import { useRef, useState } from "react";
import { ArrowLeftRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive before/after image slider.
 * Drag (mouse or touch) the gold handle / anywhere in the image to reveal
 * more of the "before" or "after" side. Keyboard: ←/→ moves 5%, Home/End jumps.
 *
 * Both halves are gradient placeholders today. When real photos arrive,
 * replace the two `placeholder-half` divs with <Image src={...} />.
 *
 * @param {Object} props
 * @param {string} props.title       - used for aria-label
 * @param {number} [props.initialPosition=50]
 * @param {string} [props.className]
 */
export function BeforeAfterSlider({ title, initialPosition = 50, className }) {
  const [position, setPosition] = useState(initialPosition);
  const ref = useRef(null);

  function clamp(n) {
    return Math.max(0, Math.min(100, n));
  }

  function pctFromX(clientX) {
    if (!ref.current) return position;
    const rect = ref.current.getBoundingClientRect();
    return clamp(((clientX - rect.left) / rect.width) * 100);
  }

  function onPointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setPosition(pctFromX(e.clientX));
  }

  function onPointerMove(e) {
    if (e.buttons === 0 && e.pointerType === "mouse") return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    setPosition(pctFromX(e.clientX));
  }

  function onKeyDown(e) {
    if (e.key === "ArrowLeft") {
      setPosition((p) => clamp(p - 5));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPosition((p) => clamp(p + 5));
      e.preventDefault();
    } else if (e.key === "Home") {
      setPosition(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setPosition(100);
      e.preventDefault();
    }
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={`Before / after slider for ${title}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={onKeyDown}
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg",
        "cursor-ew-resize touch-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        className
      )}
    >
      {/* After half — full-bleed base layer */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold/10 to-gold/30">
        {/* TODO: replace with <Image src={item.imageAfter} alt="After" fill className="object-cover" /> */}
        <User
          className="h-24 w-24 text-gold/70"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>

      {/* Before half — overlay, clipped to slider position */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-section-alt to-hairline"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* TODO: replace with <Image src={item.imageBefore} alt="Before" fill className="object-cover" /> */}
        <User
          className="h-24 w-24 text-text-muted"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>

      {/* Divider line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px bg-gold"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
          "border-2 border-gold bg-background shadow-xl"
        )}
        style={{ left: `${position}%` }}
      >
        <ArrowLeftRight
          className="h-5 w-5 text-gold"
          strokeWidth={2}
        />
      </div>

      {/* Badges — both use a dark bg so they stay legible on light placeholders
          AND on real photography. After is gold-tinted to differentiate. */}
      <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/40 bg-black/45 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-md backdrop-blur-md">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-gold/50 bg-black/45 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold shadow-md backdrop-blur-md">
        After
      </span>
    </div>
  );
}
