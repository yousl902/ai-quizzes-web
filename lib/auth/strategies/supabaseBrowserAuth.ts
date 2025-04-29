import createClient from '../../supabase/client';
import { AuthProvider, AuthUser } from '../types';
import { prisma } from "@/lib/prisma/client";

export const supabaseClientAuth: AuthProvider = {
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
            throw new Error('No user returned from Supabase.');
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
        if (error || !authData.user) return null;
        return {
            id: authData.user.id,
            email: authData.user.email ?? '',
            first_name: authData.user.user_metadata?.first_name,
            last_name: authData.user.user_metadata?.last_name,
            telephone: authData.user.user_metadata?.telephone,
            password: undefined, // Supabase manages passwords
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
            console.log('No user found in session');
            return null;
        }

        const prismaUser = await prisma.user.findUnique({
            where: {
                id: data.user.id,
            },
        });
        return {
            id: data.user.id,
            email: data.user.email ?? '',
            first_name: prismaUser?.first_name ?? undefined,
            last_name: prismaUser?.last_name ?? undefined,
        };
    },

    async updatePassword(code: string, password: string) {
        console.error('updatePassword is not implemented for a Browser client');
        return false;
    },

    async verifyCode(code: string) {
        console.error('verifyCode is not implemented for a Browser client');
        return false;
    },

    async resetPassword(email: string) {
        console.error('resetPassword is not implemented for a Browser client');
        return false;
    },
};