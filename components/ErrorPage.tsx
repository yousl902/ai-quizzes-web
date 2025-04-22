import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  title,
  description,
  redirectTo = "",
  gif,
}: {
  title: string;
  description: string;
  redirectTo?: string;
  gif?: { src: string; alt: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5eedb] p-4">
      <div className="text-center space-y-8">
        <div className="relative w-[200px] h-[200px] mx-auto">
          {gif && gif.src && (
            <Image
              src={gif.src}
              alt={gif.alt || "Animated image"}
              fill
              className="object-contain"
              unoptimized
            />
          )}
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-mindswarm-700">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <div className="space-x-4">
          {redirectTo && (
            <Button asChild variant="default">
              <Link href={redirectTo}>Try Again</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}