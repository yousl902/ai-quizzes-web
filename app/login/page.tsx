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
import { toast } from "sonner"; // Sonner i stället för useToast
import { LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login
    if (email && password) {
      toast.success("Login successful", {
        description: "You have been logged in.",
      });
      // Redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      toast.error("Login failed", {
        description: "Please enter both email and password.",
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
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Login to your Mindswarm account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {/* Du måste skapa en forgot-password-sida om du länkar dit */}
                <Link href="/forgot-password" className="text-sm text-mindswarm-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Log in
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-mindswarm-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
