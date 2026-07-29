/**
 * Ukrainian/Russian transliteration table (KMU 55:2010, simplified).
 * Multi-char keys must be tried before single chars — see `TRANSLIT_KEYS`.
 */
const TRANSLIT: Record<string, string> = {
  зг: "zgh",
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "iu",
  я: "ia",
  ы: "y",
  э: "e",
  ъ: "",
  ё: "e",
};

const TRANSLIT_KEYS = Object.keys(TRANSLIT).sort((a, b) => b.length - a.length);

/** Latinises and normalises a label into a URL-safe slug. */
export function slugify(input: string): string {
  let result = input.toLowerCase();

  for (const key of TRANSLIT_KEYS) {
    result = result.split(key).join(TRANSLIT[key]);
  }

  return (
    result
      .normalize("NFD")
      // Strip the combining marks NFD just split off (é -> e + U+0301).
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

/** Same, but for machine codes where underscores read better than dashes. */
export function codify(input: string): string {
  return slugify(input).replace(/-/g, "_");
}
