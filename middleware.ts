import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const defaultLocale = "en";
const locales = ["en", "ru"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, any> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = match(languages, locales, defaultLocale);

  return locale;
}

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Redirect to the home page if the user is logged in and tries to access the login or register page
    let pathLocale = "";
    locales.forEach((locale) => {
      if (
        (request.nextUrl.pathname.startsWith(`/${locale}/login`) ||
          request.nextUrl.pathname.startsWith(`/${locale}/register`)) &&
        isLoggedIn
      ) {
        request.nextUrl.pathname = `/${locale}/`;
        pathLocale = locale;
        return;
      }
    });

    if (pathLocale) return NextResponse.redirect(request.nextUrl);
    return;
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // Redirect to the home page if the user is logged in and tries to access the login or register page
  locales.forEach((locale) => {
    if (
      (request.nextUrl.pathname.startsWith(`/${locale}/login`) ||
        request.nextUrl.pathname.startsWith(`/${locale}/register`)) &&
      isLoggedIn
    ) {
      request.nextUrl.pathname = `/${locale}/`;
      return;
    }
  });
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
