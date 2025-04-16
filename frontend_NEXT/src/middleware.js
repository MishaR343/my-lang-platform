import { NextResponse } from 'next/server';

export function middleware(request) {
  const defaultLocale = 'ua';
  const supportedLocales = ['en', 'ua'];

  const { pathname } = request.nextUrl;

  // Якщо в URL вже є локаль — не перенаправляємо
  if (supportedLocales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // 1. Спроба взяти локаль з cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  // 2. Якщо в cookie нема — беремо з accept-language заголовку
  const acceptLanguage = request.headers.get('accept-language') || '';
  const browserLocale = supportedLocales.find((locale) =>
    acceptLanguage.includes(locale)
  );

  const selectedLocale = supportedLocales.includes(cookieLocale)
    ? cookieLocale
    : browserLocale || defaultLocale;

  // 3. Перенаправлення з додаванням локалі
  const url = request.nextUrl.clone();
  url.pathname = `/${selectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

// Вказуємо на які маршрути застосовувати middleware
export const config = {
  matcher: ['/((?!_next|.*\\..*|favicon.ico).*)'],
};
