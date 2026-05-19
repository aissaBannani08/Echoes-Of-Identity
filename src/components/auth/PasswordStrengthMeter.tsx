"use client";

import { usePasswordStrength } from "@/lib/hooks/usePasswordStrength";

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, color, label, hint } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5" role="status" aria-live="polite">
      {/* Bar */}
      <div className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= score - 1 ? color : "rgba(245,239,224,0.1)",
            }}
          />
        ))}
      </div>
      {/* Label + hint */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-medium font-inter transition-colors duration-300"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-[11px] text-parchment/40 font-inter text-right max-w-[60%]">
          {hint}
        </span>
      </div>
    </div>
  );
}
