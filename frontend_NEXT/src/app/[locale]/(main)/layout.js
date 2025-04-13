'use client';

import '../../../styles/globals.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Отримуємо останній сегмент шляху
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      {/* Умовне рендерення футера */}
      {lastSegment !== 'register' && <Footer />}
    </div>
  );
}