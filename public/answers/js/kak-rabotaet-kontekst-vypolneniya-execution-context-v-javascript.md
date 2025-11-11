# Как работает контекст выполнения (execution context) в JavaScript?

Контекст выполнения (execution context) — это концептуальная среда, в которой выполняется JavaScript код. Понимание контекста выполнения критически важно для понимания работы JavaScript, области видимости, поднятия переменных и замыканий.

## Что такое контекст выполнения?

Контекст выполнения — это абстрактная концепция, описывающая окружение, в котором выполняется JavaScript код. Каждый раз, когда выполняется код, создается новый контекст выполнения.

### Характеристики:

- ✅ **Создается для каждого вызова** — функции или скрипта
- ✅ **Содержит переменные** — и их значения
- ✅ **Содержит this** — ссылку на объект
- ✅ **Имеет область видимости** — цепочку областей видимости

## Типы контекстов выполнения

### 1. **Глобальный контекст (Global Execution Context)**

Создается при загрузке скрипта.

```javascript
// Глобальный контекст выполнения
var globalVar = "I'm global";

function myFunction() {
  // Новый контекст выполнения для функции
  var localVar = "I'm local";
  console.log(globalVar); // Доступ к глобальной переменной
  console.log(localVar); // Доступ к локальной переменной
}

myFunction();
```

### 2. **Контекст функции (Function Execution Context)**

Создается при вызове функции.

```javascript
function outer() {
  // Контекст выполнения outer
  var outerVar = "outer";
  
  function inner() {
    // Контекст выполнения inner
    var innerVar = "inner";
    console.log(outerVar); // Доступ к переменной из внешнего контекста
    console.log(innerVar); // Доступ к локальной переменной
  }
  
  inner();
}

outer();
```

### 3. **Контекст eval (Eval Execution Context)**

Создается при выполнении кода через eval (не рекомендуется).

```javascript
// ❌ Не рекомендуется
eval("var evalVar = 'eval';");
```

## Структура контекста выполнения

### 1. **Variable Environment (Lexical Environment)**

Хранит переменные и функции, объявленные в контексте.

```javascript
function example() {
  var a = 1;
  let b = 2;
  const c = 3;
  
  // Все переменные хранятся в Variable Environment
}
```

### 2. **Scope Chain (Цепочка областей видимости)**

Связывает контексты выполнения для доступа к переменным из внешних областей.

```javascript
var global = "global";

function outer() {
  var outerVar = "outer";
  
  function inner() {
    var innerVar = "inner";
    console.log(global); // Доступ через scope chain
    console.log(outerVar); // Доступ через scope chain
    console.log(innerVar); // Локальная переменная
  }
  
  inner();
}

outer();
```

### 3. **this Binding**

Ссылка на объект, в контексте которого выполняется код.

```javascript
const obj = {
  name: "John",
  greet: function() {
    console.log(this.name); // this ссылается на obj
  }
};

obj.greet(); // "John"
```

## Жизненный цикл контекста выполнения

### 1. **Создание (Creation Phase)**

```javascript
// Фаза создания контекста
function example() {
  // 1. Создание Variable Environment
  // 2. Создание Scope Chain
  // 3. Определение this
  // 4. Hoisting переменных и функций
}
```

### 2. **Выполнение (Execution Phase)**

```javascript
// Фаза выполнения кода
function example() {
  var a = 1; // Присваивание значения
  console.log(a); // Использование переменной
}
```

## Hoisting (Поднятие)

### Переменные:

```javascript
// Код
console.log(a); // undefined (не ошибка!)
var a = 5;

// Интерпретируется как
var a; // Объявление поднимается
console.log(a); // undefined
a = 5; // Присваивание остается на месте
```

### Функции:

```javascript
// Function Declaration - поднимается полностью
console.log(myFunction()); // "Hello" (работает!)

function myFunction() {
  return "Hello";
}

// Function Expression - не поднимается
console.log(myFunc()); // TypeError: myFunc is not a function

var myFunc = function() {
  return "Hello";
};
```

## Практические примеры

### Пример 1: Вложенные контексты

```javascript
var globalVar = "global";

function outer() {
  var outerVar = "outer";
  console.log(globalVar); // "global" (через scope chain)
  console.log(outerVar); // "outer" (локальная)
  
  function inner() {
    var innerVar = "inner";
    console.log(globalVar); // "global" (через scope chain)
    console.log(outerVar); // "outer" (через scope chain)
    console.log(innerVar); // "inner" (локальная)
  }
  
  inner();
}

outer();
```

### Пример 2: this в разных контекстах

```javascript
// Глобальный контекст
console.log(this); // window (в браузере)

// Контекст функции
function regularFunction() {
  console.log(this); // window (в нестрогом режиме)
}

// Контекст метода
const obj = {
  name: "John",
  greet: function() {
    console.log(this.name); // "John" (this = obj)
  }
};

obj.greet();

// Контекст стрелочной функции
const arrowFunction = () => {
  console.log(this); // this из внешнего контекста
};
```

### Пример 3: Замыкания

```javascript
function outer() {
  var outerVar = "outer";
  
  function inner() {
    // inner имеет доступ к outerVar через scope chain
    console.log(outerVar); // "outer"
  }
  
  return inner; // Возвращаем функцию, которая сохраняет доступ к outerVar
}

const closure = outer();
closure(); // "outer" (замыкание сохраняет контекст outer)
```

## Call Stack (Стек вызовов)

### Как работает стек:

```javascript
function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();
// Call Stack:
// 1. first() - создается контекст
// 2. second() - создается контекст (first еще активен)
// 3. third() - создается контекст (first и second еще активны)
// 4. third() - завершается, контекст удаляется
// 5. second() - завершается, контекст удаляется
// 6. first() - завершается, контекст удаляется
```

## Лучшие практики

### ✅ Делайте:

1. **Понимайте scope chain** — для доступа к переменным
2. **Используйте let/const** — вместо var для блочной области видимости
3. **Понимайте this** — в разных контекстах
4. **Используйте замыкания** — для инкапсуляции

### ❌ Не делайте:

1. **Не полагайтесь на hoisting** — объявляйте переменные перед использованием
2. **Не создавайте глубокую вложенность** — усложняет понимание
3. **Не забывайте про this** — в разных контекстах

## Заключение

Контекст выполнения:

- **Создается для каждого вызова** — функции или скрипта
- **Содержит Variable Environment** — переменные и функции
- **Имеет Scope Chain** — цепочку областей видимости
- **Имеет this Binding** — ссылку на объект
- **Проходит через фазы** — создания и выполнения

**Помните:** понимание контекста выполнения критически важно для понимания работы JavaScript. Оно объясняет область видимости, поднятие переменных, замыкания и работу this. Понимание контекста выполнения помогает писать более эффективный и понятный код.

