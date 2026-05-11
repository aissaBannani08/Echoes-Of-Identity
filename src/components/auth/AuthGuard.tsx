"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Optional loading shell only. Security is enforced server-side (layouts, middleware).
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      fallback ?? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold/50" aria-hidden />
        </div>
      )
    );
  }

  return <>{children}</>;
}
