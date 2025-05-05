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
import { UserPlus } from "lucide-react";
import { signup } from "@/app/actions/auth";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  return (
    <Card className="max-w-md w-full shadow-xl">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">
        Create an account
      </CardTitle>
      <CardDescription className="text-center">
        Join Mindswarm to enhance your learning
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="younes"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            <p className="text-xs text-red-500">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password.length > 0 && (
            <p
              className={`text-xs ${
                isPasswordValid(password)
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {isPasswordValid(password)
                ? "Strong password!"
                : "Use at least 8 characters, uppercase, lowercase, numbers, and symbols."}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            required
          />
          <Label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the{" "}
            <Link
              href="/terms"
              className="hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:underline"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          formAction={signup}
          className="w-full bg-black text-white transition-colors"
          disabled={
            !isEmailValid(email) ||
            !isPasswordValid(password) ||
            !termsAccepted
          }
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Sign up
        </Button>
      </form>
    </CardContent>

    <CardFooter className="flex flex-col space-y-4">
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="hover:underline"
        >
          Log in
        </Link>
      </div>
    </CardFooter>
  </Card>
  )
}
