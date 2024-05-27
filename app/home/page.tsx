"use client";

import ProtectedRoute from "@/Provider/ProtectedRoute";
import useAuth from "@/lib/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomaPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
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
      <div className="mt-[80px] max-w-[200px] m-auto items-center justify-center flex flex-col">
        <div>
          <Link
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-5"
            href="/deposit_info"
          >
            Deposit Info
          </Link>
        </div>

        {user?.role === "admin" && (
          <>
            <div>
              <Link
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-5"
                href="/invite_users"
              >
                Invite Users
              </Link>
            </div>
            <div>
              <Link
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-5"
                href="/registered_users"
              >
                Registered Users
              </Link>
            </div>

            <div>
              <Link
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 m-5"
                href="/deposit"
              >
                Deposit
              </Link>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
