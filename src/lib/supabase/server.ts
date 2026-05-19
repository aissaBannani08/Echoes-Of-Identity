import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/validations/env";

/**
 * Server-side Supabase client.
 * Use in Server Components, Server Actions, and Route Handlers.
 * Reads/writes session from httpOnly cookies — never exposes tokens to the browser.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            // Check if 'rememberMe' is set to determine session duration
            const rememberMe = cookieStore.get("sb-remember-me")?.value === "true";
            const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60; // 30 days vs 1 hour

            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                maxAge: name.includes("auth-token") ? maxAge : options.maxAge,
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
              });
            });
          } catch {
            // Safe to ignore in Server Components
          }
        },
      },
    }
  );
}
