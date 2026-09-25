/** Shared PBR presets so every metal piece on the site looks like the same alloy. */
export const STEEL = {
  color: "#a4aab2",
  metalness: 0.95,
  roughness: 0.32,
  envMapIntensity: 1.4,
} as const;

export const DARK_STEEL = {
  color: "#3b4149",
  metalness: 0.9,
  roughness: 0.42,
  envMapIntensity: 1.1,
} as const;

export const BLACK_STEEL = {
  color: "#1d2126",
  metalness: 0.85,
  roughness: 0.5,
  envMapIntensity: 1,
} as const;

export const EMBER = "#ff6a1a";
