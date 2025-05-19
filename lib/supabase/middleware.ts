import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/login/error', '/signup', '/signup/error', '/forgot-password', '/reset-password', '/info'];
const AUTH_REDIRECT_ROUTES = ['/login', '/login/error', '/signup', '/signup/error', '/forgot-password', '/reset-password'];

function normalizePath(pathname: string) {
  // Remove locale prefix like /en, /sv
  return pathname.replace(/^\/(en|sv)(\/|$)/, '/');
}

function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/(en|sv)(\/|$)/);
  return match ? match[1] : 'sv'; // default to 'sv'
}

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({name, value, options}) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const normalizedPath = normalizePath(request.nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(normalizedPath);
  const isAuthRedirectRoute = AUTH_REDIRECT_ROUTES.includes(normalizedPath);

  if (user && isAuthRedirectRoute) {
    // Authenticated user trying to access login/signup/forgot-password
    const url = request.nextUrl.clone();
    const locale = getLocaleFromPath(request.nextUrl.pathname);
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // api/quiz is also a private route, but it is not protected by the a secret key in the env variables
  if (!user && !isPublicRoute && !normalizedPath.startsWith('/api/quiz')) {
    // Unauthenticated user trying to access protected route
    const url = request.nextUrl.clone();
    const locale = getLocaleFromPath(request.nextUrl.pathname);
    url.pathname = `/${locale}/login`;

    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return response
}
