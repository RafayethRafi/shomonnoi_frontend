import LoginForm from "@/components/Forms/LoginForm";
// import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - QueryHub",
  description: "Login to your account to continue with QueryHub",
};

export default function Login() {
  return (
    <div className="bg-slate-100 tracking-wide dark:bg-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div>
          <div className="mb-6 rounded bg-white shadow dark:bg-slate-800">
            <div className="grid md:grid-cols-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
