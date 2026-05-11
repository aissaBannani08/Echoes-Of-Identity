import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { getVerifiedUser } from "@/lib/supabase/get-verified-user";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — Echoes of Identity",
  description: "Your Echoes of Identity member dashboard.",
  robots: "noindex, nofollow",
};

/**
 * Dashboard server component. `dashboard/layout.tsx` is the primary gate;
 * this page reuses the same cached `getUser()` result for the session user.
 */
export default async function DashboardPage() {
  const user = await getVerifiedUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  return (
    <main className="min-h-screen bg-midnight px-4 py-16 relative overflow-hidden">
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 30%, rgba(201,169,110,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 70%, rgba(125,78,36,0.04) 0%, transparent 55%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-xs text-parchment/30 font-inter tracking-[0.25em] uppercase">Echoes of Identity</p>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl font-cinzel text-parchment">Dashboard</h1>
            <Link
              href="/"
              className="text-xs text-parchment/40 hover:text-gold/70 font-inter transition-colors"
            >
              ← Back to site
            </Link>
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-gold/40 to-transparent mt-2" />
        </div>

        {/* Profile card */}
        <ProfileCard user={user} />

        {/* Welcome message */}
        <div className="rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-xl p-6 space-y-3">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <h2 className="text-lg font-cinzel text-parchment/80">
            Welcome to the Archive
          </h2>
          <p className="text-sm text-parchment/50 font-inter leading-relaxed">
            You're now part of a community dedicated to preserving Jewish and Muslim 
            stories before they disappear. Explore the digital archive, contribute 
            testimonies, and help build bridges across cultures.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              href="/archive"
              className="text-xs font-inter font-medium px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all duration-200 min-h-[44px] flex items-center"
            >
              Explore archive →
            </Link>
            <Link
              href="/"
              className="text-xs font-inter text-parchment/40 hover:text-parchment/70 px-4 py-2 rounded-lg border border-white/[0.06] hover:border-white/10 transition-all duration-200 min-h-[44px] flex items-center"
            >
              View homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
