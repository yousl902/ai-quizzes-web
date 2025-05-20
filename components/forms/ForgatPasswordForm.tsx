"use client";

import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
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
        <form
          action={async (formData) => {
            setIsLoading(true);
            try {
              const success = await resetPassword(formData);
              if (success) {
                toast.success(t("emailSent"), {
                  description: t("emailSentDescription"),
                });
              } else {
                toast.error(t("emailError"), {
                  description: t("emailErrorDescription"),
                });
              }
            } catch (error) {
              console.error(error);
              toast.error(t("error"), {
                description: t("errorDescription"),
              });
            } finally {
              setIsLoading(false);
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
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
