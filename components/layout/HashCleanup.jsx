"use client";

import { useEffect } from "react";

/**
 * Strips `#hash` from the URL once the smooth-scroll has landed.
 *
 * Fires on:
 *   - Initial mount      → handles reload with /#contact still in the URL
 *   - hashchange event   → handles clicking a hash-href link
 *
 * Without this, the URL bar permanently shows `/#contact` after a single
 * navigation. The 800ms delay gives `scroll-behavior: smooth` time to
 * finish before we replaceState — otherwise the browser loses the scroll
 * target.
 */
export function HashCleanup() {
  useEffect(() => {
    let timer;

    function clean() {
      if (!window.location.hash) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const url = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", url);
      }, 800);
    }

    // Run once for the reload-with-hash case.
    clean();
    window.addEventListener("hashchange", clean);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", clean);
    };
  }, []);

  return null;
}
