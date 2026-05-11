import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

function redirectToLogin(origin: string, error: string) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

/**
 * OAuth PKCE code exchange handler.
 * Idempotent: repeated calls with an already-valid session redirect to /dashboard.
 * Always ends at /dashboard or /login?error=... (missing_code | oauth_failed).
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { searchParams, origin } = url;
  const error = searchParams.get("error");
  const code = searchParams.get("code");

  if (error) {
    return redirectToLogin(origin, "oauth_failed");
  }

  const response = NextResponse.redirect(new URL("/dashboard", origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          });
        },
      },
    }
  );

  const {
    data: { user: existingUser },
  } = await supabase.auth.getUser();
  if (existingUser) {
    return response;
  }

  if (!code) {
    return redirectToLogin(origin, "missing_code");
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const {
      data: { user: recovered },
    } = await supabase.auth.getUser();
    if (recovered) {
      return response;
    }
    return redirectToLogin(origin, "oauth_failed");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return redirectToLogin(origin, "oauth_failed");
  }

  return response;
}
