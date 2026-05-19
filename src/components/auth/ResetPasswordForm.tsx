"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { AuthCard } from "./AuthCard";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = watch("password", "");

  async function onSubmit(data: ResetPasswordInput) {
    setLoading(true);
    const supabase = createClient();

    // Supabase handles token validation — this only works within an active recovery session.
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error("[ResetPassword]", error.message);
      toast.error("Could not reset password. The link may have expired.");
      setLoading(false);
      return;
    }

    toast.success("Password updated — please sign in with your new password.");
    router.push("/login");
  }

  return (
    <AuthCard>
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-cinzel text-parchment tracking-wide">New password</h1>
        <p className="text-sm text-parchment/50 font-inter">
          Choose a strong password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-password" className="block text-xs font-medium text-parchment/60 font-inter">
            New password
          </label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-describedby={errors.password ? "reset-password-error" : "reset-strength"}
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
            <p id="reset-password-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.password.message}
            </p>
          ) : (
            <div id="reset-strength">
              <PasswordStrengthMeter password={passwordValue} />
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-confirm" className="block text-xs font-medium text-parchment/60 font-inter">
            Confirm new password
          </label>
          <div className="relative">
            <input
              id="reset-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              aria-describedby={errors.confirmPassword ? "reset-confirm-error" : undefined}
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
            <p id="reset-confirm-error" role="alert" className="text-[11px] text-red-400/90 font-inter">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          id="reset-submit-btn"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-semibold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Updating…" : "Update password"}
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
