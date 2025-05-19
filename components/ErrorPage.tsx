// import Link from "next/link";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ErrorPage({
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
  const t = await getTranslations("buttons");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg p-4">
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
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>
        <div className="space-x-4">
          {redirectTo && (
            <Button asChild variant="default" className="bg-btn-try-again hover:bg-btn-try-again-hover">
              <Link href={redirectTo}>{t("tryAgain")}</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="bg-btn-go-home hover:bg-btn-go-home-hover">
            <Link href="/">{t("goHome")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
