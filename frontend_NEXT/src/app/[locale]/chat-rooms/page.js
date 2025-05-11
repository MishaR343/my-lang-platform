'use client';

import React, { useState } from 'react';
import Split from 'react-split';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import ChatRoomsList from './components/ChatRoomsList';
import Chat from './components/Chat';
import NewChat from './components/NewChat';
import styles from './page.module.css'; // твій файл стилів
import './components/styles/Split.css'; // нові стилі для розділення

export default function ChatRoomsPage() {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const { locale } = useParams();
  const t = useTranslations('ChatRoom');
  const [activeRoom, setActiveRoom] = useState(null);
  const [theme, setTheme] = useState('');
  const [creating, setCreating] = useState(false);

  return (
    <main className={styles.container}>
    <Split
      className="split"
      sizes={[60, 40]}
      minSize={[450, 450]}
      gutterSize={6} 
    >
        <div className={styles.leftPanel}>
          <ChatRoomsList
            currentUserId={currentUserId}
            locale={locale}
            setActiveRoom={setActiveRoom}
          />
        </div>

        <div className={styles.rightPanel}>
          {activeRoom ? (
            <Chat
              room={activeRoom}
              currentUserId={currentUserId}
              locale={locale}
              onClose={() => setActiveRoom(null)}
            />
          ) : (
            <NewChat
              theme={theme}
              setTheme={setTheme}
              creating={creating}
              setCreating={setCreating}
            />
          )}
        </div>
      </Split>
    </main>
  );
}
