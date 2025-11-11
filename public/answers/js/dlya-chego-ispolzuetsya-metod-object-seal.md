# Для чего используется метод `Object.seal()`?

`Object.seal()` — это метод в JavaScript, который "запечатывает" объект, предотвращая добавление новых свойств и делая все существующие свойства неконфигурируемыми. Понимание `Object.seal()` критически важно для контроля изменений объектов и обеспечения их целостности.

## Что делает Object.seal()?

`Object.seal()` запечатывает объект, предотвращая добавление новых свойств и делая все существующие свойства неконфигурируемыми.

### Характеристики:

- ✅ **Предотвращает добавление** — новых свойств
- ✅ **Делает неконфигурируемыми** — существующие свойства
- ✅ **Разрешает изменение** — значений существующих свойств
- ✅ **Разрешает удаление** — только если свойство было удаляемым

### Синтаксис:

```javascript
Object.seal(obj)
```

## Основные возможности

### 1. **Предотвращение добавления свойств**

```javascript
const obj = { name: "John" };
Object.seal(obj);

// ❌ Нельзя добавить новое свойство
obj.age = 30; // Игнорируется в strict mode, ошибка в strict mode
console.log(obj.age); // undefined

// ✅ Можно изменить существующее свойство
obj.name = "Jane"; // Работает
console.log(obj.name); // "Jane"
```

### 2. **Неконфигурируемые свойства**

```javascript
const obj = { name: "John" };
Object.seal(obj);

// ❌ Нельзя удалить свойство
delete obj.name; // Игнорируется в strict mode, ошибка в strict mode
console.log(obj.name); // "John"

// ❌ Нельзя изменить дескрипторы
Object.defineProperty(obj, "name", {
  writable: false // TypeError в strict mode
});
```

### 3. **Изменение значений**

```javascript
const obj = { name: "John", age: 30 };
Object.seal(obj);

// ✅ Можно изменить значения
obj.name = "Jane";
obj.age = 25;
console.log(obj); // { name: "Jane", age: 25 }
```

## Практические примеры

### Пример 1: Защита конфигурации

```javascript
// Защита конфигурации приложения
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

Object.seal(config);

// ❌ Нельзя добавить новое свойство
config.debug = true; // Игнорируется

// ✅ Можно изменить существующее
config.timeout = 10000; // Работает

// ❌ Нельзя удалить
delete config.retries; // Игнорируется
```

### Пример 2: Защита данных пользователя

```javascript
// Защита данных пользователя
const user = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

Object.seal(user);

// ❌ Нельзя добавить новое свойство
user.role = "admin"; // Игнорируется

// ✅ Можно изменить существующее
user.name = "Jane"; // Работает

// ❌ Нельзя удалить
delete user.email; // Игнорируется
```

### Пример 3: Защита состояния

```javascript
// Защита состояния компонента
const state = {
  count: 0,
  isActive: false
};

Object.seal(state);

// ❌ Нельзя добавить новое свойство
state.newProperty = "value"; // Игнорируется

// ✅ Можно изменить существующее
state.count = 10; // Работает
state.isActive = true; // Работает
```

## Сравнение с другими методами

### Object.seal() vs Object.freeze():

```javascript
const obj1 = { name: "John" };
const obj2 = { name: "John" };

Object.seal(obj1);
Object.freeze(obj2);

// Object.seal() - можно изменить значения
obj1.name = "Jane"; // ✅ Работает

// Object.freeze() - нельзя изменить значения
obj2.name = "Jane"; // ❌ Игнорируется
```

### Object.seal() vs Object.preventExtensions():

```javascript
const obj1 = { name: "John" };
const obj2 = { name: "John" };

Object.seal(obj1);
Object.preventExtensions(obj2);

// Object.seal() - нельзя удалить свойства
delete obj1.name; // ❌ Игнорируется

// Object.preventExtensions() - можно удалить свойства
delete obj2.name; // ✅ Работает
```

## Проверка запечатанности

### Object.isSealed():

```javascript
const obj = { name: "John" };

console.log(Object.isSealed(obj)); // false

Object.seal(obj);

console.log(Object.isSealed(obj)); // true
```

## Вложенные объекты

### Важно понимать:

```javascript
const obj = {
  name: "John",
  address: {
    city: "NYC",
    country: "USA"
  }
};

Object.seal(obj);

// ❌ Нельзя добавить свойство на верхнем уровне
obj.age = 30; // Игнорируется

// ✅ Можно изменить вложенный объект
obj.address.city = "LA"; // Работает

// ✅ Можно добавить свойство во вложенный объект
obj.address.zip = "10001"; // Работает (вложенный объект не запечатан)
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для защиты** — конфигурации и состояния
2. **Используйте для контроля** — изменений объектов
3. **Проверяйте запечатанность** — с Object.isSealed()
4. **Документируйте** — запечатанные объекты

### ❌ Не делайте:

1. **Не используйте для глубокой защиты** — только верхний уровень
2. **Не забывайте про strict mode** — ошибки вместо игнорирования
3. **Не используйте везде** — только когда нужна защита

## Заключение

Метод `Object.seal()`:

- **Запечатывает объект** — предотвращает добавление свойств
- **Делает неконфигурируемыми** — существующие свойства
- **Разрешает изменение** — значений существующих свойств
- **Защита целостности** — контроль изменений объектов

**Помните:** `Object.seal()` используется для защиты объектов от добавления новых свойств и изменения конфигурации существующих. Используйте его для защиты конфигурации, состояния и данных. Понимание `Object.seal()` критически важно для контроля изменений объектов в JavaScript.

