'use client';

import { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timer({ timeLeft, setTimeLeft }: TimerProps) {
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft, setTimeLeft]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300; // Меньше 5 минут
  
  return (
    <div className={`test-timer ${isLowTime ? 'test-timer--warning' : ''}`}>
      <span style={{ marginRight: '0.5rem' }}>⏱</span>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
