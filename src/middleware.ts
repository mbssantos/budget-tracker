import { match } from "@formatjs/intl-localematcher";
import Negotiator, { Headers } from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { Locale } from "./types";

const locales = ["pt", "en"];
const defaultLocale = locales[0];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguageHeader: { headers: Headers } = {
    headers: {
      "accept-language":
        request.headers.get("accept-language") || "en-US,en;q=0.5",
    },
  };

  const languages = new Negotiator(acceptLanguageHeader).languages();

  return match(languages, locales, defaultLocale) as Locale; // -> 'en'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const isAssetFetch = pathname.startsWith("/assets");
  const isApiCall = pathname.startsWith("/api/");
  const isIconCall =
    pathname.endsWith("icon.svg") || pathname.endsWith("icon.ico");
  const isSitemap = pathname.endsWith("/sitemap.xml");
  const isRobots = pathname.endsWith("/robots.txt");

  if (
    pathnameHasLocale ||
    isAssetFetch ||
    isApiCall ||
    isIconCall ||
    isSitemap ||
    isRobots
  ) {
    return;
  }

  const locale = getLocale(request);
  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
