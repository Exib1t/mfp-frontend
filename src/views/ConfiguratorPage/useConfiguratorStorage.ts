"use client";

import { useEffect, useState } from "react";
import { initialChoices } from "@/entities/configurator/helpers";
import type {
  ConfiguratorChoices,
  ConfiguratorGroup,
} from "@/entities/configurator/types";

const STORAGE_PREFIX = "mfp-configurator";

/**
 * Live choices for one preset, persisted per slug so switching products does
 * not leak a half-built configuration into the next one.
 */
export function useConfiguratorStorage(
  slug: string | undefined,
  groups: ConfiguratorGroup[],
) {
  const [choices, setChoices] = useState<ConfiguratorChoices>({});
  const [isReady, setIsReady] = useState(false);

  // Hydrate after mount to avoid an SSR mismatch, and only once the groups
  // have arrived — defaults come from them.
  useEffect(() => {
    if (!slug || groups.length === 0) return;

    setChoices(mergeStored(readStored(slug), initialChoices(groups)));
    setIsReady(true);
  }, [slug, groups]);

  useEffect(() => {
    if (!isReady || !slug) return;
    localStorage.setItem(`${STORAGE_PREFIX}:${slug}`, JSON.stringify(choices));
  }, [choices, isReady, slug]);

  /** Replaces a single-choice group, or toggles an entry in a multi one. */
  const pick = (group: ConfiguratorGroup, value: string) =>
    setChoices((current) => {
      if (!group.is_multiple) return { ...current, [group.code]: [value] };

      const picked = current[group.code] ?? [];
      return {
        ...current,
        [group.code]: picked.includes(value)
          ? picked.filter((entry) => entry !== value)
          : [...picked, value],
      };
    });

  const setText = (group: ConfiguratorGroup, text: string) =>
    setChoices((current) => ({ ...current, [group.code]: [text] }));

  const reset = () => setChoices(initialChoices(groups));

  return { choices, isReady, pick, setText, reset };
}

function readStored(slug: string): ConfiguratorChoices {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:${slug}`);
    return raw ? (JSON.parse(raw) as ConfiguratorChoices) : {};
  } catch {
    return {};
  }
}

/**
 * Stored choices win, but only for groups that still exist — an admin can
 * rename or drop a step between visits.
 */
function mergeStored(
  stored: ConfiguratorChoices,
  defaults: ConfiguratorChoices,
): ConfiguratorChoices {
  const merged: ConfiguratorChoices = { ...defaults };

  for (const [code, values] of Object.entries(stored)) {
    if (code in defaults && Array.isArray(values)) merged[code] = values;
  }

  return merged;
}
