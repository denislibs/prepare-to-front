# Для чего используются `<noscript>` и `<script>` в HTML?

`<script>` и `<noscript>` — это HTML-элементы, которые используются для работы с JavaScript. `<script>` выполняет JavaScript-код, а `<noscript>` показывает альтернативный контент, когда JavaScript отключен.

## Элемент `<script>`

### Что такое `<script>`?

`<script>` — это HTML-элемент, который используется для встраивания или подключения JavaScript-кода на страницу.

## Использование `<script>`

### Встроенный JavaScript:

```html
<script>
    console.log('Hello, World!');
</script>
```

### Внешний файл:

```html
<script src="script.js"></script>
```

### Атрибуты:

```html
<!-- Асинхронная загрузка -->
<script src="script.js" async></script>

<!-- Отложенная загрузка -->
<script src="script.js" defer></script>

<!-- Тип (по умолчанию JavaScript) -->
<script type="text/javascript" src="script.js"></script>

<!-- Модуль ES6 -->
<script type="module" src="module.js"></script>
```

## Элемент `<noscript>`

### Что такое `<noscript>`?

`<noscript>` — это HTML-элемент, который показывает альтернативный контент, когда JavaScript отключен или не поддерживается.

## Использование `<noscript>`

### Базовый синтаксис:

```html
<noscript>
    <p>Для работы сайта необходимо включить JavaScript.</p>
</noscript>
```

### Альтернативный контент:

```html
<script>
    // JavaScript код
</script>
<noscript>
    <p>JavaScript отключен. Пожалуйста, включите его для полной функциональности.</p>
</noscript>
```

## Примеры использования

### Базовый пример:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Пример</title>
</head>
<body>
    <script>
        document.write('JavaScript включен!');
    </script>
    <noscript>
        <p>JavaScript отключен.</p>
    </noscript>
</body>
</html>
```

### Внешний скрипт с fallback:

```html
<script src="https://cdn.example.com/library.js"></script>
<noscript>
    <p>Для работы этого сайта необходим JavaScript.</p>
</noscript>
```

### Модуль ES6:

```html
<script type="module" src="app.js"></script>
<noscript>
    <p>Ваш браузер не поддерживает модули ES6.</p>
</noscript>
```

## Атрибуты `<script>`

### `async` — Асинхронная загрузка

```html
<script src="script.js" async></script>
```

Скрипт загружается параллельно и выполняется сразу после загрузки.

### `defer` — Отложенная загрузка

```html
<script src="script.js" defer></script>
```

Скрипт загружается параллельно, но выполняется после парсинга HTML.

### `type` — Тип скрипта

```html
<script type="text/javascript" src="script.js"></script>
<script type="module" src="module.js"></script>
<script type="application/json" id="data">
    {"name": "John"}
</script>
```

### `src` — URL скрипта

```html
<script src="https://cdn.example.com/library.js"></script>
```

## Размещение `<script>`

### В `<head>`:

```html
<head>
    <script src="library.js"></script>
</head>
```

### В `<body>`:

```html
<body>
    <script src="script.js"></script>
</body>
```

### В конце `<body>` (рекомендуется):

```html
<body>
    <!-- Контент -->
    <script src="script.js"></script>
</body>
```

## Лучшие практики

### 1. Размещение скриптов

```html
<!-- Хорошо: в конце body -->
<body>
    <!-- Контент -->
    <script src="script.js"></script>
</body>
```

### 2. Использование `defer` или `async`

```html
<!-- Для скриптов, которые не зависят от DOM -->
<script src="analytics.js" async></script>

<!-- Для скриптов, которые зависят от DOM -->
<script src="app.js" defer></script>
```

### 3. Предоставление fallback

```html
<script src="app.js"></script>
<noscript>
    <p>Для работы сайта необходим JavaScript.</p>
</noscript>
```

## Заключение

**`<script>` используется для:**

1. ✅ Встраивания JavaScript-кода
2. ✅ Подключения внешних скриптов
3. ✅ Выполнения JavaScript на странице

**`<noscript>` используется для:**

1. ✅ Показа альтернативного контента
2. ✅ Уведомления о необходимости JavaScript
3. ✅ Улучшения доступности

**Атрибуты `<script>`:**

- `src` — URL скрипта
- `async` — асинхронная загрузка
- `defer` — отложенная загрузка
- `type` — тип скрипта

**Рекомендации:**

- Размещайте скрипты в конце `<body>`
- Используйте `defer` или `async` для внешних скриптов
- Предоставляйте fallback с `<noscript>`

Правильное использование `<script>` и `<noscript>` критично для работы JavaScript и доступности.

