# Что такое утечки памяти?

Утечка памяти (memory leak) — это ситуация, когда программа продолжает использовать память для объектов, которые больше не нужны и не могут быть освобождены сборщиком мусора. Понимание утечек памяти критически важно для создания производительных и стабильных приложений.

## Что такое утечка памяти?

Утечка памяти происходит, когда объекты остаются в памяти, даже если они больше не используются программой, из-за сохраненных ссылок, которые препятствуют их удалению сборщиком мусора.

### Характеристики:

- ⚠️ **Накопление памяти** — память постоянно увеличивается
- ⚠️ **Снижение производительности** — приложение замедляется
- ⚠️ **Краши приложения** — при исчерпании памяти
- ⚠️ **Неочевидные причины** — часто сложно обнаружить

## Основные причины утечек памяти

### 1. **Глобальные переменные**

```javascript
// ❌ Плохо - глобальная переменная
function createData() {
  window.largeData = new Array(1000000).fill(0);
}

// ✅ Хорошо - локальная переменная
function createData() {
  const largeData = new Array(1000000).fill(0);
  return largeData;
}
```

### 2. **Забытые таймеры**

```javascript
// ❌ Плохо - таймер не очищается
function startTimer() {
  setInterval(() => {
    console.log("Tick");
  }, 1000);
}

// ✅ Хорошо - таймер сохраняется и очищается
let timerId;
function startTimer() {
  timerId = setInterval(() => {
    console.log("Tick");
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}
```

### 3. **Event Listeners**

```javascript
// ❌ Плохо - listener не удаляется
function setupListener() {
  const button = document.getElementById("btn");
  button.addEventListener("click", function() {
    console.log("Clicked");
  });
}

// ✅ Хорошо - listener удаляется
function setupListener() {
  const button = document.getElementById("btn");
  const handler = function() {
    console.log("Clicked");
  };
  button.addEventListener("click", handler);
  
  // Удаление при необходимости
  return () => button.removeEventListener("click", handler);
}
```

### 4. **Замыкания**

```javascript
// ❌ Плохо - замыкание сохраняет большие данные
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function() {
    console.log("Handler");
    // largeData все еще в памяти
  };
}

// ✅ Хорошо - освобождение данных
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function() {
    console.log("Handler");
    // Использование данных
    // После использования можно очистить
  };
}
```

### 5. **DOM ссылки**

```javascript
// ❌ Плохо - ссылка на удаленный элемент
let element = document.getElementById("item");
document.body.removeChild(element);
// element все еще ссылается на удаленный элемент

// ✅ Хорошо - удаление ссылки
let element = document.getElementById("item");
document.body.removeChild(element);
element = null; // Освобождение ссылки
```

## Практические примеры

### Пример 1: Накопление данных

```javascript
// ❌ Утечка - массив постоянно растет
const data = [];
setInterval(() => {
  data.push(new Array(1000).fill(0));
}, 1000);

// ✅ Решение - ограничение размера
const data = [];
const MAX_SIZE = 100;
setInterval(() => {
  data.push(new Array(1000).fill(0));
  if (data.length > MAX_SIZE) {
    data.shift(); // Удаление старых данных
  }
}, 1000);
```

### Пример 2: Циклические ссылки

```javascript
// ❌ Утечка - циклическая ссылка
function createCircular() {
  const obj1 = { data: "value1" };
  const obj2 = { data: "value2" };
  obj1.ref = obj2;
  obj2.ref = obj1;
  return obj1;
}

// ✅ Решение - использование WeakMap
const refs = new WeakMap();
function createCircular() {
  const obj1 = { data: "value1" };
  const obj2 = { data: "value2" };
  refs.set(obj1, obj2);
  refs.set(obj2, obj1);
  return obj1;
}
```

### Пример 3: Кэширование

```javascript
// ❌ Утечка - кэш растет бесконечно
const cache = {};
function getData(key) {
  if (!cache[key]) {
    cache[key] = fetchData(key);
  }
  return cache[key];
}

// ✅ Решение - ограничение размера кэша
const cache = new Map();
const MAX_CACHE_SIZE = 100;
function getData(key) {
  if (!cache.has(key)) {
    if (cache.size >= MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(key, fetchData(key));
  }
  return cache.get(key);
}
```

## Обнаружение утечек памяти

### 1. **Chrome DevTools**

```javascript
// Использование Memory Profiler
// 1. Открыть DevTools
// 2. Перейти на вкладку Memory
// 3. Сделать снимок памяти
// 4. Выполнить действия
// 5. Сделать еще один снимок
// 6. Сравнить снимки
```

### 2. **Performance Monitor**

```javascript
// Мониторинг использования памяти
performance.memory.usedJSHeapSize;
performance.memory.totalJSHeapSize;
performance.memory.jsHeapSizeLimit;
```

### 3. **Ручное тестирование**

```javascript
// Проверка роста памяти
let initialMemory = performance.memory.usedJSHeapSize;
// Выполнение действий
let finalMemory = performance.memory.usedJSHeapSize;
console.log("Memory increase:", finalMemory - initialMemory);
```

## Предотвращение утечек памяти

### 1. **Использование WeakMap/WeakSet**

```javascript
// WeakMap для слабых ссылок
const weakMap = new WeakMap();
const obj = { data: "value" };
weakMap.set(obj, "data");

// Когда obj удаляется, запись в WeakMap тоже удаляется
```

### 2. **Очистка ресурсов**

```javascript
// Очистка всех ресурсов
function cleanup() {
  // Очистка таймеров
  clearInterval(timerId);
  clearTimeout(timeoutId);
  
  // Удаление listeners
  element.removeEventListener("click", handler);
  
  // Очистка данных
  data = null;
  cache.clear();
}
```

### 3. **Использование паттернов**

```javascript
// Паттерн для управления ресурсами
class ResourceManager {
  constructor() {
    this.resources = [];
  }
  
  add(resource) {
    this.resources.push(resource);
  }
  
  cleanup() {
    this.resources.forEach(resource => resource.cleanup());
    this.resources = [];
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Удаляйте ссылки** — когда объекты больше не нужны
2. **Очищайте таймеры** — clearInterval, clearTimeout
3. **Удаляйте listeners** — removeEventListener
4. **Используйте WeakMap/WeakSet** — для слабых ссылок

### ❌ Не делайте:

1. **Не создавайте глобальные переменные** — без необходимости
2. **Не забывайте очищать** — таймеры и listeners
3. **Не храните большие данные** — без необходимости
4. **Не создавайте циклические ссылки** — без необходимости

## Заключение

Утечки памяти:

- **Накопление памяти** — объекты остаются в памяти
- **Основные причины** — глобальные переменные, таймеры, listeners
- **Обнаружение** — через DevTools и мониторинг
- **Предотвращение** — очистка ресурсов и правильные паттерны

**Помните:** утечки памяти могут серьезно повлиять на производительность приложения. Понимание причин и способов предотвращения критически важно для создания стабильных приложений. Используйте лучшие практики для предотвращения утечек памяти и регулярно проверяйте использование памяти в приложении.

