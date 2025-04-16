import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Можна імпортувати з іншого файлу, якщо треба
export const locales = ['en', 'ua'];
export const defaultLocale = 'ua';

export default getRequestConfig(async ({ locale }) => {
  // Перевірка валідності locale
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default};
});
