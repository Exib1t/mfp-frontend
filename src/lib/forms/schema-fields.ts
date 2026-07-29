import { z } from "zod";

/**
 * Shared zod fields for admin forms. Inputs hand back strings, the API wants
 * numbers and nulls — so these transform, which makes a schema's input and
 * output types differ. Export both (`z.input` / `z.output`) and make the form
 * generic over the pair.
 *
 * `z.coerce` is deliberately avoided: it types its input as `unknown`, which
 * breaks the react-hook-form resolver's generic inference.
 */

/** Trimmed string, or null when blank. */
export const optionalText = z
  .union([z.string(), z.null()])
  .transform((value) => {
    const trimmed = value?.trim() ?? "";
    return trimmed === "" ? null : trimmed;
  });

/** Numeric string, or null when blank / unparseable. */
export const optionalMoney = z
  .union([z.string(), z.number(), z.null()])
  .transform((value) => {
    if (value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  });

/** Always-a-number field; `.pipe()` on the result to add range checks. */
export const requiredNumber = z
  .union([z.string(), z.number()])
  .transform((value) => Number(value));

/** Lowercase machine key: `a-z`, digits, underscore. */
export const codeField = (error: string) =>
  z
    .string()
    .trim()
    .min(1, { error })
    .regex(/^[a-z0-9_]+$/, {
      error: "Лише малі латинські літери, цифри та підкреслення",
    });

/** URL-safe slug: `a-z`, digits, dash. */
export const slugField = (error: string) =>
  z
    .string()
    .trim()
    .min(1, { error })
    .regex(/^[a-z0-9-]+$/, {
      error: "Лише малі латинські літери, цифри та дефіс",
    });
