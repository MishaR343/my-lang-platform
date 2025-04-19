'use client';

import { useTranslations } from 'next-intl';
import styles from './about.module.css';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <p className={styles.intro}>{t('intro')}</p>

      <section className={styles.section}>
        <h2>{t('teamTitle')}</h2>
        <p>{t('teamDescription')}</p>
      </section>

      <section className={styles.section}>
        <h2>{t('visionTitle')}</h2>
        <p>{t('visionDescription')}</p>
      </section>
    </div>
  );
}
