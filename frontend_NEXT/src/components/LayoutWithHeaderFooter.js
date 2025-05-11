'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWithHeaderFooter({ children }) {
  const pathname = usePathname();
  const segments = (pathname ?? '').split('/');
  const filtered = segments.filter(Boolean);
  const lastSegment = filtered[filtered.length - 1];
  
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      {lastSegment !== 'register' && <Footer />}
    </div>
  );
}
