"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updatePassword } from "@/app/actions/auth";
import { useTranslations } from "next-intl";
import { AuthButton } from "@/components/AuthButton";

export default function ResetPasswordForm() {
  const t = useTranslations("resetPassword");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const updatePasswordWithCode = updatePassword.bind(null, code);

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-mindswarm-700">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">{t("newPassword")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              {password.length < 8 ? t("passwordShort") : ""}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmNewPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-muted-foreground">
              {password !== confirmPassword ? t("passwordsDoNotMatch") : ""}
            </p>
          </div>

          <AuthButton
            action={updatePasswordWithCode}
            text={t("updatePassword")}
            loadingText={t("loading")}
            successMessage={t("success")}
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
            disabled={password.length < 8 || password !== confirmPassword}
          />

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm hover:underline transition-colors"
            >
              {t("backToLogin")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
