import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

/**
 * Called from root middleware.ts on EVERY request.
 * Refreshes the session token transparently so users never hit
 * a stale-session error mid-session.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          const rememberMe = request.cookies.get("sb-remember-me")?.value === "true";
          const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60;

          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions = {
              ...options,
              maxAge: name.includes("auth-token") ? maxAge : options.maxAge,
              httpOnly: true,
              sameSite: "lax" as const,
              secure: process.env.NODE_ENV === "production",
            };
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, cookieOptions);
          });
        },
      },
    }
  );

  // IMPORTANT: do not run any code between createServerClient and getUser()
  // — it will cause hard-to-debug session issues.
  let user: User | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Missing or corrupt cookies / transient network — treat as signed out; never loop.
  }

  return { supabaseResponse, user };
}
