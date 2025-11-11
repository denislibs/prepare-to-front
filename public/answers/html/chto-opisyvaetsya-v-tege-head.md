# Что описывается в тэге `<head>`?

Элемент `<head>` в HTML содержит метаданные документа — информацию о странице, которая не отображается напрямую пользователю, но используется браузерами, поисковыми системами и другими инструментами для правильной обработки и отображения страницы.

## Что такое `<head>`?

`<head>` — это контейнер для метаданных документа, который размещается между `<html>` и `<body>`. Он содержит информацию о документе, но не видимый контент страницы.

## Элементы, размещаемые в `<head>`

### 1. **`<title>`** — Заголовок страницы

```html
<head>
    <title>Название страницы</title>
</head>
```

- Отображается во вкладке браузера
- Используется в закладках
- Важен для SEO
- **Обязательный элемент**

### 2. **`<meta>`** — Метаданные

#### Кодировка:
```html
<meta charset="UTF-8">
```

#### Описание:
```html
<meta name="description" content="Описание страницы">
```

#### Viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### Автор:
```html
<meta name="author" content="Иван Иванов">
```

#### Robots:
```html
<meta name="robots" content="index, follow">
```

### 3. **`<link>`** — Подключение внешних ресурсов

#### CSS стили:
```html
<link rel="stylesheet" href="style.css">
```

#### Иконки:
```html
<link rel="icon" type="image/png" href="favicon.png">
<link rel="apple-touch-icon" href="apple-icon.png">
```

#### Предзагрузка:
```html
<link rel="preload" href="font.woff2" as="font">
```

#### Альтернативные версии:
```html
<link rel="alternate" hreflang="en" href="en/page.html">
```

### 4. **`<style>`** — Встроенные CSS стили

```html
<style>
    body {
        margin: 0;
        font-family: Arial;
    }
</style>
```

### 5. **`<script>`** — JavaScript код

```html
<!-- Встроенный скрипт -->
<script>
    console.log('Hello');
</script>

<!-- Внешний скрипт -->
<script src="script.js"></script>

<!-- Скрипт с defer -->
<script src="script.js" defer></script>

<!-- Скрипт с async -->
<script src="analytics.js" async></script>
```

### 6. **`<base>`** — Базовый URL

```html
<base href="https://example.com/">
<base target="_blank">
```

### 7. **`<noscript>`** — Контент без JavaScript

```html
<noscript>
    <p>Для работы сайта требуется JavaScript</p>
</noscript>
```

## Полный пример `<head>`

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Кодировка (обязательно) -->
    <meta charset="UTF-8">
    
    <!-- Viewport для мобильных -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Совместимость с IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Заголовок (обязательно) -->
    <title>Название страницы</title>
    
    <!-- SEO метаданные -->
    <meta name="description" content="Описание страницы для поисковых систем">
    <meta name="keywords" content="ключевые, слова">
    <meta name="author" content="Автор">
    
    <!-- Open Graph для соцсетей -->
    <meta property="og:title" content="Заголовок">
    <meta property="og:description" content="Описание">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Заголовок">
    
    <!-- Иконки -->
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="apple-touch-icon" href="apple-icon.png">
    
    <!-- CSS стили -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/components.css">
    
    <!-- Предзагрузка ресурсов -->
    <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Альтернативные версии -->
    <link rel="alternate" hreflang="en" href="en/page.html">
    <link rel="alternate" hreflang="ru" href="ru/page.html">
    
    <!-- Встроенные стили (если нужны) -->
    <style>
        .critical {
            color: red;
        }
    </style>
    
    <!-- JavaScript -->
    <script src="js/main.js" defer></script>
    
    <!-- Базовый URL (опционально) -->
    <base href="https://example.com/">
</head>
<body>
    <!-- Контент страницы -->
</body>
</html>
```

## Обязательные элементы

### Минимальный `<head>`:

```html
<head>
    <meta charset="UTF-8">
    <title>Заголовок страницы</title>
</head>
```

## Порядок элементов

Рекомендуемый порядок:

1. `<meta charset>`
2. `<meta name="viewport">`
3. `<title>`
4. Метаданные (description, keywords, etc.)
5. Open Graph / Twitter Cards
6. Иконки
7. CSS стили
8. Предзагрузка ресурсов
9. JavaScript

## Практические рекомендации

### ✅ Хорошо:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Заголовок</title>
    <meta name="description" content="Описание">
    <link rel="stylesheet" href="style.css">
</head>
```

### ❌ Плохо:

```html
<head>
    <title>Заголовок</title>
    <!-- Отсутствует charset -->
    <!-- Отсутствует viewport -->
</head>
```

## Заключение

**В `<head>` описывается:**

1. ✅ **Метаданные** — информация о документе
2. ✅ **Заголовок** — `<title>` (обязательно)
3. ✅ **Кодировка** — `<meta charset>` (обязательно)
4. ✅ **Стили** — `<link>` для CSS или `<style>`
5. ✅ **Скрипты** — `<script>` для JavaScript
6. ✅ **Иконки** — favicon и другие иконки
7. ✅ **SEO данные** — описание, ключевые слова
8. ✅ **Социальные сети** — Open Graph, Twitter Cards

**Обязательные элементы:**
- `<meta charset="UTF-8">`
- `<title>`

**Рекомендуемые элементы:**
- `<meta name="viewport">`
- `<meta name="description">`
- `<link rel="stylesheet">`
- Иконки

`<head>` — это важная часть HTML-документа, содержащая всю метаинформацию, необходимую для правильной работы и отображения страницы.

