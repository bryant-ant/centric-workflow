import { NextResponse } from "next/server";

// ─── CHANGE THIS to your password ─────────────────────────────────────────────
const PASSWORD = "centric2026";

export function middleware(request) {
  const { cookies } = request;
  const authCookie = cookies.get("site-auth");

  // Already authenticated → let them through
  if (authCookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // On the login page or login API → let them through
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/api/login"
  ) {
    return NextResponse.next();
  }

  // Everyone else → redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

// Only run middleware on page routes, not on static assets or Next internals
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};