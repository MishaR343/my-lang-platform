import { locales} from '../../../i18n';
import { notFound } from 'next/navigation';
import LayoutWithHeaderFooter from '../../components/LayoutWithHeaderFooter';
import IntlProviderWrapper from '../../components/IntlProviderWrapper'; // Створимо окремий клієнтський компонент
import '../../styles/globals.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    htmlLang: locale
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    console.error(`Unsupported locale: ${locale}`);
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);
    notFound();
  }

  return (
    <>
      <IntlProviderWrapper locale={locale} messages={messages}>
        <LayoutWithHeaderFooter>
          {children}
        </LayoutWithHeaderFooter>
      </IntlProviderWrapper>
    </>
  );
}
