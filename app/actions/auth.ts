"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { syncUser } from "@/lib/auth/syncUser";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { getLocale } from "next-intl/server";

export async function login(
  prevState:
    | {
        message: string | undefined;
      }
    | undefined,
  formData: FormData
) {
  void prevState;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = getServerAuthProvider();
  const result = await auth.signIn(data.email, data.password);
  const locale = await getLocale();
  if (!result?.success) {
    return { message: result?.errorMessage };
  }

  revalidatePath("/", "layout");
  redirect({ href: "/?status=loggedIn", locale });
}

export async function logout() {
  const auth = getServerAuthProvider();
  await auth.signOut();
  const locale = await getLocale();

  revalidatePath("/", "layout");
  redirect({ href: "/?status=loggedOut", locale });
}

export async function signup(
  prevState:
    | {
        message: string | undefined;
      }
    | undefined,
  formData: FormData
) {
  void prevState;
  const auth = getServerAuthProvider();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await auth.signUp(data.email, data.password);
  const locale = await getLocale();
  if (!result?.success) {
    return { message: result?.errorMessage };
  }

  const name = formData.get("name");
  const first_name = (name as string).split(" ")[0];
  const last_name = (name as string).split(" ")[1];
  result!.user.first_name = first_name;
  result!.user.last_name = last_name;

  // Sync user between authprovider (supabasae in our case) and prisma database
  await syncUser(result.user!);

  revalidatePath("/", "layout");
  redirect({ href: "/?status=signedUp", locale });
}

export async function resetPassword(
  prevState: boolean | null,
  formData: FormData
) {
  void prevState;
  const email = formData.get("email") as string;
  if (!email) {
    return false;
  }
  const auth = getServerAuthProvider();
  const result = await auth.resetPassword(email);
  return result;
}

export async function updatePassword(
  code: string | null,
  prevState: boolean | null,
  formData: FormData
) {
  void prevState;
  const password = formData.get("password") as string;

  if (!password || !code) {
    return false;
  }

  const auth = getServerAuthProvider();
  const result = await auth.updatePassword(code, password);
  return result;
}
