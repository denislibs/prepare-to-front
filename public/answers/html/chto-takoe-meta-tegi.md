# Что такое мета-тэги?

Мета-тэги (meta tags) — это HTML-элементы, которые предоставляют метаданные о веб-странице. Они размещаются в секции `<head>` документа и используются для передачи информации браузерам, поисковым системам и другим веб-сервисам.

## Что такое мета-тэги?

Мета-тэги — это элементы `<meta>`, которые описывают документ, но не отображаются напрямую на странице. Они предоставляют информацию о странице для браузеров, поисковых систем и других инструментов.

## Основные типы мета-тэгов

### 1. **Кодировка символов**

```html
<meta charset="UTF-8">
```

- Обязательный мета-тэг
- Определяет кодировку документа
- Должен быть первым в `<head>`

### 2. **Описание страницы**

```html
<meta name="description" content="Подробное описание содержимого страницы для поисковых систем">
```

- Используется поисковыми системами
- Отображается в результатах поиска
- Рекомендуемая длина: 150-160 символов

### 3. **Ключевые слова**

```html
<meta name="keywords" content="HTML, CSS, JavaScript, веб-разработка">
```

- Указывает ключевые слова страницы
- Менее важны для SEO, но все еще используются

### 4. **Автор**

```html
<meta name="author" content="Иван Иванов">
```

- Указывает автора страницы

### 5. **Viewport (для мобильных устройств)**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- Критически важен для адаптивного дизайна
- Контролирует отображение на мобильных устройствах

### 6. **Robots**

```html
<meta name="robots" content="index, follow">
<meta name="robots" content="noindex, nofollow">
```

- Управляет индексацией поисковыми системами
- `index/noindex` — индексировать или нет
- `follow/nofollow` — переходить по ссылкам или нет

### 7. **Open Graph (для социальных сетей)**

```html
<meta property="og:title" content="Заголовок страницы">
<meta property="og:description" content="Описание">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
```

- Используется Facebook, LinkedIn и другими соцсетями
- Определяет, как страница выглядит при публикации

### 8. **Twitter Cards**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Заголовок">
<meta name="twitter:description" content="Описание">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

- Используется Twitter
- Определяет внешний вид при публикации в Twitter

### 9. **Язык**

```html
<meta http-equiv="content-language" content="ru">
```

- Указывает язык контента

### 10. **Кэширование**

```html
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
```

- Управляет кэшированием страницы

## Пример полного набора мета-тэгов

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO -->
    <title>Заголовок страницы</title>
    <meta name="description" content="Подробное описание страницы для поисковых систем">
    <meta name="keywords" content="ключевые, слова">
    <meta name="author" content="Автор">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Заголовок страницы">
    <meta property="og:description" content="Описание">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
    <meta property="og:type" content="website">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Заголовок">
    <meta name="twitter:description" content="Описание">
    <meta name="twitter:image" content="https://example.com/image.jpg">
    
    <!-- Дополнительные -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#3498db">
</head>
<body>
    <!-- Контент -->
</body>
</html>
```

## Заключение

**Мета-тэги используются для:**

1. ✅ **Кодировки** — определение charset
2. ✅ **SEO** — описание, ключевые слова
3. ✅ **Адаптивности** — viewport для мобильных
4. ✅ **Социальных сетей** — Open Graph, Twitter Cards
5. ✅ **Управления** — robots, кэширование

**Важные мета-тэги:**
- `<meta charset="UTF-8">` — обязательный
- `<meta name="viewport">` — для адаптивности
- `<meta name="description">` — для SEO
- Open Graph — для соцсетей

Мета-тэги — важная часть HTML-документа, влияющая на SEO, отображение в соцсетях и работу на мобильных устройствах.

