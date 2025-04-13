'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../styles/LanguageSwitcher.css';

const languages = [
  { code: 'en', label: '🇬🇧' },
  { code: 'uk', label: '🇺🇦' }
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = router.locale; // Отримуємо поточну локаль

  return (
    <div className={styles.switcher}>
      {languages.map(({ code, label }) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          className={`${styles.flag} ${currentLocale === code ? styles.active : ''}`}
          replace
        >
          {label}
        </Link>
      ))}
    </div>
  );
}