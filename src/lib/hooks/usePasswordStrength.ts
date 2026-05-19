"use client";

import { useMemo } from "react";
import zxcvbn from "zxcvbn";

export interface PasswordStrength {
  /** 0–4 entropy-based score. 0 = very weak, 4 = very strong. */
  score: 0 | 1 | 2 | 3 | 4;
  /** Color token for the strength bar (maps to Tailwind arbitrary values). */
  color: string;
  /** Short plain-language label shown below the bar. */
  label: string;
  /** Contextual hint to help the user improve the password. */
  hint: string;
}

const STRENGTH_MAP: Record<
  0 | 1 | 2 | 3 | 4,
  Omit<PasswordStrength, "score" | "hint">
> = {
  0: { color: "#ef4444", label: "Very weak" },
  1: { color: "#f97316", label: "Weak" },
  2: { color: "#eab308", label: "Fair" },
  3: { color: "#84cc16", label: "Strong" },
  4: { color: "#C9A96E", label: "Very strong" }, // project gold
};

/**
 * usePasswordStrength — entropy-based scoring via zxcvbn.
 * Does NOT use regex rules like "must have uppercase + number" —
 * those actively make passwords weaker by encouraging predictable patterns.
 */
export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        color: STRENGTH_MAP[0].color,
        label: STRENGTH_MAP[0].label,
        hint: "Start typing to check strength",
      };
    }

    const result = zxcvbn(password);
    const score = result.score as 0 | 1 | 2 | 3 | 4;
    const map = STRENGTH_MAP[score];

    // Use zxcvbn's own contextual feedback if available, otherwise generic hints
    const hint =
      result.feedback?.suggestions?.[0] ??
      result.feedback?.warning ??
      (score >= 3
        ? "Great password — memorable and hard to crack"
        : "Try using a passphrase or adding unrelated words");

    return { score, color: map.color, label: map.label, hint };
  }, [password]);
}
