'use client';

import React from 'react';
import IntlProviderWrapper from './IntlProviderWrapper';
import LayoutWithHeaderFooter from './LayoutWithHeaderFooter';
import { Toaster } from 'react-hot-toast';

export default function LocaleLayoutClient({ locale, messages, children }) {
  return (
    <IntlProviderWrapper locale={locale} messages={messages}>
      <LayoutWithHeaderFooter>
        <Toaster position="top-right" />
        {children}
      </LayoutWithHeaderFooter>
    </IntlProviderWrapper>
  );
}
