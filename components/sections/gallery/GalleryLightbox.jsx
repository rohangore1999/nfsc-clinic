"use client";

import { useEffect } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

/**
 * Full-screen gallery lightbox.
 * Renders a draggable before/after slider for the active item plus prev/next
 * navigation through the (filtered) gallery list.
 *
 * Keyboard:
 *   - Esc      → close (handled by Base UI Dialog)
 *   - ←/→      → navigate prev/next item, but only when focus is NOT on the
 *                slider itself (so the slider's own arrow handling still works)
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Array} props.items
 * @param {number|null} props.index
 * @param {() => void} props.onClose
 * @param {() => void} props.onPrev
 * @param {() => void} props.onNext
 */
export function GalleryLightbox({ open, items, index, onClose, onPrev, onNext }) {
  const item = index !== null && index !== undefined ? items[index] : null;

  // Global ←/→ for prev/next, deferring to the slider when it has focus.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      const target = e.target;
      const onSlider =
        target instanceof HTMLElement &&
        target.closest('[role="slider"]');
      if (onSlider) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onPrev, onNext]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm",
            "transition-opacity duration-300",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none md:p-12",
            "transition-all duration-300",
            "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0"
          )}
        >
          <Dialog.Title className="sr-only">
            {item?.title ?? "Gallery"}
          </Dialog.Title>

          {/* Close */}
          <Dialog.Close
            aria-label="Close"
            className={cn(
              "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full",
              "text-gold transition-colors hover:bg-white/10 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              "md:right-6 md:top-6"
            )}
          >
            <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </Dialog.Close>

          {/* Prev */}
          <button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
            className={cn(
              "absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
              "text-gold transition-colors hover:bg-white/10 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              "md:left-6 md:h-12 md:w-12"
            )}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Next"
            onClick={onNext}
            className={cn(
              "absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full",
              "text-gold transition-colors hover:bg-white/10 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              "md:right-6 md:h-12 md:w-12"
            )}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </button>

          {/* Slider + meta */}
          <div className="w-full max-w-4xl">
            {item ? (
              <BeforeAfterSlider
                key={item.title}
                title={item.title}
              />
            ) : null}
            <div className="mt-6 text-center text-white">
              <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                {item?.title}
              </h2>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {item?.category}
              </p>
              <p className="mt-2 text-sm text-white/60">{item?.timeline}</p>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
