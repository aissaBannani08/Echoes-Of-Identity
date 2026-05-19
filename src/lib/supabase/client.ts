"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/validations/env";

/**
 * Browser-side Supabase client — singleton pattern.
 * Use ONLY in Client Components ('use client').
 * Never use this for auth state truth — server is always authoritative.
 */
let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) return client;
  client = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return client;
}
