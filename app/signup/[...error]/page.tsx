'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5eedb] p-4">
      <div className="text-center space-y-8">
        <div className="relative w-[200px] h-[200px] mx-auto">
          <Image
            src="https://media.giphy.com/media/1NQ7m0gqsah1XS4vG1/giphy.gif"
            alt="Animated bee"
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-mindswarm-700">Oops! Something went wrong</h1>
          <p className="text-lg text-gray-600">Our busy bee couldn't create your account! Please try again.</p>
        </div>

        <div className="space-x-4">
          <Button asChild variant="default">
            <Link href="/signup">Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 