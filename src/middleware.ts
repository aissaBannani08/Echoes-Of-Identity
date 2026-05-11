import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { safeInternalRedirectPath } from "@/lib/auth/safe-redirect-path";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-eoi-pathname", pathname);
  const requestForSession = new NextRequest(request.nextUrl, {
    headers: requestHeaders,
  });

  const { supabaseResponse, user } = await updateSession(requestForSession);

  // Always refresh session for OAuth callback; never apply auth-route redirects here.
  if (pathname.startsWith("/auth/callback")) {
    return supabaseResponse;
  }

  const isProtectedRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      safeInternalRedirectPath(pathname, "/dashboard")
    );
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isAuthRoute && user) {
    const rawNext = request.nextUrl.searchParams.get("redirectTo");
    const dest = safeInternalRedirectPath(rawNext, "/dashboard");
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT static assets and metadata files.
     * /auth/callback is included so the session is refreshed; it returns early above.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
