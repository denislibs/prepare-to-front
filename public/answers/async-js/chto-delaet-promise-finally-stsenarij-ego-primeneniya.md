# Что делает `Promise.finally()`? Сценарий его применения?

`Promise.finally()` — это метод промисов, который выполняет код независимо от того, был ли промис выполнен успешно или отклонен. Это аналог блока `finally` в конструкциях `try/catch/finally`. Понимание `Promise.finally()` критически важно для написания чистого кода, который правильно обрабатывает завершение асинхронных операций, независимо от их результата.

## Что такое Promise.finally()?

`Promise.finally()` — это метод, который выполняется после завершения промиса, независимо от того, был ли он выполнен успешно (`fulfilled`) или отклонен (`rejected`). Это идеальное место для кода очистки, логирования и других операций, которые должны выполняться в любом случае.

### Характеристики:

- ✅ **Выполняется всегда** — независимо от результата
- ✅ **Не получает аргументы** — не знает о результате
- ✅ **Возвращает промис** — можно цепочкой
- ✅ **Для очистки** — идеально для cleanup кода

### Синтаксис:

```javascript
promise
  .then(result => {
    // Успешное выполнение
  })
  .catch(error => {
    // Обработка ошибки
  })
  .finally(() => {
    // Выполнится в любом случае
  });
```

## Как работает Promise.finally()?

### Базовый пример:

```javascript
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .catch(error => {
      console.error('Ошибка:', error);
      throw error;
    })
    .finally(() => {
      console.log('Запрос завершен'); // Выполнится всегда
    });
}
```

### Поведение:

```javascript
// Успешное выполнение
Promise.resolve('Успех')
  .then(result => console.log(result)) // 'Успех'
  .finally(() => console.log('Завершено')); // 'Завершено'

// Отклонение
Promise.reject('Ошибка')
  .catch(error => console.error(error)) // 'Ошибка'
  .finally(() => console.log('Завершено')); // 'Завершено'
```

## Практические сценарии применения

### Сценарий 1: Скрытие индикатора загрузки

```javascript
async function loadData() {
  showLoadingIndicator(); // Показать индикатор
  
  try {
    const data = await fetch('/api/data').then(r => r.json());
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  } finally {
    hideLoadingIndicator(); // Скрыть в любом случае
  }
}

// Или с промисами
function loadData() {
  showLoadingIndicator();
  
  return fetch('/api/data')
    .then(response => response.json())
    .catch(error => {
      console.error('Ошибка:', error);
      throw error;
    })
    .finally(() => {
      hideLoadingIndicator(); // Всегда скрываем
    });
}
```

### Сценарий 2: Закрытие соединений и очистка ресурсов

```javascript
async function processWithConnection() {
  let connection = null;
  
  try {
    connection = await openConnection();
    const data = await fetchData(connection);
    return await processData(data);
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  } finally {
    if (connection) {
      await closeConnection(connection); // Всегда закрываем
    }
  }
}

// Или с промисами
function processWithConnection() {
  let connection = null;
  
  return openConnection()
    .then(conn => {
      connection = conn;
      return fetchData(conn);
    })
    .then(data => processData(data))
    .catch(error => {
      console.error('Ошибка:', error);
      throw error;
    })
    .finally(() => {
      if (connection) {
        return closeConnection(connection); // Всегда закрываем
      }
    });
}
```

### Сценарий 3: Сброс состояния формы

```javascript
async function submitForm(formData) {
  setFormSubmitting(true); // Установить состояние отправки
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки');
    }
    
    return await response.json();
  } catch (error) {
    showErrorMessage(error.message);
    throw error;
  } finally {
    setFormSubmitting(false); // Всегда сбрасываем состояние
  }
}
```

### Сценарий 4: Логирование завершения операций

```javascript
function performOperation(operationId) {
  const startTime = Date.now();
  
  return executeOperation(operationId)
    .then(result => {
      logSuccess(operationId, result);
      return result;
    })
    .catch(error => {
      logError(operationId, error);
      throw error;
    })
    .finally(() => {
      const duration = Date.now() - startTime;
      logCompletion(operationId, duration); // Всегда логируем
    });
}
```

### Сценарий 5: Отмена таймера

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  let timeoutId = null;
  
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Таймаут'));
      }, timeout);
    })
  ])
    .then(response => response.json())
    .catch(error => {
      console.error('Ошибка:', error);
      throw error;
    })
    .finally(() => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Всегда очищаем таймер
      }
    });
}
```

### Сценарий 6: Сброс флагов и переменных

```javascript
class DataLoader {
  constructor() {
    this.isLoading = false;
    this.currentRequest = null;
  }
  
  async loadData() {
    this.isLoading = true;
    
    try {
      this.currentRequest = fetch('/api/data');
      const response = await this.currentRequest;
      return await response.json();
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    } finally {
      this.isLoading = false;
      this.currentRequest = null; // Всегда сбрасываем
    }
  }
}
```

### Сценарий 7: Очистка подписок

```javascript
function subscribeToUpdates(callback) {
  let subscription = null;
  
  return connect()
    .then(connection => {
      subscription = connection.subscribe(callback);
      return subscription;
    })
    .catch(error => {
      console.error('Ошибка подключения:', error);
      throw error;
    })
    .finally(() => {
      // Если нужно очистить при ошибке
      // if (subscription && !subscription.active) {
      //   subscription.unsubscribe();
      // }
    });
}
```

### Сценарий 8: Сброс счетчиков и метрик

```javascript
function trackOperation(operationName) {
  let startTime = Date.now();
  let attemptCount = 0;
  
  return retryOperation(operationName)
    .then(result => {
      trackSuccess(operationName, Date.now() - startTime);
      return result;
    })
    .catch(error => {
      trackFailure(operationName, error);
      throw error;
    })
    .finally(() => {
      // Всегда сбрасываем метрики
      resetMetrics(operationName);
      attemptCount = 0;
    });
}
```

## Особенности Promise.finally()

### 1. **Не получает аргументы**

`finally()` не получает результат или ошибку.

```javascript
Promise.resolve('Успех')
  .finally((value) => {
    console.log(value); // undefined - не получает значение
  });

Promise.reject('Ошибка')
  .finally((error) => {
    console.log(error); // undefined - не получает ошибку
  });
```

### 2. **Возвращает промис**

`finally()` возвращает промис, который разрешается с тем же значением или отклоняется с той же ошибкой.

```javascript
Promise.resolve('Успех')
  .finally(() => {
    return 'Новое значение'; // Игнорируется
  })
  .then(value => {
    console.log(value); // 'Успех' - исходное значение сохраняется
  });

Promise.reject('Ошибка')
  .finally(() => {
    // Можно вернуть значение, но оно игнорируется
  })
  .catch(error => {
    console.log(error); // 'Ошибка' - исходная ошибка сохраняется
  });
```

### 3. **Может вернуть промис**

Если `finally()` возвращает отклоненный промис, он переопределит результат.

```javascript
Promise.resolve('Успех')
  .finally(() => {
    return Promise.reject('Ошибка в finally'); // Переопределит результат
  })
  .then(value => {
    // Не выполнится
  })
  .catch(error => {
    console.log(error); // 'Ошибка в finally'
  });
```

### 4. **Выполняется после then/catch**

`finally()` выполняется после всех `then` и `catch`.

```javascript
Promise.resolve('Успех')
  .then(value => {
    console.log('Then:', value); // 'Then: Успех'
    return value;
  })
  .catch(error => {
    console.log('Catch:', error); // Не выполнится
  })
  .finally(() => {
    console.log('Finally'); // 'Finally' - после then
  });
```

## Сравнение с try/catch/finally

### С async/await:

```javascript
async function example() {
  try {
    const result = await operation();
    return result;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  } finally {
    // Очистка
    cleanup();
  }
}
```

### С промисами:

```javascript
function example() {
  return operation()
    .then(result => result)
    .catch(error => {
      console.error('Ошибка:', error);
      throw error;
    })
    .finally(() => {
      // Очистка
      cleanup();
    });
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте finally()** — для очистки ресурсов
2. **Сбрасывайте состояние** — флаги, индикаторы
3. **Закрывайте соединения** — в finally
4. **Логируйте завершение** — независимо от результата
5. **Очищайте таймеры** — в finally

### ❌ Не делайте:

1. **Не обрабатывайте ошибки в finally** — используйте catch
2. **Не возвращайте значения** — они игнорируются
3. **Не создавайте новые ошибки** — если не нужно переопределить результат
4. **Не делайте долгие операции** — finally должен быть быстрым

## Заключение

Promise.finally():

- **Выполняется всегда** — независимо от результата
- **Для очистки** — идеально для cleanup кода
- **Не получает аргументы** — не знает о результате
- **Возвращает промис** — можно цепочкой
- **Полезен для** — скрытия индикаторов, закрытия соединений, сброса состояния

**Помните:** `Promise.finally()` — это мощный инструмент для написания чистого кода, который правильно обрабатывает завершение асинхронных операций. Используйте `finally()` для очистки ресурсов, сброса состояния, закрытия соединений и других операций, которые должны выполняться независимо от результата промиса. Это делает код более надежным и предсказуемым.

