'use client';

import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import LogoIcon from '/public//Logo.svg';
import { usePathname } from 'next/navigation';
import '../styles/Header.css';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/chat-rooms', label: 'Chat Rooms' },
    { href: '/progress', label: 'Progress Tracker' },
    { href: '/resources', label: 'Resources' },
  ];

  const isRegisterPage = pathname === '/register';

  // Видаляємо локаль із `pathname`
  const locale = pathname.split('/')[1]; // Отримуємо локаль (наприклад, 'en' або 'uk')
  const pathWithoutLocale = pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ? pathname.replace(`/${locale}`, '') || '/'
    : pathname;

  // Отримуємо останній сегмент шляху
  const currentSegment = pathWithoutLocale === '/' ? '/' : pathWithoutLocale.split('/').filter(Boolean).pop();

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
              href={href}
              className={`nav-link ${currentSegment === linkSegment ? 'active' : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="auth-buttons">
        <LanguageSwitcher />
        <Link href="/register">
          <button className="btn-outline">Sign Up</button>
        </Link>
        <button className="btn-primary">Log In</button>
      </div>
    </header>
  );
}