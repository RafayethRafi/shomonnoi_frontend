"use client";
import useAuth from "@/lib/hooks/useAuth";
import { useState } from "react";
import { RegisteredUsersList } from "./registeredUsers";
import { RegisteredUser } from "@/types/RegisteredUsers";

export default function RegisteredUsers() {
  const { token } = useAuth();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  async function fetchRegisteredUsers() {
    setLoading(true);
    try {
      const response = await fetch(`${api}/admins/registered_users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      if (response.ok) {
        setRegisteredUsers(res);
        setShowInfo(true);
        console.log(res);
      } else {
        setRegisteredUsers([]);
        setShowInfo(false);
        console.error("Error fetching registered users:", res);
      }
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Registered Users
      </h1>
      <button
        onClick={fetchRegisteredUsers}
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        See Registered Users
      </button>
      {loading ? (
        <div className="mt-4 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="mt-4">
          {showInfo ? (
            <RegisteredUsersList registeredUsers={registeredUsers} />
          ) : (
            <p className="text-gray-500">No registered users found.</p>
          )}
        </div>
      )}
    </div>
  );
}
