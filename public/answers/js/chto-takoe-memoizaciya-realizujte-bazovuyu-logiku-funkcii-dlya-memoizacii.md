# Что такое мемоизация? Реализуйте базовую логику функции для мемоизации?

Мемоизация — это техника оптимизации, которая кеширует результаты выполнения функции для избежания повторных вычислений с теми же аргументами. Понимание мемоизации критически важно для оптимизации производительности функций, особенно тех, которые выполняют дорогие вычисления или часто вызываются с одинаковыми аргументами.

## Что такое мемоизация?

Мемоизация — это паттерн оптимизации, при котором результаты выполнения функции сохраняются в кеше (обычно в объекте или Map), и при повторном вызове функции с теми же аргументами результат берется из кеша вместо повторного вычисления.

### Характеристики:

- ✅ **Кеширование результатов** — сохранение результатов вычислений
- ✅ **Избежание повторных вычислений** — для одинаковых аргументов
- ✅ **Улучшение производительности** — особенно для дорогих операций
- ✅ **Торговля памятью на скорость** — использует память для кеша

## Зачем нужна мемоизация?

### Преимущества:

1. **Производительность** — избежание повторных вычислений
2. **Оптимизация** — для рекурсивных и дорогих функций
3. **Кеширование** — результатов сложных вычислений

### Пример без мемоизации:

```javascript
function expensiveCalculation(n) {
  console.log("Вычисление...");
  // Долгая операция
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
}

expensiveCalculation(5); // "Вычисление..." (долго)
expensiveCalculation(5); // "Вычисление..." (снова долго)
expensiveCalculation(5); // "Вычисление..." (снова долго)
```

## Базовая реализация мемоизации

### Простая версия:

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      return cache[key];
    }
    
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Использование
const expensiveFunction = memoize(function(n) {
  console.log("Вычисление...");
  return n * n;
});

console.log(expensiveFunction(5)); // "Вычисление..." 25
console.log(expensiveFunction(5)); // 25 (из кеша, без "Вычисление...")
console.log(expensiveFunction(3)); // "Вычисление..." 9
console.log(expensiveFunction(3)); // 9 (из кеша)
```

## Улучшенная реализация

### С использованием Map:

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

### С обработкой ошибок:

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    try {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      // Ошибки не кешируются
      throw error;
    }
  };
}
```

### С ограничением размера кеша:

```javascript
function memoize(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Переместить в конец (LRU)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    
    // Удалить старые записи если кеш переполнен
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}
```

## Практические примеры

### Пример 1: Факториал

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const memoizedFactorial = memoize(factorial);

console.log(memoizedFactorial(5)); // Вычисление
console.log(memoizedFactorial(5)); // Из кеша
console.log(memoizedFactorial(6)); // Вычисление (частично использует кеш)
```

### Пример 2: Фибоначчи

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Без мемоизации - очень медленно
// fibonacci(40) может занять секунды

const memoizedFibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log(memoizedFibonacci(40)); // Быстро благодаря мемоизации
```

### Пример 3: HTTP запросы

```javascript
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

const memoizedFetch = memoize(fetchUserData);

// Первый вызов - реальный запрос
await memoizedFetch(1);

// Повторный вызов - из кеша
await memoizedFetch(1);
```

### Пример 4: Сложные вычисления

```javascript
function complexCalculation(a, b, c) {
  console.log("Сложное вычисление...");
  // Долгая операция
  return a * b * c + Math.sqrt(a + b + c);
}

const memoized = memoize(complexCalculation);

console.log(memoized(1, 2, 3)); // "Сложное вычисление..." результат
console.log(memoized(1, 2, 3)); // результат (из кеша)
```

## Проблемы и ограничения

### 1. **Порядок аргументов**

```javascript
// JSON.stringify может быть проблемой для объектов
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 2, a: 1 };

// Разные ключи, хотя объекты эквивалентны
JSON.stringify(obj1); // '{"a":1,"b":2}'
JSON.stringify(obj2); // '{"b":2,"a":1}'
```

### 2. **Функции и циклические ссылки**

```javascript
// JSON.stringify не работает с функциями и циклическими ссылками
const obj = {
  fn: function() {},
  self: null
};
obj.self = obj;

// JSON.stringify(obj); // Ошибка
```

### 3. **Память**

```javascript
// Кеш может расти бесконечно
// Нужно ограничение размера или TTL (time to live)
```

## Улучшенная версия с кастомным ключом

```javascript
function memoize(fn, keyGenerator) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyGenerator 
      ? keyGenerator(...args)
      : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// С кастомным генератором ключей
const memoized = memoize(
  function(a, b) { return a + b; },
  (a, b) => `${a}-${b}` // Кастомный ключ
);
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для дорогих операций** — вычисления, запросы
2. **Используйте для чистых функций** — одинаковые аргументы = одинаковый результат
3. **Ограничивайте размер кеша** — для управления памятью
4. **Используйте Map** — для лучшей производительности

### ❌ Не делайте:

1. **Не используйте для нечистых функций** — функции с побочными эффектами
2. **Не используйте для функций с разными результатами** — случайные значения, время
3. **Не забывайте про память** — ограничивайте размер кеша
4. **Не используйте для простых функций** — overhead может быть больше выгоды

## Заключение

Мемоизация:

- **Кеширование результатов** — сохранение результатов вычислений
- **Избежание повторных вычислений** — для одинаковых аргументов
- **Улучшение производительности** — особенно для дорогих операций
- **Торговля памятью на скорость** — использует память для кеша

**Помните:** мемоизация — это мощная техника оптимизации для функций, которые часто вызываются с одинаковыми аргументами. Используйте мемоизацию для чистых функций с дорогими вычислениями, ограничивайте размер кеша для управления памятью, и понимайте ограничения (функции, циклические ссылки, порядок свойств объектов).

