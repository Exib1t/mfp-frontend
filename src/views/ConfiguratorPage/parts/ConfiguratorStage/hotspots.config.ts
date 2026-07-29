/** Which side the chip + popover sit relative to the anchor point. */
export type HotspotSide = "left" | "right" | "top" | "bottom";

export interface HotspotPlacement {
  /** Anchor point on the stage image, in percent (0–100). */
  x: number;
  y: number;
  side: HotspotSide;
}

export interface HotspotConfig extends HotspotPlacement {
  /** Group code the chip edits. */
  id: string;
  label: string;
}

/** Base wigwam photo, served from `public/configurator/wigwam-base.png`. */
export const WIGWAM_BASE_IMAGE = "/configurator/wigwam-base.png";

/**
 * Hand-tuned chip positions for the wigwam preset, keyed by group code.
 * Any other code falls back to `FALLBACK_PLACEMENTS`, so a preset built in
 * the admin still gets usable chips without touching this file.
 */
export const PLACEMENTS_BY_CODE: Record<string, HotspotPlacement> = {
  size: { x: 50, y: 11, side: "top" },
  fabric: { x: 31, y: 40, side: "left" },
  color: { x: 70, y: 46, side: "right" },
  child_name: { x: 26, y: 63, side: "left" },
  addons: { x: 55, y: 82, side: "right" },
};

/** Alternating left/right ladder used for codes with no tuned position. */
const FALLBACK_PLACEMENTS: [HotspotPlacement, ...HotspotPlacement[]] = [
  { x: 50, y: 12, side: "top" },
  { x: 30, y: 32, side: "left" },
  { x: 70, y: 44, side: "right" },
  { x: 28, y: 60, side: "left" },
  { x: 66, y: 74, side: "right" },
  { x: 46, y: 88, side: "bottom" },
];

export function placementFor(code: string, index: number): HotspotPlacement {
  const fallback =
    FALLBACK_PLACEMENTS[index % FALLBACK_PLACEMENTS.length] ??
    FALLBACK_PLACEMENTS[0];
  return PLACEMENTS_BY_CODE[code] ?? fallback;
}
