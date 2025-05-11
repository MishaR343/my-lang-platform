'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiSmile, FiPaperclip, FiSend, FiInfo } from 'react-icons/fi';
import AvatarCircle from '@/components/AvatarCircle';
import ImprovedPreviewBar from './ImprovedPreviewBar';
import './styles/Chat.css';

export default function Chat({ room, currentUserId, locale, onClose }) {
  const t = useTranslations('ChatRoom');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const [improveEnabled, setImproveEnabled] = useState(true); // для перемикача
  const [preview, setPreview] = useState(null); // { original: "", improved: "" }
  const [showAIModal, setShowAIModal] = useState(false);



  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/chat-rooms/${room.id}/messages`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data.messages)) throw new Error();
        setMessages(data.messages);
      })
      .catch(() => {
        toast.error(t('errorFetch'));
      });
  }, [room.id, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (improveEnabled) {
        try {
        const improved = await fetchImproved(trimmed);
        setPreview({ original: trimmed, improved });
        } catch (err) {
        toast.error('Помилка при покращенні');
        }
    } else {
        sendMessage(trimmed);
        setInput('');
    }
    };

const sendMessage = async (text) => {
    const res = await fetch(`http://localhost:5000/api/chat/chat-rooms/${room.id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: text }),
    });
  
    const data = await res.json();
    setMessages(prev => [...prev, data]);
  };
  
  const fetchImproved = async (text) => {
    const res = await fetch('http://localhost:5000/api/ai/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: text }),
    });
  
    if (!res.ok) throw new Error('AI error');
    const data = await res.json();
    return data.improved;
  };

  
  return (
    <div className="chat-container">
      {/* 🧭 Header */}
      <header className="chat-header">
        <div className="chat-header-left">
        <button className="back-btn" onClick={onClose}>
          <FiArrowLeft size={20} />
        </button>
        <AvatarCircle
          username={room.participants.find(p => p.id !== currentUserId)?.username}
          avatar={room.participants.find(p => p.id !== currentUserId)?.avatar}
          size={40}
        />
        <div className="chat-header-text">
          <p className="chat-header-name">
            {room.participants.find(p => p.id !== currentUserId)?.username}
          </p>
          {/* <p className="chat-header-status">{t('online')}</p> */}
        </div>
        </div>
        <div className="chat-header-right">
                    {/* 🔁 AI toggle */}
            <div className="chat-ai-toggle">
                <label className="ai-label">
                <input
                    type="checkbox"
                    checked={improveEnabled}
                    onChange={() => setImproveEnabled(!improveEnabled)}
                />
                {t('AI Improved')}
                </label>
                <button
                onClick={() => setShowAIModal(true)}
                className="ai-info-btn"
                title={t('AI Improved')}
                >
                <FiInfo size={16} />
                </button>
            </div>
      </div>
      </header>
  
      {/* 💬 Chat messages */}
      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={msg.sender.id === currentUserId ? 'chat-out' : 'chat-in'}
          >
            {msg.sender.id !== currentUserId && (
              <AvatarCircle
                username={msg.sender.username}
                avatar={msg.sender.avatar}
                size={40}
              />
            )}
            <div className="bubble">{msg.content}</div>
            {msg.sender.id === currentUserId && (
              <AvatarCircle
                username={msg.sender.username}
                avatar={msg.sender.avatar}
                size={40}
              />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
  
      {/* 💡 AI improvement preview */}
      {preview && (
        <ImprovedPreviewBar
            original={preview.original}
            improved={preview.improved}
            onSendImproved={() => {
            sendMessage(preview.improved);
            setPreview(null);
            setInput('');
            }}
            onSendOriginal={() => {
            sendMessage(preview.original);
            setPreview(null);
            setInput('');
            }}
            onClose={() => {
            setPreview(null);
            }}
        />
        )}



  
      {/* 🧾 Input */}
      <form className="chat-input-area" onSubmit={handleSubmit}>
        <button type="button" aria-label="emoji">
          <FiSmile size={20} />
        </button>
        <button type="button" aria-label="attach">
          <FiPaperclip size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('message')}
        />
        <button type="submit" aria-label="send">
          <FiSend size={20} />
        </button>
        </form>

        {showAIModal && (
        <div className="modal-overlay" onClick={() => setShowAIModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t('AI Improved')}</h3>
            <p>
                {t('AI Improved info')}
            </p>
            <button onClick={() => setShowAIModal(false)} className="btn-primary">OK</button>
            </div>
        </div>
        )}
    </div>
  ); 
}
