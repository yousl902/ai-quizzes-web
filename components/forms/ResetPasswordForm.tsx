"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updatePassword } from "@/app/actions/auth";
import { useTranslations } from "next-intl";

export default function ResetPasswordForm() {
  const t = useTranslations("resetPassword");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const updatePasswordWithCode = updatePassword.bind(null, code);
  const [state, formAction, pending] = useActionState(
    updatePasswordWithCode,
    false
  );

  const handleSubmit = async () => {
    if (password.length < 8) {
      toast.error("Password is too short", {
        description: "Password must be at least 8 characters long.",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please ensure both passwords are identical.",
      });
      return false;
    }
    if (!state) {
      toast.error(t("error"), {
        description: t("errorDescription"),
      });
    } else {
      toast.success(t("success"), {
        description: t("successDescription"),
      });
      router.push("/login");
    }
  };

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
        <form action={formAction} className="space-y-4">
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
            <p className="text-xs text-muted-foreground">{t("passwordHint")}</p>
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
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
          >
            {pending ? t("loading") : t("updatePassword")}
          </Button>

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
