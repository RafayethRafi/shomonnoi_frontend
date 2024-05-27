"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import Link from "next/link";

// import NEXT_PUBLIC_API_URL from .env file
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type userInfo = {
  name: string;
  phone_no: string;
  email: string;
  address?: string;
  password: string;
};

//const response = await axios.post(`${NEXT_PUBLIC_API_URL}/users/register_user/{email}_{role}`, user);

export default function SignupPage({
  params,
}: {
  params: { email_role: string };
}) {
  const router = useRouter();

  const [user, setUser] = useState({} as userInfo);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      //replce %40 with @ in email_role
      const email_role = params.email_role;
      const emailRole = email_role.replace("%40", "@");

      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/users/register_user/${emailRole}`,
        user
      );
      console.log("Signup Success", response?.data);
      toast.success("Signup Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (
      user?.email?.length > 0 &&
      user?.password?.length > 0 &&
      user?.name?.length > 0 &&
      user?.phone_no?.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    // create a signup form with a good rounded design.
    // it should have a name, phone, email, address, password field and the required fields should be marked with a red star
    // the colors should be black, white and blue .
    // the form should have a signup button and a login button
    // it should work on mobile

    <div className="flex flex-col items-center justify-center h-screen text-black">
      <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">
          {loading ? "Loading..." : "Signup to Shomonnoi"}
        </h1>
        <input
          type="text"
          placeholder="Name *"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone *"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={user.phone_no}
          onChange={(e) => setUser({ ...user, phone_no: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email *"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password *"
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={`w-full p-2 mt-4 bg-blue-500 text-white rounded-lg ${
            buttonDisabled ? "bg-gray-300" : ""
          }`}
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {loading ? "Loading..." : "Signup"}
        </button>
        <Link
          className="w-full p-2 mt-2 bg-black text-white rounded-lg flex items-center justify-center"
          href={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
