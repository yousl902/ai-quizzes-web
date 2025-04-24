import { AuthProvider } from '../types';
import { noAuth } from '../strategies/noAuth';
import { supabaseServerAuth } from '../strategies/supabaseServerAuth';

export function getServerAuthProvider(): AuthProvider {
  return process.env.NEXT_PUBLIC_USE_AUTH === 'supabase' ? supabaseServerAuth : noAuth;
}
