# Что такое Strict mode в JavaScript?

Strict mode (строгий режим) — это способ ввести ограниченный вариант JavaScript, который делает код более безопасным и помогает выявлять ошибки на ранних этапах. Понимание strict mode критически важно для написания качественного JavaScript кода, так как он предотвращает многие распространенные ошибки и делает код более предсказуемым.

## Что такое Strict Mode?

Strict mode — это режим выполнения JavaScript, который применяет более строгие правила к коду. Он был введен в ES5 для устранения некоторых проблемных особенностей JavaScript и подготовки к будущим версиям языка.

### Характеристики:

- ✅ **Предотвращает ошибки** — выявляет небезопасные действия
- ✅ **Улучшает производительность** — некоторые оптимизации возможны только в strict mode
- ✅ **Запрещает устаревшие конструкции** — блокирует использование устаревших возможностей
- ✅ **Подготавливает к будущему** — некоторые будущие ключевые слова зарезервированы

## Как включить Strict Mode?

### Для всего файла (скрипта):

```javascript
"use strict";

// Весь код в файле выполняется в strict mode
let x = 5;
```

### Для функции:

```javascript
function strictFunction() {
  "use strict";
  // Только эта функция в strict mode
  let y = 10;
}

function normalFunction() {
  // Эта функция не в strict mode
  let z = 15;
}
```

### В модулях ES6:

```javascript
// Модули автоматически в strict mode
export function myFunction() {
  // Уже в strict mode
}
```

## Основные изменения в Strict Mode

### 1. **Нельзя использовать необъявленные переменные**

```javascript
// ❌ В обычном режиме (не рекомендуется)
x = 5; // Создает глобальную переменную
console.log(x); // 5

// ✅ В strict mode
"use strict";
x = 5; // ReferenceError: x is not defined
```

### 2. **Нельзя удалять переменные, функции или аргументы**

```javascript
// ❌ В обычном режиме (не рекомендуется)
var x = 5;
delete x; // false (но не ошибка)

// ✅ В strict mode
"use strict";
var x = 5;
delete x; // SyntaxError: Delete of an unqualified identifier in strict mode
```

### 3. **Дублирование имен параметров запрещено**

```javascript
// ❌ В обычном режиме (не рекомендуется)
function duplicate(a, a) {
  return a;
}

// ✅ В strict mode
"use strict";
function duplicate(a, a) { // SyntaxError: Duplicate parameter name not allowed
  return a;
}
```

### 4. **Нельзя использовать зарезервированные слова как имена переменных**

```javascript
// ❌ В обычном режиме (не рекомендуется)
var implements = 5;
var interface = 10;

// ✅ В strict mode
"use strict";
var implements = 5; // SyntaxError: Unexpected strict mode reserved word
var interface = 10; // SyntaxError: Unexpected strict mode reserved word
```

### 5. **this в функциях не привязывается к глобальному объекту**

```javascript
// ❌ В обычном режиме
function test() {
  console.log(this); // Window (в браузере) или global (в Node.js)
}
test();

// ✅ В strict mode
"use strict";
function test() {
  console.log(this); // undefined
}
test();
```

### 6. **eval не создает переменные в окружающей области видимости**

```javascript
// ❌ В обычном режиме
eval("var x = 5;");
console.log(x); // 5

// ✅ В strict mode
"use strict";
eval("var x = 5;");
console.log(x); // ReferenceError: x is not defined
```

### 7. **Запрещено присваивание свойствам только для чтения**

```javascript
// ✅ В strict mode
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {
  value: 5,
  writable: false
});

obj.x = 10; // TypeError: Cannot assign to read only property 'x'
```

### 8. **Запрещено присваивание свойствам, которые не существуют**

```javascript
// ✅ В strict mode
"use strict";
var obj = {};
Object.preventExtensions(obj);

obj.newProp = 10; // TypeError: Cannot add property newProp, object is not extensible
```

### 9. **arguments не синхронизируется с параметрами**

```javascript
// ❌ В обычном режиме
function test(a) {
  a = 10;
  console.log(arguments[0]); // 10 (синхронизировано)
}

// ✅ В strict mode
"use strict";
function test(a) {
  a = 10;
  console.log(arguments[0]); // 5 (не синхронизировано)
}
test(5);
```

### 10. **Запрещено использование with**

```javascript
// ❌ В обычном режиме (не рекомендуется)
var obj = { x: 5 };
with (obj) {
  console.log(x); // 5
}

// ✅ В strict mode
"use strict";
var obj = { x: 5 };
with (obj) { // SyntaxError: Strict mode code may not include a with statement
  console.log(x);
}
```

## Практические примеры

### Пример 1: Предотвращение ошибок

```javascript
// ❌ Без strict mode
function calculateTotal(items) {
  total = 0; // Создает глобальную переменную (ошибка!)
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// ✅ С strict mode
"use strict";
function calculateTotal(items) {
  let total = 0; // Должно быть объявлено
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
```

### Пример 2: Безопасное использование this

```javascript
// ❌ Без strict mode
function Person(name) {
  this.name = name;
}

// Забыли new - создает глобальную переменную
var person = Person("John");
console.log(name); // "John" (глобальная переменная!)

// ✅ С strict mode
"use strict";
function Person(name) {
  this.name = name;
}

// Забыли new - ошибка
var person = Person("John"); // TypeError: Cannot set property 'name' of undefined
```

### Пример 3: Защита от опечаток

```javascript
// ❌ Без strict mode
var obj = { value: 5 };
obj.val = 10; // Опечатка, но не ошибка

// ✅ С strict mode (с Object.freeze)
"use strict";
var obj = Object.freeze({ value: 5 });
obj.val = 10; // TypeError: Cannot add property val
```

## Преимущества Strict Mode

### 1. **Безопасность**

- Предотвращает случайное создание глобальных переменных
- Защищает от ошибок с `this`
- Блокирует опасные операции

### 2. **Производительность**

- Некоторые оптимизации возможны только в strict mode
- Более быстрая работа с `arguments`
- Улучшенная работа с `eval`

### 3. **Чистота кода**

- Заставляет использовать правильные практики
- Выявляет ошибки на ранних этапах
- Подготавливает к будущим версиям JavaScript

### 4. **Отладка**

- Ошибки выявляются сразу
- Нет скрытых проблем
- Более понятные сообщения об ошибках

## Недостатки Strict Mode

### 1. **Обратная совместимость**

- Старый код может не работать
- Нужно обновлять существующий код
- Некоторые библиотеки могут не поддерживать

### 2. **Смешивание режимов**

- Проблемы при смешивании strict и non-strict кода
- Нужно быть осторожным при интеграции

## Лучшие практики

### ✅ Делайте:

1. **Используйте strict mode** — для всех новых проектов
2. **Включайте в начале файла** — `"use strict";` в первой строке
3. **Используйте модули ES6** — они автоматически в strict mode
4. **Тестируйте код** — убедитесь, что все работает

### ❌ Не делайте:

1. **Не смешивайте режимы** — в одном файле
2. **Не полагайтесь на нестрогие правила** — используйте правильные практики
3. **Не игнорируйте ошибки** — исправляйте их

## Современные стандарты

### ES6 модули:

```javascript
// Модули автоматически в strict mode
export function myFunction() {
  // Уже в strict mode
  let x = 5;
}
```

### Классы ES6:

```javascript
// Классы автоматически в strict mode
class MyClass {
  constructor() {
    // Уже в strict mode
    let x = 5;
  }
}
```

## Заключение

Strict mode:

- **Режим выполнения** — с более строгими правилами
- **Предотвращает ошибки** — выявляет проблемы на ранних этапах
- **Улучшает производительность** — позволяет оптимизации
- **Рекомендуется использовать** — для всех новых проектов
- **Автоматически включен** — в модулях ES6 и классах

**Помните:** strict mode — это важный инструмент для написания качественного JavaScript кода. Используйте его для всех новых проектов, так как он предотвращает многие распространенные ошибки, улучшает производительность и подготавливает код к будущим версиям JavaScript. Всегда включайте `"use strict";` в начале файла или используйте модули ES6, которые автоматически работают в strict mode.

