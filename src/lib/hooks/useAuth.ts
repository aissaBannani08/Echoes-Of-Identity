"use client";

import { useAuthContext } from "@/components/providers/AuthProvider";
import type { User } from "@supabase/supabase-js";

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: User };

/**
 * useAuth — reactive UI state hook that consumes the shared AuthProvider context.
 * Resolves session persistence and prevents duplicate auth listeners/API requests.
 */
export function useAuth(): AuthState {
  const { status, user } = useAuthContext();

  if (status === "authenticated" && user) {
    return { status: "authenticated", user };
  }

  if (status === "unauthenticated") {
    return { status: "unauthenticated" };
  }

  return { status: "loading" };
}
