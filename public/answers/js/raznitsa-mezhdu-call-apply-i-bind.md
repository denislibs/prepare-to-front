# Разница между `.call()`, `.apply()` и `bind()`?

Методы `.call()`, `.apply()` и `.bind()` — это встроенные методы функций в JavaScript, которые позволяют явно управлять значением `this` и передавать аргументы функции. Понимание различий между этими методами критически важно для работы с контекстом выполнения функций и создания гибкого, переиспользуемого кода.

## Общее назначение

Все три метода позволяют:
- ✅ **Устанавливать значение `this`** — для функции
- ✅ **Передавать аргументы** — функции
- ✅ **Управлять контекстом** — выполнения функции

## .call()

`.call()` — вызывает функцию с указанным значением `this` и аргументами, переданными по отдельности.

### Синтаксис:

```javascript
function.call(thisArg, arg1, arg2, ...)
```

### Характеристики:

- ✅ **Немедленный вызов** — функция вызывается сразу
- ✅ **Аргументы по отдельности** — передаются как отдельные параметры
- ✅ **Возвращает результат** — функции

### Примеры:

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

greet.call(person, "Hello", "!"); // "Hello, John!"
greet.call(person, "Hi", "."); // "Hi, John."

// С разными объектами
const person1 = { name: "John" };
const person2 = { name: "Jane" };

greet.call(person1, "Hello", "!"); // "Hello, John!"
greet.call(person2, "Hello", "!"); // "Hello, Jane!"
```

## .apply()

`.apply()` — вызывает функцию с указанным значением `this` и аргументами, переданными как массив.

### Синтаксис:

```javascript
function.apply(thisArg, [arg1, arg2, ...])
```

### Характеристики:

- ✅ **Немедленный вызов** — функция вызывается сразу
- ✅ **Аргументы массивом** — передаются как массив
- ✅ **Возвращает результат** — функции
- ✅ **Полезно для динамических аргументов** — когда количество аргументов неизвестно

### Примеры:

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

greet.apply(person, ["Hello", "!"]); // "Hello, John!"
greet.apply(person, ["Hi", "."]); // "Hi, John."

// Полезно для динамических аргументов
function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

const numbers = [1, 2, 3, 4, 5];
const result = sum.apply(null, numbers); // 15
```

## .bind()

`.bind()` — создает новую функцию с привязанным значением `this` и, опционально, предустановленными аргументами. Функция не вызывается сразу.

### Синтаксис:

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

### Характеристики:

- ❌ **Не вызывает функцию** — создает новую функцию
- ✅ **Возвращает функцию** — с привязанным `this`
- ✅ **Частичное применение** — можно предустановить аргументы
- ✅ **Полезно для callbacks** — сохранение контекста

### Примеры:

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

// Создание функции с привязанным this
const boundGreet = greet.bind(person);
boundGreet("Hello", "!"); // "Hello, John!"

// Частичное применение
const sayHello = greet.bind(person, "Hello");
sayHello("!"); // "Hello, John!"
sayHello("?"); // "Hello, John?"

// Сохранение контекста в callback
const obj = {
  name: "John",
  items: [1, 2, 3],
  processItems: function() {
    // this потеряется в setTimeout
    this.items.forEach(function(item) {
      console.log(this.name, item); // undefined
    });
    
    // Решение с bind
    this.items.forEach(function(item) {
      console.log(this.name, item); // "John"
    }.bind(this));
  }
};
```

## Сравнительная таблица

| Метод | Вызов функции | Аргументы | Возвращает | Использование |
|-------|---------------|-----------|------------|---------------|
| **call** | ✅ Сразу | По отдельности | Результат | Когда аргументы известны |
| **apply** | ✅ Сразу | Массивом | Результат | Когда аргументы в массиве |
| **bind** | ❌ Нет | По отдельности | Функцию | Для сохранения контекста |

## Практические примеры

### Пример 1: Заимствование методов

```javascript
// Заимствование метода массива для псевдомассива
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3
};

// Использование метода массива
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ["a", "b", "c"]

// Или с apply
const realArray2 = Array.prototype.slice.apply(arrayLike);
console.log(realArray2); // ["a", "b", "c"]
```

### Пример 2: Нахождение максимального значения

```javascript
const numbers = [5, 6, 2, 3, 7];

// Math.max не принимает массив напрямую
// Math.max(5, 6, 2, 3, 7) - работает
// Math.max([5, 6, 2, 3, 7]) - не работает

// Решение с apply
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// Или с spread оператором (ES6)
const max2 = Math.max(...numbers);
console.log(max2); // 7
```

### Пример 3: Сохранение контекста

```javascript
// Проблема с потерей this
const obj = {
  name: "John",
  greet: function() {
    setTimeout(function() {
      console.log(this.name); // undefined - this потерян
    }, 100);
  }
};

// Решение с bind
const obj2 = {
  name: "John",
  greet: function() {
    setTimeout(function() {
      console.log(this.name); // "John"
    }.bind(this), 100);
  }
};

// Или с arrow function
const obj3 = {
  name: "John",
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // "John"
    }, 100);
  }
};
```

### Пример 4: Частичное применение

```javascript
function multiply(a, b, c) {
  return a * b * c;
}

// Частичное применение с bind
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 24 (2 * 3 * 4)
```

### Пример 5: Каррирование

```javascript
function add(a, b, c) {
  return a + b + c;
}

// Каррирование с bind
const add5 = add.bind(null, 5);
const add5And10 = add5.bind(null, 10);
console.log(add5And10(15)); // 30
```

## Когда использовать что?

### ✅ Используйте `.call()` когда:

1. **Аргументы известны** — и передаются по отдельности
2. **Нужен немедленный вызов** — функции
3. **Заимствование методов** — у других объектов

```javascript
// Заимствование метода
Array.prototype.slice.call(arrayLike);

// Вызов с известными аргументами
greet.call(person, "Hello", "!");
```

### ✅ Используйте `.apply()` когда:

1. **Аргументы в массиве** — удобно передавать массивом
2. **Динамическое количество аргументов** — количество неизвестно
3. **Работа с Math методами** — max, min и т.д.

```javascript
// Динамические аргументы
const args = [1, 2, 3, 4, 5];
sum.apply(null, args);

// Math методы
Math.max.apply(null, numbers);
```

### ✅ Используйте `.bind()` когда:

1. **Сохранение контекста** — в callbacks и обработчиках событий
2. **Частичное применение** — предустановка аргументов
3. **Создание специализированных функций** — на основе общей функции

```javascript
// Сохранение контекста
button.addEventListener('click', handler.bind(obj));

// Частичное применение
const log = console.log.bind(console, "Log:");
log("message"); // "Log: message"
```

## Современные альтернативы (ES6+)

### Spread оператор вместо apply

```javascript
// Старый способ
Math.max.apply(null, numbers);

// Современный способ
Math.max(...numbers);
```

### Arrow functions вместо bind

```javascript
// Старый способ
setTimeout(function() {
  console.log(this.name);
}.bind(this), 100);

// Современный способ
setTimeout(() => {
  console.log(this.name);
}, 100);
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте call/apply** — для заимствования методов
2. **Используйте bind** — для сохранения контекста
3. **Рассматривайте альтернативы** — spread оператор, arrow functions
4. **Понимайте контекст** — когда какой метод использовать

### ❌ Не делайте:

1. **Не используйте apply** — когда можно использовать spread
2. **Не используйте bind** — когда можно использовать arrow function
3. **Не забывайте про производительность** — bind создает новую функцию

## Заключение

Разница между `.call()`, `.apply()` и `.bind()`:

- **call** — немедленный вызов с аргументами по отдельности
- **apply** — немедленный вызов с аргументами массивом
- **bind** — создание новой функции с привязанным this
- **Выбор зависит от задачи** — нужен ли немедленный вызов или сохранение функции

**Помните:** эти методы — мощные инструменты для управления контекстом выполнения функций. Используйте `call()` и `apply()` для немедленного вызова с установкой `this`, и `bind()` для создания функций с сохраненным контекстом. В современном JavaScript рассмотрите альтернативы: spread оператор вместо `apply()` и arrow functions вместо `bind()`.

