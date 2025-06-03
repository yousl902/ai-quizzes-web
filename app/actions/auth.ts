"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { syncUser } from "@/lib/auth/syncUser";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";
import { getLocale } from "next-intl/server";

export interface AuthActionResponse {
  success: boolean;
  message?: string;
}

export type ServerActionState = {
  success: boolean;
  message?: string;
} | null;

export async function login(
  prevState: ServerActionState,
  formData: FormData
): Promise<AuthActionResponse> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = getServerAuthProvider();
  const result = await auth.signIn(data.email, data.password);
  const locale = await getLocale();

  if (!result?.success) {
    return { success: false, message: result?.errorMessage };
  }

  revalidatePath("/", "layout");
  redirect({ href: "/?status=loggedIn", locale });
  // This line will never be reached due to redirect
  return { success: true };
}

export async function logout(
  prevState: ServerActionState,
  formData: FormData
): Promise<AuthActionResponse> {
  void prevState;
  void formData;
  const auth = getServerAuthProvider();
  await auth.signOut();
  const locale = await getLocale();

  revalidatePath("/", "layout");
  redirect({ href: "/?status=loggedOut", locale });
  // This line will never be reached due to redirect
  return { success: true };
}

export async function signup(
  prevState: ServerActionState,
  formData: FormData
): Promise<AuthActionResponse> {
  const auth = getServerAuthProvider();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await auth.signUp(data.email, data.password);
  const locale = await getLocale();

  if (!result?.success) {
    return { success: false, message: result?.errorMessage };
  }

  const name = formData.get("name") as string;
  const first_name = name.split(" ")[0];
  const last_name = name.split(" ")[1];
  result!.user.first_name = first_name;
  result!.user.last_name = last_name;

  // Sync user between authprovider (supabasae in our case) and prisma database
  await syncUser(result.user!);

  revalidatePath("/", "layout");
  redirect({ href: "/?status=signedUp", locale });
  // This line will never be reached due to redirect
  return { success: true };
}

export async function resetPassword(
  prevState: ServerActionState,
  formData: FormData
): Promise<AuthActionResponse> {
  const email = formData.get("email") as string;
  if (!email) {
    return { success: false, message: "Email is required" };
  }
  const auth = getServerAuthProvider();
  const result = await auth.resetPassword(email);
  return { success: result };
}

export async function updatePassword(
  code: string | null,
  prevState: ServerActionState,
  formData: FormData
): Promise<AuthActionResponse> {
  const password = formData.get("password") as string;

  if (!password || !code) {
    return { success: false, message: "Password and code are required" };
  }

  const auth = getServerAuthProvider();
  const result = await auth.updatePassword(code, password);
  return { success: result };
}
