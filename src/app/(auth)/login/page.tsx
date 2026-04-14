import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Entrar | Mini CRM",
  description: "Entre na sua conta",
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
