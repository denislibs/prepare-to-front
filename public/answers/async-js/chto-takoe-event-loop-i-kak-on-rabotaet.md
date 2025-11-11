# Что такое цикл событий (event loop) и как он работает?

Event Loop (цикл событий) — это фундаментальный механизм JavaScript, который управляет выполнением кода, обработкой асинхронных операций и событий. Понимание работы Event Loop критически важно для понимания того, как JavaScript обрабатывает асинхронный код, почему код выполняется в определенном порядке, и как работают промисы, таймеры и другие асинхронные операции.

## Что такое Event Loop?

Event Loop — это бесконечный цикл, который постоянно проверяет, есть ли задачи для выполнения, и выполняет их. Event Loop является основой асинхронного выполнения в JavaScript и позволяет JavaScript быть однопоточным, но при этом обрабатывать асинхронные операции.

### Основные компоненты:

1. **Call Stack** (стек вызовов) — где выполняется синхронный код
2. **Callback Queue** (очередь колбэков) — где хранятся готовые к выполнению колбэки
3. **Microtask Queue** (очередь микрозадач) — для промисов и других микрозадач
4. **Event Loop** — управляет выполнением задач

## Как работает Event Loop?

### Базовый процесс:

1. Выполняется синхронный код из Call Stack
2. Когда Call Stack пуст, Event Loop проверяет очереди
3. Сначала выполняются все микрозадачи (Microtask Queue)
4. Затем выполняется одна макрозадача (Callback Queue)
5. Процесс повторяется

### Визуализация:

```
┌─────────────────┐
│   Call Stack    │ ← Синхронный код выполняется здесь
└─────────────────┘
         ↓
┌─────────────────┐
│  Event Loop     │ ← Проверяет очереди когда Call Stack пуст
└─────────────────┘
         ↓
┌─────────────────┐     ┌─────────────────┐
│ Microtask Queue │ →   │ Callback Queue  │
│ (Промисы)       │     │ (setTimeout)    │
└─────────────────┘     └─────────────────┘
```

## Call Stack (стек вызовов)

Call Stack — это структура данных, которая отслеживает текущие выполняемые функции.

### Пример:

```javascript
function first() {
  console.log('1');
  second();
  console.log('2');
}

function second() {
  console.log('3');
  third();
  console.log('4');
}

function third() {
  console.log('5');
}

first();

// Call Stack:
// [first] → [first, second] → [first, second, third] 
// → [first, second] → [first] → []
// Вывод: 1, 3, 5, 4, 2
```

## Callback Queue (очередь колбэков)

Callback Queue — это очередь для макрозадач (setTimeout, setInterval, события DOM).

### Пример:

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');

// Вывод: 1, 3, 2
// setTimeout добавляется в Callback Queue
// Выполняется после завершения синхронного кода
```

## Microtask Queue (очередь микрозадач)

Microtask Queue — это очередь для микрозадач (промисы, queueMicrotask, MutationObserver).

### Пример:

```javascript
console.log('1');

Promise.resolve().then(() => {
  console.log('2');
});

console.log('3');

// Вывод: 1, 3, 2
// Промис добавляется в Microtask Queue
// Выполняется после синхронного кода, но ПЕРЕД макрозадачами
```

## Приоритет выполнения

### Порядок выполнения:

1. **Синхронный код** (Call Stack)
2. **Микрозадачи** (Microtask Queue) — все микрозадачи выполняются до макрозадач
3. **Макрозадачи** (Callback Queue) — по одной за раз

### Пример приоритетов:

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

queueMicrotask(() => {
  console.log('4');
});

console.log('5');

// Вывод: 1, 5, 3, 4, 2
// Порядок:
// 1. Синхронный код: 1, 5
// 2. Микрозадачи: 3, 4 (все микрозадачи выполняются)
// 3. Макрозадачи: 2 (одна макрозадача)
```

## Детальный пример работы Event Loop

```javascript
console.log('Начало');

// Макрозадача
setTimeout(() => {
  console.log('setTimeout 1');
}, 0);

// Микрозадача
Promise.resolve().then(() => {
  console.log('Promise 1');
});

// Макрозадача
setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

// Микрозадача
Promise.resolve().then(() => {
  console.log('Promise 2');
});

console.log('Конец');

// Вывод:
// Начало
// Конец
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
```

**Как это работает:**

1. Синхронный код выполняется: "Начало", "Конец"
2. Call Stack пуст, Event Loop проверяет очереди
3. Выполняются ВСЕ микрозадачи: "Promise 1", "Promise 2"
4. Выполняется одна макрозадача: "setTimeout 1"
5. Call Stack пуст, Event Loop снова проверяет
6. Выполняется следующая макрозадача: "setTimeout 2"

## Вложенные микрозадачи

Микрозадачи могут создавать новые микрозадачи, которые выполняются до макрозадач.

```javascript
console.log('1');

Promise.resolve().then(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
  console.log('4');
});

setTimeout(() => {
  console.log('5');
}, 0);

console.log('6');

// Вывод: 1, 6, 2, 4, 3, 5
// Все микрозадачи выполняются до макрозадач
```

## Практические примеры

### Пример 1: setTimeout с нулевой задержкой

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');

// Вывод: 1, 3, 2
// setTimeout не выполняется сразу, даже с 0ms
// Он добавляется в Callback Queue и выполняется после синхронного кода
```

### Пример 2: Промисы и setTimeout

```javascript
console.log('Начало');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('Конец');

// Вывод:
// Начало
// Конец
// Promise 1
// Promise 2
// setTimeout
```

### Пример 3: async/await

```javascript
async function asyncFunction() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
asyncFunction();
console.log('4');

// Вывод: 3, 1, 4, 2
// async/await использует промисы (микрозадачи)
```

### Пример 4: События DOM

```javascript
button.addEventListener('click', () => {
  console.log('1');
  
  Promise.resolve().then(() => {
    console.log('2');
  });
  
  setTimeout(() => {
    console.log('3');
  }, 0);
  
  console.log('4');
});

// При клике вывод: 1, 4, 2, 3
// События DOM - это макрозадачи
```

## Блокирующий код

Долгий синхронный код блокирует Event Loop.

```javascript
console.log('Начало');

// Блокирующий код
const start = Date.now();
while (Date.now() - start < 3000) {
  // Ожидание 3 секунды
}

console.log('Конец');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

// Вывод:
// (через 3 секунды) Начало
// (сразу) Конец
// (сразу) setTimeout
// Блокирующий код задерживает выполнение всего
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте асинхронный код** — для долгих операций
2. **Разбивайте долгие задачи** — используйте setTimeout или Web Workers
3. **Понимайте приоритеты** — микрозадачи перед макрозадачами
4. **Избегайте блокирующего кода** — в основном потоке

### ❌ Не делайте:

1. **Не блокируйте Event Loop** — долгими синхронными операциями
2. **Не создавайте слишком много микрозадач** — может заблокировать UI
3. **Не полагайтесь на точное время** — setTimeout не гарантирует точное время

## Заключение

Event Loop:

- **Управляет выполнением кода** — синхронного и асинхронного
- **Имеет приоритеты** — микрозадачи перед макрозадачами
- **Однопоточный** — но обрабатывает асинхронность
- **Основа асинхронности** — в JavaScript

**Помните:** Event Loop — это сердце асинхронного выполнения в JavaScript. Понимание его работы помогает писать эффективный асинхронный код и избегать проблем с производительностью. Микрозадачи (промисы) выполняются перед макрозадачами (setTimeout), что важно учитывать при работе с асинхронным кодом.

