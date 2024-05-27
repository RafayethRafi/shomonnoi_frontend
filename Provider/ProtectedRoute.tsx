"use client";

import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated && !loading) {
      router.push("/login");
    }
  }, [authenticated, router, loading]);

  return authenticated && <>{children}</>;
}
