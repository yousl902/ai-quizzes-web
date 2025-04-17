import { AuthProvider } from '../types';
import { noAuth } from '../strategies/noAuth';
import { supabaseClientAuth } from '../strategies/supabaseBrowserAuth';

export function getClientAuthProvider(): AuthProvider {
  return process.env.NEXT_PUBLIC_USE_AUTH === 'supabase' ? supabaseClientAuth : noAuth;
}