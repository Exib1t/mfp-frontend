import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_URL } from "@/config/api.config";
import { refreshAccessToken } from "@/lib/auth/api";
import {
  clearSession,
  readSession,
  writeAccessToken,
} from "@/lib/auth/session";

/** Headers worth passing through; everything else is hop-by-hop or rewritten. */
const FORWARDED_REQUEST_HEADERS = ["content-type", "accept"];
const FORWARDED_RESPONSE_HEADERS = ["content-type", "content-disposition"];

function unauthorized(): NextResponse {
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
}

function buildTargetUrl(request: NextRequest, path: string[]): string {
  const search = request.nextUrl.search;
  return `${API_URL}/${path.join("/")}${search}`;
}

/**
 * Buffers the body rather than streaming it: a 401 triggers a token refresh and
 * a replay, and a stream cannot be read twice.
 */
async function readBody(
  request: NextRequest,
): Promise<ArrayBuffer | undefined> {
  if (request.method === "GET" || request.method === "HEAD") return undefined;
  const buffer = await request.arrayBuffer();
  return buffer.byteLength > 0 ? buffer : undefined;
}

function buildHeaders(request: NextRequest, accessToken: string): Headers {
  const headers = new Headers({ Authorization: `Bearer ${accessToken}` });
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

function callApi(
  url: string,
  request: NextRequest,
  accessToken: string,
  body: ArrayBuffer | undefined,
): Promise<Response> {
  return fetch(url, {
    method: request.method,
    headers: buildHeaders(request, accessToken),
    body,
    cache: "no-store",
  });
}

async function toNextResponse(response: Response): Promise<NextResponse> {
  const headers = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = response.headers.get(name);
    if (value) headers.set(name, value);
  }

  if (response.status === 204) {
    return new NextResponse(null, { status: 204, headers });
  }

  const payload = await response.arrayBuffer();
  return new NextResponse(payload, { status: response.status, headers });
}

/**
 * Proxies an admin request to the API, attaching the access token from the
 * httpOnly cookie. Retries once after a silent refresh when the token expired.
 */
export async function forwardToApi(
  request: NextRequest,
  path: string[],
): Promise<NextResponse> {
  const session = await readSession();
  if (!session) return unauthorized();

  const url = buildTargetUrl(request, path);
  const body = await readBody(request);

  let response = await callApi(url, request, session.accessToken, body);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken(session.refreshToken);
    if (!refreshed) {
      await clearSession();
      return unauthorized();
    }
    await writeAccessToken(refreshed.access_token);
    response = await callApi(url, request, refreshed.access_token, body);
  }

  return toNextResponse(response);
}
