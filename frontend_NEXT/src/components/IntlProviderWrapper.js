// filepath: c:\Users\user\Desktop\my-lang-platform\frontend_NEXT\src\components\IntlProviderWrapper.js
'use client';

import { NextIntlClientProvider } from 'next-intl';

export default function IntlProviderWrapper({ locale, messages, children }) {
  const timeZone = 'Europe/Kiev';
  return (
      <NextIntlClientProvider 
        locale={locale} 
        messages={messages}
        timeZone={timeZone}
        >
        {children}
      </NextIntlClientProvider>

  );
}