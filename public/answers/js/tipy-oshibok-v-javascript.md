# Типы ошибок в JavaScript?

В JavaScript существует несколько типов ошибок, каждый из которых указывает на разные проблемы в коде. Понимание типов ошибок критически важно для эффективной отладки и написания надежного кода.

## Типы ошибок

### 1. **Error**

Базовый тип ошибки, от которого наследуются все остальные.

```javascript
throw new Error("Общая ошибка");
```

### 2. **ReferenceError**

Ошибка, возникающая при обращении к несуществующей переменной.

```javascript
console.log(undeclaredVar); // ReferenceError: undeclaredVar is not defined
```

### 3. **TypeError**

Ошибка, возникающая при неправильном использовании типа.

```javascript
const obj = null;
obj.property; // TypeError: Cannot read property 'property' of null

const num = 5;
num(); // TypeError: num is not a function
```

### 4. **SyntaxError**

Ошибка синтаксиса, возникающая при неправильном синтаксисе.

```javascript
const x = ; // SyntaxError: Unexpected token ';'
function test( { // SyntaxError: Unexpected token '{'
```

### 5. **RangeError**

Ошибка, возникающая при выходе за допустимые пределы.

```javascript
const arr = new Array(-1); // RangeError: Invalid array length
(10).toFixed(-1); // RangeError: toFixed() digits argument must be between 0 and 100
```

### 6. **URIError**

Ошибка, возникающая при неправильном использовании URI функций.

```javascript
decodeURIComponent('%'); // URIError: URI malformed
```

### 7. **EvalError**

Ошибка, возникающая при использовании `eval()` (редко используется).

```javascript
// EvalError редко встречается в современном JavaScript
```

## Практические примеры

### Пример 1: ReferenceError

```javascript
function test() {
  console.log(x); // ReferenceError: x is not defined
}

test();
```

### Пример 2: TypeError

```javascript
const obj = { name: "John" };
obj = null;
obj.name; // TypeError: Cannot read property 'name' of null
```

### Пример 3: SyntaxError

```javascript
// Неправильный синтаксис
if (condition { // SyntaxError: Unexpected token '{'
  // код
}
```

## Обработка ошибок

### try-catch:

```javascript
try {
  // Код, который может вызвать ошибку
  riskyOperation();
} catch (error) {
  // Обработка ошибки
  console.error(error.name); // Тип ошибки
  console.error(error.message); // Сообщение
}
```

## Заключение

Типы ошибок в JavaScript:

- **Error** — базовый тип
- **ReferenceError** — несуществующая переменная
- **TypeError** — неправильный тип
- **SyntaxError** — синтаксическая ошибка
- **RangeError** — выход за пределы
- **URIError** — ошибка URI
- **EvalError** — ошибка eval

**Помните:** понимание типов ошибок помогает быстро находить и исправлять проблемы в коде. Используйте try-catch для обработки ошибок и проверяйте тип ошибки для правильной обработки.

