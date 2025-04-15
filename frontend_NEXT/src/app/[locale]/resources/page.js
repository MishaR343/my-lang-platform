import styles from './page.module.css';

export default function ResourcesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Helpful Resources</h1>
      <ul className={styles.list}>
        <li>Next.js Documentation</li>
        <li>Express.js Guide</li>
        <li>REST API Best Practices</li>
      </ul>
    </div>
  );
}
