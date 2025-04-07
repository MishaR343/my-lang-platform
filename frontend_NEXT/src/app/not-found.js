// app/not-found.js

'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '60px', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '28px', marginBottom: '24px' }}>
        Упс! Сторінку не знайдено.
      </p>
      <Link href="/">
        <button style={{
          fontSize: '20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '9px',
        }}>
          Назад на головну
        </button>
      </Link>
    </div>
  );
}
