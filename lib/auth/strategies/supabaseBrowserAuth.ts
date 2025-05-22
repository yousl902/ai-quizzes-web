import createClient from "../../supabase/client";
import { AuthProvider, AuthUser } from "../types";

export const supabaseClientAuth: AuthProvider = {
  async signIn(email: string, password: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return {
        success: false,
        errorMessage: error.message,
        errorCode: error.code ?? "unknown_error",
      };
    }
    if (!data.user) {
      // TODO: handle this
      return null;
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
        first_name: data.user.user_metadata?.first_name,
        last_name: data.user.user_metadata?.last_name,
        telephone: data.user.user_metadata?.telephone,
        password: undefined, // Supabase manages passwords
      },
    };
  },

  async signUp(email: string, password: string, data?: Partial<AuthUser>) {
    const supabase = await createClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: data?.first_name,
          last_name: data?.last_name,
          telephone: data?.telephone,
        },
      },
    });
    if (error) {
      return {
        success: false,
        errorMessage: error.message,
        errorCode: error.code ?? "unknown_error",
      };
    }

    if (!authData.user) {
      console.error("No user found after signup");
      return null;
    }

    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email ?? "",
        first_name: authData.user.user_metadata?.first_name,
        last_name: authData.user.user_metadata?.last_name,
        telephone: authData.user.user_metadata?.telephone,
        password: undefined, // Supabase manages passwords
      },
    };
  },

  async signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // TODO: handle this
      return null;
    }
    if (!data.user) {
      // TODO: handle this
      console.log("No user found in session");
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email ?? "",
    };
  },

  async updatePassword(code: string, password: string) {
    void code;
    void password;
    console.error("updatePassword is not implemented for a Browser client");
    return false;
  },

  async verifyCode(code: string) {
    void code;
    console.error("verifyCode is not implemented for a Browser client");
    return false;
  },

  async resetPassword(email: string) {
    void email;
    console.error("resetPassword is not implemented for a Browser client");
    return false;
  },
};
