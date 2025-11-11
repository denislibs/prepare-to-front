# Зачем нужен конструктор `Proxy`?

`Proxy` — это мощный конструктор в JavaScript, который позволяет создавать прокси-объекты для перехвата и кастомизации операций над объектами (чтение, запись, перечисление и т.д.). Понимание `Proxy` критически важно для создания гибких и динамических объектов.

## Что такое Proxy?

`Proxy` — это объект-обертка, который перехватывает операции над целевым объектом и позволяет кастомизировать их поведение.

### Характеристики:

- ✅ **Перехват операций** — чтение, запись, удаление
- ✅ **Прозрачность** — работает как обычный объект
- ✅ **Гибкость** — кастомизация поведения
- ✅ **Метапрограммирование** — программирование программ

### Синтаксис:

```javascript
const proxy = new Proxy(target, handler);
```

## Основные применения

### 1. **Валидация свойств**

```javascript
const validator = {
  set(target, property, value) {
    if (property === "age" && (typeof value !== "number" || value < 0)) {
      throw new TypeError("Age must be a positive number");
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
person.age = -5; // TypeError: Age must be a positive number
```

### 2. **Логирование**

```javascript
const logger = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, logger);
obj.name = "John"; // Logs: Setting name to John
console.log(obj.name); // Logs: Getting name, then "John"
```

### 3. **Значения по умолчанию**

```javascript
const defaults = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `Default value for ${property}`;
  }
};

const obj = new Proxy({}, defaults);
console.log(obj.name); // "Default value for name"
obj.name = "John";
console.log(obj.name); // "John"
```

### 4. **Защита свойств**

```javascript
const protected = {
  set(target, property, value) {
    if (property.startsWith("_")) {
      throw new Error(`Cannot set protected property ${property}`);
    }
    target[property] = value;
    return true;
  },
  get(target, property) {
    if (property.startsWith("_")) {
      throw new Error(`Cannot access protected property ${property}`);
    }
    return target[property];
  }
};

const obj = new Proxy({}, protected);
obj.name = "John"; // OK
obj._private = "secret"; // Error: Cannot set protected property _private
```

## Traps (Ловушки)

### Основные traps:

```javascript
const handler = {
  // Перехват чтения
  get(target, property, receiver) {
    return target[property];
  },
  
  // Перехват записи
  set(target, property, value, receiver) {
    target[property] = value;
    return true; // Успешная установка
  },
  
  // Перехват удаления
  deleteProperty(target, property) {
    delete target[property];
    return true;
  },
  
  // Перехват проверки наличия
  has(target, property) {
    return property in target;
  },
  
  // Перехват перечисления
  ownKeys(target) {
    return Object.keys(target);
  },
  
  // Перехват определения свойств
  defineProperty(target, property, descriptor) {
    Object.defineProperty(target, property, descriptor);
    return true;
  }
};
```

## Практические примеры

### Пример 1: Реактивный объект

```javascript
const reactive = (obj, callback) => {
  return new Proxy(obj, {
    set(target, property, value) {
      const oldValue = target[property];
      target[property] = value;
      if (oldValue !== value) {
        callback(property, value, oldValue);
      }
      return true;
    }
  });
};

const state = reactive({ count: 0 }, (prop, newVal, oldVal) => {
  console.log(`${prop} changed from ${oldVal} to ${newVal}`);
});

state.count = 1; // Logs: count changed from 0 to 1
state.count = 2; // Logs: count changed from 1 to 2
```

### Пример 2: Виртуальные свойства

```javascript
const virtual = {
  get(target, property) {
    if (property === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    }
    if (property === "age") {
      const birthYear = target.birthYear;
      return new Date().getFullYear() - birthYear;
    }
    return target[property];
  }
};

const person = new Proxy({
  firstName: "John",
  lastName: "Doe",
  birthYear: 1990
}, virtual);

console.log(person.fullName); // "John Doe" (виртуальное свойство)
console.log(person.age); // Вычисляется динамически
```

### Пример 3: Кэширование

```javascript
const cache = {
  cache: new Map(),
  get(target, property) {
    if (property === "getCached") {
      return (key) => this.cache.get(key);
    }
    if (property === "setCached") {
      return (key, value) => this.cache.set(key, value);
    }
    return target[property];
  }
};

const obj = new Proxy({}, cache);
obj.setCached("key1", "value1");
console.log(obj.getCached("key1")); // "value1"
```

### Пример 4: Массив с отрицательными индексами

```javascript
const negativeIndex = {
  get(target, property) {
    const index = Number(property);
    if (index < 0) {
      return target[target.length + index];
    }
    return target[property];
  }
};

const arr = new Proxy([1, 2, 3, 4, 5], negativeIndex);
console.log(arr[-1]); // 5 (последний элемент)
console.log(arr[-2]); // 4 (предпоследний элемент)
```

## Преимущества Proxy

### 1. **Гибкость**

```javascript
// Можно кастомизировать любое поведение
const custom = new Proxy({}, {
  get(target, property) {
    // Кастомная логика
    return "Custom value";
  }
});
```

### 2. **Прозрачность**

```javascript
// Proxy работает как обычный объект
const proxy = new Proxy({ name: "John" }, {});
console.log(proxy.name); // "John" (как обычный объект)
```

### 3. **Метапрограммирование**

```javascript
// Программирование поведения программ
const meta = new Proxy({}, {
  // Перехват всех операций
});
```

## Ограничения

### 1. **Нельзя отменить**

```javascript
// Proxy нельзя отменить после создания
const proxy = new Proxy({}, {});
// Нет способа "отключить" proxy
```

### 2. **Производительность**

```javascript
// Proxy медленнее обычных объектов
// Из-за перехвата операций
```

### 3. **Не все операции перехватываются**

```javascript
// Некоторые операции не перехватываются
// Например, Object.keys() может не работать как ожидается
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для валидации** — проверка значений
2. **Используйте для логирования** — отслеживание изменений
3. **Используйте для реактивности** — реактивные системы
4. **Используйте для виртуальных свойств** — вычисляемые значения

### ❌ Не делайте:

1. **Не используйте везде** — только когда нужно
2. **Не забывайте про производительность** — может быть медленнее
3. **Не усложняйте** — простые случаи лучше без Proxy
4. **Не забывайте про совместимость** — не поддерживается в старых браузерах

## Заключение

Конструктор `Proxy`:

- **Перехват операций** — чтение, запись, удаление
- **Кастомизация поведения** — гибкая настройка
- **Метапрограммирование** — программирование программ
- **Практические применения** — валидация, логирование, реактивность

**Помните:** `Proxy` — это мощный инструмент для создания гибких и динамических объектов. Используйте его для валидации, логирования, реактивности и создания виртуальных свойств. Понимание `Proxy` критически важно для продвинутого программирования в JavaScript.

