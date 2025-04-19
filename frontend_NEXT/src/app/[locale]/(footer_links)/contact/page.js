'use client';

import { useTranslations } from 'next-intl';
import styles from './contact.module.css';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <p className={styles.description}>{t('description')}</p>

      <div className={styles.infoBlock}>
        <p><strong>{t('email')}</strong> support@lang-platform.com</p>
        <p className={styles.note}>{t('noOffice')}</p>
      </div>

      <div className={styles.social}>
        <p>{t('social')}</p>
        <div className={styles.icons}>
          <a href="#" target="_blank" rel="noreferrer">Facebook</a>
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>
    </div>
  );
}
