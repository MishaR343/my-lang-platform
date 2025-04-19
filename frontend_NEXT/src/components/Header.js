'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import toast from 'react-hot-toast';
import LogoIcon from '/public/Logo.svg';
import LanguageSwitcher from './LanguageSwitcher';
import LoginModal from './LoginModal';
import Spinner from './Spinner'; // додай простий спінер-компонент
import '../styles/Header.css';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Header');
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, loading } = useAuth();

  const loginModalFromQuery = searchParams.get('loginModal') === '1';

  useEffect(() => {
    if (loginModalFromQuery) {
      setShowLogin(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [loginModalFromQuery]);

  const locale = pathname.split('/')[1] || 'uk';
  const pathWithoutLocale = pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ? pathname.replace(`/${locale}`, '') || '/'
    : pathname;
  const currentSegment = pathWithoutLocale === '/' ? '/' : pathWithoutLocale.split('/').filter(Boolean).pop();
  const isRegisterPage = currentSegment === 'register';

  const getInitials = (name) =>
    name.split(' ').map(word => word[0]).join('').toUpperCase();

  const protectedRoutes = ['chat-rooms', 'progress', 'practice'];

  const handleNavClick = async (href) => {
    const route = href === '' ? '/' : `/${href}`;
    const isProtected = protectedRoutes.includes(href);
  
    if (isProtected) {
      try {
        // Перевірка авторизації через /api/auth/me
        const res = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (res.ok) {
          // Якщо токен валідний — редірект
          router.push(`/${locale}${route}`);
        } else {
          // Інакше — показуємо помилку
          toast.error(t('unauthorized'));
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        toast.error(t('authCheckFailed'));
      }
    } else {
      // Публічна сторінка
      router.push(`/${locale}${route}`);
    }
  };
  
  

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      logout(); // очищає user на фронті
      router.push(`/${locale}`); // редірект на головну
    }
  };  

  return (
    <>
      <header className={`header ${isRegisterPage ? 'register-header' : ''}`}>
        <div className="logo">
          <a href="#"><LogoIcon className="logo" /></a>
        </div>

        <nav className="nav">
          {[
            { href: '', label: t('home') },
            { href: 'chat-rooms', label: t('chat') },
            { href: 'progress', label: t('progress') },
            { href: 'practice', label: t('practice') }
          ].map(({ href, label }) => {
            const linkSegment = href === '/' ? '/' : href.split('/').filter(Boolean).pop();
            return (
              <button
                key={href}
                className={`nav-link ${currentSegment === linkSegment ? 'active' : ''}`}
                onClick={() => handleNavClick(href)}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="auth-buttons">
        {!isRegisterPage && (
          <>
            {loading ? (
              <Spinner />
            ) : user ? (
              <div className="user-box">
                <div className="avatar">{getInitials(user.username)}</div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/register">
                  <button className="btn-outline">{t('signup')}</button>
                </Link>
                <button className="btn-primary" onClick={() => setShowLogin(true)}>
                  {t('login')}
                </button>
              </>
            )}
          </>
        )}
        <LanguageSwitcher />
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
