import { readFile } from 'fs/promises';
import { join } from 'path';
import MarkdownRenderer from '@/components/Markdown/MarkdownRenderer';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import { topics } from '@/utils/topics';

export default async function Home() {
  // Читаем README.md из public
  const PROJECT_ROOT = process.cwd();
  const readmePath = join(PROJECT_ROOT, 'public', 'README.md');
  let readmeContent = '';
  
  try {
    readmeContent = await readFile(readmePath, 'utf-8');
  } catch (error) {
    console.error('Error reading README:', error);
    readmeContent = '# Front-end Interview Prep\n\nОшибка загрузки содержимого.';
  }

  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-container">
          <div className="page__header-content">
            <div className="header__logo">
              <h1 className="title title--h1">Front-end Interview Prep</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="hero">
          <h2 className="title title--hero hero__title">
            Готовьтесь к собеседованию
          </h2>
          <p className="hero__description">
            Изучайте вопросы, проходите тесты и улучшайте свои знания фронтенд разработки
          </p>
        </div>

        <section className="section">
          <h2 className="section__title">
            <span className="title">Темы вопросов</span>
          </h2>
          <div className="grid grid--cols-1 grid--cols-md-2 grid--cols-lg-3">
            {topics.map((topic, index) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="card animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="card__header">
                  {topic.icon && (
                    <div className="card__icon">
                      <Image
                        src={`/assets/${topic.icon}`}
                        alt={topic.name}
                        width={40}
                        height={40}
                        style={{ borderRadius: '0.5rem' }}
                      />
                    </div>
                  )}
                  <div className="card__content">
                    <h3 className="card__title">
                      {topic.name}
                    </h3>
                    <p className="card__description">
                      Изучите вопросы и ответы по теме {topic.name.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="card__footer">
                  <span>Перейти →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
            <h2 className="section__title">
              <span className="title">Быстрый старт</span>
            </h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-card__icon">📖</div>
                <h3 className="feature-card__title">Изучение</h3>
                <p className="feature-card__description">
                  Выберите топик и изучите вопросы с подробными ответами
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-card__icon">🎯</div>
                <h3 className="feature-card__title">Тестирование</h3>
                <p className="feature-card__description">
                  Пройдите тест по выбранному топику для проверки знаний
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-card__icon">💡</div>
                <h3 className="feature-card__title">Практика</h3>
                <p className="feature-card__description">
                  Решайте практические задачи и закрепляйте материал
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="page__footer">
        <div className="page__footer-container">
          <fieldset className="footer__theme-toggle">
            <legend className="visually-hidden">Тема:</legend>
            <span className="footer__theme-toggle-label" aria-hidden="true">Тема:</span>
            <ThemeToggle />
          </fieldset>
          <div className="footer__grid">
            <div className="footer__column">
              <h4 className="footer__title">HTML</h4>
              <ul className="footer__list">
                <li className="footer__item">Основы</li>
                <li className="footer__item">Семантика</li>
                <li className="footer__item">Форматирование</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__title">CSS</h4>
              <ul className="footer__list">
                <li className="footer__item">Селекторы</li>
                <li className="footer__item">Layout</li>
                <li className="footer__item">Анимации</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__title">JavaScript</h4>
              <ul className="footer__list">
                <li className="footer__item">Основы</li>
                <li className="footer__item">Async</li>
                <li className="footer__item">DOM</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__title">Фреймворки</h4>
              <ul className="footer__list">
                <li className="footer__item">React</li>
                <li className="footer__item">Vue</li>
                <li className="footer__item">Angular</li>
              </ul>
            </div>
            <div className="footer__column">
              <h4 className="footer__title">Инструменты</h4>
              <ul className="footer__list">
                <li className="footer__item">Testing</li>
                <li className="footer__item">Build Tools</li>
                <li className="footer__item">Performance</li>
              </ul>
            </div>
          </div>
          <div className="footer__copyright">
            <p>© 2025 Подготовка к собеседованию.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
