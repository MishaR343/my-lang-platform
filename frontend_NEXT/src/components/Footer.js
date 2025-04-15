'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import FacebookIcon from '/public/footer/Facebook.svg';
import InstagramIcon from '/public/footer/Instagram.svg';
import YoutubeIcon from '/public/footer/Youtube.svg';
import XIcon from '/public/footer/X.svg';
import LogoIcon from '/public/Logo.svg';
import '../styles/Footer.css';

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  
  return (
    <footer className="footer">
      <div className="logo">
        <a href="#"><LogoIcon className="logo" /></a>
      </div>

      <div className="footer-links">
        <Link href="/contact">{t('contact')}</Link>
        <Link href="/about">{t('about')}</Link>
        <Link href="/help">{t('help')}</Link>
        <Link href="/blog">{t('blog')}</Link>
        <Link href="/feedback">{t('feedback')}</Link>
      </div>

      <div className="social-icons">
        <a href="#"><FacebookIcon className="social-icon" /></a>
        <a href="#"><InstagramIcon className="social-icon" /></a>
        <a href="#"><YoutubeIcon className="social-icon" /></a>
        <a href="#"><XIcon className="social-icon" /></a>
      </div>
    </footer>
  );
}
