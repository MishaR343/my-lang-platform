'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import styles from './page.module.css';

export default function ProgressPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Це мок-дані, в реальному проєкті – замінити на API запит
    const mockData = {
      totalSessions: 8,
      correctAnswers: 37,
      incorrectAnswers: 13,
      lastPracticeDate: '2025-05-10',
    };
    setData(mockData);
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1 className={styles.title}>📈 Ваш прогрес</h1>
        <p className={styles.description}>
          Слідкуйте за своїми досягненнями, історією практики та загальною ефективністю.
        </p>

        {data && (
          <div className={styles.statsBox}>
            <div className={styles.statItem}>
              <h3>🔁 Сесій практики</h3>
              <p>{data.totalSessions}</p>
            </div>
            <div className={styles.statItem}>
              <h3>✅ Правильних відповідей</h3>
              <p>{data.correctAnswers}</p>
            </div>
            <div className={styles.statItem}>
              <h3>❌ Неправильних відповідей</h3>
              <p>{data.incorrectAnswers}</p>
            </div>
            <div className={styles.statItem}>
              <h3>📅 Остання сесія</h3>
              <p>{data.lastPracticeDate}</p>
            </div>
          </div>
        )}

        <div className={styles.chartPlaceholder}>
          <p>🔧 Тут буде графік або діаграма з прогресом (опціонально)</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
