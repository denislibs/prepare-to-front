# Как работает пропс `children` в React?

Пропс `children` в React позволяет передавать дочерние элементы компоненту. Это специальный проп, который содержит все элементы между открывающим и закрывающим тегами компонента.

## Использование

### Базовый пример:

```jsx
function Container({ children }) {
    return <div className="container">{children}</div>;
}

<Container>
    <h1>Заголовок</h1>
    <p>Текст</p>
</Container>
```

### Множественные children:

```jsx
function Layout({ header, footer, children }) {
    return (
        <div>
            {header}
            <main>{children}</main>
            {footer}
        </div>
    );
}
```

## React.Children API

### Обработка children:

```jsx
import { Children } from 'react';

function ButtonGroup({ children }) {
    return (
        <div>
            {Children.map(children, (child, index) => (
                <div key={index}>{child}</div>
            ))}
        </div>
    );
}
```

## Заключение

**children:**

1. ✅ Специальный проп для дочерних элементов
2. ✅ Гибкая композиция
3. ✅ React.Children API для обработки

**Рекомендации:**

- Используйте для композиции
- Обрабатывайте с React.Children
- Делайте компоненты гибкими

children — мощный инструмент для создания переиспользуемых компонентов.



