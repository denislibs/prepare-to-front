'use client';

import { useState } from 'react';

interface TestSettingsProps {
  totalQuestions: number;
  onStart: (questionCount: number) => void;
  onCancel: () => void;
  testTitle: string;
}

export default function TestSettings({ totalQuestions, onStart, onCancel, testTitle }: TestSettingsProps) {
  // Выбираем начальное значение: минимум из 10 и доступного количества, но не меньше 5
  const initialCount = totalQuestions < 5 ? totalQuestions : Math.min(10, totalQuestions);
  const [questionCount, setQuestionCount] = useState(initialCount);
  
  // Генерируем опции в зависимости от доступного количества
  const generateOptions = () => {
    const options = [];
    const standardOptions = [5, 10, 20, 30, 50];
    
    // Добавляем стандартные опции, если они не превышают доступное количество
    standardOptions.forEach(value => {
      if (totalQuestions >= value) {
        options.push({ value, label: `${value} вопросов` });
      }
    });
    
    // Добавляем опцию "Все вопросы" только если она отличается от стандартных
    if (totalQuestions > 0 && !standardOptions.includes(totalQuestions)) {
      options.push({ value: totalQuestions, label: `Все вопросы (${totalQuestions})` });
    }
    
    return options;
  };
  
  const options = generateOptions();
  
  return (
    <div className="test-settings">
      <div className="test-settings__container">
        <h2 className="test-settings__title">{testTitle}</h2>
        <p className="test-settings__description">
          Выберите количество вопросов для теста
        </p>
        
        <div className="test-settings__info">
          <div className="test-settings__info-item">
            <span className="test-settings__info-label">Доступно вопросов:</span>
            <span className="test-settings__info-value">{totalQuestions}</span>
          </div>
        </div>
        
        <div className="test-settings__options">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setQuestionCount(option.value)}
              className={`test-settings__option ${questionCount === option.value ? 'test-settings__option--selected' : ''}`}
            >
              <span className="test-settings__option-label">{option.label}</span>
              {questionCount === option.value && (
                <span className="test-settings__option-check">✓</span>
              )}
            </button>
          ))}
        </div>
        
        <div className="test-settings__hint">
          <p className="test-settings__hint-text">
            Вопросы будут выбраны случайным образом из всех доступных
          </p>
        </div>
        
        <div className="test-settings__actions">
          <button
            onClick={onCancel}
            className="btn btn--secondary"
          >
            Отмена
          </button>
          <button
            onClick={() => onStart(questionCount)}
            className="btn btn--primary"
          >
            Начать тест
          </button>
        </div>
      </div>
    </div>
  );
}

