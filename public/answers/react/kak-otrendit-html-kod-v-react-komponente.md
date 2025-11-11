# Как отрендерить HTML код в React-компоненте?

Для рендеринга HTML-кода в React используется проп `dangerouslySetInnerHTML`. Это позволяет вставлять HTML напрямую, но требует осторожности из-за рисков XSS.

## Использование

### Базовый синтаксис:

```jsx
function Component() {
    const html = '<p>HTML контент</p>';
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

## Примеры

### С контентом:

```jsx
function Article({ content }) {
    return (
        <article dangerouslySetInnerHTML={{ __html: content }} />
    );
}
```

### С очисткой:

```jsx
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
    const clean = DOMPurify.sanitize(html);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

## Безопасность

### ⚠️ Риски XSS:

```jsx
// ❌ Опасно
const userInput = '<script>alert("XSS")</script>';
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Безопасно
const clean = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

## Альтернативы

### Парсинг и рендеринг:

```jsx
// Используйте библиотеки для парсинга
import { parse } from 'html-react-parser';

function Component({ html }) {
    return <div>{parse(html)}</div>;
}
```

## Заключение

**Рендеринг HTML:**

1. ✅ dangerouslySetInnerHTML
2. ✅ Осторожность с безопасностью
3. ✅ Санитизация контента

**Рекомендации:**

- Используйте только для доверенного контента
- Санитизируйте пользовательский ввод
- Рассмотрите альтернативы

dangerouslySetInnerHTML — мощный, но опасный инструмент, требующий осторожности.



