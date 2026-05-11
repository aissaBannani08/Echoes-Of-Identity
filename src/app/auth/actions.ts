"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";

/**
 * Server Action for email/password login.
 */
export async function signIn(data: LoginInput) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input data" };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Session could not be established." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signOut() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: true };

  const { error } = await supabase.auth.signOut({ scope: "global" });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}
