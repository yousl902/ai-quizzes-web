'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { resetPassword } from '@/app/actions/auth';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="page-container bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <main className="flex-1 flex flex-col items-center h-screen justify-center py-16 px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-mindswarm-700">
              Reset your password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action={async (formData) => {
                setIsLoading(true);
                try {
                  const success = await resetPassword(formData);
                  if (success) {
                    toast.success('Password reset email sent', {
                      description: 'Please check your email for further instructions.',
                    });
                  } else {
                    toast.error('Failed to send reset email', {
                      description: 'Please check your email address and try again.',
                    });
                  }
                } catch (error) {
                  toast.error('An error occurred', {
                    description: 'Please try again or contact support if the problem persists.',
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
                className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white bg-black"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-mindswarm-600 hover:underline hover:text-mindswarm-700 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 