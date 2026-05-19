import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account — Echoes of Identity",
  description: "Join Echoes of Identity and help preserve Jewish and Muslim cultural stories for future generations.",
  robots: "noindex, nofollow",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 30% 50%, rgba(201,169,110,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 75% 30%, rgba(125,78,36,0.04) 0%, transparent 55%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-xs text-parchment/30 font-inter tracking-[0.25em] uppercase mb-2">Echoes of Identity</p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
