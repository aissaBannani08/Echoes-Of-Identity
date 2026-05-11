/**
 * Prevents open redirects and post-login bounce loops (e.g. redirectTo=/login).
 * Safe to import from Client Components and Server Components.
 */
export function safeInternalRedirectPath(
  candidate: string | null | undefined,
  fallback: string
): string {
  if (candidate == null || candidate === "") return fallback;
  const trimmed = candidate.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return fallback;
  if (
    /[\r\n]/.test(trimmed) ||
    trimmed.includes("\\") ||
    trimmed.includes("://") ||
    trimmed.includes("..")
  ) {
    return fallback;
  }

  const pathOnly = trimmed.split("?")[0].split("#")[0] ?? "";
  if (
    pathOnly === "/login" ||
    pathOnly === "/signup" ||
    pathOnly === "/auth/callback" ||
    pathOnly === "/forgot-password" ||
    pathOnly === "/reset-password"
  ) {
    return fallback;
  }

  return trimmed;
}
