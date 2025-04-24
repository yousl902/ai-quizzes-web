import createClient from '../../supabase/server';
import { AuthProvider, AuthUser } from '../types';

export const supabaseServerAuth: AuthProvider = {
    async signIn(email: string, password: string) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            // TODO: handle this
            switch (error.code) {
                case 'email_not_confirmed':
                    console.log('Please confirm your email before logging in.');
                case 'invalid_login':
                    console.log('Incorrect email or password.');
                case 'user_not_found':
                    console.log('No user found with this email.');
                default:
                    console.log(error.message || 'An unknown error occurred during login.');
            }
        }
        if (!data.user) {
            // TODO: handle this
            return null;
        }

        return {
            id: data.user.id,
            email: data.user.email ?? '',
            first_name: data.user.user_metadata?.first_name,
            last_name: data.user.user_metadata?.last_name,
            telephone: data.user.user_metadata?.telephone,
            password: undefined, // Supabase manages passwords
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
        if (error || !authData.user) return null; // TODO: handle this
        return {
            id: authData.user.id,
            email: authData.user.email ?? '',
            first_name: authData.user.user_metadata?.first_name,
            last_name: authData.user.user_metadata?.last_name,
            telephone: authData.user.user_metadata?.telephone,
            password: undefined, // Supabase manages passwords
        };
    },

    async resetPassword(email: string) {
        const supabase = await createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
        });
        
        if (error) {
            console.error('Error sending reset password email:', error.message);
            return false;
        }
        
        return true;
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
            console.log('No user found in session');
            return null;
        }
        return {
            id: data.user.id,
            email: data.user.email ?? '',
            first_name: data.user.user_metadata?.first_name,
            last_name: data.user.user_metadata?.last_name,
            telephone: data.user.user_metadata?.telephone,
            password: undefined,
        };
    },

    async updatePassword(code: string, password: string) {
        const supabase = await createClient();
        
        // First verify the code and establish session
        const { error: verifyError } = await supabase.auth.exchangeCodeForSession(code);
        if (verifyError) {
            console.error('Error verifying code:', verifyError.message);
            return false;
        }

        // Then update the password
        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            console.error('Error updating password:', error.message);
            return false;
        }

        return true;
    },

    async verifyCode(code: string) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        return error ? false : true;
    }
};