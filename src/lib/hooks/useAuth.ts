"use client";

import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: User };

/**
 * useAuth — reactive UI only (avatars, buttons, cross-tab updates).
 * Never use this for access control; server components and middleware enforce auth.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    const applyFromUser = (user: User | null) => {
      if (cancelled) return;
      if (user) {
        setState({ status: "authenticated", user });
      } else {
        setState({ status: "unauthenticated" });
      }
    };

    void supabase.auth.getUser().then((res) => {
      if (cancelled) return;
      const user = res.data.user;
      if (res.error) {
        applyFromUser(null);
        return;
      }
      applyFromUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        applyFromUser(session?.user ?? null);
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return state;
}
