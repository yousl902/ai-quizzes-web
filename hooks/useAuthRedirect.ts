import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientAuthProvider } from "@/lib/auth/factory/getClientProvider";

export function useAuthRedirect() {
  const [user, setUser] = useState<any | null>(undefined);
  const router = useRouter();

  useEffect(() => {
    const authProvider = getClientAuthProvider();
    const checkUser = async () => {
      const currentUser = await authProvider.getCurrentUser();
      if (!currentUser) {
        router.replace("/login");
      } else {
        setUser(currentUser);
      }
    };
    checkUser();
  }, [router]);

  return user;
}