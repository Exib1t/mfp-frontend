"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ConfiguratorCartItem } from "./types";

const STORAGE_KEY = "mfp-cart-configurator";

interface ConfiguratorCartContextValue {
  item: ConfiguratorCartItem | null;
  setItem: (item: ConfiguratorCartItem) => void;
  clear: () => void;
  isReady: boolean;
}

const ConfiguratorCartContext =
  createContext<ConfiguratorCartContextValue | null>(null);

const ConfiguratorCartProvider = ({ children }: PropsWithChildren) => {
  const [item, setItemState] = useState<ConfiguratorCartItem | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItemState(JSON.parse(raw) as ConfiguratorCartItem);
    } catch {
      // ignore malformed storage
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [item, isReady]);

  const value = useMemo<ConfiguratorCartContextValue>(
    () => ({
      item,
      isReady,
      setItem(newItem) {
        setItemState(newItem);
      },
      clear() {
        setItemState(null);
      },
    }),
    [item, isReady],
  );

  return (
    <ConfiguratorCartContext.Provider value={value}>
      {children}
    </ConfiguratorCartContext.Provider>
  );
};

export function useConfiguratorCart(): ConfiguratorCartContextValue {
  const ctx = useContext(ConfiguratorCartContext);
  if (!ctx)
    throw new Error(
      "useConfiguratorCart must be used within <ConfiguratorCartProvider>",
    );
  return ctx;
}

export default ConfiguratorCartProvider;
