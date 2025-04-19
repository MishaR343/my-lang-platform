'use client';

import { useTranslations } from 'next-intl';
import ChatBotVisual from '/public/home/main_car1_img.svg';
import styles from './page.module.css';

export default function HomePage() {

  const t = useTranslations('Home');
  
  return (
    <div className={styles.main}>
      <section className={styles.leftSide}>
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>{t('learnMore')}</button>
          <button className={styles.btnOutline}>{t('join')}</button>
        </div>
      </section>
      <section className={styles.rightSide}>
        <div className={styles.feature}>
          <h2>{t('modesTitle')}</h2>
          <p>{t('modesDescription')}</p>
        </div>
        <ChatBotVisual className={styles.image} />
        <div className={styles.feature}>
          <h2>{t('feedbackTitle')}</h2>
          <p>{t('feedbackDescription')}</p>
        </div>
      </section>
    </div>
  );
}
