import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__code">404</h1>
        <h2 className="error-page__title">
          Страница не найдена
        </h2>
        <p className="error-page__description">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="btn btn--primary"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
