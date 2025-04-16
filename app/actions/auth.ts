"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/auth/syncUser";
import { getClientAuthProvider } from "@/lib/auth/factory/getServerProvider";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Login data:", data);

    const auth = getClientAuthProvider();
    const result = await auth.signIn(data.email, data.password);
  console.log("result", result);
  if (!result) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
    const auth = getClientAuthProvider();
  const result = await auth.signOut();
  console.log("result", result);

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
    const auth = getClientAuthProvider();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await auth.signUp(data.email, data.password);
  console.log("error", null);
  console.log("Sign-up data:", data);
  if (!result) {
    redirect("/error");
  }

  const name = formData.get("name")
  const first_name = (name as string).split(" ")[0]
  const last_name = (name as string).split(" ")[1]
  //const telephone = formData.get("telephone")
  //  ? (formData.get("telephone") as string)
  //  : null;
  result.first_name = first_name;
  result.last_name = last_name;
  //result.telephone = telephone;

  // Sync user between authprovider (supabasae in our case) and prisma database
  await syncUser(result);

  revalidatePath("/", "layout");
  redirect("/");
}
