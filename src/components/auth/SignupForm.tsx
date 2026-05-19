"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { GoogleOAuthButton } from "./GoogleOAuthButton";
import { AuthCard } from "./AuthCard";
import { AuthSuccessCard } from "./AuthSuccessCard";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useWatch, useFormContext } from "react-hook-form";
import Link from "next/link";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const passwordValue = watch("password", "");

  async function onSubmit(data: SignupInput) {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("[SignupForm]", error.message);
      toast.error("Could not create account. Please try again.");
      setLoading(false);
      return;
    }

    setSuccessEmail(data.email);
  }

  if (successEmail) {
    return (
      <AuthCard>
        <AuthSuccessCard email={successEmail} redirectTo="/login" />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-cinzel text-parchment tracking-wide">
          Create account
        </h1>
        <p className="text-sm text-parchment/50 font-inter">
          Begin preserving stories that matter
        </p>
      </div>

      {/* Google OAuth */}
      <GoogleOAuthButton mode="signup" />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-black/50 px-3 text-xs text-parchment/30 font-inter">
            or continue with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="block text-xs font-medium text-parchment/60 font-inter"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
            style={{ fontSize: "16px" }}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p id="signup-email-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-password"
            className="block text-xs font-medium text-parchment/60 font-inter"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-describedby={errors.password ? "signup-password-error" : "signup-password-strength"}
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
              style={{ fontSize: "16px" }}
              placeholder="Min. 8 characters"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password ? (
            <p id="signup-password-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.password.message}
            </p>
          ) : (
            <div id="signup-password-strength">
              <PasswordStrengthMeter password={passwordValue} />
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-confirm"
            className="block text-xs font-medium text-parchment/60 font-inter"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="signup-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              aria-describedby={errors.confirmPassword ? "signup-confirm-error" : undefined}
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
              style={{ fontSize: "16px" }}
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors p-1"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="signup-confirm-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          id="signup-submit-btn"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-semibold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-parchment/40 font-inter mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-gold/70 hover:text-gold transition-colors font-medium">
          Sign in →
        </Link>
      </p>
    </AuthCard>
  );
}
