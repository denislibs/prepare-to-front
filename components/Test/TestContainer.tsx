'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import FullscreenGuard from './FullscreenGuard';
import TestSettings from './TestSettings';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'open-ended';
  options?: string[];
  correctAnswer?: number | string;
}

interface TestContainerProps {
  topicId: string;
}

export default function TestContainer({ topicId }: TestContainerProps) {
  const router = useRouter();
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testTitle, setTestTitle] = useState<string>('Тест');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 минут
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  
  useEffect(() => {
    // Загружаем тесты из JSON файла
    const loadTest = async () => {
      try {
        const response = await fetch(`/tests/${topicId}.json`);
        
        if (!response.ok) {
          throw new Error(`Тест для топика "${topicId}" не найден`);
        }
        
        const testData = await response.json();
        
        if (!testData.questions || !Array.isArray(testData.questions)) {
          throw new Error('Неверный формат теста');
        }
        
        // Сохраняем все вопросы
        setAllQuestions(testData.questions);
        setTestTitle(testData.title || 'Тест');
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить тест');
        setLoading(false);
      }
    };
    
    loadTest();
  }, [topicId]);
  
  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      finishTest();
    }
  }, [timeLeft, isFinished]);
  
  const handleAnswer = (questionId: string, answer: number | string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleStartTest = (questionCount: number) => {
    // Перемешиваем все вопросы для случайного порядка (алгоритм Фишера-Йетса)
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Берем только выбранное количество
    const selectedQuestions = shuffled.slice(0, questionCount);
    setQuestions(selectedQuestions);
    setShowSettings(false);
  };
  
  const finishTest = () => {
    // Подсчитываем результаты
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    setScore({ correct, total: questions.length });
    setIsFinished(true);
  };
  
  if (loading) {
    return (
      <div className="test-page">
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'var(--bg-primary)'
        }}>
          <p className="text text--secondary text--lg">Загрузка теста...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="test-page">
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'var(--bg-primary)'
        }}>
          <div className="results__container" style={{ borderColor: '#dc2626' }}>
            <h2 className="title title--h3" style={{ color: '#dc2626', marginBottom: '1rem' }}>Ошибка</h2>
            <p className="text text--secondary" style={{ marginBottom: '1.5rem' }}>{error}</p>
            <button
              onClick={() => router.push(`/topics/${topicId}`)}
              className="btn btn--secondary btn--full"
            >
              Вернуться
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (showSettings && !loading && !error && allQuestions.length > 0) {
    return (
      <div className="test-page">
        <TestSettings
          totalQuestions={allQuestions.length}
          onStart={handleStartTest}
          onCancel={() => router.push(`/topics/${topicId}`)}
          testTitle={testTitle}
        />
      </div>
    );
  }
  
  if (isFinished && score) {
    const percentage = Math.round((score.correct / score.total) * 100);
    return (
      <div className="results">
        <div className="results__container">
          <h2 className="results__title">Результаты теста</h2>
          <div className="results__score">
            <div className="results__percentage">{percentage}%</div>
            <div className="results__details">
              Правильных ответов: {score.correct} из {score.total}
            </div>
          </div>
          <div className="results__progress">
            <div 
              className="results__progress-bar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <button
            onClick={() => router.push(`/topics/${topicId}`)}
            className="btn btn--primary btn--full"
            style={{ marginTop: '2rem' }}
          >
            Вернуться к вопросам
          </button>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return null;
  }
  
  const currentQ = questions[currentQuestion];
  
  return (
    <FullscreenGuard>
      <div className="test-page">
        <header className="test-header">
          <div className="test-header__container">
            <div className="test-header__content">
              <div className="test-header__info">
                <h1 className="test-header__title">{testTitle}</h1>
                <p className="test-header__subtitle">
                  Вопрос {currentQuestion + 1} из {questions.length}
                </p>
              </div>
              <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
            </div>
          </div>
        </header>

        <main className="test-main">
          {currentQ && (
            <div className="card test-question">
              <QuestionCard
                question={currentQ}
                answer={answers[currentQ.id]}
                onAnswer={(answer: number | string) => handleAnswer(currentQ.id, answer)}
              />
            </div>
          )}
          
          <div className="test-navigation">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="btn btn--secondary"
            >
              ← Назад
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={finishTest}
                className="btn btn--primary"
              >
                Завершить тест
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="btn btn--primary"
              >
                Далее →
              </button>
            )}
          </div>
        </main>
      </div>
    </FullscreenGuard>
  );
}
