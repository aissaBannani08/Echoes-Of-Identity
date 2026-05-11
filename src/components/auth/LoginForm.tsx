"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { GoogleOAuthButton } from "./GoogleOAuthButton";
import { AuthCard } from "./AuthCard";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { signIn } from "@/app/auth/actions";
import { safeInternalRedirectPath } from "@/lib/auth/safe-redirect-path";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeInternalRedirectPath(
    searchParams.get("redirectTo"),
    "/dashboard"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  async function onSubmit(data: LoginInput) {
    setLoading(true);

    // Set a temporary cookie to tell the server how long the session should last
    if (data.rememberMe) {
      document.cookie = `sb-remember-me=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax; Secure`;
    } else {
      document.cookie = `sb-remember-me=false; path=/; max-age=${60 * 60}; SameSite=Lax; Secure`;
    }

    const { error } = await signIn(data);

    if (error) {
      console.error("[LoginForm]", error);
      toast.error("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Welcome back");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthCard>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-cinzel text-parchment tracking-wide">
          Welcome back
        </h1>
        <p className="text-sm text-parchment/50 font-inter">
          Sign in to continue your journey
        </p>
      </div>

      {/* Google OAuth */}
      <GoogleOAuthButton mode="login" />

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
            htmlFor="login-email"
            className="block text-xs font-medium text-parchment/60 font-inter"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
            style={{ fontSize: "16px" }}
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="text-[11px] text-red-400/90 font-inter mt-1"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-medium text-parchment/60 font-inter"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-gold/70 hover:text-gold transition-colors font-inter"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200 min-h-[44px]"
              style={{ fontSize: "16px" }}
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="text-[11px] text-red-400/90 font-inter mt-1"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="login-remember"
            type="checkbox"
            className="w-4 h-4 rounded border-white/20 bg-white/[0.04] text-gold focus:ring-gold/40 cursor-pointer accent-[#C9A96E]"
            {...register("rememberMe")}
          />
          <label
            htmlFor="login-remember"
            className="text-xs text-parchment/50 font-inter cursor-pointer select-none"
          >
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          id="login-submit-btn"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-semibold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-parchment/40 font-inter mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-gold/70 hover:text-gold transition-colors font-medium"
        >
          Create one →
        </Link>
      </p>
    </AuthCard>
  );
}
