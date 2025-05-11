'use client';

import React from 'react';
import { FiCheck, FiSend, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import './styles/ImprovedPreviewBar.css';

export default function ImprovedPreviewBar({ original, improved, onSendImproved, onSendOriginal, onClose }) {
    const t = useTranslations('ChatRoom');

  return (
    <div className="improve-preview-bar">
      <div className="preview-actions">
        <button onClick={onSendImproved} className="btn-primary" title="Send improved">
          <FiCheck size={16} />
        </button>
        <button onClick={onSendOriginal} className="btn-outline" title="Send original">
          <FiSend size={16} />
        </button>
        <button onClick={onClose} className="btn-cancel" title="Close">
          <FiX size={16} />
        </button>
      </div>
      <div className="improve-texts">
        <span className="label">🟢 {t('Improved')}</span>
        <p className="text">{improved}</p>
      </div>
    </div>
  );
}