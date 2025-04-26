"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { ProfileButton } from "@/components/ProfileButton";

const NavBar = ({
  title,
  logo,
  user,
}: {
  title: string;
  logo?: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
  };
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm bg-opacity-90 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          {logo && logo.trim() !== "" && (
            <img src={logo} alt="Logo" className="h-8 w-8 inline-block" />
          )}
          {title}
        </Link>

        {/* Mobilmeny-knapp */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
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
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </Button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user ? (
            <ProfileButton
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
            />
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button>
                  <UserPlus className="h-4 w-4 mr-1" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobilmeny */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-3 shadow-md">
          <div className="flex flex-col space-y-3">
            {user ? (
              <ProfileButton
                firstName={user.first_name}
                lastName={user.last_name}
                email={user.email}
              />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
