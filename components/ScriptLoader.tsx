"use client";

import { useEffect } from "react";

/**
 * Loads the dashboard's runtime scripts after mount. Kept deliberately tiny so
 * the only client-side JavaScript this app ships (beyond React itself) is this
 * loader — the 62 KB of section markup is rendered by a Server Component and is
 * never sent to the browser a second time for hydration.
 */
export default function ScriptLoader() {
  useEffect(() => {
    // Chart.js is self-hosted (bundled into /public/vendor) rather than loaded
    // from a CDN: no external request, works offline, and no CDN-outage risk.
    const CHART_SRC = "/vendor/chart.umd.min.js";

    function addScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(
          `script[data-imax="${src}"]`
        ) as HTMLScriptElement | null;
        if (existing) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.setAttribute("data-imax", src);
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load " + src));
        document.body.appendChild(s);
      });
    }

    // Navigation is independent of Chart.js — load it first so wayfinding works
    // immediately, even if chart rendering is delayed or fails.
    addScript("/nav.js").catch((err) => console.error(err));

    // Accessibility settings + cinematic reveals — also independent of charts.
    addScript("/settings.js").catch((err) => console.error(err));

    // Charts: load the library, then the drawing code. The drawing code renders
    // the map, forecaster, primer, and glossary regardless, and self-skips the
    // Chart.js charts if the global is somehow absent.
    addScript(CHART_SRC)
      .then(() => addScript("/charts.js"))
      .catch((err) => {
        console.error(err);
        addScript("/charts.js").catch((e) => console.error(e));
      });
  }, []);

  return null;
}
