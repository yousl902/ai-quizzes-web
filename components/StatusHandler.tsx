"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function StatusHandler() {
  const t = useTranslations("statusHandler");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "loggedOut") {
      toast.success(t("logout"));
      router.push(pathname);
    }
    if (status === "loggedIn") {
      toast.success(t("login"));
      router.push(pathname)
    }
    if (status === "signedUp") {
      toast.success(t("signup"));
      router.push(pathname);
    }
  }, [status, router, pathname]);

  return null;
}
