# Что такое `ReactDOMServer`?

`ReactDOMServer` — это API React для серверного рендеринга (Server-Side Rendering, SSR). Он позволяет рендерить React-компоненты в статические HTML-строки на сервере.

## Что такое ReactDOMServer?

ReactDOMServer предоставляет методы для рендеринга React-компонентов в HTML-строки на сервере, что полезно для SEO и первоначальной загрузки страницы.

## Основные методы

### `renderToString()`

Рендерит компонент в HTML-строку.

```jsx
import { renderToString } from 'react-dom/server';

function App() {
    return <div>Hello World</div>;
}

const html = renderToString(<App />);
// '<div>Hello World</div>'
```

### `renderToStaticMarkup()`

Рендерит компонент в статический HTML без дополнительных атрибутов React.

```jsx
import { renderToStaticMarkup } from 'react-dom/server';

function App() {
    return <div>Hello World</div>;
}

const html = renderToStaticMarkup(<App />);
// '<div>Hello World</div>'
```

## Использование

### С Express:

```jsx
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from './App';

const app = express();

app.get('/', (req, res) => {
    const html = renderToString(<App />);
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>App</title></head>
            <body>
                <div id="root">${html}</div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `);
});
```

## Различия методов

### `renderToString()`:

- Добавляет атрибуты React для гидратации
- Используется для интерактивных компонентов
- Поддерживает гидратацию на клиенте

### `renderToStaticMarkup()`:

- Не добавляет атрибуты React
- Используется для статических компонентов
- Меньший размер HTML

## Заключение

**ReactDOMServer — это:**

1. ✅ API для серверного рендеринга
2. ✅ Рендеринг компонентов в HTML
3. ✅ Улучшение SEO и производительности

**Методы:**

- `renderToString()` — для интерактивных компонентов
- `renderToStaticMarkup()` — для статических компонентов

**Использование:**

- Серверный рендеринг
- SEO оптимизация
- Первоначальная загрузка

**Рекомендации:**

- Используйте для SSR
- Выбирайте правильный метод
- Настраивайте гидратацию на клиенте

ReactDOMServer — важный инструмент для серверного рендеринга React-приложений.



