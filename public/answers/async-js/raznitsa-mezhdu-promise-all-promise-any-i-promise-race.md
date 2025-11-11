# Разница между `Promise.all()`, `Promise.any()` и `Promise.race()`?

`Promise.all()`, `Promise.any()` и `Promise.race()` — это статические методы класса Promise, которые позволяют работать с несколькими промисами одновременно. Каждый метод имеет свою логику выполнения и использования. Понимание различий между этими методами критически важно для правильного выбора подхода при работе с множественными асинхронными операциями.

## Promise.all()

`Promise.all()` ожидает выполнения всех промисов и возвращает массив результатов в том же порядке, в котором были переданы промисы.

### Характеристики:

- ✅ **Ожидает все промисы** — все должны выполниться
- ✅ **Возвращает массив** — результаты в том же порядке
- ✅ **Отклоняется при первой ошибке** — если один отклонен, весь Promise.all отклоняется
- ✅ **Все или ничего** — либо все успешны, либо ошибка

### Синтаксис:

```javascript
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // results - массив результатов
  })
  .catch(error => {
    // Первая ошибка
  });
```

### Примеры:

```javascript
// Пример 1: Все успешны
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
])
  .then(responses => {
    // Все запросы успешны
    return Promise.all(responses.map(r => r.json()));
  })
  .then(([users, posts, comments]) => {
    console.log('Все данные:', { users, posts, comments });
  })
  .catch(error => {
    console.error('Один из запросов не удался:', error);
  });

// Пример 2: Один отклонен - весь Promise.all отклоняется
Promise.all([
  Promise.resolve('Успех 1'),
  Promise.reject('Ошибка'),
  Promise.resolve('Успех 3')
])
  .then(results => {
    // Не выполнится
  })
  .catch(error => {
    console.error('Ошибка:', error); // 'Ошибка'
  });
```

### Когда использовать:

- Когда нужны все результаты
- Когда порядок результатов важен
- Когда один неуспешный промис должен отменить все

```javascript
// Загрузка всех необходимых данных
async function loadDashboard() {
  try {
    const [user, settings, notifications] = await Promise.all([
      fetchUser(),
      fetchSettings(),
      fetchNotifications()
    ]);
    renderDashboard(user, settings, notifications);
  } catch (error) {
    showError('Не удалось загрузить данные');
  }
}
```

## Promise.race()

`Promise.race()` возвращает результат первого выполненного промиса (успешного или отклоненного).

### Характеристики:

- ✅ **Первый выполненный** — неважно успех или ошибка
- ✅ **Остальные игнорируются** — после первого результата
- ✅ **Быстрый ответ** — для таймаутов и конкурентных операций
- ✅ **Один результат** — не массив

### Синтаксис:

```javascript
Promise.race([promise1, promise2, promise3])
  .then(result => {
    // Результат первого выполненного
  })
  .catch(error => {
    // Ошибка первого выполненного (если он был отклонен)
  });
```

### Примеры:

```javascript
// Пример 1: Таймаут
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Таймаут')), timeout)
    )
  ]);
}

fetchWithTimeout('/api/data')
  .then(response => response.json())
  .then(data => console.log('Данные:', data))
  .catch(error => {
    if (error.message === 'Таймаут') {
      console.error('Запрос превысил время ожидания');
    } else {
      console.error('Ошибка:', error);
    }
  });

// Пример 2: Первый успешный источник
Promise.race([
  fetchFromSource1(),
  fetchFromSource2(),
  fetchFromSource3()
])
  .then(data => {
    console.log('Данные из первого источника:', data);
  })
  .catch(error => {
    console.error('Все источники не удались:', error);
  });
```

### Когда использовать:

- Таймауты для операций
- Конкурентные источники данных
- Первый доступный ресурс

```javascript
// Таймаут для операции
async function operationWithTimeout(operation, timeout) {
  try {
    const result = await Promise.race([
      operation(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Таймаут')), timeout)
      )
    ]);
    return result;
  } catch (error) {
    if (error.message === 'Таймаут') {
      throw new Error('Операция превысила время ожидания');
    }
    throw error;
  }
}
```

## Promise.any()

`Promise.any()` возвращает результат первого успешного промиса. Отклоняется только если все промисы отклонены.

### Характеристики:

- ✅ **Первый успешный** — только успешные промисы
- ✅ **Игнорирует ошибки** — до первого успеха
- ✅ **Отклоняется если все отклонены** — AggregateError со всеми ошибками
- ✅ **Один результат** — не массив

### Синтаксис:

```javascript
Promise.any([promise1, promise2, promise3])
  .then(result => {
    // Результат первого успешного
  })
  .catch(error => {
    // Все отклонены - AggregateError
  });
```

### Примеры:

```javascript
// Пример 1: Первый успешный источник
Promise.any([
  fetchFromPrimarySource(),
  fetchFromSecondarySource(),
  fetchFromTertiarySource()
])
  .then(data => {
    console.log('Данные из первого успешного источника:', data);
  })
  .catch(error => {
    console.error('Все источники не удались:', error);
    // error - AggregateError с массивом всех ошибок
  });

// Пример 2: Резервные источники
async function fetchDataWithFallback() {
  try {
    const data = await Promise.any([
      fetchFromAPI(),
      fetchFromCache(),
      fetchFromLocalStorage()
    ]);
    return data;
  } catch (error) {
    // Все источники не удались
    throw new Error('Не удалось получить данные ни из одного источника');
  }
}
```

### Когда использовать:

- Резервные источники данных
- Первый доступный сервис
- Fallback стратегии

```javascript
// Резервные источники данных
async function getUserData(userId) {
  try {
    const data = await Promise.any([
      fetchFromDatabase(userId),
      fetchFromCache(userId),
      fetchFromBackup(userId)
    ]);
    return data;
  } catch (error) {
    // Все источники не удались
    return getDefaultUserData();
  }
}
```

## Сравнительная таблица

| Метод | Поведение | Успех | Ошибка | Результат |
|-------|-----------|-------|--------|-----------|
| **Promise.all()** | Ожидает все | Все успешны | Первая ошибка отклоняет все | Массив результатов |
| **Promise.race()** | Первый выполненный | Первый успешный | Первая ошибка | Один результат |
| **Promise.any()** | Первый успешный | Первый успешный | Все отклонены | Один результат |

## Визуализация различий

### Promise.all():

```
Promise1 ──┐
Promise2 ──┼──> [Result1, Result2, Result3] (все должны быть успешны)
Promise3 ──┘
```

### Promise.race():

```
Promise1 ──┐
Promise2 ──┼──> Первый выполненный (успех или ошибка)
Promise3 ──┘
```

### Promise.any():

```
Promise1 ──┐
Promise2 ──┼──> Первый успешный (игнорирует ошибки)
Promise3 ──┘
```

## Практические примеры

### Пример 1: Promise.all() - Загрузка всех данных

```javascript
async function loadCompleteData() {
  try {
    const [user, posts, comments, likes] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments(),
      fetchLikes()
    ]);
    
    return {
      user,
      posts,
      comments,
      likes
    };
  } catch (error) {
    console.error('Не удалось загрузить все данные:', error);
    throw error;
  }
}
```

### Пример 2: Promise.race() - Таймаут

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Таймаут')), timeout)
  );
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Использование
fetchWithTimeout('/api/data', 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.message === 'Таймаут') {
      console.error('Запрос превысил 3 секунды');
    }
  });
```

### Пример 3: Promise.any() - Резервные источники

```javascript
async function fetchUserWithFallback(userId) {
  try {
    const user = await Promise.any([
      fetchFromPrimaryDB(userId),
      fetchFromSecondaryDB(userId),
      fetchFromCache(userId)
    ]);
    return user;
  } catch (error) {
    // Все источники не удались
    console.error('Все источники недоступны:', error);
    return getDefaultUser();
  }
}
```

### Пример 4: Комбинирование методов

```javascript
async function loadDataWithStrategy() {
  try {
    // Пытаемся загрузить из всех источников параллельно
    const data = await Promise.any([
      // Основной источник с таймаутом
      Promise.race([
        fetchFromAPI(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Таймаут API')), 2000)
        )
      ]),
      // Резервный источник
      fetchFromCache(),
      // Локальный источник
      fetchFromLocalStorage()
    ]);
    
    return data;
  } catch (error) {
    // Все стратегии не удались
    return getDefaultData();
  }
}
```

## Обработка ошибок

### Promise.all():

```javascript
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // Все успешны
  })
  .catch(error => {
    // Первая ошибка - остальные результаты теряются
    console.error('Ошибка:', error);
  });
```

### Promise.race():

```javascript
Promise.race([promise1, promise2, promise3])
  .then(result => {
    // Первый успешный
  })
  .catch(error => {
    // Первая ошибка (если первый был отклонен)
    console.error('Ошибка:', error);
  });
```

### Promise.any():

```javascript
Promise.any([promise1, promise2, promise3])
  .then(result => {
    // Первый успешный
  })
  .catch(error => {
    // Все отклонены - AggregateError
    console.error('Все промисы отклонены:', error);
    console.error('Ошибки:', error.errors); // Массив всех ошибок
  });
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Promise.all()** — когда нужны все результаты
2. **Используйте Promise.race()** — для таймаутов
3. **Используйте Promise.any()** — для резервных источников
4. **Обрабатывайте ошибки** — всегда используйте .catch()

### ❌ Не делайте:

1. **Не используйте Promise.race()** — для критичных данных (может вернуть ошибку)
2. **Не забывайте про ошибки** — всегда обрабатывайте
3. **Не смешивайте логику** — используйте правильный метод для задачи

## Заключение

Разница между методами:

- **Promise.all()** — все промисы должны быть успешны, возвращает массив
- **Promise.race()** — первый выполненный (успех или ошибка)
- **Promise.any()** — первый успешный, игнорирует ошибки

**Помните:** выбор метода зависит от задачи. Используйте Promise.all() для всех результатов, Promise.race() для таймаутов, Promise.any() для резервных источников. Всегда обрабатывайте ошибки и выбирайте правильный метод для вашей задачи.

