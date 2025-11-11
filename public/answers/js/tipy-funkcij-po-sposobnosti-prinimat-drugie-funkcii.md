# Типы функций по способности принимать другие функции?

В JavaScript функции можно классифицировать по их способности принимать другие функции в качестве аргументов. Это важная концепция функционального программирования, которая определяет, как функции взаимодействуют друг с другом. Понимание типов функций критически важно для написания функционального и переиспользуемого кода.

## Типы функций

### 1. **Функции высшего порядка (Higher Order Functions)**

Функции, которые принимают другие функции в качестве аргументов или возвращают функции.

```javascript
// Принимает функцию как аргумент
function processData(data, processor) {
  return processor(data);
}

// Возвращает функцию
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
```

### 2. **Обычные функции (First Order Functions)**

Функции, которые не принимают функции в качестве аргументов.

```javascript
function add(a, b) {
  return a + b;
}

function greet(name) {
  return `Hello, ${name}`;
}
```

### 3. **Функции первого класса (First Class Functions)**

Функции, которые могут быть использованы как значения (присвоены переменным, переданы как аргументы, возвращены из функций).

```javascript
// Присвоение переменной
const add = function(a, b) {
  return a + b;
};

// Передача как аргумент
function calculate(a, b, operation) {
  return operation(a, b);
}

// Возврат из функции
function getOperation(type) {
  if (type === "add") {
    return function(a, b) { return a + b; };
  }
}
```

## Практические примеры

### Пример 1: Функции высшего порядка

```javascript
// map, filter, reduce - функции высшего порядка
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### Пример 2: Callbacks

```javascript
// Callback функции
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

## Заключение

Типы функций:

- **Функции высшего порядка** — принимают или возвращают функции
- **Обычные функции** — не работают с функциями
- **Функции первого класса** — используются как значения

**Помните:** понимание типов функций помогает писать более функциональный и переиспользуемый код. Используйте функции высшего порядка для создания гибких и мощных абстракций.

