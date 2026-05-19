"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export interface Profile {
  id: string;
  avatar_url?: string | null;
  full_name?: string | null;
  updated_at?: string | null;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  status: AuthStatus;
  refreshProfile: () => Promise<void>;
  uploadAvatar: (file: File) => Promise<string | null>;
  updateProfileName: (name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const supabase = createClient();

  // Helper to fetch/sync the profile from the `profiles` table
  const fetchProfile = async (userId: string, currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("[AuthProvider] Error fetching profile:", error.message);
      }

      if (data) {
        setProfile(data as Profile);
      } else {
        // Handle the case where the profile row doesn't exist yet gracefully
        // Fallback to user metadata or create/upsert a default profile row
        const fallbackProfile: Profile = {
          id: userId,
          avatar_url: currentUser.user_metadata?.avatar_url || null,
          full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || null,
        };
        setProfile(fallbackProfile);
      }
    } catch (err) {
      console.error("[AuthProvider] Error in fetchProfile:", err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user);
    }
  };

  // Upload avatar to Supabase storage 'avatars' bucket at `${user.id}/avatar.png`
  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error("You must be logged in to upload an avatar.");
      return null;
    }

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt || "png"}`;

      // Upload/overwrite the file in the avatars bucket
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Append a cache-buster query parameter to public URL so browser ignores stale CDN cache
      const publicUrlWithBuster = `${publicUrl}?t=${Date.now()}`;

      // Upsert the profiles table with the new avatar_url
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          avatar_url: publicUrlWithBuster,
          full_name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || null,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) {
        throw upsertError;
      }

      // Update state
      setProfile((prev) =>
        prev
          ? { ...prev, avatar_url: publicUrlWithBuster }
          : { id: user.id, avatar_url: publicUrlWithBuster }
      );

      // Also trigger updating the auth metadata to align state
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrlWithBuster },
      });

      toast.success("Profile picture updated successfully");
      return publicUrlWithBuster;
    } catch (error: any) {
      console.error("[AuthProvider] uploadAvatar error:", error);
      toast.error(`Upload failed: ${error.message || "Unknown error"}`);
      return null;
    }
  };

  // Update profile name
  const updateProfileName = async (name: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // First update Supabase Auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: name },
      });

      if (authError) throw authError;

      // Then upsert profiles table
      const { error: dbError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: name,
          avatar_url: profile?.avatar_url || null,
          updated_at: new Date().toISOString(),
        });

      if (dbError) throw dbError;

      // Update local profile state
      setProfile((prev) => (prev ? { ...prev, full_name: name } : { id: user.id, full_name: name }));
      toast.success("Name updated successfully");
      return true;
    } catch (error: any) {
      console.error("[AuthProvider] updateProfileName error:", error);
      toast.error(`Failed to update name: ${error.message || "Unknown error"}`);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setStatus("unauthenticated");
    } catch (error) {
      console.error("[AuthProvider] signOut error:", error);
    }
  };

  // Check session on mount and subscribe to auth state changes
  useEffect(() => {
    let isMounted = true;

    // Fetch initial session instantly
    const initSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("[AuthProvider] getSession error:", error.message);
        }

        if (isMounted) {
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
            setStatus("authenticated");
            await fetchProfile(initialSession.user.id, initialSession.user);
          } else {
            setStatus("unauthenticated");
          }
        }
      } catch (err) {
        console.error("[AuthProvider] Error in initSession:", err);
        if (isMounted) {
          setStatus("unauthenticated");
        }
      }
    };

    initSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, newSession: any) => {
        if (!isMounted) return;

        if (newSession) {
          setSession(newSession);
          setUser(newSession.user);
          setStatus("authenticated");
          await fetchProfile(newSession.user.id, newSession.user);
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
          setStatus("unauthenticated");
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        status,
        refreshProfile,
        uploadAvatar,
        updateProfileName,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
