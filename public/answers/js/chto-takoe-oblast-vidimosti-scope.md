# Что такое область видимости (Scope)?

Область видимости (Scope) — это концепция, которая определяет доступность переменных, функций и объектов в различных частях кода. Понимание области видимости критически важно для написания правильного JavaScript кода, так как это определяет, где переменные доступны и как они взаимодействуют друг с другом.

## Что такое Scope?

Scope (область видимости) — это контекст, в котором переменные и функции определены и доступны. JavaScript имеет несколько типов областей видимости, каждая со своими правилами доступа.

### Характеристики:

- ✅ **Определяет доступность** — где переменные доступны
- ✅ **Иерархическая структура** — вложенные области видимости
- ✅ **Изоляция** — переменные изолированы в своих областях
- ✅ **Цепочка областей видимости** — внутренние области имеют доступ к внешним

## Типы областей видимости

### 1. **Global Scope (Глобальная область видимости)**

Глобальная область видимости — это самая внешняя область, доступная везде в программе.

```javascript
// Глобальная переменная
var globalVar = "I'm global";

function test() {
  console.log(globalVar); // "I'm global" - доступна
}

console.log(globalVar); // "I'm global" - доступна везде
```

### 2. **Function Scope (Область видимости функции)**

Function scope — область видимости, создаваемая функцией. Переменные, объявленные внутри функции, доступны только внутри этой функции.

```javascript
function myFunction() {
  // Function scope
  var functionVar = "I'm in function scope";
  console.log(functionVar); // "I'm in function scope"
}

console.log(functionVar); // ReferenceError: functionVar is not defined
```

### 3. **Block Scope (Блочная область видимости)**

Block scope — область видимости, создаваемая блоками кода (if, for, while, {}). Доступна только для `let` и `const`.

```javascript
if (true) {
  // Block scope
  let blockVar = "I'm in block scope";
  const blockConst = "I'm also in block scope";
  console.log(blockVar); // "I'm in block scope"
}

console.log(blockVar); // ReferenceError: blockVar is not defined
console.log(blockConst); // ReferenceError: blockConst is not defined
```

### 4. **Module Scope (Область видимости модуля)**

Module scope — область видимости, создаваемая ES6 модулями. Переменные в модуле не являются глобальными.

```javascript
// module.js
let moduleVar = "I'm in module scope";
export function test() {
  console.log(moduleVar);
}

// В другом файле
import { test } from './module.js';
console.log(moduleVar); // ReferenceError - не доступна
```

## var, let, const и область видимости

### var — Function Scope

```javascript
function test() {
  if (true) {
    var x = 5; // Function scope, не block scope
  }
  console.log(x); // 5 - доступна вне блока
}

console.log(x); // ReferenceError - не доступна вне функции
```

### let и const — Block Scope

```javascript
function test() {
  if (true) {
    let x = 5; // Block scope
    const y = 10; // Block scope
  }
  console.log(x); // ReferenceError - не доступна вне блока
  console.log(y); // ReferenceError - не доступна вне блока
}
```

## Цепочка областей видимости (Scope Chain)

Scope chain — это механизм, который определяет порядок поиска переменных. JavaScript ищет переменную сначала в текущей области видимости, затем во внешних областях.

```javascript
// Глобальная область
var global = "global";

function outer() {
  // Область outer
  var outerVar = "outer";
  
  function inner() {
    // Область inner
    var innerVar = "inner";
    
    // Доступ ко всем областям
    console.log(innerVar); // "inner" - из текущей области
    console.log(outerVar); // "outer" - из внешней области
    console.log(global); // "global" - из глобальной области
  }
  
  inner();
}

outer();
```

## Лексическая область видимости (Lexical Scope)

Lexical scope (статическая область видимости) — область видимости определяется местом объявления в коде, а не местом вызова.

```javascript
var x = "global";

function outer() {
  var x = "outer";
  
  function inner() {
    console.log(x); // "outer" - из лексической области видимости
  }
  
  return inner;
}

var innerFunc = outer();
innerFunc(); // "outer" - не "global"
```

## Замыкания и область видимости

Замыкания используют область видимости для сохранения доступа к переменным внешней функции.

```javascript
function outer() {
  var outerVar = "outer";
  
  function inner() {
    console.log(outerVar); // Доступ к outerVar через замыкание
  }
  
  return inner;
}

var innerFunc = outer();
innerFunc(); // "outer" - outerVar доступна через замыкание
```

## Практические примеры

### Пример 1: Function Scope vs Block Scope

```javascript
// var - function scope
function testVar() {
  if (true) {
    var x = 5;
  }
  console.log(x); // 5 - доступна
}

// let - block scope
function testLet() {
  if (true) {
    let x = 5;
  }
  console.log(x); // ReferenceError - не доступна
}
```

### Пример 2: Вложенные области видимости

```javascript
var global = "global";

function level1() {
  var level1Var = "level1";
  
  function level2() {
    var level2Var = "level2";
    
    function level3() {
      var level3Var = "level3";
      
      // Доступ ко всем уровням
      console.log(level3Var); // "level3"
      console.log(level2Var); // "level2"
      console.log(level1Var); // "level1"
      console.log(global); // "global"
    }
    
    level3();
  }
  
  level2();
}

level1();
```

### Пример 3: Затенение переменных (Variable Shadowing)

```javascript
var x = "global";

function test() {
  var x = "local"; // Затеняет глобальную переменную
  console.log(x); // "local"
}

test();
console.log(x); // "global" - глобальная не изменена
```

### Пример 4: Циклы и область видимости

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

### Пример 5: IIFE для изоляции области видимости

```javascript
// Изоляция области видимости
(function() {
  var private = "private";
  // Код изолирован от глобальной области
})();

console.log(private); // ReferenceError - не доступна
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте let/const** — вместо var для block scope
2. **Ограничивайте область видимости** — объявляйте переменные в минимально необходимой области
3. **Избегайте глобальных переменных** — используйте модули
4. **Используйте замыкания** — для инкапсуляции

### ❌ Не делайте:

1. **Не создавайте глобальные переменные** — без необходимости
2. **Не полагайтесь на hoisting** — объявляйте перед использованием
3. **Не используйте var** — в циклах (используйте let)

## Заключение

Область видимости:

- **Определяет доступность** — переменных и функций
- **Типы областей** — global, function, block, module
- **Цепочка областей** — поиск переменных от внутренней к внешней
- **Лексическая область** — определяется местом объявления
- **Важно для замыканий** — сохранение доступа к внешним переменным

**Помните:** понимание области видимости критически важно для написания правильного JavaScript кода. Используйте `let` и `const` для block scope, ограничивайте область видимости переменных и избегайте глобальных переменных. Область видимости определяет, где переменные доступны и как они взаимодействуют в коде.

