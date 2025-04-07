import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.main}>
      <section className={styles.leftSide}>
        <h1>Enhance Your Project with Interactive API</h1>
        <p>
          Connect your Express.js backend with a modern frontend to build fast and scalable web apps.
          Communicate via REST APIs for efficient and dynamic data flow.
        </p>
        <div className={styles.buttons}>
          <button className={styles.btnPrimary}>Learn More</button>
          <button className={styles.btnOutline}>Sign Up</button>
        </div>
      </section>

      <section className={styles.rightSide}>
        <div className={styles.feature}>
          <h2>Chat Modes Available</h2>
          <p>Regular chat for casual use and analytical mode for technical API debugging.</p>
        </div>
        <img src="/chat-bot-visual.png" alt="Chat Bot Visual" className={styles.image} />
        <div className={styles.feature}>
          <h2>Real-Time API Feedback</h2>
          <p>Get instant responses and logs from your Express backend.</p>
        </div>
      </section>
    </div>
  );
}
