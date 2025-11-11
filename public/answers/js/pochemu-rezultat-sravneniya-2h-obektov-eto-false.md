# Почему результат сравнения 2х объектов это `false`?

Сравнение объектов в JavaScript всегда возвращает `false`, даже если объекты имеют одинаковые свойства и значения. Это происходит потому, что объекты сравниваются по ссылке, а не по значению. Понимание этого поведения критически важно для правильной работы с объектами и избежания распространенных ошибок.

## Почему объекты сравниваются как false?

### Причина: сравнение по ссылке

В JavaScript объекты сравниваются по ссылке (reference), а не по значению (value). Два объекта считаются равными только если они ссылаются на один и тот же объект в памяти.

```javascript
const obj1 = { name: "John" };
const obj2 = { name: "John" };

console.log(obj1 === obj2); // false
console.log(obj1 == obj2); // false

// Почему? Потому что это разные объекты в памяти
// obj1 и obj2 - это разные ссылки на разные объекты
```

## Как работает сравнение объектов?

### Строгое сравнение (===)

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1; // Та же ссылка

console.log(obj1 === obj2); // false (разные объекты)
console.log(obj1 === obj3); // true (одна и та же ссылка)
```

### Нестрогое сравнение (==)

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };

console.log(obj1 == obj2); // false (тоже сравнивает ссылки)
```

## Визуализация

```
Память:
┌─────────────┐
│ obj1 ──────>│ { name: "John" }
└─────────────┘

┌─────────────┐
│ obj2 ──────>│ { name: "John" }
└─────────────┘

Разные объекты в памяти = разные ссылки = false при сравнении
```

## Практические примеры

### Пример 1: Разные объекты

```javascript
const user1 = { name: "John", age: 30 };
const user2 = { name: "John", age: 30 };

console.log(user1 === user2); // false
console.log(user1 == user2); // false

// Даже если свойства одинаковые, это разные объекты
```

### Пример 2: Одна ссылка

```javascript
const user1 = { name: "John", age: 30 };
const user2 = user1; // Та же ссылка

console.log(user1 === user2); // true ✅
console.log(user1 == user2); // true ✅

// Изменение одного влияет на другой
user1.name = "Jane";
console.log(user2.name); // "Jane" (изменился и user2)
```

### Пример 3: Массивы

```javascript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

console.log(arr1 === arr2); // false (массивы тоже объекты)
console.log(arr1 == arr2); // false

const arr3 = arr1;
console.log(arr1 === arr3); // true ✅
```

### Пример 4: Вложенные объекты

```javascript
const obj1 = {
  user: { name: "John" },
  items: [1, 2, 3]
};

const obj2 = {
  user: { name: "John" },
  items: [1, 2, 3]
};

console.log(obj1 === obj2); // false
// Даже если все вложенные свойства одинаковые
```

## Как правильно сравнивать объекты?

### 1. **Глубокое сравнение (Deep Equality)**

```javascript
function deepEqual(obj1, obj2) {
  // Проверка на одинаковые ссылки
  if (obj1 === obj2) {
    return true;
  }
  
  // Проверка на null или undefined
  if (obj1 == null || obj2 == null) {
    return false;
  }
  
  // Проверка типов
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }
  
  // Проверка массивов
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }
  
  // Получение ключей
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  // Проверка количества ключей
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  // Рекурсивное сравнение свойств
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };

console.log(deepEqual(obj1, obj2)); // true ✅
```

### 2. **JSON.stringify() (ограниченный способ)**

```javascript
function shallowEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

console.log(shallowEqual(obj1, obj2)); // true

// Ограничения:
// - Порядок свойств важен
// - Не работает с функциями, undefined, Symbol
// - Не работает с циклическими ссылками
```

### 3. **Библиотеки**

```javascript
// Lodash
const _ = require('lodash');
_.isEqual(obj1, obj2); // true

// Ramda
const R = require('ramda');
R.equals(obj1, obj2); // true
```

## Сравнение примитивов vs объектов

### Примитивы сравниваются по значению:

```javascript
const str1 = "text";
const str2 = "text";
console.log(str1 === str2); // true ✅

const num1 = 5;
const num2 = 5;
console.log(num1 === num2); // true ✅

const bool1 = true;
const bool2 = true;
console.log(bool1 === bool2); // true ✅
```

### Объекты сравниваются по ссылке:

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false ❌

const arr1 = [1, 2];
const arr2 = [1, 2];
console.log(arr1 === arr2); // false ❌
```

## Особые случаи

### Object.is() — специальные случаи

```javascript
// Object.is() работает как ===, но с особыми правилами
Object.is(+0, -0); // false (в отличие от ===)
Object.is(NaN, NaN); // true (в отличие от ===)

// Для объектов работает как ===
const obj1 = { a: 1 };
const obj2 = { a: 1 };
Object.is(obj1, obj2); // false
```

### Объекты-обертки (Wrapper Objects)

```javascript
// Примитивы и их объекты-обертки
const str1 = "text";
const str2 = new String("text");

console.log(str1 === str2); // false (разные типы)
console.log(str1 == str2); // true (приведение типов)

const str3 = new String("text");
const str4 = new String("text");
console.log(str3 === str4); // false (разные объекты)
```

## Практические примеры

### Пример 1: Проверка изменений

```javascript
// ❌ Неправильно
function hasChanged(oldObj, newObj) {
  return oldObj !== newObj; // Всегда true для разных объектов
}

// ✅ Правильно
function hasChanged(oldObj, newObj) {
  return !deepEqual(oldObj, newObj);
}
```

### Пример 2: Поиск в массиве объектов

```javascript
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

const user = { id: 1, name: "John" };

// ❌ Не работает
console.log(users.includes(user)); // false

// ✅ Правильно - поиск по ID
console.log(users.some(u => u.id === user.id)); // true

// ✅ Или глубокое сравнение
console.log(users.some(u => deepEqual(u, user))); // true
```

### Пример 3: Кеширование

```javascript
// Проблема с кешированием объектов
const cache = new Map();

function getCached(key) {
  return cache.get(key);
}

function setCached(key, value) {
  cache.set(key, value);
}

const obj1 = { data: "value" };
setCached("key", obj1);

const obj2 = { data: "value" };
console.log(getCached("key") === obj2); // false (разные объекты)

// Решение - использовать строковые ключи
function getCachedKey(obj) {
  return JSON.stringify(obj);
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте глубокое сравнение** — для сравнения объектов по значению
2. **Сравнивайте по ссылке** — когда нужно проверить, что это один объект
3. **Используйте уникальные идентификаторы** — для сравнения объектов
4. **Используйте библиотеки** — для сложного сравнения

### ❌ Не делайте:

1. **Не используйте === для сравнения значений** — объектов
2. **Не используйте JSON.stringify** — для сложных объектов
3. **Не полагайтесь на порядок свойств** — при сравнении

## Заключение

Почему сравнение объектов возвращает `false`:

- **Сравнение по ссылке** — объекты сравниваются по ссылке, а не по значению
- **Разные объекты** — даже с одинаковыми свойствами это разные объекты
- **Нужно глубокое сравнение** — для сравнения по значению
- **Используйте библиотеки** — для сложных случаев

**Помните:** объекты в JavaScript сравниваются по ссылке, а не по значению. Два объекта с одинаковыми свойствами всегда будут считаться разными при сравнении через `===` или `==`. Для сравнения объектов по значению используйте глубокое сравнение (deep equality) или специализированные библиотеки.

