import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_HOME_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_REFRESH_COOKIE,
} from "@/config/admin.config";

/**
 * Optimistic gate for the admin area — presence of a refresh cookie only.
 * The real authorization happens on the API for every request; this just keeps
 * signed-out visitors from loading the panel shell.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_HOME_PATH)) return NextResponse.next();

  const hasSession =
    Boolean(request.cookies.get(ADMIN_REFRESH_COOKIE)?.value) ||
    Boolean(request.cookies.get(ADMIN_ACCESS_COOKIE)?.value);

  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;

  if (!hasSession && !isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (hasSession && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_HOME_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
