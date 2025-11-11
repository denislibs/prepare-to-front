# Типы данных в JavaScript?

JavaScript — это динамически типизированный язык, что означает, что переменные не привязаны к конкретному типу данных. Понимание типов данных в JavaScript критически важно для написания правильного и эффективного кода. JavaScript имеет два основных категории типов: примитивные типы и объектные типы (ссылочные типы).

## Примитивные типы данных (Primitive Types)

Примитивные типы данных — это простые, неделимые значения, которые хранятся непосредственно в переменной. В JavaScript существует 7 примитивных типов.

### 1. **Number (Число)**

Представляет как целые, так и числа с плавающей точкой.

```javascript
// Целые числа
let integer = 42;
let negative = -10;

// Числа с плавающей точкой
let float = 3.14;
let scientific = 1.5e3; // 1500

// Специальные значения
let infinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN;

console.log(typeof 42); // "number"
console.log(typeof 3.14); // "number"
console.log(typeof NaN); // "number" (особенность JavaScript)
```

**Особенности:**
- Все числа в JavaScript представлены как 64-битные числа с плавающей точкой (IEEE 754)
- Нет отдельного типа для целых чисел
- `NaN` (Not a Number) имеет тип `number`, но не является числом

### 2. **String (Строка)**

Представляет последовательность символов.

```javascript
// Строки в одинарных кавычках
let single = 'Hello';

// Строки в двойных кавычках
let double = "World";

// Строки в обратных кавычках (шаблонные строки)
let template = `Hello, ${single}!`; // "Hello, Hello!"

// Многострочные строки
let multiline = `Это
многострочная
строка`;

console.log(typeof "text"); // "string"
```

**Особенности:**
- Строки неизменяемы (immutable)
- Можно использовать одинарные, двойные или обратные кавычки
- Шаблонные строки (template literals) поддерживают интерполяцию

### 3. **Boolean (Логический тип)**

Представляет логическое значение: `true` или `false`.

```javascript
let isTrue = true;
let isFalse = false;

console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"

// Логические операторы
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
```

**Особенности:**
- Только два значения: `true` и `false`
- Используется в условных выражениях и логических операциях

### 4. **Undefined**

Представляет неопределенное значение. Переменная имеет значение `undefined`, если она была объявлена, но не инициализирована.

```javascript
let undefinedVar;
console.log(undefinedVar); // undefined
console.log(typeof undefinedVar); // "undefined"

// undefined — это примитивное значение
let test = undefined;
console.log(test === undefined); // true
```

**Особенности:**
- `undefined` — это значение и тип одновременно
- Переменная получает `undefined` по умолчанию, если не инициализирована
- Не следует присваивать `undefined` явно (лучше использовать `null`)

### 5. **Null**

Представляет отсутствие значения или пустую ссылку.

```javascript
let nullValue = null;
console.log(nullValue); // null
console.log(typeof nullValue); // "object" (известная особенность JavaScript)

// Проверка на null
console.log(nullValue === null); // true
console.log(nullValue == undefined); // true (нестрогое сравнение)
console.log(nullValue === undefined); // false (строгое сравнение)
```

**Особенности:**
- `null` — это примитивное значение
- `typeof null` возвращает `"object"` (это баг в JavaScript, который сохраняется для обратной совместимости)
- `null` используется для явного указания отсутствия значения

### 6. **Symbol (Символ)**

Представляет уникальное и неизменяемое значение, которое может использоваться как ключ объекта.

```javascript
// Создание символа
let sym1 = Symbol();
let sym2 = Symbol('description');
let sym3 = Symbol('description');

console.log(sym2 === sym3); // false (каждый символ уникален)
console.log(typeof sym1); // "symbol"

// Использование как ключ объекта
let obj = {
  [sym1]: 'value1',
  [sym2]: 'value2'
};

console.log(obj[sym1]); // "value1"

// Глобальные символы
let globalSym = Symbol.for('key');
let sameGlobalSym = Symbol.for('key');
console.log(globalSym === sameGlobalSym); // true
```

**Особенности:**
- Каждый символ уникален (даже с одинаковым описанием)
- Используется для создания приватных свойств объектов
- Не преобразуется в строку автоматически

### 7. **BigInt (Большое целое число)**

Представляет целые числа произвольной точности. Добавлен в ES2020.

```javascript
// Создание BigInt
let bigInt1 = 9007199254740991n; // суффикс n
let bigInt2 = BigInt(9007199254740991);

console.log(typeof bigInt1); // "bigint"

// Арифметические операции
let sum = bigInt1 + bigInt2;
console.log(sum); // 18014398509481982n

// Нельзя смешивать с обычными числами
// let mixed = 1n + 2; // TypeError
let mixed = 1n + BigInt(2); // Правильно
```

**Особенности:**
- Используется для работы с очень большими целыми числами
- Нельзя смешивать с обычными числами без явного преобразования
- Не поддерживает операции с плавающей точкой

## Объектные типы (Object Types / Reference Types)

Объектные типы — это сложные типы данных, которые хранят ссылки на значения в памяти.

### Object (Объект)

Базовый тип для всех объектов в JavaScript.

```javascript
// Объектный литерал
let obj = {
  name: 'John',
  age: 30
};

// Массив (тоже объект)
let arr = [1, 2, 3];

// Функция (тоже объект)
function func() {}

// Дата
let date = new Date();

console.log(typeof obj); // "object"
console.log(typeof arr); // "object"
console.log(typeof func); // "function"
console.log(typeof date); // "object"
```

**Особенности:**
- Все объектные типы имеют тип `"object"` (кроме функций)
- Функции имеют тип `"function"`, но технически являются объектами
- Объекты хранятся по ссылке, а не по значению

## Специальные объектные типы

### Array (Массив)

```javascript
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
console.log(typeof arr); // "object"
```

### Function (Функция)

```javascript
function myFunc() {}
console.log(typeof myFunc); // "function"
```

### Date (Дата)

```javascript
let date = new Date();
console.log(date instanceof Date); // true
console.log(typeof date); // "object"
```

### RegExp (Регулярное выражение)

```javascript
let regex = /pattern/;
console.log(regex instanceof RegExp); // true
console.log(typeof regex); // "object"
```

## Проверка типов данных

### Оператор typeof

```javascript
console.log(typeof 42); // "number"
console.log(typeof "text"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (баг!)
console.log(typeof Symbol()); // "symbol"
console.log(typeof 1n); // "bigint"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function() {}); // "function"
```

### Оператор instanceof

```javascript
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true
```

### Методы проверки

```javascript
// Проверка на массив
Array.isArray([1, 2, 3]); // true

// Проверка на NaN
isNaN(NaN); // true
Number.isNaN(NaN); // true (более точная проверка)

// Проверка на число
Number.isFinite(42); // true
Number.isFinite(Infinity); // false
```

## Преобразование типов

### Явное преобразование

```javascript
// В строку
String(123); // "123"
(123).toString(); // "123"

// В число
Number("123"); // 123
parseInt("123"); // 123
parseFloat("3.14"); // 3.14

// В булево
Boolean(1); // true
Boolean(0); // false
!!1; // true
```

### Неявное преобразование

```javascript
// Строковая конкатенация
"5" + 3; // "53"

// Математические операции
"5" - 3; // 2
"5" * 2; // 10

// Логические операции
if ("text") { // true (непустая строка)
  console.log("Выполнится");
}
```

## Сравнительная таблица типов

| Тип | typeof | Пример | Изменяемость |
|-----|--------|--------|--------------|
| Number | "number" | 42, 3.14 | Неизменяемый |
| String | "string" | "text" | Неизменяемый |
| Boolean | "boolean" | true, false | Неизменяемый |
| Undefined | "undefined" | undefined | Неизменяемый |
| Null | "object" | null | Неизменяемый |
| Symbol | "symbol" | Symbol() | Неизменяемый |
| BigInt | "bigint" | 1n | Неизменяемый |
| Object | "object" | {}, [] | Изменяемый |
| Function | "function" | function() {} | Изменяемый |

## Лучшие практики

### ✅ Делайте:

1. **Используйте строгое сравнение** — `===` вместо `==`
2. **Проверяйте типы явно** — используйте `typeof`, `instanceof`, `Array.isArray()`
3. **Используйте `null`** — для явного указания отсутствия значения
4. **Проверяйте на `NaN`** — используйте `Number.isNaN()`

### ❌ Не делайте:

1. **Не полагайтесь на `typeof null`** — используйте `=== null`
2. **Не смешивайте типы** — без явного преобразования
3. **Не используйте `undefined`** — явно (лучше `null`)

## Заключение

Типы данных в JavaScript:

- **7 примитивных типов** — Number, String, Boolean, Undefined, Null, Symbol, BigInt
- **Объектные типы** — Object, Array, Function, Date, RegExp и другие
- **Динамическая типизация** — переменные не привязаны к типу
- **Проверка типов** — `typeof`, `instanceof`, специальные методы
- **Преобразование типов** — явное и неявное

**Помните:** понимание типов данных критически важно для написания правильного JavaScript кода. Всегда проверяйте типы явно, используйте строгое сравнение и помните об особенностях каждого типа (например, `typeof null` возвращает `"object"`).

