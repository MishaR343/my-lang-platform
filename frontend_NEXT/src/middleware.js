import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'uk'];
const defaultLocale = 'uk';

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Пропускаємо вже локалізовані
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return;
  }

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api).*)'],
};
