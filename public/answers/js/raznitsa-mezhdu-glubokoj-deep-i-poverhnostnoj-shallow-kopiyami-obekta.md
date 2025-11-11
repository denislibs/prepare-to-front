# Разница между глубокой (deep) и поверхностной (shallow) копиями объекта? Как сделать каждую из них?

Копирование объектов в JavaScript — это важная тема, так как объекты копируются по ссылке, а не по значению. Существует два типа копирования: поверхностное (shallow) и глубокое (deep). Понимание различий и способов создания копий критически важно для правильной работы с объектами и избежания неожиданных мутаций.

## Поверхностное копирование (Shallow Copy)

Поверхностное копирование создает новый объект, но копирует только свойства первого уровня. Вложенные объекты и массивы копируются по ссылке, а не по значению.

### Характеристики:

- ✅ **Копирует первый уровень** — все свойства верхнего уровня
- ❌ **Вложенные объекты по ссылке** — изменения в копии влияют на оригинал
- ✅ **Быстрое** — не требует рекурсии
- ⚠️ **Ограниченное** — не копирует вложенные структуры

### Пример проблемы:

```javascript
const original = {
  name: "John",
  address: {
    city: "New York",
    country: "USA"
  }
};

const shallowCopy = { ...original };
shallowCopy.name = "Jane"; // Изменяется только копия
shallowCopy.address.city = "London"; // Изменяется и оригинал! ❌

console.log(original.address.city); // "London" (изменился!)
```

## Глубокое копирование (Deep Copy)

Глубокое копирование создает полностью независимую копию объекта, включая все вложенные объекты и массивы. Изменения в копии не влияют на оригинал.

### Характеристики:

- ✅ **Копирует все уровни** — включая вложенные объекты и массивы
- ✅ **Полная независимость** — изменения не влияют на оригинал
- ⚠️ **Медленнее** — требует рекурсии или сериализации
- ⚠️ **Ограничения** — функции, циклические ссылки, специальные объекты

### Пример:

```javascript
const original = {
  name: "John",
  address: {
    city: "New York",
    country: "USA"
  }
};

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.name = "Jane"; // Изменяется только копия
deepCopy.address.city = "London"; // Изменяется только копия ✅

console.log(original.address.city); // "New York" (не изменился!)
```

## Способы поверхностного копирования

### 1. **Spread оператор (ES6)**

```javascript
const original = { a: 1, b: 2 };
const copy = { ...original };

copy.a = 10;
console.log(original.a); // 1 (не изменился)
```

### 2. **Object.assign()**

```javascript
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original);

copy.a = 10;
console.log(original.a); // 1 (не изменился)
```

### 3. **Array.from() (для массивов)**

```javascript
const original = [1, 2, 3];
const copy = Array.from(original);
// Или
const copy2 = [...original];
```

### 4. **slice() (для массивов)**

```javascript
const original = [1, 2, 3];
const copy = original.slice();
```

## Способы глубокого копирования

### 1. **JSON.parse(JSON.stringify())**

```javascript
const original = {
  name: "John",
  address: {
    city: "New York"
  }
};

const deepCopy = JSON.parse(JSON.stringify(original));

// Ограничения:
// - Не копирует функции
// - Не копирует undefined
// - Не копирует Symbol
// - Не работает с циклическими ссылками
// - Преобразует Date в строки
```

### 2. **Рекурсивная функция**

```javascript
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepCopy(item));
  }
  
  if (obj instanceof Object) {
    const copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
    return copy;
  }
}

const original = {
  name: "John",
  address: {
    city: "New York"
  },
  date: new Date()
};

const deepCopy = deepCopy(original);
```

### 3. **Структурированное клонирование (Structured Clone)**

```javascript
// Современный способ (ES2022)
const original = {
  name: "John",
  address: {
    city: "New York"
  }
};

const deepCopy = structuredClone(original);

// Преимущества:
// - Копирует большинство типов
// - Работает с циклическими ссылками (ограниченно)
// - Не работает с функциями
```

### 4. **Библиотеки (Lodash)**

```javascript
const _ = require('lodash');
const deepCopy = _.cloneDeep(original);
```

## Практические примеры

### Пример 1: Поверхностное копирование

```javascript
const user = {
  name: "John",
  settings: {
    theme: "dark",
    language: "en"
  }
};

// Поверхностное копирование
const userCopy = { ...user };

userCopy.name = "Jane"; // OK
userCopy.settings.theme = "light"; // Изменит и оригинал! ❌

console.log(user.settings.theme); // "light" (изменился!)
```

### Пример 2: Глубокое копирование

```javascript
const user = {
  name: "John",
  settings: {
    theme: "dark",
    language: "en"
  }
};

// Глубокое копирование
const userCopy = JSON.parse(JSON.stringify(user));

userCopy.name = "Jane"; // OK
userCopy.settings.theme = "light"; // OK, оригинал не изменится ✅

console.log(user.settings.theme); // "dark" (не изменился!)
```

### Пример 3: Копирование массивов объектов

```javascript
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];

// Поверхностное копирование
const usersCopy = [...users];
usersCopy[0].name = "Bob"; // Изменит и оригинал! ❌

// Глубокое копирование
const usersDeepCopy = users.map(user => ({ ...user }));
usersDeepCopy[0].name = "Bob"; // OK ✅
```

## Ограничения методов

### JSON.parse(JSON.stringify()):

```javascript
const obj = {
  func: function() {}, // ❌ Не копируется
  undefined: undefined, // ❌ Не копируется
  symbol: Symbol("test"), // ❌ Не копируется
  date: new Date(), // ⚠️ Преобразуется в строку
  circular: null // ⚠️ Не работает с циклическими ссылками
};

obj.circular = obj; // Циклическая ссылка
// JSON.stringify(obj); // Ошибка
```

### structuredClone():

```javascript
const obj = {
  func: function() {}, // ❌ Не копируется
  date: new Date(), // ✅ Копируется
  map: new Map(), // ✅ Копируется
  set: new Set() // ✅ Копируется
};

const copy = structuredClone(obj);
```

## Улучшенная функция глубокого копирования

```javascript
function deepCopy(obj, visited = new WeakMap()) {
  // Обработка примитивов
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  // Обработка циклических ссылок
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  // Обработка Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Обработка массивов
  if (Array.isArray(obj)) {
    const copy = [];
    visited.set(obj, copy);
    obj.forEach((item, index) => {
      copy[index] = deepCopy(item, visited);
    });
    return copy;
  }
  
  // Обработка объектов
  if (obj instanceof Object) {
    const copy = {};
    visited.set(obj, copy);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key], visited);
      }
    }
    return copy;
  }
  
  return obj;
}
```

## Когда использовать что?

### ✅ Используйте поверхностное копирование когда:

1. **Нет вложенных объектов** — только примитивы
2. **Нужна производительность** — быстрое копирование
3. **Вложенные объекты не изменяются** — только чтение

### ✅ Используйте глубокое копирование когда:

1. **Есть вложенные объекты** — которые могут изменяться
2. **Нужна полная независимость** — изменения не должны влиять на оригинал
3. **Работа с состоянием** — в React, Redux и т.д.

## Лучшие практики

### ✅ Делайте:

1. **Используйте spread оператор** — для поверхностного копирования
2. **Используйте structuredClone()** — для глубокого копирования (ES2022+)
3. **Используйте библиотеки** — для сложных случаев (Lodash)
4. **Понимайте ограничения** — функций, циклических ссылок

### ❌ Не делайте:

1. **Не мутируйте оригинал** — используйте копии
2. **Не используйте JSON.parse(JSON.stringify())** — для объектов с функциями
3. **Не забывайте про вложенные объекты** — используйте глубокое копирование

## Заключение

Разница между поверхностным и глубоким копированием:

- **Поверхностное** — копирует первый уровень, вложенные объекты по ссылке
- **Глубокое** — копирует все уровни, полная независимость
- **Выбор зависит от задачи** — есть ли вложенные объекты
- **Способы** — spread, Object.assign (shallow), structuredClone, рекурсия (deep)

**Помните:** понимание разницы между поверхностным и глубоким копированием критически важно для работы с объектами. Используйте поверхностное копирование для простых случаев, и глубокое копирование когда есть вложенные объекты, которые могут изменяться. В современном JavaScript используйте `structuredClone()` для глубокого копирования, когда это возможно.

