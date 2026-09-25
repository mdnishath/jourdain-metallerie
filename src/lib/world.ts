import type Lenis from "lenis";

/**
 * État partagé entre le DOM (scroll, sections) et la scène 3D.
 * Mutable, lu à chaque frame : aucune re-render React.
 */
export const world = {
  /** scroll positions (px) of each waypoint, measured from the DOM */
  ys: [] as number[],
  /** 0..1 build progress of the staircase (section savoir-faire) */
  forge: 0,
  /** 0..1 opening of the hero gate */
  gate: 0,
  /** 0..1 intro camera flight */
  intro: 0,
  introDone: false,
  /** first WebGL frame rendered (or fallback active) */
  ready: false,
  lenis: null as Lenis | null,
};

export type Waypoint = {
  section: string;
  /** 0..1 position inside the section (0 = top reaches the lead line) */
  offset: number;
  pos: [number, number, number];
  look: [number, number, number];
};

/* ── Layout of the workshop (z goes deeper as you scroll) ──
   gate 0 · stair -16 · showroom -32 · big text -46 · doors -58 ·
   gallery -68…-83 · forge -90                                        */
export const Z = {
  gate: 0,
  stair: -16,
  showroom: -32,
  text: -46,
  doors: -58,
  gallery: -68,
  forge: -90,
};

export const WAYPOINTS: Waypoint[] = [
  { section: "top", offset: 0, pos: [2.3, 0.45, 4.9], look: [0.1, 0.35, 0] },
  { section: "top", offset: 0.5, pos: [0.15, 0.7, 1.4], look: [0, 0.6, -6] },
  { section: "top", offset: 0.85, pos: [-0.8, 0.9, -2.6], look: [1.2, 0.8, -12] },
  { section: "savoir-faire", offset: 0, pos: [-3.6, 2.1, -9.2], look: [1.6, 0.9, Z.stair] },
  { section: "savoir-faire", offset: 0.85, pos: [4.8, 2.7, -10.4], look: [1.6, 0.9, Z.stair - 0.5] },
  { section: "services", offset: 0, pos: [-6, 1.7, Z.showroom + 7.5], look: [-5.2, 0.5, Z.showroom] },
  { section: "services", offset: 0.9, pos: [6, 1.7, Z.showroom + 7.5], look: [5.2, 0.5, Z.showroom] },
  { section: "pourquoi-nous", offset: 0, pos: [-2, 1.5, Z.text + 9.5], look: [2.6, 3.6, Z.text] },
  { section: "pourquoi-nous", offset: 0.75, pos: [-1.2, 1.6, Z.text + 8.5], look: [3.0, 3.4, Z.text] },
  { section: "pros-particuliers", offset: 0, pos: [0, 1.9, Z.doors + 8], look: [0, 0.7, Z.doors] },
  { section: "pros-particuliers", offset: 0.7, pos: [0.6, 1.8, Z.doors + 7], look: [-0.4, 0.8, Z.doors] },
  { section: "realisations", offset: 0, pos: [0, 1.6, Z.gallery + 5], look: [0, 1.2, Z.gallery - 6] },
  { section: "realisations", offset: 0.9, pos: [0, 1.6, Z.gallery - 10], look: [0, 1.2, Z.gallery - 18] },
  { section: "contact", offset: 0, pos: [-2.6, 1.5, Z.forge + 6], look: [0.4, 0.1, Z.forge] },
  { section: "footer", offset: 0, pos: [-3.6, 1.2, Z.forge + 4.5], look: [0.6, 0.3, Z.forge] },
];

export const INTRO_POS: [number, number, number] = [0.6, 0.8, 15];
export const INTRO_LOOK: [number, number, number] = [0, 0.4, 0];
