# Что такое `NaN`? Как определить, что значение равно `NaN`?

`NaN` (Not a Number) — это специальное значение в JavaScript, которое представляет результат математической операции, которая не может быть представлена как валидное число. Понимание `NaN` и правильных способов его проверки критически важно для написания надежного кода, работающего с числами.

## Что такое NaN?

`NaN` — это значение типа `number`, которое представляет "не число". Это результат операций, которые не могут дать валидное числовое значение.

### Характеристики:

- ✅ **Тип number** — `typeof NaN === "number"`
- ✅ **Не равен самому себе** — `NaN !== NaN` (единственное значение с таким свойством)
- ✅ **Распространяется** — любая операция с NaN дает NaN
- ⚠️ **Сложно проверить** — обычное сравнение не работает

## Когда появляется NaN?

### 1. **Некорректные математические операции**

```javascript
0 / 0; // NaN
Infinity - Infinity; // NaN
Infinity / Infinity; // NaN
Math.sqrt(-1); // NaN
```

### 2. **Преобразование невалидных строк**

```javascript
Number("text"); // NaN
parseInt("abc"); // NaN
parseFloat("xyz"); // NaN
+"not a number"; // NaN
```

### 3. **Операции с undefined и null**

```javascript
undefined + 1; // NaN
null * 2; // 0 (не NaN, null преобразуется в 0)
undefined * 2; // NaN
```

### 4. **Операции с объектами**

```javascript
{} * 2; // NaN
[] * 2; // 0 (пустой массив преобразуется в 0)
[1, 2] * 2; // NaN
```

## Проблема проверки NaN

### ❌ Неправильные способы проверки:

```javascript
const value = NaN;

// ❌ Не работает
value === NaN; // false
value == NaN; // false

// ❌ Не работает
value !== value; // true (работает, но неочевидно)

// ❌ isNaN() - проблематично
isNaN(value); // true
isNaN("text"); // true (преобразует в число)
isNaN(undefined); // true
isNaN({}); // true
```

### ✅ Правильные способы проверки:

#### 1. **Number.isNaN() (ES2015) - Рекомендуется**

```javascript
Number.isNaN(NaN); // true ✅
Number.isNaN("text"); // false ✅ (не преобразует)
Number.isNaN(undefined); // false ✅
Number.isNaN({}); // false ✅
Number.isNaN(5); // false ✅
```

#### 2. **Проверка через !== (старый способ)**

```javascript
function isNaNValue(value) {
  return value !== value;
}

isNaNValue(NaN); // true
isNaNValue(5); // false
```

#### 3. **Object.is() (ES2015)**

```javascript
Object.is(NaN, NaN); // true ✅
Object.is(5, NaN); // false
```

## Сравнение методов проверки

### isNaN() vs Number.isNaN()

```javascript
// isNaN() - преобразует значение в число
isNaN(NaN); // true
isNaN("text"); // true (преобразует "text" → NaN → true)
isNaN("123"); // false (преобразует "123" → 123 → false)
isNaN(undefined); // true (преобразует undefined → NaN → true)

// Number.isNaN() - проверяет без преобразования
Number.isNaN(NaN); // true
Number.isNaN("text"); // false (не преобразует)
Number.isNaN("123"); // false
Number.isNaN(undefined); // false
```

### Сравнительная таблица:

| Значение | isNaN() | Number.isNaN() | value !== value |
|----------|---------|----------------|-----------------|
| `NaN` | `true` | `true` | `true` |
| `"text"` | `true` ❌ | `false` ✅ | `false` ✅ |
| `"123"` | `false` ✅ | `false` ✅ | `false` ✅ |
| `undefined` | `true` ❌ | `false` ✅ | `false` ✅ |
| `{}` | `true` ❌ | `false` ✅ | `false` ✅ |
| `5` | `false` ✅ | `false` ✅ | `false` ✅ |

## Практические примеры

### Пример 1: Валидация чисел

```javascript
function isValidNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}

console.log(isValidNumber(5)); // true
console.log(isValidNumber(NaN)); // false
console.log(isValidNumber("5")); // false (строка, не число)
console.log(isValidNumber(Infinity)); // true (Infinity - валидное число)
```

### Пример 2: Обработка пользовательского ввода

```javascript
function parseNumber(input) {
  const num = Number(input);
  if (Number.isNaN(num)) {
    return null; // или выбросить ошибку
  }
  return num;
}

console.log(parseNumber("123")); // 123
console.log(parseNumber("text")); // null
console.log(parseNumber("")); // 0 (пустая строка → 0)
```

### Пример 3: Безопасные вычисления

```javascript
function safeDivide(a, b) {
  const result = a / b;
  if (Number.isNaN(result)) {
    throw new Error("Результат не является числом");
  }
  return result;
}

console.log(safeDivide(10, 2)); // 5
console.log(safeDivide(10, 0)); // Infinity (не NaN)
// safeDivide(0, 0); // Error: Результат не является числом
```

### Пример 4: Фильтрация валидных чисел

```javascript
const values = [1, 2, NaN, 4, "5", NaN, 7];

// Фильтрация NaN
const validNumbers = values.filter(value => 
  typeof value === "number" && !Number.isNaN(value)
);
console.log(validNumbers); // [1, 2, 4, 7]
```

### Пример 5: Проверка результата вычислений

```javascript
function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  const average = sum / numbers.length;
  
  if (Number.isNaN(average)) {
    return 0; // или обработать ошибку
  }
  
  return average;
}

console.log(calculateAverage([1, 2, 3])); // 2
console.log(calculateAverage([])); // NaN → обработано
```

## Особенности NaN

### 1. **NaN не равен самому себе**

```javascript
NaN === NaN; // false (единственное значение с таким свойством)
NaN !== NaN; // true
```

### 2. **NaN распространяется**

```javascript
NaN + 5; // NaN
NaN * 2; // NaN
Math.sqrt(NaN); // NaN
```

### 3. **Тип NaN - number**

```javascript
typeof NaN; // "number"
Number.isNaN(NaN); // true
```

### 4. **NaN в сравнениях**

```javascript
NaN > 5; // false
NaN < 5; // false
NaN == 5; // false
NaN != 5; // true
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Number.isNaN()** — для проверки NaN
2. **Проверяйте перед вычислениями** — валидируйте входные данные
3. **Обрабатывайте NaN** — возвращайте значения по умолчанию или ошибки
4. **Используйте Object.is()** — как альтернативу

### ❌ Не делайте:

1. **Не используйте isNaN()** — преобразует значения
2. **Не сравнивайте через ===** — `NaN === NaN` всегда false
3. **Не игнорируйте NaN** — всегда обрабатывайте
4. **Не полагайтесь на преобразование** — проверяйте явно

## Заключение

Что такое `NaN`:

- **Not a Number** — результат невалидных математических операций
- **Тип number** — но не является числом
- **Не равен самому себе** — `NaN !== NaN`
- **Проверка через Number.isNaN()** — правильный способ проверки

**Помните:** `NaN` — это специальное значение, которое требует особой обработки. Всегда используйте `Number.isNaN()` для проверки (не `isNaN()`), обрабатывайте случаи, когда операции могут вернуть `NaN`, и валидируйте входные данные перед вычислениями. Понимание `NaN` критически важно для написания надежного кода, работающего с числами.

