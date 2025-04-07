'use client';

import Link from 'next/link';
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

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="nav">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link ${pathname === href ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="auth-buttons">
        <Link href="/join">
          <button className="btn-outline">Join</button>
        </Link>
        <Link href="/start">
          <button className="btn-primary">Start</button>
        </Link>
      </div>
    </header>
  );
}
