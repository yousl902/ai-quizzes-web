"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function SigninForm() {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Login to your Mindswarm account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label htmlFor="remember-me" className="text-sm cursor-pointer">
                Remember me
              </Label>
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button formAction={login} className="w-full text-white bg-black">
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
