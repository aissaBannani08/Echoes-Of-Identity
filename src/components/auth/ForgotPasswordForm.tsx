"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { AuthCard } from "./AuthCard";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    // Always show success — never reveal if email exists (enumeration attack prevention)
    if (error) {
      console.error("[ForgotPassword]", error.message);
    }

    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 py-4"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-glow-gold">
              <CheckCircle2 className="w-8 h-8 text-gold" aria-hidden="true" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-cinzel text-parchment">Check your inbox</h2>
            <p className="text-sm text-parchment/60 font-inter leading-relaxed">
              If an account exists for{" "}
              <span className="text-gold font-medium">{getValues("email")}</span>,
              you'll receive a password reset link shortly.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block text-xs text-parchment/40 hover:text-parchment/70 font-inter transition-colors"
          >
            ← Back to sign in
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-cinzel text-parchment tracking-wide">Reset password</h1>
        <p className="text-sm text-parchment/50 font-inter">
          Enter your email and we'll send a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="block text-xs font-medium text-parchment/60 font-inter">
            Email
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "forgot-email-error" : undefined}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
            style={{ fontSize: "16px" }}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p id="forgot-email-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          id="forgot-submit-btn"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-semibold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="text-center text-xs text-parchment/40 font-inter mt-6">
        <Link href="/login" className="text-gold/70 hover:text-gold transition-colors font-medium">
          ← Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}
