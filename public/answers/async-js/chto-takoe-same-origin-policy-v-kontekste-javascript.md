# Что такое same-origin policy в контексте JavaScript?

Same-Origin Policy (политика одинакового источника) — это важный механизм безопасности в веб-браузерах, который ограничивает взаимодействие между документами, скриптами и другими ресурсами, загруженными с разных источников (origins). Понимание Same-Origin Policy критически важно для понимания безопасности веб-приложений и работы с CORS (Cross-Origin Resource Sharing).

## Что такое Origin (источник)?

Origin (источник) определяется тремя компонентами:

1. **Протокол** (protocol) — http, https, file и т.д.
2. **Домен** (domain/host) — example.com, localhost и т.д.
3. **Порт** (port) — 80, 443, 3000 и т.д.

### Примеры origins:

```javascript
// Полный origin: https://example.com:443
// Протокол: https
// Домен: example.com
// Порт: 443 (по умолчанию для HTTPS)

// Разные origins:
https://example.com        // Протокол: https, домен: example.com, порт: 443
http://example.com         // Протокол: http, домен: example.com, порт: 80
https://www.example.com    // Другой поддомен
https://example.com:3000   // Другой порт
https://other.com          // Другой домен
```

## Что такое Same-Origin Policy?

Same-Origin Policy — это политика безопасности браузера, которая разрешает скриптам доступ только к ресурсам с того же origin, с которого был загружен скрипт.

### Правило:

Два URL считаются имеющими одинаковый origin, если у них совпадают:
- Протокол
- Домен
- Порт

### Примеры:

```javascript
// ✅ Одинаковый origin
https://example.com/page1  →  https://example.com/page2
// Протокол: https (совпадает)
// Домен: example.com (совпадает)
// Порт: 443 (совпадает)

// ❌ Разный origin - другой протокол
https://example.com  →  http://example.com
// Протокол: https vs http (не совпадает)

// ❌ Разный origin - другой поддомен
https://example.com  →  https://www.example.com
// Домен: example.com vs www.example.com (не совпадает)

// ❌ Разный origin - другой порт
https://example.com  →  https://example.com:3000
// Порт: 443 vs 3000 (не совпадает)

// ❌ Разный origin - другой домен
https://example.com  →  https://other.com
// Домен: example.com vs other.com (не совпадает)
```

## Что блокирует Same-Origin Policy?

Same-Origin Policy блокирует:

### 1. **AJAX/Fetch запросы**

```javascript
// ❌ Заблокировано - разные origins
fetch('https://api.other-domain.com/data')
  .then(response => response.json())
  .catch(error => {
    // CORS error: Access to fetch at 'https://api.other-domain.com/data' 
    // from origin 'https://example.com' has been blocked by CORS policy
  });
```

### 2. **Доступ к iframe контенту**

```javascript
// ❌ Заблокировано - разные origins
const iframe = document.getElementById('other-site-iframe');
const iframeWindow = iframe.contentWindow;
// Нельзя получить доступ к window другого origin
```

### 3. **Доступ к cookies**

```javascript
// ❌ Заблокировано - нельзя читать cookies другого origin
// Cookies доступны только для того же origin
```

### 4. **Доступ к localStorage/sessionStorage**

```javascript
// ❌ Заблокировано - нельзя получить доступ к storage другого origin
// localStorage изолирован по origin
```

## Что НЕ блокирует Same-Origin Policy?

Same-Origin Policy НЕ блокирует:

### 1. **Загрузка ресурсов**

```html
<!-- ✅ Разрешено - загрузка изображений, CSS, JS с любого origin -->
<img src="https://other-domain.com/image.jpg">
<link rel="stylesheet" href="https://other-domain.com/style.css">
<script src="https://other-domain.com/script.js"></script>
```

### 2. **Формы**

```html
<!-- ✅ Разрешено - отправка форм на любой origin -->
<form action="https://other-domain.com/submit" method="POST">
  <input name="data" value="test">
  <button type="submit">Отправить</button>
</form>
```

### 3. **Ссылки**

```html
<!-- ✅ Разрешено - переход по ссылкам на любой origin -->
<a href="https://other-domain.com">Перейти</a>
```

## CORS (Cross-Origin Resource Sharing)

CORS — это механизм, который позволяет серверу разрешить запросы с других origins.

### Как работает CORS:

1. Браузер отправляет preflight запрос (OPTIONS) для сложных запросов
2. Сервер отвечает заголовками CORS
3. Браузер проверяет заголовки и разрешает или блокирует запрос

### Заголовки CORS:

**На сервере:**
```javascript
// Express.js пример
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
```

**Разрешить все origins (небезопасно для production):**
```javascript
res.header('Access-Control-Allow-Origin', '*');
```

### Простые запросы (Simple Requests):

Некоторые запросы не требуют preflight:

```javascript
// Простой GET запрос
fetch('https://api.example.com/data')
  .then(response => response.json());

// Простой POST с application/x-www-form-urlencoded
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'key=value'
});
```

### Сложные запросы (Preflight Requests):

Требуют preflight запрос OPTIONS:

```javascript
// Сложный запрос - требует preflight
fetch('https://api.example.com/data', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ data: 'value' })
});
// Браузер сначала отправит OPTIONS запрос
```

## Обход Same-Origin Policy

### 1. **CORS (рекомендуется)**

Настроить сервер для разрешения запросов с других origins.

### 2. **JSONP (устаревший способ)**

```javascript
// JSONP - работает через <script> тег
function handleResponse(data) {
  console.log('Данные:', data);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.head.appendChild(script);
```

### 3. **Proxy сервер**

Использовать свой сервер как прокси для запросов к другому origin.

```javascript
// Запрос через свой сервер (proxy)
fetch('/api/proxy?url=https://other-domain.com/data')
  .then(response => response.json());
```

## Практические примеры

### Пример 1: CORS ошибка

```javascript
// Запрос к другому origin без CORS заголовков
fetch('https://api.other-domain.com/users')
  .then(response => response.json())
  .catch(error => {
    console.error('CORS error:', error);
    // Access to fetch at 'https://api.other-domain.com/users' 
    // from origin 'https://example.com' has been blocked by CORS policy
  });
```

### Пример 2: Правильная настройка CORS

**Сервер (Node.js/Express):**
```javascript
const express = require('express');
const app = express();

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://example.com',
    'https://www.example.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Иван' }]);
});
```

**Клиент:**
```javascript
// Теперь запрос работает
fetch('https://api.example.com/users', {
  credentials: 'include' // Для отправки cookies
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Пример 3: Работа с iframe

```javascript
// ✅ Одинаковый origin - доступ разрешен
const iframe = document.getElementById('same-origin-iframe');
const iframeWindow = iframe.contentWindow;
const iframeDocument = iframe.contentDocument;
// Можно получить доступ

// ❌ Разный origin - доступ заблокирован
const iframe2 = document.getElementById('other-origin-iframe');
try {
  const window = iframe2.contentWindow;
  // Может выбросить SecurityError
} catch (error) {
  console.error('Доступ заблокирован:', error);
}
```

## Безопасность

### Зачем нужна Same-Origin Policy?

1. **Защита от XSS** — предотвращение доступа к данным другого сайта
2. **Защита cookies** — предотвращение чтения cookies другого сайта
3. **Защита данных** — изоляция данных разных сайтов

### Пример атаки без Same-Origin Policy:

```javascript
// Без Same-Origin Policy злонамеренный сайт мог бы:
// 1. Загрузить iframe с банковским сайтом
// 2. Прочитать данные из iframe
// 3. Украсть конфиденциальную информацию
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте CORS правильно** — настраивайте на сервере
2. **Ограничивайте allowed origins** — не используйте '*' в production
3. **Используйте HTTPS** — для безопасности
4. **Валидируйте данные** — на сервере всегда

### ❌ Не делайте:

1. **Не отключайте CORS** — без необходимости
2. **Не используйте '*' для всех origins** — в production
3. **Не доверяйте клиенту** — всегда валидируйте на сервере
4. **Не используйте JSONP** — устаревший и небезопасный

## Заключение

Same-Origin Policy:

- **Механизм безопасности** — ограничивает доступ между разными origins
- **Определяется тремя компонентами** — протокол, домен, порт
- **Блокирует AJAX запросы** — к другим origins (без CORS)
- **CORS решает проблему** — разрешает запросы с других origins

**Помните:** Same-Origin Policy — это важный механизм безопасности браузера. Используйте CORS для разрешения запросов с других origins, но делайте это безопасно, ограничивая allowed origins и всегда валидируя данные на сервере.

