# Плюсы и минусы использования `use strict`?

`"use strict"` — это директива в JavaScript, которая включает строгий режим выполнения кода. Строгий режим вводит более строгие правила и помогает выявлять ошибки на ранних этапах. Понимание плюсов и минусов строгого режима критически важно для написания качественного и безопасного JavaScript кода.

## Что такое use strict?

`"use strict"` — это директива, которая включает строгий режим выполнения JavaScript кода. В строгом режиме некоторые действия, которые были допустимы в обычном режиме, теперь вызывают ошибки.

### Характеристики:

- ✅ **Строгие правила** — более строгая проверка кода
- ✅ **Выявление ошибок** — на ранних этапах
- ✅ **Лучшая оптимизация** — компилятор может лучше оптимизировать
- ✅ **Безопасность** — предотвращение некоторых проблем

## Плюсы использования use strict

### 1. **Предотвращение ошибок**

```javascript
"use strict";

// ❌ Ошибка - необъявленная переменная
x = 10; // ReferenceError: x is not defined

// ✅ Правильно
let x = 10;
```

### 2. **Запрет небезопасных операций**

```javascript
"use strict";

// ❌ Ошибка - удаление переменной
let x = 10;
delete x; // SyntaxError: Delete of an unqualified identifier

// ❌ Ошибка - дублирование параметров
function test(a, a) { // SyntaxError: Duplicate parameter name
  return a;
}
```

### 3. **Более предсказуемое поведение this**

```javascript
"use strict";

function test() {
  console.log(this); // undefined (вместо window)
}

test(); // undefined

// В обычном режиме this был бы window
```

### 4. **Запрет использования зарезервированных слов**

```javascript
"use strict";

// ❌ Ошибка - использование зарезервированных слов
let let = 10; // SyntaxError: Unexpected strict mode reserved word
let implements = 10; // SyntaxError
```

### 5. **Запрет восьмеричных литералов**

```javascript
"use strict";

// ❌ Ошибка - восьмеричные литералы
let num = 010; // SyntaxError: Octal literals are not allowed

// ✅ Правильно
let num = 0o10; // Восьмеричный через 0o
```

### 6. **Запрет with**

```javascript
"use strict";

// ❌ Ошибка - использование with
with (obj) { // SyntaxError: Strict mode code may not include a with statement
  name = "John";
}
```

## Минусы использования use strict

### 1. **Несовместимость со старым кодом**

```javascript
// Старый код может не работать
function oldCode() {
  x = 10; // Ошибка в strict mode
  // Код нужно переписать
}
```

### 2. **Требует явного объявления**

```javascript
"use strict";

// Все переменные должны быть объявлены
// Больше кода для написания
let x = 10;
let y = 20;
// Вместо просто x = 10; y = 20;
```

### 3. **Некоторые библиотеки могут не работать**

```javascript
// Некоторые старые библиотеки могут не работать в strict mode
// Требуется обновление или обходные пути
```

### 4. **this ведет себя по-другому**

```javascript
"use strict";

// this может быть undefined вместо window
// Может сломать код, который полагается на this === window
```

## Практические примеры

### Пример 1: Предотвращение ошибок

```javascript
"use strict";

function calculateTotal(items) {
  total = 0; // ReferenceError - переменная не объявлена
  for (let item of items) {
    total += item.price;
  }
  return total;
}

// ✅ Правильно
function calculateTotal(items) {
  let total = 0; // Явное объявление
  for (let item of items) {
    total += item.price;
  }
  return total;
}
```

### Пример 2: Безопасность

```javascript
"use strict";

// ❌ Нельзя случайно создать глобальную переменную
function test() {
  x = 10; // ReferenceError
}

// ✅ Явное объявление
function test() {
  let x = 10; // Правильно
}
```

### Пример 3: this в функциях

```javascript
"use strict";

function test() {
  console.log(this); // undefined
}

test(); // undefined

// В обычном режиме было бы window
```

## Область применения

### Глобальный strict mode:

```javascript
"use strict";

// Весь файл в strict mode
function test() {
  // Код в strict mode
}
```

### Локальный strict mode:

```javascript
function test() {
  "use strict";
  // Только эта функция в strict mode
  x = 10; // ReferenceError
}

function other() {
  // Не в strict mode
  x = 10; // Создает глобальную переменную
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте strict mode** — для новых проектов
2. **Включайте в начале файла** — для всего файла
3. **Используйте для модулей** — ES6 модули автоматически в strict mode
4. **Тестируйте код** — в strict mode

### ❌ Не делайте:

1. **Не смешивайте режимы** — будьте последовательны
2. **Не полагайтесь на нестрогие особенности** — пишите правильный код
3. **Не игнорируйте ошибки** — исправляйте их

## Современный JavaScript

### ES6 модули:

```javascript
// ES6 модули автоматически в strict mode
// module.js
export function test() {
  x = 10; // ReferenceError (автоматически strict mode)
}
```

### Классы:

```javascript
// Классы автоматически в strict mode
class MyClass {
  test() {
    x = 10; // ReferenceError (автоматически strict mode)
  }
}
```

## Заключение

Плюсы и минусы `use strict`:

**Плюсы:**
- ✅ Предотвращение ошибок
- ✅ Более безопасный код
- ✅ Лучшая оптимизация
- ✅ Предсказуемое поведение

**Минусы:**
- ⚠️ Несовместимость со старым кодом
- ⚠️ Требует явного объявления
- ⚠️ Некоторые библиотеки могут не работать
- ⚠️ this ведет себя по-другому

**Помните:** `use strict` — это мощный инструмент для написания более безопасного и правильного кода. Используйте его для новых проектов, включайте в начале файлов и понимайте изменения в поведении. В современном JavaScript ES6 модули и классы автоматически работают в strict mode, поэтому явное указание `"use strict"` часто не требуется.

