"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthSuccessCardProps {
  email: string;
  redirectTo?: string;
}

/**
 * Shown after successful signup.
 * Displays animated confirmation + 3-second visible countdown, then redirects.
 */
export function AuthSuccessCard({
  email,
  redirectTo = "/login",
}: AuthSuccessCardProps) {
  const [seconds, setSeconds] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (seconds <= 0) {
      router.push(redirectTo);
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, redirectTo, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center space-y-6 py-4"
    >
      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 18 }}
        className="flex justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-glow-gold">
          <CheckCircle2 className="w-8 h-8 text-gold" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-cinzel text-parchment">Check your email</h2>
        <p className="text-sm text-parchment/60 font-inter leading-relaxed">
          We sent a confirmation link to{" "}
          <span className="text-gold font-medium">{email}</span>.
          <br />
          Click it to activate your account.
        </p>
      </div>

      {/* Countdown */}
      <motion.p
        key={seconds}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-parchment/30 font-inter"
      >
        Redirecting to login in{" "}
        <span className="text-parchment/60 font-medium">{seconds}</span>s…
      </motion.p>
    </motion.div>
  );
}
