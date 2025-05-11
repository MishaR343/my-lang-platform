'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import AvatarCircle from '@/components/AvatarCircle';
import './styles/ChatRoomItem.css';


export default function ChatRoomItem({ room, currentUserId, locale, unreadCount, onSelect }) {
  const t = useTranslations('ChatRoom');
  const otherUser = room.participants.find(p => p.id !== currentUserId);
  const lastMsg = room.lastMessage;
  const timeStr = lastMsg?.createdAt
    ? new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' })
        .format(new Date(lastMsg.createdAt))
    : '';

  return (
    <div
      className="chat-item-link"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
    >     
      <div className="chat-item-content">
        {/* Лівий блок */}
        <div className="chat-item-left">
          <AvatarCircle username={otherUser?.username} avatar={otherUser?.avatar}/>
          <div className="chat-item-text">
            <p className="chat-username">{otherUser?.username || 'Unknown'}</p>
            <p className="chat-preview">
              {lastMsg?.content
                ? `${lastMsg.content.slice(0, 20)}…`
                : t('No messages yet')}
            </p>
          </div>
        </div>

        {/* Правий блок */}
        <div className="chat-item-right">
          {timeStr && <span className="chat-time">{timeStr}</span>}
          {lastMsg && (
            <span
              className={`unread-badge ${
                currentUserId !== lastMsg.senderId && lastMsg.status === 'Sent' ? 'highlight' : ''
              }`}
            >
              {currentUserId === lastMsg.senderId && lastMsg.status === 'Sent' && '✔'}
              {currentUserId === lastMsg.senderId && lastMsg.status === 'Read' && '✔✔'}
              {currentUserId !== lastMsg.senderId && unreadCount == 0 && null}
              {currentUserId !== lastMsg.senderId && unreadCount !== 0 && (unreadCount > 99 ? '99+' : unreadCount)}              
            </span>
          )}
        </div>
    </div>
    </div>
    );
}
