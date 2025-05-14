"use client";

import { useState } from "react";
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

/**
 * ResetPasswordForm Component
 *
 * This component renders a form that allows users to set a new password after clicking
 * the reset link in their email. It handles the following functionality:
 *
 * 1. Password Validation:
 *    - Ensures password is at least 8 characters long
 *    - Verifies that password and confirm password match
 *
 * 2. Reset Process:
 *    - Extracts the reset code from URL parameters
 *    - Calls the updatePassword server action with the new password and code
 *    - Shows appropriate success/error messages using toast notifications
 *    - Redirects to login page after successful password update
 **/

export default function ResetPasswordForm() {
  const t = useTranslations("resetPassword");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const validatePasswords = () => {
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
    return true;
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-mindswarm-700">
          {/* Reset your password */}
          {t("title")}
        </CardTitle>
        <CardDescription className="text-center">
          {/* Please enter your new password */}
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) => {
            if (!validatePasswords()) {
              return;
            }

            const code = searchParams.get("code");
            if (!code) {
              toast.error("Invalid reset link");
              return;
            }

            formData.append("code", code);

            setIsLoading(true);
            try {
              const success = await updatePassword(formData);
              if (success) {
                // toast.success("Password updated successfully", {
                toast.success(t("success"), {
                  // description: "You can now log in with your new password.",
                  description: t("successDescription"),
                });
                setTimeout(() => router.push("/login"), 2000);
              } else {
                // toast.error("Failed to update password", {
                toast.error(t("error"), {
                  // description: "Please try again or contact support.",
                  description: t("errorDescription"),
                });
              }
            } catch (error) {
              // toast.error("An error occurred", {
              toast.error(t("errorOccurred"), {
                description:
                  // "Please try again or contact support if the problem persists.",
                  t("errorOccurredDescription"),
              });
            } finally {
              setIsLoading(false);
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            {/* <Label htmlFor="password">New Password</Label> */}
            <Label htmlFor="password">{t("newPassword")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              {/* Must be at least 8 characters */}
              {t("passwordHint")}
            </p>
          </div>

          <div className="space-y-2">
            {/* <Label htmlFor="confirmPassword">Confirm New Password</Label> */}
            <Label htmlFor="confirmPassword">{t("confirmNewPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm hover:underline transition-colors"
            >
              {/* Back to Login */}
              {t("backToLogin")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
