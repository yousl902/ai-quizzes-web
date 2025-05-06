"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/auth/syncUser";
import { getServerAuthProvider } from "@/lib/auth/factory/getServerProvider";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = getServerAuthProvider();
  const result = await auth.signIn(data.email, data.password);
  if (!result) {
    redirect("/login/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const auth = getServerAuthProvider();
  const result = await auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const auth = getServerAuthProvider();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await auth.signUp(data.email, data.password);
  if (!result) {
    redirect("/signup/error");
  }

  const name = formData.get("name");
  const first_name = (name as string).split(" ")[0];
  const last_name = (name as string).split(" ")[1];
  result.first_name = first_name;
  result.last_name = last_name;

  // Sync user between authprovider (supabasae in our case) and prisma database
  await syncUser(result);

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Initiates the password reset process for a user.
 * It sends a password reset email to the user's email address with a reset link.
 * 
 * @param formData - Form data containing the user's email address
 * @returns Promise<boolean> - Returns true if the reset email was sent successfully, false otherwise
 */
export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) {
    return false;
  }

  const auth = getServerAuthProvider();
  return await auth.resetPassword(email);
}

/**
 * Updates a user's password using a reset code.
 * The reset code is obtained from the URL parameters when the user clicks the reset link.
 * 
 * @param formData - Form data containing:
 *   - password: The new password to set
 *   - code: The reset code from the email link
 * @returns Promise<boolean> - Returns true if the password was updated successfully, false otherwise
 */
export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const code = formData.get("code") as string;
  
  if (!password || !code) {
    return false;
  }

  const auth = getServerAuthProvider();
  return await auth.updatePassword(code, password);
}
