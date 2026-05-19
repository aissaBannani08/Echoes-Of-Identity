"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shared animated wrapper for all auth forms.
 * Uses Framer Motion for mount/unmount — slide up + fade.
 * Matches project aesthetic: dark glass card with gold border shimmer.
 */
export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md mx-auto ${className}`}
      >
        {/* Card */}
        <div className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Top gold shimmer line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="p-8">{children}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
