# Как использовать `React.lazy` и `React.Suspense` для запуска кода приложения?

`React.lazy` и `React.Suspense` используются для ленивой загрузки компонентов и отображения fallback UI во время загрузки.

## Использование

### Базовый пример:

```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <LazyComponent />
        </Suspense>
    );
}
```

### С роутингом:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
```

## Заключение

**React.lazy и Suspense:**

1. ✅ Ленивая загрузка компонентов
2. ✅ Fallback UI
3. ✅ Оптимизация бандла

**Рекомендации:**

- Используйте для больших компонентов
- Предоставляйте fallback UI
- Применяйте с роутингом

React.lazy и Suspense — мощные инструменты для оптимизации загрузки приложений.



