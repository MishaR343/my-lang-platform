'use client';

import { useTranslations } from 'next-intl';
import styles from './help.module.css';

export default function HelpPage() {
  const t = useTranslations('Help');

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <p className={styles.intro}>{t('intro')}</p>

      <section className={styles.faq}>
        <h2>{t('faqTitle')}</h2>
        <div className={styles.item}>
          <h3>{t('faq1Question')}</h3>
          <p>{t('faq1Answer')}</p>
        </div>
        <div className={styles.item}>
          <h3>{t('faq2Question')}</h3>
          <p>{t('faq2Answer')}</p>
        </div>
        <div className={styles.item}>
          <h3>{t('faq3Question')}</h3>
          <p>{t('faq3Answer')}</p>
        </div>
      </section>
    </div>
  );
}
