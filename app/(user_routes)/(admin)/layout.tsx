"use client";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  if (user?.username !== "shomonnoi") {
    router.push("/home");
    return null; // or return a "not authorized" message
  }

  return <>{children}</>;
}
