"use client";

import { useMemo, useState } from "react";
import { useConfigurator } from "@/entities/configurator/api";
import {
  missingGroups,
  summarise,
  toSelections,
  totalOf,
  visibleGroups,
} from "@/entities/configurator/helpers";
import type { ConfiguratorCartItem } from "@/entities/configurator/types";
import { useConfiguratorStorage } from "./useConfiguratorStorage";

/**
 * Everything the configurator screen needs: the preset, the buyer's live
 * choices, the running price and the cart payload.
 */
export function useConfiguratorBuild(slug: string | undefined) {
  const { data: configurator, isLoading, isError } = useConfigurator(slug);
  const [openId, setOpenId] = useState<string | null>(null);

  const groups = useMemo(() => visibleGroups(configurator), [configurator]);
  const storage = useConfiguratorStorage(slug, groups);

  const selections = useMemo(
    () => toSelections(groups, storage.choices),
    [groups, storage.choices],
  );

  const basePrice = configurator?.base_price ?? 0;
  const total = totalOf(basePrice, selections);
  const missing = missingGroups(groups, storage.choices);

  const toCartItem = (): ConfiguratorCartItem | null => {
    if (!configurator || missing.length > 0) return null;

    return {
      configuratorSlug: configurator.slug,
      configuratorName: configurator.name,
      basePrice,
      selections,
      total,
    };
  };

  return {
    configurator,
    groups,
    isLoading,
    isError,
    choices: storage.choices,
    pick: storage.pick,
    setText: storage.setText,
    reset: storage.reset,
    selections,
    summary: summarise(selections),
    basePrice,
    total,
    /** Required steps still unanswered — the add-to-cart button waits on these. */
    missing,
    toCartItem,
    openId,
    toggleHotspot: (id: string) =>
      setOpenId((current) => (current === id ? null : id)),
    closeHotspot: () => setOpenId(null),
  };
}
