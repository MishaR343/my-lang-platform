'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '../../i18n';
import '../styles/LanguageSwitcher.css';

const languageLabels = {
  en: '🇺🇸',
  uk: '🇺🇦'
};

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0])) {
      segments.shift();
    }
    return `/${segments.join('/')}`;
  };

  const cleanPath = getPathWithoutLocale();
  const currentLocale = pathname.split('/')[1];

  const handleLocaleChange = (locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
  };

  return (
    <div className="lang-switcher">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${cleanPath}`}
          className={`lang-flag ${locale === currentLocale ? 'active' : ''}`}
          onClick={() => handleLocaleChange(locale)}
        >
          {languageLabels[locale] || locale}
        </Link>
      ))}
    </div>
  );
}
