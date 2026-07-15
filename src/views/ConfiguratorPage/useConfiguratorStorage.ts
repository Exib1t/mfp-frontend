import { useEffect, useState } from "react";

export interface ConfigState {
  size: string;
  fabric: string;
  color: string;
  addons: Set<string>;
  name: string;
}

export const DEFAULT_CONFIG: ConfigState = {
  size: "m",
  fabric: "cotton",
  color: "cream",
  addons: new Set(),
  name: "",
};

const STORAGE_KEY = "mfp-configurator";

function loadConfig(): ConfigState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as Omit<ConfigState, "addons"> & {
      addons: string[];
    };
    return { ...parsed, addons: new Set(parsed.addons ?? []) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function useConfiguratorStorage() {
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch.
  useEffect(() => {
    setConfig(loadConfig());
    setReady(true);
  }, []);

  // Persist to localStorage on every change.
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...config, addons: [...config.addons] }),
    );
  }, [config, ready]);

  return { config, setConfig, ready };
}
