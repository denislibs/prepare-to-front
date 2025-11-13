import { notFound } from 'next/navigation';
import { getTopicById } from '@/utils/topics';
import { readAnswerFile } from '@/utils/file-reader';
import MarkdownRenderer from '@/components/Markdown/MarkdownRenderer';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ topic: string; question: string }>;
}

export default async function QuestionPage({ params }: PageProps) {
  const { topic, question } = await params;
  const topicData = getTopicById(topic);
  
  if (!topicData) {
    notFound();
  }
  
  let answerContent = '';
  try {
    answerContent = await readAnswerFile(topic, `${question}.md`);
  } catch (error) {
    console.error('Error reading answer:', error);
    answerContent = '# Ответ не найден\n\nНе удалось загрузить ответ на этот вопрос.';
  }
  
  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link 
                href={`/topics/${topic}`} 
                className="topic-header__back"
              >
                ← Назад к вопросам
              </Link>
              <span style={{ color: 'var(--border)' }}>|</span>
              <Link 
                href="/" 
                className="topic-header__back"
              >
                Главная
              </Link>
            </div>
          </div>
          <h1 className="title title--h2">{topicData.name}</h1>
        </div>
      </header>

      <main className="page__main">
        <article className="article">
          <MarkdownRenderer content={answerContent} />
        </article>

        <div className="nav">
          <Link
            href={`/topics/${topic}`}
            className="btn btn--secondary nav__link"
          >
            ← Все вопросы
          </Link>
          <Link
            href={`/topics/${topic}/test`}
            className="btn btn--primary nav__link"
          >
            Пройти тест →
          </Link>
        </div>
      </main>
    </div>
  );
}
