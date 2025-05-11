'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import './styles/NewChat.css';

export default function NewChat({ theme, setTheme, creating, setCreating }) {
  const t = useTranslations('ChatRoom');
  const router = useRouter();
  const { locale } = useParams();

  const themeKeys = [
    'business', 'movies', 'cars', 'food', 'health',
    'books', 'sport', 'music', 'other'
  ];

  const handleNew = async e => {
    e.preventDefault();
    if (!theme) {
      toast.error(t('errorNoTheme'));
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/chat-rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
      });
      if (!res.ok) throw new Error();
      const room = await res.json();
      router.push(`/${locale}/chat/${room.id}`);
    } catch {
      toast.error(t('errorCreate'));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="new-chat-container">
      <h2>{t('or Make a New chat!')}</h2>
      <p>{t('Choose a theme')}</p>

      <form onSubmit={handleNew} className="new-chat-form">
        {themeKeys.map(key => (
          <label key={key} className="new-chat-theme-label">
            <input
              type="radio"
              name="theme"
              value={key}
              checked={theme === key}
              onChange={() => setTheme(key)}
              className="new-chat-theme-input"
            />
            {t(`theme.${key}`)}
          </label>
        ))}

        <button
          type="submit"
          disabled={creating}
          className="new-chat-button"
        >
          {creating ? t('Creating') : t('Start Chat')}
        </button>
      </form>
    </div>
  );
}