import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeInternalRedirectPath } from "@/lib/auth/safe-redirect-path";
import { getVerifiedUser } from "@/lib/supabase/get-verified-user";

/**
 * Dashboard SSR gate — session is verified before any dashboard UI is rendered.
 * Middleware is not sufficient on its own; this layout is the authoritative check.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getVerifiedUser();

  if (!user) {
    const pathname = headers().get("x-eoi-pathname") ?? "/dashboard";
    const redirectTarget = safeInternalRedirectPath(pathname, "/dashboard");
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTarget)}`);
  }

  return <>{children}</>;
}
