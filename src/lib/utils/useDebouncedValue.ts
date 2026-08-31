"use client";

import { useEffect, useState } from "react";

/**
 * Trails `value` by `delay` ms. Typing in the catalogue search box changes a
 * query key, so without this every keystroke would be its own request.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
