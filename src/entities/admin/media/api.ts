"use client";

import { BFF_BASE_PATH } from "@/config/admin.config";

/** Whitelisted destinations — must match MEDIA_FOLDERS on the backend. */
export type MediaFolder = "configurator" | "attributes" | "categories" | "misc";

/**
 * Uploads one image straight to permanent storage and returns its public URL.
 * Goes through the BFF as multipart — openapi-fetch would JSON-serialise it.
 */
export async function uploadMedia(
  file: File,
  folder: MediaFolder,
): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const response = await fetch(`${BFF_BASE_PATH}/api/v1/files/media`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) throw new Error(`Не вдалося завантажити ${file.name}`);

  const payload = (await response.json()) as { data: { url: string } };
  return payload.data.url;
}
