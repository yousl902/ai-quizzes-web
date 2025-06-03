"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { signup } from "@/app/actions/auth";
import { useTranslations } from "next-intl";
import { AuthButton } from "@/components/AuthButton";

export default function SignupForm() {
  const t = useTranslations("signup");
  const statusT = useTranslations("statusHandler");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidFullName = (name: string) => {
    const nameParts = name.trim().split(" ");
    return nameParts.length >= 2 && nameParts.every((part) => part.length > 0);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fullName")}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {name.length > 0 && !isValidFullName(name) && (
            <p className="text-xs text-red-500">{t("invalidFullName")}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email.length > 0 && !isEmailValid(email) && (
              <p className="text-xs text-red-500">{t("invalidEmail")}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {password.length > 0 && !isValidPassword(password) && (
            <p className="text-xs text-red-500">{t("invalidPassword")}</p>
          )}

          <AuthButton
            action={signup}
            text={t("signUp")}
            loadingText={t("creatingAccount")}
            successMessage={statusT("signup")}
            icon={UserPlus}
            className="w-full bg-btn-create-account hover:bg-btn-create-account/90 text-white transition-colors"
            disabled={!isValidFullName(name) || !isEmailValid(email) || !isValidPassword(password)}
          />
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {t("alreadyHaveAccount")}
          <Link href="/login" className="hover:underline">
            {t("logIn")}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
