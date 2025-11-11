'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TestContainer from '@/components/Test/TestContainer';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const topic = params?.topic as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!topic) {
      setError('Топик не указан');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [topic]);
  
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
  
  if (error || !topic) {
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
            <p className="text text--secondary" style={{ marginBottom: '1.5rem' }}>
              {error || 'Топик не найден'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="btn btn--secondary btn--full"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return <TestContainer topicId={topic} />;
}
