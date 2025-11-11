# Разница между `typeof` и `instanceof`?

`typeof` и `instanceof` — это операторы в JavaScript для проверки типов, но они работают по-разному и используются для разных целей. Понимание различий критически важно для правильной проверки типов и работы с объектами.

## typeof

`typeof` — это оператор, который возвращает строку, указывающую тип операнда.

### Характеристики:

- ✅ **Работает с примитивами** — определяет тип примитивных значений
- ✅ **Возвращает строку** — тип в виде строки
- ⚠️ **Ограничения с объектами** — все объекты возвращают "object"
- ⚠️ **Особенность с null** — `typeof null === "object"`

### Примеры:

```javascript
typeof "text"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" (особенность!)
typeof {}; // "object"
typeof []; // "object"
typeof function() {}; // "function"
typeof Symbol(); // "symbol"
typeof BigInt(1); // "bigint"
```

## instanceof

`instanceof` — это оператор, который проверяет, является ли объект экземпляром указанного конструктора или класса.

### Характеристики:

- ✅ **Работает с объектами** — проверяет принадлежность к классу/конструктору
- ✅ **Проверяет цепочку прототипов** — ищет в цепочке прототипов
- ❌ **Не работает с примитивами** — только с объектами
- ⚠️ **Может не работать** — в разных контекстах выполнения

### Примеры:

```javascript
[] instanceof Array; // true
{} instanceof Object; // true
new Date() instanceof Date; // true

function Person() {}
const person = new Person();
person instanceof Person; // true

// С примитивами
"text" instanceof String; // false (примитив)
new String("text") instanceof String; // true (объект)
```

## Ключевые различия

### 1. **Примитивы vs Объекты**

```javascript
// typeof - работает с примитивами
typeof "text"; // "string"
typeof 42; // "number"

// instanceof - не работает с примитивами
"text" instanceof String; // false
42 instanceof Number; // false
```

### 2. **Проверка массивов**

```javascript
const arr = [1, 2, 3];

typeof arr; // "object" (не различает массивы)
arr instanceof Array; // true (правильно определяет массив)
Array.isArray(arr); // true (лучший способ)
```

### 3. **Проверка null**

```javascript
typeof null; // "object" (особенность!)
null instanceof Object; // false (правильно)
```

### 4. **Функции**

```javascript
function test() {}

typeof test; // "function"
test instanceof Function; // true
```

## Практические примеры

### Пример 1: Проверка типа примитива

```javascript
// ✅ typeof для примитивов
function checkType(value) {
  if (typeof value === "string") {
    return "Это строка";
  }
  if (typeof value === "number") {
    return "Это число";
  }
}
```

### Пример 2: Проверка типа объекта

```javascript
// ✅ instanceof для объектов
function checkObject(obj) {
  if (obj instanceof Array) {
    return "Это массив";
  }
  if (obj instanceof Date) {
    return "Это дата";
  }
  if (obj instanceof RegExp) {
    return "Это регулярное выражение";
  }
}
```

### Пример 3: Комбинированная проверка

```javascript
function getType(value) {
  // Сначала проверяем примитивы
  const primitiveType = typeof value;
  if (primitiveType !== "object") {
    return primitiveType;
  }
  
  // Затем проверяем null
  if (value === null) {
    return "null";
  }
  
  // Затем проверяем объекты
  if (value instanceof Array) {
    return "array";
  }
  if (value instanceof Date) {
    return "date";
  }
  if (value instanceof RegExp) {
    return "regexp";
  }
  
  return "object";
}
```

## Сравнительная таблица

| Значение | `typeof` | `instanceof Array` | `instanceof Object` |
|----------|----------|-------------------|---------------------|
| `"text"` | `"string"` | `false` | `false` |
| `42` | `"number"` | `false` | `false` |
| `true` | `"boolean"` | `false` | `false` |
| `null` | `"object"` ❌ | `false` | `false` |
| `undefined` | `"undefined"` | `false` | `false` |
| `[]` | `"object"` | `true` ✅ | `true` |
| `{}` | `"object"` | `false` | `true` ✅ |
| `function() {}` | `"function"` | `false` | `true` |
| `new Date()` | `"object"` | `false` | `true` |

## Лучшие практики

### ✅ Делайте:

1. **Используйте typeof** — для проверки примитивов
2. **Используйте instanceof** — для проверки объектов
3. **Используйте Array.isArray()** — для массивов
4. **Комбинируйте методы** — для полной проверки

### ❌ Не делайте:

1. **Не используйте typeof** — для проверки массивов (вернет "object")
2. **Не используйте instanceof** — для примитивов (не работает)
3. **Не полагайтесь на typeof null** — это "object" (особенность)

## Заключение

Разница между `typeof` и `instanceof`:

- **`typeof`** — для проверки примитивов, возвращает строку типа
- **`instanceof`** — для проверки объектов, проверяет принадлежность к классу
- **Разные цели** — typeof для примитивов, instanceof для объектов
- **Комбинируйте** — для полной проверки типов

**Помните:** `typeof` используется для проверки примитивных типов и возвращает строку, а `instanceof` используется для проверки объектов и проверяет принадлежность к классу через цепочку прототипов. Используйте `typeof` для примитивов, `instanceof` для объектов, и `Array.isArray()` для массивов. Понимание различий критически важно для правильной проверки типов.

