"use client";

import { useActionState, useEffect } from "react";
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
import { resetPassword } from "@/app/actions/auth";
import { useTranslations } from "next-intl";

/**
 * ForgotPasswordForm Component
 *
 * This component renders a form that allows users to request a password reset.
 *
 */
export default function ForgotPasswordForm() {
  const t = useTranslations("forgotPassword");
  const [state, formAction, pending] = useActionState(resetPassword, null);

  useEffect(() => {
    if (pending || state === null) return;
    console.log("state:", state);
    if (state) {
      toast.success(t("emailSent"), {
        description: t("emailSentDescription"),
      });
    } else {
      toast.error(t("emailError"), {
        description: t("emailErrorDescription"),
      });
    }
  }, [state, pending]);

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
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
          >
            {pending ? t("loading") : t("sendResetLink")}
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
