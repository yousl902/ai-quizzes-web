export interface AuthUser {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    telephone?: string;
    password?: string;
}
  
export interface AuthProvider {
    signIn: (email: string, password: string) => Promise<AuthUser | null>;
    signUp: (email: string, password: string, data?: Partial<AuthUser>) => Promise<AuthUser | null>;
    signOut: () => Promise<void>;
    getCurrentUser: () => Promise<AuthUser | null>;
}