import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  LOGIN_REDIRECT,
  publicRoutes
} from './routes';

const checkIsThisAPublicRoute = (pathname: string) => {
  return publicRoutes.some(route =>
    typeof route === 'string' ? route === pathname : route.test(pathname)
  );
};

export default auth(req => {
  const { nextUrl } = req;
  const isUserLoggedIn = !!req.auth;
  const isThisAnApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isEdgeStoreRoute = nextUrl.pathname.startsWith('/api/edgestore');
  const isThisAPublicRoute = checkIsThisAPublicRoute(nextUrl.pathname);
  const isThisAnAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isThisAnApiAuthRoute || isEdgeStoreRoute) {
    return;
  }

  if (isThisAnAuthRoute) {
    if (isUserLoggedIn) {
      return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isUserLoggedIn && !isThisAPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};

// Developers use double Not operators (!!) to explicitly convert the operand’s data type to boolean (true or false). The operand will be converted to false if its current value is falsy and true in case it’s truthy.
