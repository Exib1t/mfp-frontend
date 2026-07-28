import type { NextRequest } from "next/server";
import { forwardToApi } from "@/lib/bff/forward";

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

async function handle(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return forwardToApi(request, path);
}

export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const PUT = handle;
export const DELETE = handle;

// Admin data is per-session and must never be cached or prerendered.
export const dynamic = "force-dynamic";
