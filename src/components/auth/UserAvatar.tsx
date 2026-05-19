"use client";

import { useAuthContext } from "@/components/providers/AuthProvider";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
  size?: number;
  className?: string;
}

/**
 * Renders the profile picture from Supabase Storage profiles if available,
 * otherwise falls back to Google profile picture or styled initials derived from name/email.
 */
export function UserAvatar({ user, size = 40, className = "" }: UserAvatarProps) {
  const { profile, user: currentUser } = useAuthContext();

  const isCurrentUser = currentUser?.id === user.id;
  const avatarUrl = isCurrentUser
    ? (profile?.avatar_url || user.user_metadata?.avatar_url as string | undefined)
    : (user.user_metadata?.avatar_url as string | undefined);

  const displayName = isCurrentUser
    ? (profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Member")
    : (user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Member");

  // Calculate initials: first letter of first name + first letter of last name
  const nameParts = displayName.trim().split(/\s+/);
  const initials = nameParts.length >= 2
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : nameParts[0]
      ? nameParts[0].slice(0, 2).toUpperCase()
      : "ME";

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={`${displayName}'s avatar`}
        width={size}
        height={size}
        className={`rounded-full object-cover ring-1 ring-gold/40 ${className}`}
        style={{ width: size, height: size }}
        unoptimized // Allow external URLs and query parameter cache-busters without strict domain config
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center bg-gradient-to-br from-gold/30 to-oud/40 ring-1 ring-gold/40 font-cormorant font-semibold text-parchment select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-label={`${displayName}'s avatar`}
    >
      {initials}
    </div>
  );
}

