'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '../../i18n';
import '../styles/LanguageSwitcher.css';

const languageLabels = {
  en: '🇺🇸',
  ua: '🇺🇦'
};

export default function LanguageSwitcher() {
  // Гарантуємо, що pathname — це рядок
  const rawPath = usePathname() ?? '';

  // Розбиваємо по '/', навіть якщо rawPath = ''
  const segments = rawPath.split('/');

  // Фільтруємо тільки ненульові сегменти
  const cleanSegments = Array.isArray(segments)
    ? segments.filter(Boolean)
    : [];

  // Якщо перший сегмент — локаль, відкидаємо його
  const withoutLocale = 
    cleanSegments.length > 0 && locales.includes(cleanSegments[0])
      ? cleanSegments.slice(1)
      : cleanSegments;

  const cleanPath = '/' + withoutLocale.join('/');

  // Поточна локаль — перший відфільтрований сегмент, який є в locales
  const currentLocale =
    cleanSegments.length > 0 && locales.includes(cleanSegments[0])
      ? cleanSegments[0]
      : locales[0];

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
