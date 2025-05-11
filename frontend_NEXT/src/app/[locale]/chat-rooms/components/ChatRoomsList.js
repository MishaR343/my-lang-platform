'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import ChatRoomItem from './ChatRoomItem';
import './styles/ChatRoomList.css';

export default function ChatRoomsList({ currentUserId, locale, setActiveRoom }) {
  const t = useTranslations('ChatRoom');
  const [rooms, setRooms]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/chat/chat-rooms', 
      {credentials: 'include'})
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        setRooms(data);
        })
      .catch(() => {
        setError(t('errorFetch'));
        toast.error(t('errorFetch'));
      })
      .finally(() => setLoading(false));
  }, [t]);

  const validRooms = Array.isArray(rooms) ? rooms : [];
  const filtered = validRooms.filter(room => {
    if (!Array.isArray(room.participants)) return false;
    return room.participants.some(p =>
      p.id !== currentUserId &&
      p.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) return <p className="loading-text">{t('Loading')}</p>;
  if (error)   return <p className="error-text">{error}</p>;

  return (
    <div className="chat-rooms-list">
      <input
        type="text"
        placeholder={t('Search')}
        className="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label={t('Search')}
      />

      <div className="chat-list">
        {filtered.length > 0 ? (
          filtered.map(room => (
            <ChatRoomItem
              key={room.id}
              room={room}
              currentUserId={currentUserId}
              locale={locale}
              unreadCount={room.unreadCount}
              onSelect={() => setActiveRoom(room)}
            />
          ))
        ) : (
          <p className="no-rooms-text">{t('No chat rooms')}</p>
        )}
      </div>
    </div>
  );
}
