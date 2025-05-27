'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import PracticeCard from './components/PracticeCard';
import styles from './page.module.css';

export default function PracticePage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const exampleQuestions = [
      {
        id: 1,
        question: 'What is the correct form of the verb: "He ___ to school every day."',
        options: ['go', 'goes', 'gone'],
        correct: 1,
      },
      {
        id: 2,
        question: 'Choose the correct article: "___ apple a day keeps the doctor away."',
        options: ['A', 'An', 'The'],
        correct: 1,
      },
      {
        id: 3,
        question: 'What is the plural of "child"?',
        options: ['childs', 'children', 'childes'],
        correct: 1,
      },
      {
        id: 4,
        question: 'What tense is used: "I have eaten breakfast"?',
        options: ['Past Simple', 'Present Perfect', 'Past Perfect'],
        correct: 1,
      },
      {
        id: 5,
        question: 'Which is a correct sentence?',
        options: ['She don’t like it.', 'She doesn’t likes it.', 'She doesn’t like it.'],
        correct: 2,
      },
    ];
    
    setQuestions(exampleQuestions);
  }, []);

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore((prev) => prev + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleFinish = (wasCorrect) => {
    if (wasCorrect) setScore((prev) => prev + 1);
    setShowResult(true);
  };

  return (
    <ProtectedRoute>
      <div className={styles.wrapper}>
        {!showResult ? (
          questions.length > 0 && (
            <PracticeCard
              question={questions[currentIndex]}
              questionIndex={currentIndex}
              total={questions.length}
              onNext={handleNext}
              onPrev={handlePrev}
              isLast={currentIndex === questions.length - 1}
              onFinish={handleFinish}
            />
          )
        ) : (
          <div className={styles.result}>
            ✅ Ви завершили практику!
            <br />
            Ваш результат: {score} / {questions.length}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
