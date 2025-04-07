"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo signup
    if (name && email && password && termsAccepted) {
      toast.success("Account created", {
        description: "Your account has been created successfully.",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      toast.error("Signup failed", {
        description: "Please fill in all fields and accept the terms.",
      });
    }
  };
  
  return (
    <div className="page-container bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-mindswarm-700">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Join Mindswarm to enhance your learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
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
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
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
                  <Link href="/terms" className="text-mindswarm-600 hover:underline">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-mindswarm-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign up
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-mindswarm-600 hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
