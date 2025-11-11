# Что такое JSON в JavaScript? Как его можно использовать?

JSON (JavaScript Object Notation) — это легковесный формат обмена данными, основанный на синтаксисе JavaScript. JSON стал стандартом де-факто для передачи данных между клиентом и сервером в веб-разработке. Понимание JSON критически важно для работы с API, хранения данных и обмена информацией между различными системами.

## Что такое JSON?

JSON — это текстовый формат данных, который представляет объекты и массивы в виде строк. JSON является подмножеством JavaScript, но может использоваться независимо от JavaScript в различных языках программирования.

### Характеристики:

- ✅ **Текстовый формат** — читаемый человеком
- ✅ **Легковесный** — минимальный размер
- ✅ **Языково-независимый** — работает везде
- ✅ **Стандартизированный** — RFC 7159
- ✅ **Безопасный** — не выполняет код

## Структура JSON

### Базовые типы данных:

```json
{
  "string": "текст",
  "number": 42,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {
    "key": "value"
  }
}
```

### Примеры валидного JSON:

```json
// Объект
{
  "name": "John",
  "age": 30,
  "city": "New York"
}

// Массив
[
  "apple",
  "banana",
  "orange"
]

// Вложенные структуры
{
  "users": [
    {
      "id": 1,
      "name": "John",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane",
      "email": "jane@example.com"
    }
  ]
}
```

## Методы работы с JSON в JavaScript

### 1. **JSON.stringify()**

Преобразует JavaScript объект или значение в JSON строку.

**Синтаксис:**
```javascript
JSON.stringify(value, replacer, space)
```

**Примеры:**
```javascript
// Простое преобразование
const obj = { name: "John", age: 30 };
const json = JSON.stringify(obj);
console.log(json); // '{"name":"John","age":30}'

// Массив
const arr = [1, 2, 3];
const jsonArr = JSON.stringify(arr);
console.log(jsonArr); // '[1,2,3]'

// С форматированием (пробелы)
const formatted = JSON.stringify(obj, null, 2);
console.log(formatted);
// {
//   "name": "John",
//   "age": 30
// }
```

**Replacer функция:**
```javascript
// Фильтрация свойств
const obj = {
  name: "John",
  age: 30,
  password: "secret"
};

const json = JSON.stringify(obj, (key, value) => {
  // Исключаем password
  if (key === "password") {
    return undefined;
  }
  return value;
});
console.log(json); // '{"name":"John","age":30}'
```

**Массив replacer:**
```javascript
const obj = {
  name: "John",
  age: 30,
  city: "New York",
  country: "USA"
};

// Только указанные свойства
const json = JSON.stringify(obj, ["name", "age"]);
console.log(json); // '{"name":"John","age":30}'
```

### 2. **JSON.parse()**

Парсит JSON строку и преобразует ее в JavaScript объект или значение.

**Синтаксис:**
```javascript
JSON.parse(text, reviver)
```

**Примеры:**
```javascript
// Простой парсинг
const json = '{"name":"John","age":30}';
const obj = JSON.parse(json);
console.log(obj); // { name: "John", age: 30 }

// Массив
const jsonArr = '[1,2,3]';
const arr = JSON.parse(jsonArr);
console.log(arr); // [1, 2, 3]

// Вложенные структуры
const json = '{"user":{"name":"John","age":30}}';
const obj = JSON.parse(json);
console.log(obj.user.name); // "John"
```

**Reviver функция:**
```javascript
const json = '{"date":"2023-01-01","value":42}';

const obj = JSON.parse(json, (key, value) => {
  // Преобразуем строку даты в объект Date
  if (key === "date") {
    return new Date(value);
  }
  return value;
});

console.log(obj.date instanceof Date); // true
```

## Практические примеры использования

### Пример 1: Работа с API

```javascript
// Отправка данных на сервер
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData) // Преобразуем в JSON
  });
  
  const newUser = await response.json(); // Парсим ответ
  return newUser;
}

// Получение данных с сервера
async function getUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json(); // Парсим JSON ответ
  return user;
}
```

### Пример 2: Локальное хранилище

```javascript
// Сохранение в localStorage
const user = {
  name: "John",
  age: 30,
  preferences: {
    theme: "dark",
    language: "en"
  }
};

// Сохраняем как JSON строку
localStorage.setItem('user', JSON.stringify(user));

// Загружаем и парсим
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // "John"
```

### Пример 3: Глубокая копия объектов

```javascript
// Создание глубокой копии
const original = {
  name: "John",
  nested: {
    value: 42
  }
};

// Глубокая копия через JSON
const copy = JSON.parse(JSON.stringify(original));

copy.nested.value = 100;
console.log(original.nested.value); // 42 (не изменилось)
console.log(copy.nested.value); // 100
```

### Пример 4: Валидация JSON

```javascript
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

console.log(isValidJSON('{"name":"John"}')); // true
console.log(isValidJSON('invalid json')); // false
```

### Пример 5: Форматирование JSON

```javascript
function formatJSON(obj) {
  return JSON.stringify(obj, null, 2);
}

const data = {
  users: [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
  ]
};

console.log(formatJSON(data));
// {
//   "users": [
//     {
//       "id": 1,
//       "name": "John"
//     },
//     {
//       "id": 2,
//       "name": "Jane"
//     }
//   ]
// }
```

### Пример 6: Фильтрация данных

```javascript
function sanitizeData(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      // Удаляем null значения
      if (value === null) {
        return undefined;
      }
      // Удаляем пустые строки
      if (value === "") {
        return undefined;
      }
      return value;
    })
  );
}

const data = {
  name: "John",
  age: null,
  email: "",
  city: "New York"
};

const cleaned = sanitizeData(data);
console.log(cleaned); // { name: "John", city: "New York" }
```

### Пример 7: Преобразование дат

```javascript
function serializeWithDates(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString(); // Преобразуем Date в строку
    }
    return value;
  });
}

function deserializeWithDates(json) {
  return JSON.parse(json, (key, value) => {
    // Преобразуем строки дат обратно в Date
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value);
    }
    return value;
  });
}

const data = {
  name: "John",
  createdAt: new Date()
};

const json = serializeWithDates(data);
const restored = deserializeWithDates(json);
console.log(restored.createdAt instanceof Date); // true
```

## Ограничения JSON

### Что НЕ поддерживается в JSON:

1. **Функции**
```javascript
// ❌ Не работает
JSON.stringify({ func: () => {} }); // '{}'
```

2. **undefined**
```javascript
// ❌ undefined удаляется
JSON.stringify({ value: undefined }); // '{}'
```

3. **Symbol**
```javascript
// ❌ Symbol игнорируется
JSON.stringify({ sym: Symbol('test') }); // '{}'
```

4. **Date объекты**
```javascript
// ❌ Date преобразуется в строку
JSON.stringify({ date: new Date() });
// '{"date":"2023-01-01T00:00:00.000Z"}'
```

5. **Циклические ссылки**
```javascript
// ❌ Ошибка при циклических ссылках
const obj = {};
obj.self = obj;
JSON.stringify(obj); // TypeError: Converting circular structure to JSON
```

## Обработка ошибок

### Безопасный парсинг:

```javascript
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Ошибка парсинга JSON:', error);
    return null;
  }
}

const result = safeParse('invalid json');
if (result === null) {
  console.log('Не удалось распарсить JSON');
}
```

### Валидация перед парсингом:

```javascript
function parseJSONSafely(json) {
  if (typeof json !== 'string') {
    throw new Error('JSON должен быть строкой');
  }
  
  try {
    return JSON.parse(json);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Невалидный JSON: ' + error.message);
    }
    throw error;
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте try/catch** — при парсинге JSON
2. **Валидируйте данные** — перед парсингом
3. **Используйте replacer** — для фильтрации данных
4. **Форматируйте для отладки** — используйте space параметр
5. **Обрабатывайте ошибки** — всегда обрабатывайте ошибки парсинга

### ❌ Не делайте:

1. **Не парсите без проверки** — всегда используйте try/catch
2. **Не используйте для глубокого копирования** — если есть функции, Date, undefined
3. **Не парсите недоверенные данные** — без валидации
4. **Не забывайте про ограничения** — функции, undefined, Symbol не поддерживаются

## Заключение

JSON в JavaScript:

- **Формат данных** — текстовый, легковесный
- **JSON.stringify()** — преобразует объект в JSON строку
- **JSON.parse()** — парсит JSON строку в объект
- **Используется везде** — API, localStorage, конфигурации
- **Ограничения** — функции, undefined, Symbol не поддерживаются

**Помните:** JSON — это стандартный способ обмена данными в веб-разработке. Используйте `JSON.stringify()` для преобразования объектов в строки и `JSON.parse()` для обратного преобразования. Всегда обрабатывайте ошибки при парсинге и помните об ограничениях JSON (функции, undefined, Symbol не поддерживаются). JSON — это мощный инструмент для работы с данными в JavaScript.

