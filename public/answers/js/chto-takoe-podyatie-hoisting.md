# Что такое поднятие (Hoisting)?

Hoisting (поднятие) — это механизм в JavaScript, при котором объявления переменных и функций "поднимаются" в верхнюю часть их области видимости перед выполнением кода. Понимание hoisting критически важно для написания правильного JavaScript кода, так как это влияет на то, как код выполняется и какие значения доступны в разных частях программы.

## Что такое Hoisting?

Hoisting — это поведение JavaScript, при котором объявления переменных и функций перемещаются в верхнюю часть их области видимости (scope) перед выполнением кода. Это означает, что вы можете использовать переменные и функции до их объявления в коде.

### Важно понимать:

- ✅ **Поднимаются только объявления** — не инициализации
- ✅ **Работает по-разному** — для `var`, `let`, `const` и функций
- ✅ **Визуальный эффект** — код выглядит так, как будто объявления перемещены вверх
- ⚠️ **Не физическое перемещение** — это концептуальное объяснение поведения

## Hoisting переменных

### var

Переменные, объявленные с `var`, поднимаются и инициализируются значением `undefined`.

```javascript
// Код выглядит так:
console.log(x); // undefined (не ошибка!)
var x = 5;
console.log(x); // 5

// JavaScript интерпретирует это как:
var x; // Объявление поднято
console.log(x); // undefined
x = 5; // Присваивание остается на месте
console.log(x); // 5
```

### let и const

Переменные, объявленные с `let` и `const`, поднимаются, но не инициализируются. Они находятся в "временной мертвой зоне" (Temporal Dead Zone) до объявления.

```javascript
// ❌ Ошибка - временная мертвая зона
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// ❌ Ошибка - временная мертвая зона
console.log(y); // ReferenceError: Cannot access 'y' before initialization
const y = 10;

// JavaScript интерпретирует это как:
// let x; // Объявление поднято, но не инициализировано
// console.log(x); // Ошибка - попытка доступа до инициализации
// x = 5; // Инициализация
```

## Hoisting функций

### Function Declaration

Function declarations полностью поднимаются, включая тело функции.

```javascript
// ✅ Работает - функция полностью поднята
sayHello(); // "Hello!"

function sayHello() {
  console.log("Hello!");
}

// JavaScript интерпретирует это как:
// function sayHello() {
//   console.log("Hello!");
// }
// sayHello(); // Функция доступна
```

### Function Expression

Function expressions не поднимаются как функции, только переменная поднимается (если используется `var`).

```javascript
// ❌ Ошибка - функция не поднята
sayHello(); // TypeError: sayHello is not a function

var sayHello = function() {
  console.log("Hello!");
};

// JavaScript интерпретирует это как:
// var sayHello; // Переменная поднята, но undefined
// sayHello(); // Ошибка - sayHello это undefined, не функция
// sayHello = function() {
//   console.log("Hello!");
// };
```

### Arrow Functions

Arrow functions ведут себя как function expressions.

```javascript
// ❌ Ошибка - arrow function не поднята
sayHello(); // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = () => {
  console.log("Hello!");
};
```

## Порядок приоритета

При наличии нескольких объявлений порядок hoisting следующий:

1. **Function declarations** — имеют наивысший приоритет
2. **var** — поднимается, но инициализируется `undefined`
3. **let/const** — поднимаются, но в временной мертвой зоне

```javascript
console.log(typeof myFunc); // "function" (function declaration имеет приоритет)
console.log(typeof myVar); // "undefined"

var myVar = "variable";
function myFunc() {
  return "function";
}

// JavaScript интерпретирует это как:
// function myFunc() {
//   return "function";
// }
// var myVar;
// console.log(typeof myFunc); // "function"
// console.log(typeof myVar); // "undefined"
// myVar = "variable";
```

## Практические примеры

### Пример 1: var hoisting

```javascript
// ❌ Проблема - неожиданное поведение
function example() {
  console.log(x); // undefined (не ошибка!)
  var x = 5;
  console.log(x); // 5
}

// ✅ Правильно - объявляйте переменные в начале
function example() {
  var x;
  console.log(x); // undefined
  x = 5;
  console.log(x); // 5
}
```

### Пример 2: let/const hoisting

```javascript
// ❌ Ошибка - временная мертвая зона
function example() {
  console.log(x); // ReferenceError
  let x = 5;
}

// ✅ Правильно - используйте после объявления
function example() {
  let x = 5;
  console.log(x); // 5
}
```

### Пример 3: Function declaration hoisting

```javascript
// ✅ Работает - функция поднята
function example() {
  greet(); // "Hello!"
  
  function greet() {
    console.log("Hello!");
  }
}

// ❌ Не работает - function expression
function example() {
  greet(); // TypeError: greet is not a function
  
  var greet = function() {
    console.log("Hello!");
  };
}
```

### Пример 4: Конфликт имен

```javascript
// Function declaration имеет приоритет
console.log(typeof myValue); // "function"

var myValue = "variable";
function myValue() {
  return "function";
}

console.log(typeof myValue); // "string" (после присваивания)
```

### Пример 5: Вложенные функции

```javascript
function outer() {
  inner(); // ✅ Работает - функция поднята
  
  function inner() {
    console.log("Inner function");
  }
}

outer();
```

## Временная мертвая зона (Temporal Dead Zone)

Temporal Dead Zone (TDZ) — это период между началом области видимости и объявлением переменной, когда переменная недоступна.

```javascript
// Временная мертвая зона для let
console.log(x); // ReferenceError - TDZ

let x = 5; // Конец TDZ

console.log(x); // 5 - доступна
```

## Лучшие практики

### ✅ Делайте:

1. **Объявляйте переменные в начале** — области видимости
2. **Используйте let/const** — вместо var
3. **Объявляйте функции перед использованием** — для ясности
4. **Используйте function declarations** — если нужен hoisting

### ❌ Не делайте:

1. **Не полагайтесь на hoisting** — объявляйте перед использованием
2. **Не используйте var** — используйте let/const
3. **Не создавайте конфликты** — между function declarations и переменными

## Заключение

Hoisting:

- **Механизм JavaScript** — объявления поднимаются в верх области видимости
- **Работает по-разному** — для var, let, const и функций
- **Function declarations** — полностью поднимаются
- **var** — поднимается и инициализируется undefined
- **let/const** — поднимаются, но в временной мертвой зоне

**Помните:** hoisting — это важная особенность JavaScript, но не следует полагаться на него. Всегда объявляйте переменные и функции перед использованием для ясности и избежания ошибок. Используйте `let` и `const` вместо `var`, чтобы избежать проблем с hoisting и временной мертвой зоной.

