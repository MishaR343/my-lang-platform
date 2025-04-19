'use client';

import { useTranslations } from 'next-intl';
import styles from './blog.module.css';

export default function BlogPage() {
  const t = useTranslations('Blog');

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <p className={styles.intro}>{t('intro')}</p>

      <div className={styles.articles}>
        <div className={styles.article}>
          <h2>{t('article1Title')}</h2>
          <p>{t('article1Excerpt')}</p>
        </div>
        <div className={styles.article}>
          <h2>{t('article2Title')}</h2>
          <p>{t('article2Excerpt')}</p>
        </div>
        <div className={styles.article}>
          <h2>{t('article3Title')}</h2>
          <p>{t('article3Excerpt')}</p>
        </div>
      </div>
    </div>
  );
}
