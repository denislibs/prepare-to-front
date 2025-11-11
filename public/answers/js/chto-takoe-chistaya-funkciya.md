# Что такое чистая функция?

Чистая функция (Pure Function) — это функция, которая всегда возвращает одинаковый результат для одинаковых входных данных и не имеет побочных эффектов. Понимание чистых функций критически важно для написания предсказуемого, тестируемого и поддерживаемого кода в функциональном программировании.

## Что такое чистая функция?

Чистая функция — это функция, которая:

1. **Детерминированная** — всегда возвращает одинаковый результат для одинаковых входных данных
2. **Без побочных эффектов** — не изменяет внешнее состояние, не выполняет I/O операции
3. **Изолированная** — не зависит от внешнего состояния, кроме входных параметров

### Характеристики:

- ✅ **Предсказуемость** — одинаковый результат для одинаковых входов
- ✅ **Тестируемость** — легко тестировать
- ✅ **Переиспользуемость** — можно использовать в разных контекстах
- ✅ **Параллелизация** — безопасна для параллельного выполнения
- ✅ **Кеширование** — результаты можно кешировать

## Примеры чистых функций

### ✅ Чистые функции:

```javascript
// Чистая функция - математическая операция
function add(a, b) {
  return a + b;
}

add(2, 3); // Всегда 5
add(2, 3); // Всегда 5

// Чистая функция - преобразование данных
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

capitalize("hello"); // Всегда "Hello"
capitalize("hello"); // Всегда "Hello"

// Чистая функция - фильтрация
function getEvens(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

getEvens([1, 2, 3, 4]); // Всегда [2, 4]
```

### ❌ Нечистые функции:

```javascript
// Нечистая - зависит от внешней переменной
let counter = 0;
function increment() {
  return ++counter; // Изменяет внешнее состояние
}

increment(); // 1
increment(); // 2 (разный результат при одинаковых вызовах)

// Нечистая - изменяет входные данные
function addToArray(arr, item) {
  arr.push(item); // Мутирует входной массив
  return arr;
}

const arr = [1, 2];
addToArray(arr, 3); // [1, 2, 3]
addToArray(arr, 3); // [1, 2, 3, 3] (разный результат)

// Нечистая - побочные эффекты (I/O)
function logMessage(message) {
  console.log(message); // Побочный эффект
  return message;
}

// Нечистая - зависит от времени
function getCurrentTime() {
  return new Date(); // Разный результат каждый раз
}
```

## Преимущества чистых функций

### 1. **Предсказуемость**

```javascript
// Чистая функция - всегда предсказуема
function multiply(a, b) {
  return a * b;
}

multiply(2, 3); // Всегда 6
multiply(2, 3); // Всегда 6
```

### 2. **Тестируемость**

```javascript
// Легко тестировать
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Тест
const items = [{ price: 10 }, { price: 20 }];
console.log(calculateTotal(items) === 30); // true
```

### 3. **Кеширование (мемоизация)**

```javascript
// Результаты можно кешировать
function expensiveCalculation(n) {
  // Долгая операция
  return n * n * n;
}

// Мемоизация
const cache = {};
function memoizedCalculation(n) {
  if (cache[n]) {
    return cache[n];
  }
  const result = expensiveCalculation(n);
  cache[n] = result;
  return result;
}
```

### 4. **Параллелизация**

```javascript
// Безопасна для параллельного выполнения
function processData(data) {
  return data.map(item => item * 2);
}

// Можно выполнять параллельно
const results = [
  processData([1, 2, 3]),
  processData([4, 5, 6]),
  processData([7, 8, 9])
];
```

## Преобразование нечистых функций в чистые

### Пример 1: Удаление зависимости от внешнего состояния

```javascript
// ❌ Нечистая
let taxRate = 0.1;
function calculateTax(amount) {
  return amount * taxRate; // Зависит от внешней переменной
}

// ✅ Чистая
function calculateTax(amount, taxRate) {
  return amount * taxRate; // Все параметры передаются явно
}
```

### Пример 2: Избежание мутации

```javascript
// ❌ Нечистая - мутирует входной массив
function addItem(arr, item) {
  arr.push(item);
  return arr;
}

// ✅ Чистая - возвращает новый массив
function addItem(arr, item) {
  return [...arr, item]; // Создает новый массив
}
```

### Пример 3: Изоляция побочных эффектов

```javascript
// ❌ Нечистая - смешивает логику и побочные эффекты
function processUser(user) {
  const processed = user.name.toUpperCase();
  console.log(processed); // Побочный эффект
  saveToDatabase(processed); // Побочный эффект
  return processed;
}

// ✅ Чистая - только логика
function processUser(user) {
  return user.name.toUpperCase();
}

// Побочные эффекты выносятся отдельно
const processed = processUser(user);
console.log(processed);
saveToDatabase(processed);
```

## Практические примеры

### Пример 1: Обработка данных

```javascript
// Чистая функция для обработки пользователей
function formatUser(user) {
  return {
    ...user,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
    fullName: `${user.firstName} ${user.lastName}`
  };
}

const user = {
  name: "  John  ",
  email: "JOHN@EXAMPLE.COM",
  firstName: "John",
  lastName: "Doe"
};

const formatted = formatUser(user);
// { name: "John", email: "john@example.com", fullName: "John Doe" }
```

### Пример 2: Валидация

```javascript
// Чистая функция валидации
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

isValidEmail("test@example.com"); // true
isValidEmail("invalid"); // false
```

### Пример 3: Трансформация данных

```javascript
// Чистая функция трансформации
function transformUsers(users) {
  return users
    .filter(user => user.active)
    .map(user => ({
      id: user.id,
      name: user.name,
      displayName: `${user.name} (${user.role})`
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
```

## Чистые функции в React

```javascript
// Чистая функция компонента
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Чистая функция для вычислений
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

## Лучшие практики

### ✅ Делайте:

1. **Создавайте чистые функции** — когда возможно
2. **Избегайте мутаций** — возвращайте новые данные
3. **Изолируйте побочные эффекты** — выносите их отдельно
4. **Передавайте зависимости** — как параметры

### ❌ Не делайте:

1. **Не смешивайте логику и побочные эффекты** — разделяйте их
2. **Не мутируйте входные данные** — создавайте новые
3. **Не зависьте от внешнего состояния** — передавайте явно

## Заключение

Чистые функции:

- **Детерминированные** — одинаковый результат для одинаковых входов
- **Без побочных эффектов** — не изменяют внешнее состояние
- **Предсказуемые** — легко тестировать и отлаживать
- **Переиспользуемые** — можно использовать в разных контекстах

**Помните:** чистые функции — это основа функционального программирования. Они делают код более предсказуемым, тестируемым и поддерживаемым. Стремитесь создавать чистые функции везде, где это возможно, и изолируйте побочные эффекты в отдельных функциях.

