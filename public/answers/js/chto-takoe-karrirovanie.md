# Что такое каррирование?

Каррирование (currying) — это техника функционального программирования, при которой функция с несколькими аргументами преобразуется в последовательность функций, каждая из которых принимает один аргумент. Понимание каррирования критически важно для написания более гибкого и переиспользуемого кода.

## Что такое каррирование?

Каррирование — это процесс преобразования функции с несколькими аргументами в последовательность функций, каждая из которых принимает один аргумент.

### Характеристики:

- ✅ **Последовательность функций** — каждая принимает один аргумент
- ✅ **Частичное применение** — можно применять аргументы по частям
- ✅ **Переиспользование** — создание специализированных функций
- ✅ **Функциональный стиль** — техника функционального программирования

### Базовый пример:

```javascript
// Обычная функция
function add(a, b) {
  return a + b;
}

// Каррированная версия
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

// Использование
add(2, 3); // 5
curriedAdd(2)(3); // 5

// Частичное применение
const addTwo = curriedAdd(2);
addTwo(3); // 5
addTwo(5); // 7
```

## Как работает каррирование

### Пример 1: Простое каррирование

```javascript
// Обычная функция
function multiply(a, b, c) {
  return a * b * c;
}

// Каррированная версия
function curriedMultiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

// Использование
multiply(2, 3, 4); // 24
curriedMultiply(2)(3)(4); // 24

// Частичное применение
const multiplyByTwo = curriedMultiply(2);
const multiplyByTwoAndThree = multiplyByTwo(3);
multiplyByTwoAndThree(4); // 24
```

### Пример 2: Стрелочные функции

```javascript
// Каррирование со стрелочными функциями
const curriedAdd = a => b => c => a + b + c;

// Использование
curriedAdd(1)(2)(3); // 6

// Частичное применение
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
addOneAndTwo(3); // 6
```

## Универсальная функция каррирования

### Создание каррированной функции:

```javascript
// Универсальная функция каррирования
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// Использование
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6
```

## Практические примеры

### Пример 1: Фильтрация данных

```javascript
// Каррированная функция фильтрации
const filter = predicate => array => array.filter(predicate);

// Создание специализированных функций
const filterEven = filter(x => x % 2 === 0);
const filterOdd = filter(x => x % 2 !== 0);

// Использование
const numbers = [1, 2, 3, 4, 5, 6];
filterEven(numbers); // [2, 4, 6]
filterOdd(numbers); // [1, 3, 5]
```

### Пример 2: HTTP запросы

```javascript
// Каррированная функция для HTTP запросов
const fetchData = baseURL => endpoint => params => {
  return fetch(`${baseURL}${endpoint}?${new URLSearchParams(params)}`);
};

// Создание специализированных функций
const apiClient = fetchData("https://api.example.com");
const getUser = apiClient("/users");
const getPost = apiClient("/posts");

// Использование
getUser({ id: 1 }); // fetch("https://api.example.com/users?id=1")
getPost({ id: 2 }); // fetch("https://api.example.com/posts?id=2")
```

### Пример 3: Логирование

```javascript
// Каррированная функция логирования
const log = level => message => data => {
  console[level](`[${level.toUpperCase()}] ${message}`, data);
};

// Создание специализированных функций
const logError = log("error");
const logInfo = log("info");
const logWarning = log("warn");

// Использование
logError("Failed to fetch")({ error: "Network error" });
logInfo("User logged in")({ userId: 123 });
```

### Пример 4: Математические операции

```javascript
// Каррированные математические функции
const multiply = a => b => a * b;
const divide = a => b => b / a;
const subtract = a => b => b - a;

// Создание специализированных функций
const double = multiply(2);
const triple = multiply(3);
const divideByTwo = divide(2);

// Использование
double(5); // 10
triple(4); // 12
divideByTwo(10); // 5
```

## Преимущества каррирования

### 1. **Частичное применение**

```javascript
const add = a => b => a + b;
const addFive = add(5);
addFive(3); // 8
addFive(10); // 15
```

### 2. **Переиспользование кода**

```javascript
const map = fn => array => array.map(fn);
const double = map(x => x * 2);
const square = map(x => x * x);

double([1, 2, 3]); // [2, 4, 6]
square([1, 2, 3]); // [1, 4, 9]
```

### 3. **Композиция функций**

```javascript
const compose = (f, g) => x => f(g(x));
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;

const addOneThenDouble = compose(multiplyByTwo, addOne);
addOneThenDouble(5); // 12
```

### 4. **Ленивое вычисление**

```javascript
const lazyAdd = a => b => {
  console.log("Computing...");
  return a + b;
};

const addFive = lazyAdd(5);
// Вычисление происходит только при вызове
addFive(3); // "Computing..." затем 8
```

## Сравнение с обычными функциями

### Обычная функция:

```javascript
function add(a, b, c) {
  return a + b + c;
}

add(1, 2, 3); // 6
// Нельзя частично применить
```

### Каррированная функция:

```javascript
const curriedAdd = a => b => c => a + b + c;

curriedAdd(1)(2)(3); // 6
// Можно частично применить
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
addOneAndTwo(3); // 6
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для переиспользования** — создание специализированных функций
2. **Используйте для композиции** — комбинирование функций
3. **Используйте для частичного применения** — применение аргументов по частям
4. **Документируйте** — объясняйте каррированные функции

### ❌ Не делайте:

1. **Не используйте везде** — только когда это полезно
2. **Не усложняйте** — простые функции лучше не каррировать
3. **Не забывайте про читаемость** — код должен быть понятным

## Заключение

Каррирование:

- **Преобразование функций** — в последовательность функций
- **Частичное применение** — применение аргументов по частям
- **Переиспользование** — создание специализированных функций
- **Функциональный стиль** — техника функционального программирования

**Помните:** каррирование — это мощная техника для создания более гибкого и переиспользуемого кода. Используйте его для частичного применения, переиспользования и композиции функций. Понимание каррирования критически важно для написания функционального JavaScript кода.

