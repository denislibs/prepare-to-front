# Разница между function declaration и function expression?

В JavaScript функции можно объявлять двумя способами: через function declaration (объявление функции) и function expression (функциональное выражение). Понимание различий между этими подходами критически важно для написания правильного кода, так как они ведут себя по-разному в отношении hoisting (поднятия), области видимости и использования.

## Function Declaration (Объявление функции)

Function declaration — это способ объявления функции с использованием ключевого слова `function` и имени функции.

### Синтаксис:

```javascript
function functionName(parameters) {
  // тело функции
}
```

### Характеристики:

- ✅ **Поднимается (hoisting)** — доступна до объявления
- ✅ **Имеет имя** — всегда имеет имя функции
- ✅ **Создает переменную** — в текущей области видимости
- ✅ **Можно вызвать до объявления** — благодаря hoisting

### Примеры:

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // "Hello, John!"

// Можно вызвать до объявления (благодаря hoisting)
sayHello(); // "Hello!"

function sayHello() {
  console.log("Hello!");
}
```

## Function Expression (Функциональное выражение)

Function expression — это способ создания функции, где функция присваивается переменной.

### Синтаксис:

```javascript
const functionName = function(parameters) {
  // тело функции
};
```

### Характеристики:

- ⚠️ **Не поднимается** — недоступна до объявления
- ✅ **Может быть анонимной** — может не иметь имени
- ✅ **Гибкость** — можно присваивать переменным
- ⚠️ **Нельзя вызвать до объявления** — вызовет ошибку

### Примеры:

```javascript
// Function expression
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet("John")); // "Hello, John!"

// Нельзя вызвать до объявления
sayHello(); // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = function() {
  console.log("Hello!");
};
```

## Ключевые различия

### 1. **Hoisting (Поднятие)**

**Function Declaration:**
```javascript
// ✅ Работает - функция поднимается
sayHello(); // "Hello!"

function sayHello() {
  console.log("Hello!");
}
```

**Function Expression:**
```javascript
// ❌ Ошибка - переменная поднимается, но не инициализируется
sayHello(); // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = function() {
  console.log("Hello!");
};
```

### 2. **Именованные функции**

**Function Declaration:**
```javascript
// Всегда имеет имя
function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum.name); // "calculateSum"
```

**Function Expression:**
```javascript
// Может быть анонимной
const calculateSum = function(a, b) {
  return a + b;
};

console.log(calculateSum.name); // "calculateSum" (имя берется из переменной)

// Или именованной
const calculateSum = function sum(a, b) {
  return a + b;
};

console.log(calculateSum.name); // "sum"
```

### 3. **Область видимости**

**Function Declaration:**
```javascript
// Создает переменную в текущей области видимости
if (true) {
  function test() {
    console.log("test");
  }
}

test(); // Доступна (в зависимости от режима)
```

**Function Expression:**
```javascript
// Ограничена областью видимости переменной
if (true) {
  const test = function() {
    console.log("test");
  };
}

test(); // ReferenceError: test is not defined
```

### 4. **Использование в условных конструкциях**

**Function Declaration:**
```javascript
// ❌ Проблемы в условных конструкциях
if (true) {
  function test() {
    console.log("true");
  }
} else {
  function test() {
    console.log("false");
  }
}

test(); // Поведение зависит от браузера и режима
```

**Function Expression:**
```javascript
// ✅ Работает правильно
let test;

if (true) {
  test = function() {
    console.log("true");
  };
} else {
  test = function() {
    console.log("false");
  };
}

test(); // "true"
```

## Arrow Functions (Стрелочные функции)

Arrow functions — это разновидность function expression с упрощенным синтаксисом.

```javascript
// Arrow function
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Или короче
const greet = name => `Hello, ${name}!`;

// Не поднимается
greet("John"); // ReferenceError если вызвать до объявления
```

## Практические примеры

### Пример 1: Hoisting

```javascript
// Function Declaration
console.log(typeof sayHello); // "function" (поднята)
sayHello(); // "Hello!"

function sayHello() {
  console.log("Hello!");
}

// Function Expression
console.log(typeof sayGoodbye); // "undefined" (не поднята)
sayGoodbye(); // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
  console.log("Goodbye!");
};
```

### Пример 2: Условное создание функций

```javascript
// ✅ Function Expression - правильный подход
let operation;

if (user.isAdmin) {
  operation = function() {
    return "admin operation";
  };
} else {
  operation = function() {
    return "user operation";
  };
}

// ❌ Function Declaration - проблематично
if (user.isAdmin) {
  function operation() {
    return "admin operation";
  }
} else {
  function operation() {
    return "user operation";
  }
}
```

### Пример 3: Callbacks

```javascript
// Function Expression - удобно для callbacks
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
  return num * 2;
});

// Arrow Function - еще удобнее
const doubled = numbers.map(num => num * 2);
```

### Пример 4: Рекурсия

```javascript
// Function Declaration - удобно для рекурсии
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Может использовать свое имя
}

// Function Expression - тоже работает
const factorial = function(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Использует имя переменной
};
```

## Сравнительная таблица

| Характеристика | Function Declaration | Function Expression |
|----------------|---------------------|---------------------|
| **Hoisting** | ✅ Да | ❌ Нет |
| **Имя функции** | ✅ Всегда есть | ⚠️ Может быть анонимной |
| **Вызов до объявления** | ✅ Да | ❌ Нет |
| **Условное создание** | ⚠️ Проблематично | ✅ Работает |
| **Использование как значение** | ❌ Нет | ✅ Да |
| **Arrow functions** | ❌ Нет | ✅ Да |

## Когда использовать что?

### ✅ Function Declaration:

1. **Основные функции** — когда функция является основной частью кода
2. **Рекурсия** — когда нужна рекурсия
3. **Когда нужен hoisting** — когда нужно вызвать до объявления
4. **Публичные API** — для экспорта функций

```javascript
// ✅ Хорошо для основных функций
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Хорошо для рекурсии
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### ✅ Function Expression:

1. **Callbacks** — для передачи в другие функции
2. **Условное создание** — когда функция создается условно
3. **Приватные функции** — для ограничения области видимости
4. **Arrow functions** — для коротких функций

```javascript
// ✅ Хорошо для callbacks
button.addEventListener('click', function() {
  console.log('Clicked');
});

// ✅ Хорошо для условного создания
const handler = condition ? functionA : functionB;

// ✅ Хорошо для arrow functions
const numbers = [1, 2, 3].map(n => n * 2);
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте function declaration** — для основных функций
2. **Используйте function expression** — для callbacks и условных функций
3. **Используйте arrow functions** — для коротких функций
4. **Будьте последовательны** — выберите стиль и придерживайтесь его

### ❌ Не делайте:

1. **Не используйте function declaration** — в условных конструкциях
2. **Не полагайтесь на hoisting** — если не нужно
3. **Не смешивайте стили** — без необходимости

## Заключение

Разница между function declaration и function expression:

- **Function Declaration** — поднимается, можно вызвать до объявления
- **Function Expression** — не поднимается, более гибкая
- **Выбор зависит от контекста** — используйте подходящий вариант
- **Arrow Functions** — разновидность function expression

**Помните:** выбор между function declaration и function expression зависит от контекста использования. Используйте function declaration для основных функций, которые нужны на протяжении всего кода, и function expression (включая arrow functions) для callbacks, условных функций и случаев, когда нужна гибкость. Всегда учитывайте hoisting и область видимости при выборе подхода.

