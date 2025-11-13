import { notFound } from 'next/navigation';
import { getTopicById } from '@/utils/topics';
import { parseQuestionsFile } from '@/lib/md-parser';
import Link from 'next/link';
import Image from 'next/image';
import { extractQuestionSlug } from '@/lib/md-parser';

interface PageProps {
  params: Promise<{ topic: string }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const topicData = getTopicById(topic);
  
  if (!topicData) {
    notFound();
  }
  
  let questions: Awaited<ReturnType<typeof parseQuestionsFile>> = [];
  try {
    questions = await parseQuestionsFile(topicData.file);
  } catch (error) {
    console.error('Error parsing questions:', error);
    questions = [];
  }
  
  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-container">
          <div className="page__header-content">
            <div className="topic-header">
              {topicData.icon && (
                <div className="topic-header__icon">
                  <Image
                    src={`/assets/${topicData.icon}`}
                    alt={topicData.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: '0.5rem' }}
                  />
                </div>
              )}
              <div className="topic-header__content">
                <Link href="/" className="topic-header__back">
                  ← Назад
                </Link>
                <h1 className="title title--h1 topic-header__title">{topicData.name}</h1>
              </div>
            </div>
            <div className="topic-header__actions">
              <Link 
                href={`/topics/${topic}/test`}
                className="btn btn--primary"
              >
                Пройти тест
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="stats">
          <div className="stats__content">
            <div className="stats__item">
              <div className="stats__value">{questions.length}</div>
              <div className="stats__label">Вопросов</div>
            </div>
            <div className="divider divider--vertical"></div>
            <div className="stats__item">
              <div className="stats__value">
                {questions.filter(q => !q.isYouTube && q.answerFile).length}
              </div>
              <div className="stats__label">С ответами</div>
            </div>
          </div>
        </div>

        <section className="section">
          <h2 className="section__title">
            <span className="title">Вопросы</span>
          </h2>
          
          {questions.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__text">Вопросы не найдены.</p>
            </div>
          ) : (
            <div className="question-list">
              {questions.map((question, index) => {
                const slug = question.answerFile 
                  ? question.answerFile.split('/').pop() 
                  : extractQuestionSlug(question.text);
                
                return (
                  <div key={index} className="question-item">
                    {question.isYouTube ? (
                      <div className="question-item__content">
                        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                          <span className="question-item__number">{index + 1}.</span>
                          <span className="question-item__text">{question.text}</span>
                        </div>
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="question-item__external"
                        >
                          YouTube →
                        </a>
                      </div>
                    ) : question.answerFile ? (
                      <Link
                        href={`/topics/${topic}/${slug}`}
                        className="question-item__link"
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                          <span className="question-item__number">{index + 1}.</span>
                          <span className="question-item__text">{question.text}</span>
                        </div>
                        <span className="question-item__arrow">→</span>
                      </Link>
                    ) : (
                      <div className="question-item__content">
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span className="question-item__number">{index + 1}.</span>
                          <span className="question-item__text">{question.text}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
