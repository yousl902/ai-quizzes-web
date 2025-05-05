"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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

export default function ResetPasswordForm() {
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
          Reset your password
        </CardTitle>
        <CardDescription className="text-center">
          Please enter your new password
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
                toast.success("Password updated successfully", {
                  description: "You can now log in with your new password.",
                });
                setTimeout(() => router.push("/login"), 2000);
              } else {
                toast.error("Failed to update password", {
                  description: "Please try again or contact support.",
                });
              }
            } catch (error) {
              toast.error("An error occurred", {
                description:
                  "Please try again or contact support if the problem persists.",
              });
            } finally {
              setIsLoading(false);
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
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
              Must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
            className="w-full text-white bg-black"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm hover:underline transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
