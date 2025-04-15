import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Можна імпортувати з іншого файлу, якщо треба
export const locales = ['en', 'uk'];
export const defaultLocale = 'uk';

export default getRequestConfig(async ({ locale }) => {
  // Перевірка валідності locale
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default};
});
