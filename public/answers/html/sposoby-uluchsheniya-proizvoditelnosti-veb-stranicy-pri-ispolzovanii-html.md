# Способы улучшения производительности веб-страницы при использовании HTML?

Улучшение производительности веб-страницы через HTML включает оптимизацию структуры, использование правильных атрибутов, ленивую загрузку и минимизацию разметки.

## Оптимизация изображений

### Ленивая загрузка:

```html
<img src="image.jpg" alt="Описание" loading="lazy">
```

### Правильные форматы:

```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.avif" type="image/avif">
    <img src="image.jpg" alt="Описание">
</picture>
```

### Размеры изображений:

```html
<img src="image.jpg" 
     alt="Описание" 
     width="800" 
     height="600"
     loading="lazy">
```

## Оптимизация скриптов

### Асинхронная загрузка:

```html
<script src="script.js" async></script>
<script src="script.js" defer></script>
```

### Отложенная загрузка:

```html
<script src="script.js" defer></script>
```

## Оптимизация CSS

### Критический CSS:

```html
<style>
    /* Критический CSS инлайн */
    .header { ... }
</style>
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

### Предзагрузка ресурсов:

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
```

## Минификация HTML

### Удаление пробелов:

```html
<!-- Плохо -->
<div>
    <p>Текст</p>
</div>

<!-- Хорошо -->
<div><p>Текст</p></div>
```

## Оптимизация структуры

### Семантические теги:

```html
<!-- Плохо -->
<div class="header">...</div>

<!-- Хорошо -->
<header>...</header>
```

### Минимум вложенности:

```html
<!-- Плохо -->
<div><div><div><p>Текст</p></div></div></div>

<!-- Хорошо -->
<p>Текст</p>
```

## Кэширование

### Мета-теги:

```html
<meta http-equiv="Cache-Control" content="max-age=3600">
```

## Оптимизация форм

### Правильные типы input:

```html
<input type="email" name="email">
<input type="tel" name="phone">
<input type="number" name="age">
```

### Автозаполнение:

```html
<input type="email" name="email" autocomplete="email">
```

## Заключение

**Способы оптимизации:**

1. ✅ Ленивая загрузка изображений (`loading="lazy"`)
2. ✅ Правильные форматы изображений (WebP, AVIF)
3. ✅ Асинхронная/отложенная загрузка скриптов
4. ✅ Предзагрузка критических ресурсов
5. ✅ Минификация HTML
6. ✅ Оптимизация структуры
7. ✅ Правильные типы input

**Рекомендации:**
- Используйте `loading="lazy"` для изображений
- Используйте `async`/`defer` для скриптов
- Минифицируйте HTML в продакшене
- Оптимизируйте структуру DOM

Правильная оптимизация HTML критична для производительности веб-страницы.

