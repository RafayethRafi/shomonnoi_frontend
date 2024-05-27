"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations/login";
// import { api } from "@/constant";
import { useToast } from "../ui/use-toast";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

interface LoginData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const { login, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginData,
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("password", data.password);

    const response = await fetch(`${api}/login`, {
      method: "POST",
      body: formdata,
    });

    const res = await response.json();

    if (response.ok) {
      const userData = await fetch(`${api}/users/user/me`, {
        headers: {
          Authorization: `Bearer ${res?.access_token}`,
        },
      });

      if (userData.status === 200) {
        const data = await userData.json();
        login(res?.access_token, data);
        toast({
          title: "Success",
          description: "Successfully Logged In",
          variant: "success",
        });
        router.push("/home");
        return;
      } else {
        logout();
        toast({
          title: "Error",
          description: "Failed to fetch user data. Please try again.",
          variant: "error",
        });
      }
    } else {
      toast({
        title: "Error",
        description: res.detail,
        variant: "error",
      });
      logout();
    }

    setLoading(false);
  }

  return (
    // create a basic login form with username and password fields and onsubmit function
    <div className="flex flex-col items-center justify-center h-screen text-black mt-[-40px]">
      <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600">
          {loading ? "Loading..." : "Login to Shomonnoi"}
        </h1>
        <form
          onSubmit={(e) =>
            onSubmit(
              {
                username: form.getValues("username"),
                password: form.getValues("password"),
              },
              e
            )
          }
        >
          <input
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            type="text"
            {...form.register("username")}
            placeholder="Username"
          />
          <input
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            type="password"
            {...form.register("password")}
            placeholder="Password"
          />
          <button
            className={`w-full p-2 mt-4 bg-blue-500 text-white rounded-lg 
                    }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
