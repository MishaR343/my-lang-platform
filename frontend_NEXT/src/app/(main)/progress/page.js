import styles from './page.module.css';

export default function ProgressPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Progress</h1>
      <p className={styles.description}>Track your interaction history and analyze API responses.</p>
    </div>
  );
}
