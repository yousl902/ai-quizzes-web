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
  async resetPassword(email: string) {
    void email;
    throw new Error('Authentication not implemented');
  },
  async updatePassword(code: string, password: string) {
    void code;
    void password;
    throw new Error('Authentication not implemented');
  },
  async verifyCode(code: string) {
    void code;
    throw new Error('Authentication not implemented');
  },
};