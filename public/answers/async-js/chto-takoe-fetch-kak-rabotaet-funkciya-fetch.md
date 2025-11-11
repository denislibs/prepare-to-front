# Что такое `fetch()`? Как работает функция `fetch()`?

`fetch()` — это современный веб-API для выполнения HTTP запросов в JavaScript. Это замена устаревшему `XMLHttpRequest` и предоставляет более простой и мощный способ работы с сетевыми запросами. Понимание `fetch()` критически важно для современной веб-разработки, так как это основной способ взаимодействия с серверами и API.

## Что такое fetch()?

`fetch()` — это глобальная функция (доступна в браузерах и Node.js с соответствующими библиотеками), которая возвращает промис, разрешающийся в объект `Response`, представляющий ответ на запрос.

### Характеристики:

- ✅ **Возвращает промис** — можно использовать с async/await
- ✅ **Современный API** — замена XMLHttpRequest
- ✅ **Поддержка промисов** — нативная поддержка
- ✅ **Гибкая настройка** — множество опций
- ✅ **Стандартный API** — работает везде

## Базовый синтаксис

### Простой GET запрос:

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Данные:', data);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
```

### С async/await:

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Данные:', data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
```

## Как работает fetch()?

### 1. **Создание запроса**

`fetch()` создает HTTP запрос и возвращает промис.

```javascript
const promise = fetch('/api/data');
// promise - это Promise<Response>
```

### 2. **Обработка ответа**

Промис разрешается в объект `Response`, который содержит информацию об ответе.

```javascript
fetch('/api/data')
  .then(response => {
    console.log(response.status); // HTTP статус код
    console.log(response.ok); // true если статус 200-299
    console.log(response.headers); // Заголовки ответа
    return response.json(); // Парсинг JSON
  });
```

### 3. **Парсинг данных**

Объект `Response` предоставляет методы для парсинга различных форматов данных.

```javascript
// JSON
const data = await response.json();

// Текст
const text = await response.text();

// Blob
const blob = await response.blob();

// ArrayBuffer
const buffer = await response.arrayBuffer();

// FormData
const formData = await response.formData();
```

## Параметры fetch()

### Первый параметр: URL

```javascript
// Строка URL
fetch('https://api.example.com/data');

// Объект URL
fetch(new URL('/api/data', window.location.origin));
```

### Второй параметр: опции

```javascript
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include'
});
```

## Основные опции

### method

HTTP метод запроса.

```javascript
fetch('/api/data', {
  method: 'GET' // GET, POST, PUT, DELETE, PATCH и т.д.
});
```

### headers

Заголовки запроса.

```javascript
fetch('/api/data', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value'
  }
});
```

### body

Тело запроса.

```javascript
// JSON
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John', age: 30 })
});

// FormData
const formData = new FormData();
formData.append('name', 'John');
formData.append('age', '30');

fetch('/api/data', {
  method: 'POST',
  body: formData
});

// Текст
fetch('/api/data', {
  method: 'POST',
  body: 'plain text data'
});
```

### mode

Режим запроса.

```javascript
fetch('/api/data', {
  mode: 'cors', // cors, no-cors, same-origin
});
```

### credentials

Включение cookies и авторизации.

```javascript
fetch('/api/data', {
  credentials: 'include' // include, same-origin, omit
});
```

### cache

Управление кешированием.

```javascript
fetch('/api/data', {
  cache: 'no-cache' // default, no-cache, reload, force-cache, only-if-cached
});
```

## Практические примеры

### Пример 1: GET запрос

```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error);
    throw error;
  }
}
```

### Пример 2: POST запрос

```javascript
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Ошибка создания пользователя:', error);
    throw error;
  }
}
```

### Пример 3: PUT запрос

```javascript
async function updateUser(userId, userData) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Ошибка обновления пользователя:', error);
    throw error;
  }
}
```

### Пример 4: DELETE запрос

```javascript
async function deleteUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    throw error;
  }
}
```

### Пример 5: Загрузка файла

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    throw error;
  }
}
```

### Пример 6: Запрос с авторизацией

```javascript
async function fetchProtectedData(token) {
  try {
    const response = await fetch('/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      throw new Error('Не авторизован');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка загрузки защищенных данных:', error);
    throw error;
  }
}
```

### Пример 7: Таймаут запроса

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Таймаут')), timeout)
    )
  ]);
}

async function fetchData() {
  try {
    const response = await fetchWithTimeout('/api/data', 3000);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Таймаут') {
      console.error('Запрос превысил время ожидания');
    } else {
      console.error('Ошибка:', error);
    }
    throw error;
  }
}
```

### Пример 8: Отмена запроса

```javascript
async function fetchWithAbort(url) {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const fetchPromise = fetch(url, { signal });
  
  // Отмена через 5 секунд
  setTimeout(() => controller.abort(), 5000);
  
  try {
    const response = await fetchPromise;
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Запрос отменен');
    } else {
      console.error('Ошибка:', error);
    }
    throw error;
  }
}
```

## Обработка ошибок

### Проверка статуса ответа:

```javascript
async function fetchData() {
  const response = await fetch('/api/data');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
```

### Обработка различных статусов:

```javascript
async function fetchData() {
  const response = await fetch('/api/data');
  
  switch (response.status) {
    case 200:
      return await response.json();
    case 404:
      throw new Error('Ресурс не найден');
    case 500:
      throw new Error('Ошибка сервера');
    default:
      throw new Error(`Неожиданный статус: ${response.status}`);
  }
}
```

## Особенности fetch()

### 1. **Не отклоняет промис при HTTP ошибках**

`fetch()` не отклоняет промис при HTTP ошибках (4xx, 5xx). Нужно проверять `response.ok`.

```javascript
// ❌ Неправильно
fetch('/api/data')
  .then(response => response.json())
  .catch(error => {
    // Не сработает для HTTP ошибок
  });

// ✅ Правильно
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    // Сработает для всех ошибок
  });
```

### 2. **Не отправляет cookies по умолчанию**

Нужно явно указать `credentials: 'include'`.

```javascript
fetch('/api/data', {
  credentials: 'include' // Отправляет cookies
});
```

### 3. **CORS**

`fetch()` следует правилам CORS. Для cross-origin запросов нужны правильные заголовки на сервере.

## Лучшие практики

### ✅ Делайте:

1. **Проверяйте response.ok** — для HTTP ошибок
2. **Обрабатывайте ошибки** — всегда используйте try/catch
3. **Используйте async/await** — для читаемости
4. **Проверяйте Content-Type** — перед парсингом
5. **Используйте таймауты** — для долгих запросов
6. **Отменяйте запросы** — при необходимости

### ❌ Не делайте:

1. **Не забывайте проверять статус** — response.ok или response.status
2. **Не игнорируйте ошибки** — всегда обрабатывайте
3. **Не парсите без проверки** — проверяйте Content-Type
4. **Не создавайте утечки** — отменяйте ненужные запросы

## Заключение

`fetch()`:

- **Современный API** — для HTTP запросов
- **Возвращает промис** — можно использовать с async/await
- **Гибкая настройка** — множество опций
- **Не отклоняет при HTTP ошибках** — нужно проверять response.ok
- **Следует CORS** — правила cross-origin запросов

**Помните:** `fetch()` — это мощный и гибкий инструмент для работы с HTTP запросами. Всегда проверяйте `response.ok` для HTTP ошибок, обрабатывайте ошибки, используйте async/await для читаемости и добавляйте таймауты для долгих запросов. Правильное использование `fetch()` делает работу с API простой и эффективной.

