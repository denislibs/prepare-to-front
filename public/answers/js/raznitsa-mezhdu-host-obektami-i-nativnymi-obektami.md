# Разница между host-объектами и нативными объектами?

В JavaScript существует различие между нативными (native) объектами, которые являются частью самого языка JavaScript, и host-объектами (host objects), которые предоставляются средой выполнения (браузером, Node.js и т.д.). Понимание этого различия критически важно для понимания того, какие объекты доступны в разных средах и как они работают.

## Нативные объекты (Native Objects)

Нативные объекты — это объекты, которые являются частью спецификации JavaScript (ECMAScript) и доступны во всех средах выполнения JavaScript.

### Характеристики:

- ✅ **Часть языка** — определены в спецификации ECMAScript
- ✅ **Доступны везде** — в браузере, Node.js, других средах
- ✅ **Предсказуемое поведение** — одинаково во всех средах
- ✅ **Стандартизированы** — описаны в спецификации

### Примеры нативных объектов:

```javascript
// Глобальные объекты
Object
Array
Function
String
Number
Boolean
Date
RegExp
Error
Math
JSON
Promise
Map
Set
WeakMap
WeakSet
Symbol
BigInt

// Методы и свойства
Object.keys()
Array.prototype.map()
String.prototype.slice()
Number.isNaN()
```

## Host-объекты (Host Objects)

Host-объекты — это объекты, которые предоставляются средой выполнения (host environment), а не самим языком JavaScript. Они специфичны для конкретной среды.

### Характеристики:

- ⚠️ **Зависят от среды** — разные в браузере и Node.js
- ⚠️ **Не стандартизированы** — могут отличаться в разных средах
- ⚠️ **Могут иметь нестандартное поведение** — не всегда следуют правилам JavaScript
- ✅ **Расширяют возможности** — предоставляют доступ к среде выполнения

### Примеры host-объектов в браузере:

```javascript
// DOM объекты
document
window
navigator
location
history
localStorage
sessionStorage
XMLHttpRequest
fetch
WebSocket
Canvas
WebGL

// События
Event
MouseEvent
KeyboardEvent
```

### Примеры host-объектов в Node.js:

```javascript
// Node.js объекты
global
process
Buffer
require
module
exports
__dirname
__filename
fs
http
https
path
os
```

## Ключевые различия

### 1. **Доступность**

```javascript
// Нативные объекты - доступны везде
const arr = new Array();
const obj = new Object();
const str = new String();

// Host-объекты - зависят от среды
// В браузере
window; // доступен
document; // доступен

// В Node.js
process; // доступен
global; // доступен
// window, document - не доступны
```

### 2. **Стандартизация**

```javascript
// Нативные объекты - стандартизированы
Array.prototype.map; // Всегда есть, везде одинаково

// Host-объекты - могут отличаться
// В разных браузерах могут быть разные методы
document.querySelector; // Может отличаться в старых браузерах
```

### 3. **Поведение**

```javascript
// Нативные объекты - предсказуемое поведение
const arr = [1, 2, 3];
arr.map(x => x * 2); // Всегда работает одинаково

// Host-объекты - могут иметь нестандартное поведение
// Некоторые host-объекты могут не следовать правилам JavaScript
```

## Практические примеры

### Пример 1: Проверка типа

```javascript
// Нативные объекты
console.log(typeof Array); // "function"
console.log(typeof Object); // "function"
console.log(Array instanceof Function); // true

// Host-объекты
console.log(typeof document); // "object" (в браузере)
console.log(typeof window); // "object" (в браузере)
console.log(typeof process); // "object" (в Node.js)
```

### Пример 2: Доступность в разных средах

```javascript
// Нативные объекты - работают везде
function useNativeObjects() {
  const arr = new Array(1, 2, 3);
  const obj = { key: "value" };
  const str = "text";
  return { arr, obj, str };
}

// Host-объекты - зависят от среды
function useHostObjects() {
  // В браузере
  if (typeof window !== "undefined") {
    return {
      location: window.location,
      document: document
    };
  }
  
  // В Node.js
  if (typeof process !== "undefined") {
    return {
      process: process,
      global: global
    };
  }
}
```

### Пример 3: Полифиллы для host-объектов

```javascript
// Полифилл для fetch (host-объект в браузере)
if (typeof fetch === "undefined") {
  global.fetch = function(url) {
    // Реализация через XMLHttpRequest или другую библиотеку
  };
}
```

## Определение типа объекта

### Проверка на нативный объект:

```javascript
function isNativeObject(obj) {
  const nativeObjects = [
    Object, Array, Function, String, Number, Boolean,
    Date, RegExp, Error, Math, JSON, Promise
  ];
  return nativeObjects.includes(obj);
}

console.log(isNativeObject(Array)); // true
console.log(isNativeObject(document)); // false
```

### Проверка на host-объект:

```javascript
function isHostObject(obj) {
  // В браузере
  if (typeof window !== "undefined") {
    return obj === window || obj === document || 
           obj instanceof HTMLElement;
  }
  
  // В Node.js
  if (typeof process !== "undefined") {
    return obj === process || obj === global;
  }
  
  return false;
}
```

## Проблемы с host-объектами

### 1. **Нестандартное поведение**

```javascript
// Некоторые host-объекты могут иметь нестандартное поведение
// Например, некоторые методы могут не быть функциями
typeof document.getElementById; // Может быть не "function" в старых IE
```

### 2. **Различия в средах**

```javascript
// Код должен проверять доступность
function getStorage() {
  if (typeof localStorage !== "undefined") {
    return localStorage; // Браузер
  }
  if (typeof require !== "undefined") {
    // Node.js - нужна библиотека
    return require("node-localstorage");
  }
  throw new Error("Storage not available");
}
```

### 3. **Тестирование**

```javascript
// Host-объекты сложнее тестировать
// Нужны моки или специальные инструменты
function useDocument() {
  return document.getElementById("myId");
}

// Тест требует мока document
const mockDocument = {
  getElementById: jest.fn()
};
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте нативные объекты** — когда возможно
2. **Проверяйте доступность** — host-объектов перед использованием
3. **Используйте полифиллы** — для поддержки старых сред
4. **Документируйте зависимости** — от host-объектов

### ❌ Не делайте:

1. **Не полагайтесь на host-объекты** — без проверки доступности
2. **Не смешивайте логику** — с host-объектами без необходимости
3. **Не забывайте про тестирование** — host-объекты нужно мокировать

## Заключение

Разница между host-объектами и нативными объектами:

- **Нативные объекты** — часть языка JavaScript, доступны везде, стандартизированы
- **Host-объекты** — предоставляются средой выполнения, зависят от среды, могут отличаться
- **Важно понимать разницу** — для написания переносимого кода
- **Проверяйте доступность** — host-объектов перед использованием

**Помните:** нативные объекты — это основа JavaScript и доступны везде, а host-объекты зависят от среды выполнения. Всегда проверяйте доступность host-объектов перед использованием и используйте нативные объекты когда возможно для создания более переносимого кода.

