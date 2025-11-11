# Что такое распределенный компонент?

Распределенный компонент (Distributed Component) — это компонент, который разделен на несколько частей или файлов. Это может быть компонент, разделенный на логические части, или компонент, использующий композицию.

## Концепция

### Разделение на части:

```jsx
// Header.jsx
export function Header() {
    return <header>Header</header>;
}

// Content.jsx
export function Content() {
    return <main>Content</main>;
}

// Footer.jsx
export function Footer() {
    return <footer>Footer</footer>;
}

// App.jsx
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

function App() {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}
```

## Композиция

### С children:

```jsx
function Layout({ header, content, footer }) {
    return (
        <div>
            {header}
            {content}
            {footer}
        </div>
    );
}

function App() {
    return (
        <Layout
            header={<Header />}
            content={<Content />}
            footer={<Footer />}
        />
    );
}
```

## Заключение

**Распределенный компонент:**

1. ✅ Разделен на части
2. ✅ Композиция компонентов
3. ✅ Модульная структура

**Преимущества:**

- Модульность
- Переиспользование
- Поддерживаемость

**Рекомендации:**

- Разделяйте компоненты логически
- Используйте композицию
- Создавайте модульную структуру

Распределенные компоненты помогают создавать поддерживаемую архитектуру.



