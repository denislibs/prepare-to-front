# Для чего используется оператор остатка (`%`)?

Оператор остатка (`%`) в JavaScript возвращает остаток от деления одного числа на другое. Это математический оператор, который часто используется для проверки четности, цикличности, ограничения диапазонов и других математических операций. Понимание оператора остатка критически важно для работы с числами и создания эффективных алгоритмов.

## Что такое оператор остатка?

Оператор остатка (`%`) возвращает остаток от деления левого операнда на правый операнд.

### Синтаксис:

```javascript
dividend % divisor
```

### Результат:

Остаток от деления `dividend` на `divisor`.

### Примеры:

```javascript
10 % 3; // 1 (10 / 3 = 3 остаток 1)
15 % 4; // 3 (15 / 4 = 3 остаток 3)
20 % 5; // 0 (20 / 5 = 4 остаток 0)
7 % 2; // 1 (7 / 2 = 3 остаток 1)
```

## Математическая основа

### Как вычисляется:

```
a % b = a - (b * Math.floor(a / b))

Примеры:
10 % 3 = 10 - (3 * Math.floor(10 / 3))
      = 10 - (3 * 3)
      = 10 - 9
      = 1
```

### Для отрицательных чисел:

```javascript
-10 % 3; // -1 (знак сохраняется)
10 % -3; // 1
-10 % -3; // -1
```

## Практические применения

### 1. **Проверка четности/нечетности**

```javascript
function isEven(num) {
  return num % 2 === 0;
}

function isOdd(num) {
  return num % 2 !== 0;
}

console.log(isEven(4)); // true
console.log(isEven(5)); // false
console.log(isOdd(5)); // true
console.log(isOdd(4)); // false
```

### 2. **Ограничение диапазона (циклические значения)**

```javascript
// Циклический счетчик (0, 1, 2, 0, 1, 2, ...)
function getCycleValue(index, max) {
  return index % max;
}

for (let i = 0; i < 10; i++) {
  console.log(getCycleValue(i, 3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2, 0
}

// Цвета в цикле
const colors = ["red", "green", "blue"];
const colorIndex = 5 % colors.length; // 2
console.log(colors[colorIndex]); // "blue"
```

### 3. **Проверка делимости**

```javascript
function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

console.log(isDivisible(10, 5)); // true
console.log(isDivisible(10, 3)); // false
console.log(isDivisible(15, 3)); // true
```

### 4. **Ограничение значения в диапазоне**

```javascript
// Ограничение числа в диапазоне [0, max)
function clamp(value, max) {
  return value % max;
}

console.log(clamp(10, 5)); // 0 (10 % 5 = 0)
console.log(clamp(7, 5)); // 2 (7 % 5 = 2)
console.log(clamp(3, 5)); // 3 (3 % 5 = 3)

// Для отрицательных чисел нужна дополнительная обработка
function clampPositive(value, max) {
  return ((value % max) + max) % max;
}

console.log(clampPositive(-1, 5)); // 4
console.log(clampPositive(-7, 5)); // 3
```

### 5. **Группировка и индексация**

```javascript
// Группировка элементов
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const groups = [[], [], []]; // 3 группы

items.forEach((item, index) => {
  const groupIndex = index % 3;
  groups[groupIndex].push(item);
});

console.log(groups);
// [[1, 4, 7, 10], [2, 5, 8], [3, 6, 9]]
```

### 6. **Временные циклы**

```javascript
// Дни недели в цикле
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDayAfter(daysFromNow) {
  const today = 0; // Monday
  const futureDay = (today + daysFromNow) % 7;
  return days[futureDay];
}

console.log(getDayAfter(3)); // "Thu"
console.log(getDayAfter(10)); // "Thu" (10 % 7 = 3)
```

### 7. **Анимации и эффекты**

```javascript
// Пульсация с периодом
function getPulseValue(time, period) {
  return Math.sin((time % period) / period * Math.PI * 2);
}

// Чередование стилей
function getRowStyle(index) {
  return index % 2 === 0 ? "even" : "odd";
}
```

### 8. **Преобразование единиц**

```javascript
// Секунды в минуты и секунды
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

console.log(formatTime(125)); // "2:05"
console.log(formatTime(65)); // "1:05"
```

## Специальные случаи

### Деление на ноль:

```javascript
10 % 0; // NaN
-10 % 0; // NaN
```

### Деление нуля:

```javascript
0 % 5; // 0
0 % -5; // 0
```

### Остаток от деления на 1:

```javascript
5.7 % 1; // 0.7 (дробная часть)
10.123 % 1; // 0.123
```

### Остаток от деления на степень 10:

```javascript
1234 % 10; // 4 (последняя цифра)
1234 % 100; // 34 (последние две цифры)
1234 % 1000; // 234 (последние три цифры)
```

## Практические примеры

### Пример 1: Валидация номера карты (Luhn algorithm)

```javascript
function isValidCardNumber(cardNumber) {
  let sum = 0;
  let isEven = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}
```

### Пример 2: Циклический буфер

```javascript
class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size);
    this.index = 0;
  }
  
  add(value) {
    this.buffer[this.index % this.buffer.length] = value;
    this.index++;
  }
  
  get(index) {
    return this.buffer[index % this.buffer.length];
  }
}
```

### Пример 3: Хеш-таблица

```javascript
class SimpleHashTable {
  constructor(size = 16) {
    this.buckets = new Array(size);
  }
  
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % this.buckets.length;
    }
    return hash;
  }
  
  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    this.buckets[index].push({ key, value });
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для проверки четности** — `num % 2 === 0`
2. **Используйте для цикличности** — ограничение значений в диапазоне
3. **Используйте для группировки** — распределение по группам
4. **Используйте для извлечения частей** — последние цифры, дробная часть

### ❌ Не делайте:

1. **Не используйте для отрицательных** — без дополнительной обработки
2. **Не делите на ноль** — получите NaN
3. **Не забывайте про знак** — остаток сохраняет знак делимого

## Заключение

Оператор остатка (`%`):

- **Возвращает остаток** — от деления одного числа на другое
- **Проверка четности** — `num % 2 === 0`
- **Цикличность** — ограничение значений в диапазоне
- **Группировка** — распределение элементов по группам
- **Извлечение частей** — последние цифры, дробная часть

**Помните:** оператор остатка — это мощный инструмент для работы с числами. Используйте его для проверки четности, создания циклических значений, группировки данных и извлечения частей чисел. Понимание оператора остатка критически важно для написания эффективных алгоритмов и работы с математическими операциями.

