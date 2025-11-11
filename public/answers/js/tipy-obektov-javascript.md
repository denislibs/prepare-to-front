# Типы объектов JavaScript?

В JavaScript существует множество типов объектов, каждый со своими особенностями и назначением. Понимание различных типов объектов критически важно для эффективной работы с данными и создания правильных структур данных.

## Основные типы объектов

### 1. **Обычные объекты (Plain Objects)**

Объекты, созданные через литерал `{}` или `new Object()`.

```javascript
const obj = {
  name: "John",
  age: 30
};

const obj2 = new Object();
obj2.name = "John";
```

### 2. **Массивы (Arrays)**

Объекты-массивы для хранения упорядоченных коллекций.

```javascript
const arr = [1, 2, 3];
const arr2 = new Array(1, 2, 3);
```

### 3. **Функции (Functions)**

Объекты-функции, которые можно вызывать.

```javascript
function myFunction() {}
const arrow = () => {};
const func = new Function('return 1');
```

### 4. **Даты (Date)**

Объекты для работы с датами и временем.

```javascript
const date = new Date();
const specificDate = new Date(2023, 0, 1);
```

### 5. **Регулярные выражения (RegExp)**

Объекты для работы с регулярными выражениями.

```javascript
const regex = /pattern/;
const regex2 = new RegExp("pattern");
```

### 6. **Ошибки (Error)**

Объекты для представления ошибок.

```javascript
const error = new Error("Сообщение");
const typeError = new TypeError("Тип ошибки");
```

### 7. **Map**

Коллекция пар ключ-значение.

```javascript
const map = new Map();
map.set("key", "value");
```

### 8. **Set**

Коллекция уникальных значений.

```javascript
const set = new Set([1, 2, 3]);
```

### 9. **WeakMap**

Слабая ссылка на ключи.

```javascript
const weakMap = new WeakMap();
```

### 10. **WeakSet**

Слабая ссылка на значения.

```javascript
const weakSet = new WeakSet();
```

### 11. **Promise**

Объекты для асинхронных операций.

```javascript
const promise = new Promise((resolve, reject) => {});
```

### 12. **Proxy**

Объекты-прокси для перехвата операций.

```javascript
const proxy = new Proxy(target, handler);
```

## Проверка типов объектов

### typeof:

```javascript
typeof {}; // "object"
typeof []; // "object"
typeof null; // "object" (особенность)
typeof function() {}; // "function"
```

### instanceof:

```javascript
[] instanceof Array; // true
{} instanceof Object; // true
new Date() instanceof Date; // true
```

### Object.prototype.toString:

```javascript
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(new Date()); // "[object Date]"
```

## Практические примеры

### Пример 1: Работа с разными типами

```javascript
// Обычный объект
const user = { name: "John" };

// Массив
const items = [1, 2, 3];

// Дата
const now = new Date();

// Map
const data = new Map();
data.set("user", user);

// Set
const unique = new Set([1, 2, 2, 3]); // [1, 2, 3]
```

## Заключение

Типы объектов в JavaScript:

- **Обычные объекты** — `{}`, `new Object()`
- **Массивы** — `[]`, `new Array()`
- **Функции** — `function()`, `() => {}`
- **Специализированные** — Date, RegExp, Error, Map, Set, Promise, Proxy

**Помните:** JavaScript имеет множество типов объектов для различных задач. Понимание типов объектов и способов их проверки критически важно для правильной работы с данными.

