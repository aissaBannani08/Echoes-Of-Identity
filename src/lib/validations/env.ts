import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_URL is required")
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SITE_URL is required")
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL?.trim(),
});

if (!_env.success) {
  const formatted = _env.error.issues
    .map((i) => `  ✗ ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(
    `\n\n❌ Missing or invalid environment variables:\n${formatted}\n\nCopy .env.example → .env.local and fill in the values.\nThen delete the .next folder and restart npm run dev.\n`
  );
}

export const env = _env.data;
