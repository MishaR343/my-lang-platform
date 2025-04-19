'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './feedback.module.css';

export default function FeedbackPage() {
  const t = useTranslations('Feedback');

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Тут можна реалізувати POST запит на бекенд
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder={t('name')}
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('email')}
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder={t('message')}
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{t('submit')}</button>
      </form>

      {status === 'success' && <p className={styles.success}>{t('success')}</p>}
      {status === 'error' && <p className={styles.error}>{t('error')}</p>}
    </div>
  );
}
