'use client';

import styles from './page.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PracticePage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: '2rem' }}>
        <h1>💬 PracticePage</h1>
      </div>
    </ProtectedRoute>
  );
}
