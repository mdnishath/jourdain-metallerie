"use client";

import { useEffect } from "react";
import { world, WAYPOINTS } from "@/lib/world";

/**
 * Mesure la position (px) de chaque waypoint caméra à partir des sections du DOM.
 * Re-mesure au resize et quand les polices / images modifient la hauteur.
 */
export default function ScrollTracker() {
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight;
      const lead = vh * 0.35;
      const ys: number[] = [];
      let prev = -1;
      for (const w of WAYPOINTS) {
        const el = document.getElementById(w.section);
        let y = 0;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          y = top - lead + w.offset * el.offsetHeight;
        }
        y = Math.max(0, y, prev + 1);
        ys.push(y);
        prev = y;
      }
      world.ys = ys;
    };

    measure();
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);
  return null;
}
