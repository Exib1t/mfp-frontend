"use client";

import DOMPurify from "dompurify";
import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";

import "./RichText.styles.scss";

interface RichTextProps {
  /** HTML as the admin's editor stored it. */
  html: string;
  className?: string;
}

/** Exactly what the admin's editor can produce — everything else is dropped. */
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "a",
];

const ALLOWED_ATTR = ["href", "target", "rel"];

// A link that opens a new tab hands the opener over unless it says otherwise.
if (typeof window !== "undefined") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") node.setAttribute("rel", "noopener noreferrer");
  });
}

const BASE_CLASS = "rich-text";

/**
 * Admin-authored HTML, sanitised. The content is ours, but an admin account is
 * one compromise away from stored XSS on every product page, so it still goes
 * through an allowlist.
 *
 * Sanitising needs a DOM, so nothing renders on the server. Product data is
 * fetched client-side anyway, so the block appears with the rest of it.
 */
function RichText({ html, className }: RichTextProps) {
  const clean = useMemo(() => {
    if (typeof window === "undefined" || !html) return "";

    return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
  }, [html]);

  // `<p></p>` from an editor that was opened and left empty sanitises to markup
  // with no text in it; there is nothing to show and no box worth drawing.
  if (!clean || !stripTags(clean).trim()) return null;

  return (
    <div
      className={cn(BASE_CLASS, className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitised above
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export default RichText;
