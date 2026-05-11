import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/** One Supabase `getUser()` per request for all dashboard RSC consumers. */
export const getVerifiedUser = cache(async (): Promise<User | null> => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
});
