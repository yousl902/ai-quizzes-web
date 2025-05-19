import { AuthProvider } from '../types';

export const noAuth: AuthProvider = {
  async signIn() {
    throw new Error('Authentication not implemented');
  },
  async signUp() {
    throw new Error('Authentication not implemented');
  },
  async signOut() {
    throw new Error('Authentication not implemented');
  },
  async getCurrentUser() {
    return null;
  },
};