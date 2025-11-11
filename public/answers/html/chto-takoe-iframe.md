# Что такое `<iframe>`?

`<iframe>` (Inline Frame) — это HTML элемент, который позволяет встраивать другую HTML-страницу или веб-контент внутрь текущей страницы. Это создает вложенный контекст просмотра.

## Что такое iframe?

`<iframe>` — это способ встроить отдельный HTML-документ в текущую страницу, создавая независимый контекст просмотра.

## Базовое использование

```html
<iframe src="https://example.com/page.html"></iframe>
```

## Атрибуты

### `src` — URL встраиваемой страницы:

```html
<iframe src="https://example.com"></iframe>
```

### `width` и `height` — Размеры:

```html
<iframe src="page.html" width="800" height="600"></iframe>
```

### `frameborder` — Граница (устарело):

```html
<iframe src="page.html" frameborder="0"></iframe>
```

### `allowfullscreen` — Полноэкранный режим:

```html
<iframe src="video.html" allowfullscreen></iframe>
```

### `sandbox` — Безопасность:

```html
<iframe src="page.html" sandbox="allow-scripts allow-same-origin"></iframe>
```

### `loading` — Ленивая загрузка:

```html
<iframe src="page.html" loading="lazy"></iframe>
```

## Примеры использования

### Встраивание видео YouTube:

```html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

### Встраивание карты:

```html
<iframe 
    src="https://www.google.com/maps/embed?pb=..." 
    width="600" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

### Встраивание формы:

```html
<iframe 
    src="https://forms.example.com/form" 
    width="100%" 
    height="500">
</iframe>
```

## Безопасность

### Sandbox атрибут:

```html
<iframe 
    src="untrusted.html" 
    sandbox="allow-scripts">
</iframe>
```

**Значения sandbox:**
- `allow-scripts` — разрешить JavaScript
- `allow-same-origin` — разрешить доступ к origin
- `allow-forms` — разрешить формы
- `allow-popups` — разрешить popup окна

## Ограничения

### 1. **X-Frame-Options**

Сервер может запретить встраивание через заголовок `X-Frame-Options: DENY`.

### 2. **CSP (Content Security Policy)**

Может ограничивать использование iframe.

### 3. **Производительность**

Каждый iframe — отдельный документ, что может влиять на производительность.

## Альтернативы

### Для видео:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
</video>
```

### Для карт:

Используйте нативные API карт вместо iframe.

## Заключение

**`<iframe>` используется для:**

1. ✅ Встраивания внешнего контента
2. ✅ Встраивания видео (YouTube, Vimeo)
3. ✅ Встраивания карт
4. ✅ Встраивания форм
5. ✅ Создания изолированных контекстов

**Преимущества:**
- Изоляция контента
- Встраивание внешних ресурсов
- Независимый контекст

**Недостатки:**
- Проблемы с безопасностью
- Влияние на производительность
- Ограничения через X-Frame-Options

**Рекомендации:**
- Используйте `sandbox` для безопасности
- Используйте `loading="lazy"` для производительности
- Избегайте встраивания недоверенного контента

`<iframe>` — полезный инструмент, но требует осторожного использования из-за вопросов безопасности и производительности.

