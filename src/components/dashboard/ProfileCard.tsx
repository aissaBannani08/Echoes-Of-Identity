"use client";

import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { Mail, Calendar } from "lucide-react";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Member";

  const provider = user.app_metadata?.provider as string | undefined;
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl overflow-hidden">
      {/* Top shimmer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="p-8 space-y-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-5">
          <UserAvatar user={user} size={64} />
          <div className="min-w-0">
            <h2 className="text-xl font-cinzel text-parchment truncate">{displayName}</h2>
            {provider && (
              <span className="inline-block mt-1 text-[10px] font-inter font-medium px-2 py-0.5 rounded-full bg-gold/10 text-gold/80 border border-gold/20 uppercase tracking-wider">
                {provider === "google" ? "Google account" : "Email account"}
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06]" />

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-gold/50 shrink-0" aria-hidden="true" />
            <span className="text-parchment/70 font-inter truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gold/50 shrink-0" aria-hidden="true" />
            <span className="text-parchment/50 font-inter">Member since {joinedDate}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06]" />
      </div>
    </div>
  );
}
