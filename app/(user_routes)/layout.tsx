"use client";

import ProtectedRoute from "@/Provider/ProtectedRoute";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user: UserData, logout } = useAuth();
  const router = useRouter();
  return (
    <html lang="en">
      <ProtectedRoute>
        <button
          // make the button in the top right corner for mobile
          className="absolute top-3 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          logout
        </button>
        <body>{children}</body>
      </ProtectedRoute>
    </html>
  );
}
