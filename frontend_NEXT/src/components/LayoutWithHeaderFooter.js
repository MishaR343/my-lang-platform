'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWithHeaderFooter({ children }) {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      {lastSegment !== 'register' && <Footer />}
    </div>
  );
}
