'use client';

import styles from './page.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatRoomsPage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: '2rem' }}>
        <h1>💬 Чат-кімнати</h1>
        <p>Тут буде перелік доступних чатів для практики.</p>
      </div>
    </ProtectedRoute>
  );
}
