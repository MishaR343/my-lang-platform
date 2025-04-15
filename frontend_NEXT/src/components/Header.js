'use client';

import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import LogoIcon from '/public/Logo.svg';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import '../styles/Header.css';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('Header');

  const links = [
    { href: '', label: t('home') },
    { href: 'chat-rooms', label: t('chat') },
    { href: 'progress', label: t('progress') },
    { href: 'practice', label: t('practice') }
  ];
  

  const locale = pathname.split('/')[1];
  const pathWithoutLocale = pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ? pathname.replace(`/${locale}`, '') || '/'
    : pathname;

  const currentSegment = pathWithoutLocale === '/' ? '/' : pathWithoutLocale.split('/').filter(Boolean).pop();
  const isRegisterPage = currentSegment === 'register';

  return (
    <header className={`header ${isRegisterPage ? 'register-header' : ''}`}>
      <div className="logo">
        <a href="#">
          <LogoIcon className="logo" />
        </a>
      </div>
      <nav className="nav">
        {links.map(({ href, label }) => {
          const linkSegment = href === '/' ? '/' : href.split('/').filter(Boolean).pop();
          return (
          <Link
            key={href}
            href={`/${locale}/${href}`}
            className={`nav-link ${currentSegment === linkSegment ? 'active' : ''}`}
          >
            {label}
          </Link>

          );
        })}
      </nav>
      <div className="auth-buttons">
        {!isRegisterPage ? (
          <>
            <Link href="/register">
              <button className="btn-outline">{t('signup')}</button>
            </Link>
            <button className="btn-primary">{t('login')}</button>
          </>
        ) : null}
        <LanguageSwitcher />
      </div>

    </header>
  );
}
