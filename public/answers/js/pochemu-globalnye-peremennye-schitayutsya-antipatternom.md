# Почему глобальные переменные в JavaScript считаются "антипаттерном"?

Глобальные переменные — это переменные, объявленные в глобальной области видимости и доступные из любого места в программе. Хотя они могут показаться удобными, использование глобальных переменных считается антипаттерном по нескольким важным причинам. Понимание проблем с глобальными переменными критически важно для написания поддерживаемого и безопасного кода.

## Проблемы с глобальными переменными

### 1. **Загрязнение глобального пространства имен**

Глобальные переменные добавляются в глобальный объект (window в браузере), что может привести к конфликтам имен.

```javascript
// ❌ Проблема - глобальная переменная
var userName = "John";

// Другой скрипт может перезаписать
var userName = "Jane"; // Конфликт!

// ✅ Решение - использование модулей или замыканий
(function() {
  var userName = "John"; // Локальная переменная
  // Использование userName
})();
```

### 2. **Побочные эффекты**

Глобальные переменные могут быть изменены из любого места, что затрудняет отслеживание изменений.

```javascript
// ❌ Проблема - глобальная переменная
var counter = 0;

function increment() {
  counter++; // Изменение глобальной переменной
}

function decrement() {
  counter--; // Изменение глобальной переменной
}

// Кто-то еще может изменить counter
counter = 100; // Неожиданное изменение

// ✅ Решение - инкапсуляция
function createCounter() {
  let counter = 0; // Приватная переменная
  
  return {
    increment() {
      counter++;
    },
    decrement() {
      counter--;
    },
    getValue() {
      return counter;
    }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getValue()); // 1
// counter нельзя изменить напрямую
```

### 3. **Тестирование**

Глобальные переменные затрудняют тестирование, так как состояние может быть изменено между тестами.

```javascript
// ❌ Проблема - глобальная переменная
var config = {
  apiUrl: "https://api.example.com"
};

function makeRequest() {
  return fetch(config.apiUrl);
}

// Тестирование затруднено
// config может быть изменен другими тестами

// ✅ Решение - передача зависимостей
function makeRequest(apiUrl) {
  return fetch(apiUrl);
}

// Легко тестировать
makeRequest("https://test-api.example.com");
```

### 4. **Отладка**

Сложно отследить, где и когда глобальная переменная была изменена.

```javascript
// ❌ Проблема
var data = {};

function functionA() {
  data.value = 1; // Кто изменил data?
}

function functionB() {
  data.value = 2; // Кто изменил data?
}

function functionC() {
  data.value = 3; // Кто изменил data?
}

// Сложно отследить, какая функция изменила data

// ✅ Решение - явная передача данных
function processData(data) {
  const newData = { ...data, value: 1 };
  return newData;
}
```

### 5. **Конфликты с библиотеками**

Глобальные переменные могут конфликтовать с переменными из библиотек.

```javascript
// ❌ Проблема
var $ = "my variable"; // Конфликт с jQuery!

// jQuery использует $ как глобальную переменную
// Теперь $ перезаписана

// ✅ Решение - использование модулей
import $ from "jquery";
const myVariable = "my value";
```

### 6. **Память**

Глобальные переменные остаются в памяти на протяжении всего времени жизни приложения.

```javascript
// ❌ Проблема
var largeData = new Array(1000000).fill(0);
// largeData остается в памяти до закрытия страницы

// ✅ Решение - локальные переменные
function processData() {
  const largeData = new Array(1000000).fill(0);
  // largeData удаляется после выполнения функции
}
```

## Практические примеры

### Пример 1: Загрязнение глобального пространства

```javascript
// ❌ Плохо - множество глобальных переменных
var userName = "John";
var userAge = 30;
var userEmail = "john@example.com";
var isLoggedIn = true;
var currentPage = "home";

// ✅ Хорошо - объект для группировки
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
  isLoggedIn: true
};

const app = {
  currentPage: "home"
};
```

### Пример 2: Побочные эффекты

```javascript
// ❌ Плохо - глобальная переменная
var count = 0;

function increment() {
  count++;
}

function getCount() {
  return count;
}

// Кто-то может изменить count напрямую
count = 100; // Неожиданное изменение

// ✅ Хорошо - инкапсуляция
const counter = (function() {
  let count = 0; // Приватная переменная
  
  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    }
  };
})();

counter.increment();
console.log(counter.getCount()); // 1
// count нельзя изменить напрямую
```

### Пример 3: Конфликты имен

```javascript
// ❌ Плохо - конфликт имен
var name = "John";
var name = "Jane"; // Перезапись

// ✅ Хорошо - использование модулей
// module1.js
export const name = "John";

// module2.js
export const name = "Jane"; // Разные модули, нет конфликта
```

## Альтернативы глобальным переменным

### 1. **Модули (ES6)**

```javascript
// config.js
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;

// main.js
import { API_URL, TIMEOUT } from "./config.js";
```

### 2. **Замыкания**

```javascript
const app = (function() {
  let privateVar = "private";
  
  return {
    getPrivateVar() {
      return privateVar;
    },
    setPrivateVar(value) {
      privateVar = value;
    }
  };
})();
```

### 3. **Классы**

```javascript
class App {
  constructor() {
    this.config = {
      apiUrl: "https://api.example.com"
    };
  }
  
  getConfig() {
    return this.config;
  }
}

const app = new App();
```

### 4. **Singleton паттерн**

```javascript
const Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  
  getApiUrl() {
    return this.apiUrl;
  }
};
```

## Когда глобальные переменные допустимы

### Редкие случаи:

1. **Конфигурация приложения** — если действительно глобальная
2. **Полифиллы** — для обратной совместимости
3. **Глобальные утилиты** — если используются везде

```javascript
// Допустимо для полифиллов
if (!Array.prototype.includes) {
  Array.prototype.includes = function(item) {
    return this.indexOf(item) !== -1;
  };
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте модули** — для организации кода
2. **Используйте замыкания** — для инкапсуляции
3. **Используйте классы** — для группировки связанных данных
4. **Минимизируйте глобальные переменные** — только когда необходимо

### ❌ Не делайте:

1. **Не создавайте глобальные переменные** — без необходимости
2. **Не загрязняйте глобальное пространство** — используйте модули
3. **Не используйте var** — в глобальной области видимости
4. **Не забывайте про конфликты** — проверяйте имена переменных

## Заключение

Почему глобальные переменные — антипаттерн:

- **Загрязнение пространства имен** — конфликты имен
- **Побочные эффекты** — неожиданные изменения
- **Тестирование** — сложность тестирования
- **Отладка** — сложность отслеживания изменений
- **Память** — остаются в памяти
- **Конфликты** — с библиотеками

**Помните:** глобальные переменные создают множество проблем и затрудняют поддержку кода. Используйте модули, замыкания и классы для организации кода и избегайте глобальных переменных когда возможно. Понимание проблем с глобальными переменными критически важно для написания качественного JavaScript кода.

