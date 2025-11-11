# Что такое `switch/case`? Правила использования `switch/case`?

`switch/case` — это конструкция в JavaScript для выполнения разных действий в зависимости от значения выражения. Это альтернатива множественным `if/else` операторам, которая делает код более читаемым для множественных условий. Понимание `switch/case` критически важно для написания чистого и эффективного кода.

## Что такое switch/case?

`switch/case` — это конструкция, которая сравнивает значение выражения с несколькими возможными значениями и выполняет соответствующий блок кода.

### Синтаксис:

```javascript
switch (expression) {
  case value1:
    // код
    break;
  case value2:
    // код
    break;
  default:
    // код по умолчанию
}
```

## Базовое использование

### Пример 1: Простой switch

```javascript
const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Понедельник";
    break;
  case 2:
    dayName = "Вторник";
    break;
  case 3:
    dayName = "Среда";
    break;
  default:
    dayName = "Неизвестный день";
}

console.log(dayName); // "Среда"
```

### Пример 2: Без break (fall-through)

```javascript
const grade = "B";
let message;

switch (grade) {
  case "A":
  case "B":
  case "C":
    message = "Прошел";
    break;
  case "D":
  case "F":
    message = "Не прошел";
    break;
  default:
    message = "Неизвестная оценка";
}
```

## Правила использования

### 1. **Используйте break**

```javascript
// ✅ Правильно - с break
switch (value) {
  case 1:
    console.log("Один");
    break; // Останавливает выполнение
  case 2:
    console.log("Два");
    break;
}

// ❌ Неправильно - без break (fall-through)
switch (value) {
  case 1:
    console.log("Один");
    // Нет break - выполнение продолжится
  case 2:
    console.log("Два");
}
```

### 2. **Используйте default**

```javascript
// ✅ Правильно - с default
switch (value) {
  case 1:
    return "Один";
  case 2:
    return "Два";
  default:
    return "Неизвестно";
}
```

### 3. **Строгое сравнение**

```javascript
// switch использует строгое сравнение (===)
const value = "1";

switch (value) {
  case 1: // Не выполнится (строка !== число)
    console.log("Число");
    break;
  case "1": // Выполнится
    console.log("Строка");
    break;
}
```

## Практические примеры

### Пример 1: Обработка действий

```javascript
function handleAction(action) {
  switch (action) {
    case "create":
      return createItem();
    case "update":
      return updateItem();
    case "delete":
      return deleteItem();
    default:
      throw new Error("Неизвестное действие");
  }
}
```

### Пример 2: Множественные значения

```javascript
function getDayType(day) {
  switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
      return "Рабочий день";
    case "Saturday":
    case "Sunday":
      return "Выходной";
    default:
      return "Неизвестный день";
  }
}
```

### Пример 3: Возврат значений

```javascript
function getStatus(code) {
  switch (code) {
    case 200:
      return "OK";
    case 404:
      return "Not Found";
    case 500:
      return "Server Error";
    default:
      return "Unknown";
  }
}
```

## Switch vs if/else

### Когда использовать switch:

```javascript
// ✅ Множественные условия с одним значением
switch (value) {
  case 1:
  case 2:
  case 3:
    return "Маленькое";
  case 4:
  case 5:
  case 6:
    return "Среднее";
}
```

### Когда использовать if/else:

```javascript
// ✅ Сложные условия
if (value > 10 && value < 20) {
  return "Средний";
} else if (value >= 20) {
  return "Большой";
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте break** — для остановки выполнения
2. **Используйте default** — для обработки неизвестных значений
3. **Используйте для множественных условий** — с одним значением
4. **Группируйте case** — для одинаковых действий

### ❌ Не делайте:

1. **Не забывайте break** — может привести к fall-through
2. **Не используйте для сложных условий** — используйте if/else
3. **Не смешивайте стили** — будьте последовательны

## Заключение

`switch/case`:

- **Множественные условия** — альтернатива if/else
- **Строгое сравнение** — использует ===
- **break** — останавливает выполнение
- **default** — обработка неизвестных значений

**Помните:** `switch/case` — это мощная конструкция для обработки множественных условий. Используйте `break` для остановки выполнения, `default` для обработки неизвестных значений и группируйте `case` для одинаковых действий. Понимание `switch/case` критически важно для написания чистого и эффективного кода.

