"use client";

import ProtectedRoute from "@/Provider/ProtectedRoute";
import Link from "next/link";

export default function HomaPage() {
  return (
    <ProtectedRoute>
      <Link href="/deposit_info">Deposit Info</Link>;
    </ProtectedRoute>
  );
}
