"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { PrismaUser } from "@/lib/auth/types";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import Image from "next/image";

const NavBar = ({
  title,
  logo,
  user,
  ProfileButton,
  ProfileSection,
}: {
  title: string;
  logo?: string;
  user: PrismaUser | null;
  ProfileButton: React.ReactNode;
  ProfileSection: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClose = (event: Event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    document.addEventListener("touchstart", handleClose);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("touchstart", handleClose);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar backdrop-blur-sm bg-opacity-90 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          {logo && logo.trim() !== "" && (
            <Image
              src={logo}
              alt="Logo"
              className="h-8 w-8 inline-block"
              width={32}
              height={32}
            />
          )}
          {title}
        </Link>

        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          ref={buttonRef}
        />

        <div className="hidden md:flex md:items-center md:space-x-4">
          <DesktopView user={user} ProfileButton={ProfileButton} />
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu user={user} ProfileSection={ProfileSection} ref={menuRef} />
      )}
    </nav>
  );
};

const DesktopView = ({
  user,
  ProfileButton,
}: {
  user: PrismaUser | null;
  ProfileButton: React.ReactNode;
}): React.ReactNode => {
  const t = useTranslations("navbar");
  return (
    <>
      {user ? (
        ProfileButton
      ) : (
        <>
          <Link href="/login">
            <Button className="bg-btn-login-navbar hover:bg-btn-login-navbar/90 text-black">
              <LogIn className="h-4 w-4 mr-1" /> {t("login")}
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-btn-create-account hover:bg-btn-create-account/90 text-white">
              <UserPlus className="h-4 w-4 mr-1" /> {t("signup")}
            </Button>
          </Link>
        </>
      )}
      <LanguageSwitcher />
    </>
  );
};

const MobileMenu = ({
  user,
  ProfileSection,
  ref,
}: {
  user: PrismaUser | null;
  ProfileSection: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}): React.ReactNode => {
  const t = useTranslations("navbar");
  return (
    <div ref={ref} className="md:hidden bg-white border-b px-4 py-3 shadow-md">
      <div className="flex flex-col space-y-3">
        <LanguageSwitcher />
        {user ? (
          ProfileSection
        ) : (
          <>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full bg-btn-login-navbar hover:bg-btn-login-navbar/90 text-black"
              >
                <LogIn className="mr-2 h-4 w-4" /> {t("login")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full bg-btn-create-account hover:bg-btn-create-account/90 text-white">
                <UserPlus className="mr-2 h-4 w-4" /> {t("signup")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const MobileMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
  ref,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  ref: React.RefObject<HTMLButtonElement | null>;
}): React.ReactNode => {
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-700"
        ref={ref}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </Button>
    </div>
  );
};

export default NavBar;
