# Расскажите про статический метод `.allSettled()`?

`Promise.allSettled()` — это статический метод класса Promise, который ожидает выполнения всех промисов независимо от их результата (успех или ошибка). В отличие от `Promise.all()`, который отклоняется при первой ошибке, `Promise.allSettled()` всегда выполняется успешно и возвращает информацию о статусе каждого промиса. Понимание `Promise.allSettled()` критически важно для сценариев, когда нужно получить результаты всех операций, даже если некоторые из них завершились ошибкой.

## Что такое Promise.allSettled()?

`Promise.allSettled()` возвращает промис, который выполняется после завершения всех переданных промисов, независимо от того, были ли они успешными или отклоненными. Результат — массив объектов с информацией о статусе каждого промиса.

### Характеристики:

- ✅ **Ожидает все промисы** — все должны завершиться
- ✅ **Не отклоняется** — всегда выполняется успешно
- ✅ **Возвращает статусы** — информация о каждом промисе
- ✅ **Полезно для отчетов** — когда нужны все результаты

### Синтаксис:

```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    // results - массив объектов с статусами
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Успех:', result.value);
      } else {
        console.log('Ошибка:', result.reason);
      }
    });
  });
```

## Структура результата

Каждый элемент массива результатов имеет следующую структуру:

### Успешный промис:

```javascript
{
  status: 'fulfilled',
  value: <результат промиса>
}
```

### Отклоненный промис:

```javascript
{
  status: 'rejected',
  reason: <причина отклонения>
}
```

## Базовые примеры

### Пример 1: Смешанные результаты

```javascript
Promise.allSettled([
  Promise.resolve('Успех 1'),
  Promise.reject('Ошибка 1'),
  Promise.resolve('Успех 2'),
  Promise.reject('Ошибка 2')
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Промис ${index}: Успех -`, result.value);
      } else {
        console.log(`Промис ${index}: Ошибка -`, result.reason);
      }
    });
  });

// Вывод:
// Промис 0: Успех - Успех 1
// Промис 1: Ошибка - Ошибка 1
// Промис 2: Успех - Успех 2
// Промис 3: Ошибка - Ошибка 2
```

### Пример 2: HTTP запросы

```javascript
async function fetchMultipleUrls(urls) {
  const promises = urls.map(url =>
    fetch(url)
      .then(response => response.json())
      .catch(error => ({ error: error.message }))
  );
  
  const results = await Promise.allSettled(promises);
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  
  const failed = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason);
  
  return {
    successful,
    failed,
    total: results.length,
    successCount: successful.length,
    failureCount: failed.length
  };
}

// Использование
fetchMultipleUrls([
  '/api/users',
  '/api/posts',
  '/api/comments',
  '/api/invalid'
])
  .then(report => {
    console.log('Успешных:', report.successCount);
    console.log('Неудачных:', report.failureCount);
    console.log('Данные:', report.successful);
  });
```

## Практические примеры

### Пример 1: Загрузка данных с обработкой ошибок

```javascript
async function loadAllData() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
    fetchSettings()
  ]);
  
  const data = {
    user: null,
    posts: null,
    comments: null,
    settings: null,
    errors: []
  };
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      switch (index) {
        case 0: data.user = result.value; break;
        case 1: data.posts = result.value; break;
        case 2: data.comments = result.value; break;
        case 3: data.settings = result.value; break;
      }
    } else {
      data.errors.push({
        index,
        error: result.reason
      });
    }
  });
  
  return data;
}
```

### Пример 2: Валидация данных

```javascript
async function validateAllFields(fields) {
  const validations = fields.map(field =>
    validateField(field)
      .then(() => ({ field, valid: true }))
      .catch(error => ({ field, valid: false, error: error.message }))
  );
  
  const results = await Promise.allSettled(validations);
  
  const report = {
    valid: [],
    invalid: []
  };
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const validation = result.value;
      if (validation.valid) {
        report.valid.push(validation.field);
      } else {
        report.invalid.push(validation);
      }
    } else {
      report.invalid.push({
        field: 'unknown',
        valid: false,
        error: result.reason.message
      });
    }
  });
  
  return report;
}
```

### Пример 3: Отправка уведомлений

```javascript
async function sendNotificationsToAll(users, message) {
  const notifications = users.map(user =>
    sendNotification(user.id, message)
      .then(() => ({ user: user.id, status: 'sent' }))
      .catch(error => ({ user: user.id, status: 'failed', error: error.message }))
  );
  
  const results = await Promise.allSettled(notifications);
  
  const report = {
    sent: 0,
    failed: 0,
    details: []
  };
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const notification = result.value;
      if (notification.status === 'sent') {
        report.sent++;
      } else {
        report.failed++;
      }
      report.details.push(notification);
    } else {
      report.failed++;
      report.details.push({
        user: 'unknown',
        status: 'failed',
        error: result.reason.message
      });
    }
  });
  
  return report;
}
```

### Пример 4: Обработка файлов

```javascript
async function processFiles(files) {
  const processes = files.map(file =>
    processFile(file)
      .then(result => ({ file: file.name, success: true, result }))
      .catch(error => ({ file: file.name, success: false, error: error.message }))
  );
  
  const results = await Promise.allSettled(processes);
  
  const summary = {
    processed: [],
    failed: [],
    total: files.length
  };
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const process = result.value;
      if (process.success) {
        summary.processed.push(process);
      } else {
        summary.failed.push(process);
      }
    } else {
      summary.failed.push({
        file: 'unknown',
        success: false,
        error: result.reason.message
      });
    }
  });
  
  return summary;
}
```

## Сравнение с другими методами

### Promise.all() vs Promise.allSettled()

```javascript
// Promise.all() - отклоняется при первой ошибке
Promise.all([
  Promise.resolve('Успех 1'),
  Promise.reject('Ошибка'),
  Promise.resolve('Успех 2')
])
  .then(results => {
    // Не выполнится
  })
  .catch(error => {
    console.error('Ошибка:', error); // 'Ошибка'
    // Результаты 'Успех 1' и 'Успех 2' теряются
  });

// Promise.allSettled() - возвращает все результаты
Promise.allSettled([
  Promise.resolve('Успех 1'),
  Promise.reject('Ошибка'),
  Promise.resolve('Успех 2')
])
  .then(results => {
    // Всегда выполнится
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 'Успех 1' },
    //   { status: 'rejected', reason: 'Ошибка' },
    //   { status: 'fulfilled', value: 'Успех 2' }
    // ]
  });
```

## Вспомогательные функции

### Функция для обработки результатов:

```javascript
function processSettledResults(results) {
  return {
    fulfilled: results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value),
    rejected: results
      .filter(r => r.status === 'rejected')
      .map(r => r.reason),
    stats: {
      total: results.length,
      fulfilled: results.filter(r => r.status === 'fulfilled').length,
      rejected: results.filter(r => r.status === 'rejected').length
    }
  };
}

// Использование
Promise.allSettled([promise1, promise2, promise3])
  .then(processSettledResults)
  .then(({ fulfilled, rejected, stats }) => {
    console.log('Успешных:', stats.fulfilled);
    console.log('Неудачных:', stats.rejected);
    console.log('Данные:', fulfilled);
  });
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте allSettled()** — когда нужны все результаты
2. **Обрабатывайте статусы** — проверяйте status каждого результата
3. **Извлекайте значения** — используйте value для fulfilled, reason для rejected
4. **Создавайте отчеты** — группируйте успешные и неудачные результаты

### ❌ Не делайте:

1. **Не используйте для критичных операций** — если нужны все успешные, используйте Promise.all()
2. **Не забывайте обрабатывать** — всегда проверяйте статусы
3. **Не смешивайте с Promise.all()** — используйте правильный метод для задачи

## Заключение

Promise.allSettled():

- **Ожидает все промисы** — независимо от результата
- **Всегда выполняется успешно** — не отклоняется
- **Возвращает статусы** — информация о каждом промисе
- **Полезно для отчетов** — когда нужны все результаты

**Помните:** используйте `Promise.allSettled()` когда нужно получить результаты всех операций, даже если некоторые завершились ошибкой. Это особенно полезно для валидации, отправки уведомлений, обработки файлов и других сценариев, где частичные результаты важны.

