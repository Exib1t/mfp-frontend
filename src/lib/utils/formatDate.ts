const DATE_TIME = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const DATE_ONLY = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

/** "29.07.2026, 16:04" */
export function formatDateTime(iso: string): string {
  return DATE_TIME.format(new Date(iso));
}

/** "29 липня 2026 р." */
export function formatDate(iso: string): string {
  return DATE_ONLY.format(new Date(iso));
}
