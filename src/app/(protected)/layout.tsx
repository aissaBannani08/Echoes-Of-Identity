import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

/**
 * Route-group shell. Access control for /dashboard is enforced in
 * `dashboard/layout.tsx` (server-first) and in middleware.
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <>{children}</>;
}
