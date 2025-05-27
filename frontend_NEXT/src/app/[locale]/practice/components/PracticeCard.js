'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import './styles/PracticeCard.css';

export default function PracticeCard({ question, questionIndex, total, onNext, onPrev, isLast, onFinish }) {
  const t = useTranslations('PracticeRoom');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelect = (index) => {
    if (!isAnswered) {
      setSelectedOption(index);
      setIsAnswered(true);
    }
  };

  const isCorrect = selectedOption === question.correct;

  return (
    <div className="practice-card">
      <div className="practice-card-header">
        {t('Question')} {questionIndex + 1} / {total}
      </div>

      <div className="practice-card-question">{question.question}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {question.options.map((option, index) => {
          let className = 'practice-option';
          if (isAnswered) {
            if (index === question.correct) {
              className += ' correct';
            } else if (index === selectedOption) {
              className += ' incorrect';
            }
          } else if (index === selectedOption) {
            className += ' selected';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={isAnswered}
              className={className}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="practice-card-footer">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className={`practice-button ${questionIndex === 0 ? 'disabled' : ''}`}
        >
          ◀ {t('Prev')}
        </button>

        <button
          onClick={() => (isLast ? onFinish(isCorrect) : onNext(isCorrect))}
          disabled={!isAnswered}
          className={`practice-button ${!isAnswered ? 'disabled' : isLast ? 'finish' : 'primary'}`}
        >
          {isLast ? t('Finish') : t('Next')} ▶
        </button>
      </div>
    </div>
  );
}
