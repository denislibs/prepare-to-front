'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'open-ended';
  options?: string[];
}

interface QuestionCardProps {
  question: Question;
  answer: number | string;
  onAnswer: (answer: number | string) => void;
}

export default function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const [openAnswer, setOpenAnswer] = useState('');
  
  useEffect(() => {
    if (typeof answer === 'string') {
      setOpenAnswer(answer);
    }
  }, [answer]);
  
  const handleMultipleChoice = (index: number) => {
    onAnswer(index);
  };
  
  const handleOpenEnded = (value: string) => {
    setOpenAnswer(value);
    onAnswer(value);
  };
  
  return (
    <div>
      <h3 className="test-question__text">
        {question.text}
      </h3>
      
      {question.type === 'multiple-choice' && question.options ? (
        <div className="test-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMultipleChoice(index)}
              className={`test-option ${answer === index ? 'test-option--selected' : ''}`}
            >
              <span className="test-option__letter">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="test-option__text">
                {option}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <textarea
            value={openAnswer}
            onChange={(e) => handleOpenEnded(e.target.value)}
            className="test-textarea"
            placeholder="Введите ваш ответ..."
          />
        </div>
      )}
    </div>
  );
}
