export interface AuthUser {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    telephone?: string;
    password?: string;
}

export interface PrismaUser {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
}

type AuthUserResult =
  | { success: true; user: AuthUser }
  | { success: false; errorMessage: string; errorCode: string }

  
export interface AuthProvider {
    signIn: (email: string, password: string) => Promise<AuthUserResult | null>;
    signUp: (email: string, password: string, data?: Partial<AuthUser>) => Promise<AuthUserResult | null>;
    signOut: () => Promise<void>;
    getCurrentUser: () => Promise<PrismaUser | null>;
    resetPassword: (email: string) => Promise<boolean>;
    updatePassword: (code: string, password: string) => Promise<boolean>;
    verifyCode: (code: string) => Promise<boolean>;
}