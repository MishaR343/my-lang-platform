import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }) {
  const resolvedParams = await params; // Очікуємо виконання Promise
  const  {locale}  = resolvedParams; // Отримуємо локаль із параметрів

  console.log('Resolved Params:', resolvedParams);
  console.log('Locale:', locale);

  // const messages = await getMessages(locale).catch(() => notFound());

  return (
<>
        {/* <NextIntlClientProvider locale={locale} messages={messages}> */}
          {children}
        {/* </NextIntlClientProvider> */}
</>
  );
}