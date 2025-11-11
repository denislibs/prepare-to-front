# Разница между `var`, `let` и `const`?

В JavaScript существует три способа объявления переменных: `var`, `let` и `const`. Каждый из них имеет свои особенности в отношении области видимости, hoisting, повторного объявления и изменения значения. Понимание различий между ними критически важно для написания правильного и современного JavaScript кода.

## var

`var` — это старый способ объявления переменных, доступный с самых ранних версий JavaScript.

### Характеристики:

- ⚠️ **Function scope** — область видимости функции, не блока
- ⚠️ **Hoisting** — поднимается и инициализируется `undefined`
- ⚠️ **Повторное объявление** — можно объявлять несколько раз
- ⚠️ **Изменяемость** — значение можно изменять
- ⚠️ **Глобальная переменная** — при объявлении вне функции

### Примеры:

```javascript
// Function scope
function test() {
  if (true) {
    var x = 5; // Function scope, не block scope
  }
  console.log(x); // 5 - доступна вне блока
}

// Hoisting
console.log(y); // undefined (не ошибка!)
var y = 10;

// Повторное объявление
var z = 1;
var z = 2; // Не ошибка
console.log(z); // 2

// Изменяемость
var value = 5;
value = 10; // Можно изменить
```

## let

`let` — это современный способ объявления переменных, введенный в ES6.

### Характеристики:

- ✅ **Block scope** — область видимости блока
- ✅ **Hoisting с TDZ** — поднимается, но в временной мертвой зоне
- ❌ **Повторное объявление** — нельзя объявлять в той же области
- ✅ **Изменяемость** — значение можно изменять

### Примеры:

```javascript
// Block scope
function test() {
  if (true) {
    let x = 5; // Block scope
  }
  console.log(x); // ReferenceError - не доступна вне блока
}

// Temporal Dead Zone
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Повторное объявление
let z = 1;
let z = 2; // SyntaxError: Identifier 'z' has already been declared

// Изменяемость
let value = 5;
value = 10; // Можно изменить
```

## const

`const` — это способ объявления констант, введенный в ES6.

### Характеристики:

- ✅ **Block scope** — область видимости блока
- ✅ **Hoisting с TDZ** — поднимается, но в временной мертвой зоне
- ❌ **Повторное объявление** — нельзя объявлять в той же области
- ❌ **Изменяемость примитивов** — нельзя изменить значение
- ⚠️ **Изменяемость объектов** — можно изменять свойства объекта

### Примеры:

```javascript
// Block scope
function test() {
  if (true) {
    const x = 5; // Block scope
  }
  console.log(x); // ReferenceError - не доступна вне блока
}

// Temporal Dead Zone
console.log(y); // ReferenceError: Cannot access 'y' before initialization
const y = 10;

// Повторное объявление
const z = 1;
const z = 2; // SyntaxError: Identifier 'z' has already been declared

// Примитивы - нельзя изменить
const value = 5;
value = 10; // TypeError: Assignment to constant variable

// Объекты - можно изменить свойства
const obj = { name: "John" };
obj.name = "Jane"; // Можно изменить
obj.age = 30; // Можно добавить
// obj = {}; // TypeError - нельзя переназначить
```

## Сравнительная таблица

| Характеристика | var | let | const |
|----------------|-----|-----|-------|
| **Область видимости** | Function | Block | Block |
| **Hoisting** | Да (undefined) | Да (TDZ) | Да (TDZ) |
| **Повторное объявление** | ✅ Да | ❌ Нет | ❌ Нет |
| **Изменяемость** | ✅ Да | ✅ Да | ❌ Нет* |
| **Инициализация** | Не обязательна | Не обязательна | Обязательна |
| **Глобальная переменная** | ✅ Да | ❌ Нет | ❌ Нет |

*Для объектов можно изменять свойства, но нельзя переназначать

## Практические примеры

### Пример 1: Область видимости

```javascript
// var - function scope
function testVar() {
  if (true) {
    var x = 5;
  }
  console.log(x); // 5 - доступна
}

// let/const - block scope
function testLet() {
  if (true) {
    let x = 5;
    const y = 10;
  }
  console.log(x); // ReferenceError
  console.log(y); // ReferenceError
}
```

### Пример 2: Циклы

```javascript
// var - проблема
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3 (все ссылаются на одну переменную)
  }, 100);
}

// let - решение
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2 (каждая итерация имеет свою переменную)
  }, 100);
}
```

### Пример 3: Hoisting

```javascript
// var
console.log(x); // undefined (не ошибка!)
var x = 5;

// let/const
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 15;
```

### Пример 4: Повторное объявление

```javascript
// var - можно
var x = 1;
var x = 2; // Не ошибка
console.log(x); // 2

// let/const - нельзя
let y = 1;
let y = 2; // SyntaxError: Identifier 'y' has already been declared

const z = 1;
const z = 2; // SyntaxError: Identifier 'z' has already been declared
```

### Пример 5: const с объектами

```javascript
// const с объектами
const obj = { name: "John" };

// Можно изменить свойства
obj.name = "Jane"; // ✅ Работает
obj.age = 30; // ✅ Работает

// Нельзя переназначить
obj = {}; // TypeError: Assignment to constant variable

// const с массивами
const arr = [1, 2, 3];

// Можно изменить элементы
arr[0] = 10; // ✅ Работает
arr.push(4); // ✅ Работает

// Нельзя переназначить
arr = []; // TypeError: Assignment to constant variable
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте const по умолчанию** — для всех переменных
2. **Используйте let** — когда нужно изменить значение
3. **Избегайте var** — используйте только для обратной совместимости
4. **Объявляйте в начале** — области видимости

### ❌ Не делайте:

1. **Не используйте var** — в новых проектах
2. **Не полагайтесь на hoisting** — объявляйте перед использованием
3. **Не создавайте глобальные переменные** — используйте let/const

## Миграция с var на let/const

### До (var):

```javascript
function example() {
  var x = 1;
  if (true) {
    var x = 2; // Та же переменная
  }
  console.log(x); // 2
}
```

### После (let/const):

```javascript
function example() {
  let x = 1;
  if (true) {
    let x = 2; // Другая переменная
  }
  console.log(x); // 1
}
```

## Заключение

Разница между `var`, `let` и `const`:

- **var** — function scope, hoisting, можно переобъявлять (устаревший)
- **let** — block scope, TDZ, нельзя переобъявлять, можно изменять
- **const** — block scope, TDZ, нельзя переобъявлять, нельзя изменять (для примитивов)

**Помните:** используйте `const` по умолчанию для всех переменных, `let` только когда нужно изменить значение, и избегайте `var` в новых проектах. Это делает код более предсказуемым, безопасным и легким для понимания.

