"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { UserAvatar } from "./UserAvatar";
import { LogOut, User as UserIcon, Settings, Camera, Loader2, X, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleOAuthButton } from "./GoogleOAuthButton";
import { createClient } from "@/lib/supabase/client";

export function UserDropdown() {
  const { user, status, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="w-[36px] h-[36px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <Loader2 className="w-4 h-4 animate-spin text-gold/60" />
      </div>
    );
  }

  // Handle click on the profile icon when authenticated
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function handleSignOut() {
    try {
      await signOut();
      setIsOpen(false);
      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Could not sign out. Please try again.");
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        // RENDER LOGGED IN STATE
        <>
          <button 
            onClick={toggleDropdown}
            className="rounded-full hover:scale-105 transition-transform focus:outline-none ring-2 ring-transparent focus:ring-gold/50 flex items-center justify-center"
            aria-label="User account dropdown"
          >
            <UserAvatar user={user} size={36} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/10">
                  <p className="text-sm font-inter text-parchment truncate font-medium">
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "Member"}
                  </p>
                  <p className="text-xs font-inter text-parchment/50 truncate mt-0.5">{user.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-parchment/70 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-gold/60" />
                    My Profile / Dashboard
                  </Link>
                  <button 
                    onClick={() => { setIsOpen(false); setIsEditModalOpen(true); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-parchment/70 hover:bg-white/5 hover:text-white transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-gold/60" />
                    Edit Profile
                  </button>
                </div>
                <div className="p-2 border-t border-white/10">
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // RENDER LOGGED OUT STATE
        <>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="rounded-full w-[36px] h-[36px] hover:scale-105 transition-transform bg-white/5 border border-white/10 flex items-center justify-center text-parchment/60 hover:text-white hover:bg-white/10 ring-2 ring-transparent focus:outline-none focus:ring-gold/50"
            aria-label="Log in or Sign up"
          >
            <UserIcon className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isAuthModalOpen && (
              <AuthPopupModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            )}
          </AnimatePresence>
        </>
      )}

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditModalOpen && user && (
          <EditProfileModal 
            user={user} 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// EDIT PROFILE MODAL COMPONENT (USES NEW STORAGE AND DB API FLOW)
function EditProfileModal({ user, isOpen, onClose }: { user: User; isOpen: boolean; onClose: () => void }) {
  const { profile, uploadAvatar, updateProfileName } = useAuthContext();
  const [name, setName] = useState(profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setName(profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || "");
    }
  }, [isOpen, profile, user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image file is too large. Keep it under 2MB.");
      return;
    }

    setIsUploading(true);
    const uploadedUrl = await uploadAvatar(file);
    setIsUploading(false);

    if (uploadedUrl) {
      toast.success("Profile picture updated!");
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    const success = await updateProfileName(name.trim());
    setIsLoading(false);

    if (success) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" 
      />
      <div 
        className="fixed inset-0 z-[100] flex p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative m-auto w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6"
        >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/5 hover:bg-white/5 text-parchment/40 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-cinzel text-parchment text-center">Edit Profile</h2>

        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            {isUploading ? (
              <div className="w-[80px] h-[80px] rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              </div>
            ) : (
              <UserAvatar user={user} size={80} />
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Camera className="w-5 h-5 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
            </label>
          </div>
          <p className="text-xs text-parchment/40">Click profile picture to upload a photo</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-inter text-parchment/60 uppercase tracking-wider">Display Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-inter text-parchment outline-none focus:border-gold/50 transition-colors"
            placeholder="Your name"
            disabled={isLoading || isUploading}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-inter text-parchment/60 hover:bg-white/5 transition-colors"
            disabled={isLoading || isUploading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading || isUploading}
            className="flex-1 py-3 rounded-xl bg-gold/10 border border-gold/20 text-sm font-inter text-gold hover:bg-gold/20 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
        </motion.div>
      </div>
    </>,
    document.body
  );
}

// NEW TABBED LOGIN/SIGNUP/FORGOT POPUP MODAL
interface AuthPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = "login" | "signup" | "forgot";

function AuthPopupModal({ isOpen, onClose }: AuthPopupModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset states on tab switch
  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setErrorMsg(null);
    setSuccessEmail(null);
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Remember me logic
      document.cookie = `sb-remember-me=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax; Secure`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Welcome back!");
      onClose();
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("[LoginError]", err);
      setErrorMsg(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setSuccessEmail(email.trim());
    } catch (err: any) {
      console.error("[SignupError]", err);
      setErrorMsg(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      // Always show success message for security/email enumeration prevention
      setSuccessEmail(email.trim());
    } catch (err: any) {
      console.error("[ForgotError]", err);
      setErrorMsg(err.message || "Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md" 
      />

      {/* Scrollable Container */}
      <div 
        className="fixed inset-0 z-[100] flex p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative m-auto w-full max-w-md bg-[#0a0a0a]/95 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden"
        >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/5 hover:bg-white/5 text-parchment/40 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {successEmail ? (
          // SUCCESS CONFIRMATION STATE
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-glow-gold">
                <CheckCircle2 className="w-7 h-7 text-gold" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-cinzel text-parchment">Check your inbox</h2>
              <p className="text-sm text-parchment/60 font-inter leading-relaxed">
                {activeTab === "signup" ? (
                  <>
                    An email verification link was sent to <span className="text-gold font-medium">{successEmail}</span>. 
                    Please confirm your account to sign in.
                  </>
                ) : (
                  <>
                    A password reset link was sent to <span className="text-gold font-medium">{successEmail}</span>. 
                    Please follow the link in your email.
                  </>
                )}
              </p>
            </div>
            <button
              onClick={() => switchTab("login")}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-inter text-gold hover:bg-white/5 transition-colors w-full"
            >
              Back to Sign In
            </button>
          </motion.div>
        ) : (
          // FORM STATE
          <div className="space-y-5">
            {activeTab !== "forgot" ? (
              // TABS VIEW (LOGIN/SIGNUP)
              <div>
                <div className="flex border-b border-white/10 mb-5">
                  <button
                    onClick={() => switchTab("login")}
                    className={`flex-1 pb-3 text-sm font-inter font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === "login"
                        ? "border-gold text-gold"
                        : "border-transparent text-parchment/40 hover:text-parchment/70"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => switchTab("signup")}
                    className={`flex-1 pb-3 text-sm font-inter font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === "signup"
                        ? "border-gold text-gold"
                        : "border-transparent text-parchment/40 hover:text-parchment/70"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-cinzel text-parchment font-semibold">
                    {activeTab === "login" ? "Welcome Back" : "Create Account"}
                  </h3>
                  <p className="text-xs text-parchment/50 font-inter mt-1">
                    {activeTab === "login" ? "Sign in to access your dashboard" : "Begin preserving oral histories"}
                  </p>
                </div>
              </div>
            ) : (
              // FORGOT PASSWORD HEADER
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-2xl font-cinzel text-parchment font-semibold">Forgot Password</h3>
                <p className="text-xs text-parchment/50 font-inter">
                  Enter your email and we'll send a password reset link
                </p>
              </div>
            )}

            {/* Error Message banner */}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300 font-inter"
              >
                {errorMsg}
              </motion.div>
            )}

            {/* Google OAuth (only for Login/Signup) */}
            {activeTab !== "forgot" && (
              <>
                <GoogleOAuthButton mode={activeTab} />
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#0a0a0a] px-3 text-[10px] uppercase tracking-wider text-parchment/30 font-inter">
                      or continue with email
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* FORMS */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Password</label>
                    <button
                      type="button"
                      onClick={() => switchTab("forgot")}
                      className="text-[10px] text-gold/70 hover:text-gold transition-colors font-semibold uppercase tracking-wider"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-bold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                      placeholder="Min. 8 characters"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment/30 hover:text-parchment/60 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-bold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}

            {activeTab === "forgot" && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-parchment/60 font-inter uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-parchment text-sm font-inter placeholder:text-parchment/20 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/30 transition-all duration-200"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-midnight font-bold text-sm font-inter hover:shadow-glow-gold-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>

                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-inter text-parchment/50 hover:text-white transition-colors"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        )}
        </motion.div>
      </div>
    </>,
    document.body
  );
}
