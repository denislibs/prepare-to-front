# Что такое функции высшего порядка (Higher Order Functions)?

Функции высшего порядка (Higher Order Functions, HOF) — это функции, которые принимают другие функции в качестве аргументов или возвращают функции в качестве результата. Понимание функций высшего порядка критически важно для написания функционального, чистого и переиспользуемого JavaScript кода.

## Что такое функции высшего порядка?

Функция высшего порядка — это функция, которая:
1. **Принимает функцию как аргумент**, или
2. **Возвращает функцию как результат**, или
3. **Делает и то, и другое**

### Характеристики:

- ✅ **Принимают функции** — как параметры
- ✅ **Возвращают функции** — как результат
- ✅ **Абстракция** — позволяют абстрагировать общие паттерны
- ✅ **Композиция** — позволяют комбинировать функции
- ✅ **Переиспользование** — делают код более гибким

## Функции, принимающие функции

### Пример 1: map()

```javascript
// map - принимает функцию и применяет к каждому элементу
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// С arrow function
const doubled = numbers.map(num => num * 2);
```

### Пример 2: filter()

```javascript
// filter - принимает функцию-предикат
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evens); // [2, 4, 6, 8, 10]

// С arrow function
const evens = numbers.filter(num => num % 2 === 0);
```

### Пример 3: reduce()

```javascript
// reduce - принимает функцию-аккумулятор
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(function(acc, num) {
  return acc + num;
}, 0);
console.log(sum); // 15

// С arrow function
const sum = numbers.reduce((acc, num) => acc + num, 0);
```

### Пример 4: forEach()

```javascript
// forEach - принимает функцию для выполнения
const numbers = [1, 2, 3];

numbers.forEach(function(num) {
  console.log(num);
});
// 1
// 2
// 3

// С arrow function
numbers.forEach(num => console.log(num));
```

## Функции, возвращающие функции

### Пример 1: Фабрика функций

```javascript
// Функция, возвращающая функцию
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Пример 2: Каррирование

```javascript
// Каррированная функция
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const add5 = add(5);
const add5And10 = add5(10);
console.log(add5And10(15)); // 30

// Или сразу
console.log(add(5)(10)(15)); // 30
```

### Пример 3: Декораторы

```javascript
// Функция-декоратор
function withLogging(fn) {
  return function(...args) {
    console.log(`Вызов функции с аргументами:`, args);
    const result = fn(...args);
    console.log(`Результат:`, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Вызов функции с аргументами: [2, 3]
// Результат: 5
```

## Комбинирование: принимают и возвращают функции

### Пример 1: Композиция функций

```javascript
// Композиция функций
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiplyByTwo, addOne);
console.log(composed(3)); // ((3 + 1) * 2) ^ 2 = 64
```

### Пример 2: Частичное применение

```javascript
// Частичное применение
function partial(fn, ...args) {
  return function(...remainingArgs) {
    return fn(...args, ...remainingArgs);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, "Hello");
console.log(sayHello("John", "!")); // "Hello, John!"
```

## Встроенные функции высшего порядка в JavaScript

### Массивы:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - преобразование
const doubled = numbers.map(x => x * 2);

// filter - фильтрация
const evens = numbers.filter(x => x % 2 === 0);

// reduce - аккумуляция
const sum = numbers.reduce((acc, x) => acc + x, 0);

// forEach - итерация
numbers.forEach(x => console.log(x));

// find - поиск
const found = numbers.find(x => x > 3);

// some - проверка хотя бы одного
const hasEven = numbers.some(x => x % 2 === 0);

// every - проверка всех
const allPositive = numbers.every(x => x > 0);
```

## Практические примеры

### Пример 1: Обработка данных

```javascript
// Обработка массива пользователей
const users = [
  { name: "John", age: 25, active: true },
  { name: "Jane", age: 30, active: false },
  { name: "Bob", age: 35, active: true }
];

// Активные пользователи старше 28
const result = users
  .filter(user => user.active)
  .filter(user => user.age > 28)
  .map(user => user.name);

console.log(result); // ["Bob"]
```

### Пример 2: Создание утилит

```javascript
// Функция для создания валидаторов
function createValidator(rule) {
  return function(value) {
    return rule(value);
  };
}

const isEmail = createValidator(value => value.includes('@'));
const isLong = createValidator(value => value.length > 10);

console.log(isEmail("test@example.com")); // true
console.log(isLong("short")); // false
```

### Пример 3: Обработка ошибок

```javascript
// Функция для обработки ошибок
function withErrorHandling(fn) {
  return async function(...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  };
}

const safeFetch = withErrorHandling(fetch);
```

### Пример 4: Мемоизация

```javascript
// Функция для мемоизации
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveFunction = memoize(function(n) {
  console.log("Вычисление...");
  return n * n;
});

console.log(expensiveFunction(5)); // "Вычисление..." 25
console.log(expensiveFunction(5)); // 25 (из кеша)
```

## Преимущества функций высшего порядка

### 1. **Абстракция**

```javascript
// Вместо повторения кода
function processNumbers(numbers, operation) {
  return numbers.map(operation);
}

const doubled = processNumbers([1, 2, 3], x => x * 2);
const squared = processNumbers([1, 2, 3], x => x * x);
```

### 2. **Переиспользование**

```javascript
// Одна функция для разных операций
function createOperation(operator) {
  return function(a, b) {
    switch(operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
    }
  };
}

const add = createOperation('+');
const multiply = createOperation('*');
```

### 3. **Композиция**

```javascript
// Комбинирование функций
const process = compose(
  x => x * 2,
  x => x + 1,
  x => x * x
);

console.log(process(3)); // ((3^2) + 1) * 2 = 20
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте встроенные HOF** — map, filter, reduce
2. **Создавайте свои HOF** — для абстракции паттернов
3. **Комбинируйте функции** — для создания сложной логики
4. **Используйте композицию** — вместо вложенных вызовов

### ❌ Не делайте:

1. **Не злоупотребляйте** — используйте только когда нужно
2. **Не усложняйте** — простые случаи не требуют HOF
3. **Не забывайте про читаемость** — код должен быть понятным

## Заключение

Функции высшего порядка:

- **Принимают или возвращают функции** — как аргументы или результат
- **Абстракция** — позволяют абстрагировать общие паттерны
- **Переиспользование** — делают код более гибким
- **Композиция** — позволяют комбинировать функции

**Помните:** функции высшего порядка — это мощный инструмент для написания функционального и переиспользуемого кода. Используйте встроенные HOF (map, filter, reduce) для работы с массивами, создавайте свои HOF для абстракции паттернов и комбинируйте функции для создания сложной логики. Понимание HOF критически важно для написания современного JavaScript кода.

