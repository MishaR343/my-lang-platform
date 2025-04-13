
import { useTranslations } from 'next-intl';
import ChatBotVisual from '/public/home/main_car1_img.svg';
import styles from './page.module.css';

export default function HomePage() {
  // const t = useTranslations('root');
  return (
    <div className={styles.main}>
      <section className={styles.leftSide}>
        <h1>Enhance Your Speaking Skills with Interactive Chat</h1>
        {/* <p>{t('title')}</p> */}
        <p>Choose between regular chat for casual conversations or analytical chat for in-depth language improvement.
        </p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>Learn More</button>
          <button className={styles.btnOutline}>Join</button>
        </div>
      </section>

      <section className={styles.rightSide}>
        <div className={styles.feature}>
          <h2>Chat Modes Available</h2>
          <p>Regular chat for casual conversations and analytical insights.</p>
        </div>
        <ChatBotVisual className={styles.image} />
        <div className={styles.feature}>
          <h2>Real-Time Feedback</h2>
          <p>Get instant suggestions to improve your writing style.</p>
        </div>
      </section>
    </div>
  );
}