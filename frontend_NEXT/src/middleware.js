import { NextResponse } from 'next/server';

const defaultLocale = 'ua';
const supportedLocales = ['en', 'ua'];
const protectedRoutes = ['/chat-rooms', '/progress', '/practice'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split('/')[1];
  const token = request.cookies.get('token')?.value;

  // 🔒 Захист приватних сторінок (але без кастомного заголовка)
  if (
    protectedRoutes.some((route) =>
      pathname.startsWith(`/${locale}${route}`)
    ) &&
    !token
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`; // перенаправляє на домашню
    return NextResponse.redirect(url);
  }

  // 🌐 Додати локаль, якщо її нема в URL
  if (supportedLocales.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language') || '';
  const browserLocale = supportedLocales.find((loc) =>
    acceptLanguage.includes(loc)
  );

  const selectedLocale = supportedLocales.includes(cookieLocale)
    ? cookieLocale
    : browserLocale || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${selectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|favicon.ico|api).*)']
};
