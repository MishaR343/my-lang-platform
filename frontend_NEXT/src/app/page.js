// src/app/page.js
import { redirect } from 'next/navigation';

export default function Home() {
  // Отримуємо заголовок Accept-Language із запиту
  const acceptLanguage = headers().get('accept-language') || '';
  
  // Визначаємо мову за замовчуванням (якщо Accept-Language не вказано)
  const defaultLocale = 'uk';

  // Доступні локалі
  const supportedLocales = ['en', 'uk'];

  // Знаходимо першу підтримувану мову
  const selectedLocale = supportedLocales.find(locale =>
    acceptLanguage.includes(locale)
  ) || defaultLocale;

  // Редірект на вибрану мову
  redirect(`/${selectedLocale}`);
}