export type HotspotId = "size" | "fabric" | "color" | "addon" | "name";

/** Which side the chip + popover sit relative to the anchor point. */
export type HotspotSide = "left" | "right" | "top" | "bottom";

export interface HotspotConfig {
  id: HotspotId;
  label: string;
  /** Anchor point on the stage image, in percent (0–100). */
  x: number;
  y: number;
  side: HotspotSide;
}

/** Base wigwam photo, served from `public/configurator/wigwam-base.png`. */
export const WIGWAM_BASE_IMAGE = "/configurator/wigwam-base.png";

/**
 * Positions of the interactive chips over the wigwam photo.
 * Coordinates are percentages of the stage box — tuned to wigwam-base.jpg.
 */
export const HOTSPOTS: HotspotConfig[] = [
  { id: "size", label: "Розмір", x: 50, y: 11, side: "top" },
  { id: "fabric", label: "Тканина", x: 31, y: 40, side: "left" },
  { id: "color", label: "Колір", x: 70, y: 46, side: "right" },
  { id: "name", label: "Ім'я", x: 26, y: 63, side: "left" },
  { id: "addon", label: "Комплектація", x: 55, y: 82, side: "right" },
];
