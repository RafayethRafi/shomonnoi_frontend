import LoginForm from "@/components/Forms/LoginForm";
// import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shomonnoi",
};

export default function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
