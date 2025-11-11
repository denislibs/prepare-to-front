# Назовите основные типы утечек памяти в JavaScript?

Утечки памяти в JavaScript могут возникать по различным причинам. Понимание основных типов утечек памяти критически важно для их предотвращения и создания производительных приложений.

## Основные типы утечек памяти

### 1. **Глобальные переменные**

Глобальные переменные остаются в памяти на протяжении всего времени жизни приложения.

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

### 2. **Забытые таймеры (Timers)**

Таймеры продолжают выполняться, даже если компонент больше не используется.

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

Event listeners сохраняют ссылки на элементы и функции, предотвращая их удаление.

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
  
  return () => button.removeEventListener("click", handler);
}
```

### 4. **Замыкания (Closures)**

Замыкания сохраняют ссылки на внешние переменные, даже если они больше не нужны.

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
  let largeData = new Array(1000000).fill(0);
  const handler = function() {
    console.log("Handler");
  };
  // Очистка после использования
  largeData = null;
  return handler;
}
```

### 5. **DOM ссылки**

Ссылки на удаленные DOM элементы остаются в памяти.

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

### 6. **Циклические ссылки**

Объекты ссылаются друг на друга, создавая циклы, которые могут препятствовать сборке мусора.

```javascript
// ❌ Плохо - циклическая ссылка
function createCircular() {
  const obj1 = { data: "value1" };
  const obj2 = { data: "value2" };
  obj1.ref = obj2;
  obj2.ref = obj1;
  return obj1;
}

// ✅ Хорошо - использование WeakMap
const refs = new WeakMap();
function createCircular() {
  const obj1 = { data: "value1" };
  const obj2 = { data: "value2" };
  refs.set(obj1, obj2);
  refs.set(obj2, obj1);
  return obj1;
}
```

### 7. **Кэширование без ограничений**

Кэши растут бесконечно, накапливая данные в памяти.

```javascript
// ❌ Плохо - кэш растет бесконечно
const cache = {};
function getData(key) {
  if (!cache[key]) {
    cache[key] = fetchData(key);
  }
  return cache[key];
}

// ✅ Хорошо - ограничение размера кэша
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

### 8. **WebSocket соединения**

Незакрытые WebSocket соединения продолжают использовать память.

```javascript
// ❌ Плохо - соединение не закрывается
function connect() {
  const ws = new WebSocket("ws://example.com");
  ws.onmessage = function(event) {
    console.log(event.data);
  };
}

// ✅ Хорошо - соединение закрывается
let ws;
function connect() {
  ws = new WebSocket("ws://example.com");
  ws.onmessage = function(event) {
    console.log(event.data);
  };
}

function disconnect() {
  if (ws) {
    ws.close();
    ws = null;
  }
}
```

### 9. **Накопление данных в массивах**

Массивы постоянно растут, накапливая данные.

```javascript
// ❌ Плохо - массив постоянно растет
const data = [];
setInterval(() => {
  data.push(new Array(1000).fill(0));
}, 1000);

// ✅ Хорошо - ограничение размера
const data = [];
const MAX_SIZE = 100;
setInterval(() => {
  data.push(new Array(1000).fill(0));
  if (data.length > MAX_SIZE) {
    data.shift(); // Удаление старых данных
  }
}, 1000);
```

### 10. **Observers и Subscriptions**

Observers и подписки не отменяются, продолжая использовать память.

```javascript
// ❌ Плохо - подписка не отменяется
function subscribe() {
  const subscription = observable.subscribe(data => {
    console.log(data);
  });
  // subscription не отменяется
}

// ✅ Хорошо - подписка отменяется
let subscription;
function subscribe() {
  subscription = observable.subscribe(data => {
    console.log(data);
  });
}

function unsubscribe() {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
}
```

## Практические примеры

### Пример 1: Комбинированная утечка

```javascript
// ❌ Множественные утечки
class Component {
  constructor() {
    this.data = new Array(1000000).fill(0);
    this.timer = setInterval(() => {
      console.log("Tick");
    }, 1000);
    this.button = document.getElementById("btn");
    this.button.addEventListener("click", this.handleClick.bind(this));
  }
  
  handleClick() {
    console.log("Clicked");
  }
  
  // Нет метода cleanup!
}

// ✅ Правильная реализация
class Component {
  constructor() {
    this.data = new Array(1000000).fill(0);
    this.timer = setInterval(() => {
      console.log("Tick");
    }, 1000);
    this.button = document.getElementById("btn");
    this.handleClick = this.handleClick.bind(this);
    this.button.addEventListener("click", this.handleClick);
  }
  
  handleClick() {
    console.log("Clicked");
  }
  
  cleanup() {
    clearInterval(this.timer);
    this.button.removeEventListener("click", this.handleClick);
    this.data = null;
    this.button = null;
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Очищайте таймеры** — clearInterval, clearTimeout
2. **Удаляйте listeners** — removeEventListener
3. **Освобождайте ссылки** — устанавливайте null
4. **Используйте WeakMap/WeakSet** — для слабых ссылок
5. **Ограничивайте кэши** — устанавливайте максимальный размер

### ❌ Не делайте:

1. **Не создавайте глобальные переменные** — без необходимости
2. **Не забывайте очищать** — таймеры и listeners
3. **Не храните большие данные** — без необходимости
4. **Не создавайте циклические ссылки** — без необходимости

## Заключение

Основные типы утечек памяти:

- **Глобальные переменные** — остаются в памяти
- **Забытые таймеры** — продолжают выполняться
- **Event Listeners** — сохраняют ссылки
- **Замыкания** — сохраняют внешние переменные
- **DOM ссылки** — ссылки на удаленные элементы
- **Циклические ссылки** — взаимные ссылки объектов
- **Кэширование** — неограниченный рост
- **WebSocket соединения** — незакрытые соединения
- **Накопление данных** — растущие массивы
- **Observers** — неотмененные подписки

**Помните:** понимание различных типов утечек памяти критически важно для их предотвращения. Используйте лучшие практики для очистки ресурсов и регулярно проверяйте использование памяти в приложении.

