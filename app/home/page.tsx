"use client";

import ProtectedRoute from "@/Provider/ProtectedRoute";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function HomaPage() {
  const { user: UserData, logout } = useAuth();
  const router = useRouter();
  return (
    <ProtectedRoute>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
      >
        logout
      </button>
      <div>Home</div>;
    </ProtectedRoute>
  );
}
