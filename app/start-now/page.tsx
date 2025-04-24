"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "../actions/auth";
import { getClientAuthProvider } from "@/lib/auth/factory/getClientProvider";

export default function Home() {
  // TODO: handle loading state, now it is displayed the page before the redirect
  const [user, setUser] = useState<any | null>(undefined);
  const router = useRouter();

  const authProvider = getClientAuthProvider();
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authProvider.getCurrentUser();
      setUser(currentUser);
      if (!currentUser) {
        router.replace("/login");
      }
    };
    checkUser();
  }, []);

  if (user === undefined) {
    return <div className="flex items-center justify-center min-h-screen"> Loading ...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <form>
        <Button formAction={logout} className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white bg-black">
          Logout
        </Button>
        </form>
      </main>
    </div>
  );
}
