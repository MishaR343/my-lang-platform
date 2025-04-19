import styles from './page.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1 className={styles.title}>User Progress</h1>
        <p className={styles.description}>Track your interaction history and analyze API responses.</p>
      </div>
    </ProtectedRoute>
  );
}
