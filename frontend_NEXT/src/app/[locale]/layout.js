import { locales } from '../../../i18n';
import { notFound } from 'next/navigation';
import LocaleLayoutClient from '../../components/LocaleLayoutClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { htmlLang: locale };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) return notFound();

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    return notFound();
  }

  return (
    <LocaleLayoutClient locale={locale} messages={messages}>
      {children}
    </LocaleLayoutClient>
  );
}
