# Что такое ApplicationCache в HTML5?

ApplicationCache (AppCache) — это устаревший механизм HTML5 для кэширования веб-приложений для офлайн работы. Он был заменен на Service Workers и больше не рекомендуется к использованию.

## Что такое ApplicationCache?

ApplicationCache — это API, который позволял веб-приложениям работать офлайн, кэшируя ресурсы в браузере.

## Как работал AppCache

### Манифест файл:

```html
<!DOCTYPE html>
<html manifest="app.manifest">
<head>
    <title>Приложение</title>
</head>
<body>
    <!-- Контент -->
</body>
</html>
```

### app.manifest:

```
CACHE MANIFEST
# Версия 1.0

CACHE:
index.html
style.css
script.js
image.jpg

NETWORK:
*

FALLBACK:
/ /offline.html
```

## Проблемы AppCache

### 1. **Сложность отладки**

Трудно понять, почему кэш не обновляется.

### 2. **Ненадежность**

Кэш может не обновиться, даже если манифест изменился.

### 3. **Ограниченная гибкость**

Сложно управлять кэшированием динамически.

### 4. **Устаревание**

Заменен на Service Workers.

## Современная замена: Service Workers

```javascript
// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
```

## Заключение

**ApplicationCache:**
- Устаревший механизм
- Не рекомендуется к использованию
- Заменен на Service Workers

**Используйте Service Workers** для офлайн функциональности в современных приложениях.

