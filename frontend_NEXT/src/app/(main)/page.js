
'use client';

import styles from './page.module.css';
import Image from 'next/image';
import car1 from './main_car1_img.svg';

export default function HomePage() {
  return (
    <div className={styles.main}>
      <section className={styles.leftSide}>
        <h1>Enhance Your English with Interactive Chat</h1>
        <p>
          Welcome to our platform where learning English becomes more effective!
          <br />
          Choose between regular chat for casual conversations or analytical chat for in-depth language improvement.
        </p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>Learn More</button>
          <button className={styles.btnOutline}>Sign Up</button>
        </div>
      </section>

      <section className={styles.rightSide}>
        <div className={styles.feature}>
          <h2>Chat Modes Available</h2>
          <p>Regular chat for casual conversations and analytical insights.</p>
        </div>
        <Image
          src={car1}
          alt="Chat Bot Visual"
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.feature}>
          <h2>Real-Time Feedback</h2>
          <p>Get instant suggestions to improve your writing style.</p>
        </div>
      </section>
    </div>
  );
}