# Каким образом можно обмениваться кодом между файлами?

Обмен кодом между файлами в JavaScript — это фундаментальная концепция модульности и организации кода. Существует несколько способов обмена кодом между файлами, каждый со своими преимуществами и случаями использования. Понимание различных методов критически важно для создания поддерживаемого и масштабируемого кода.

## Основные способы

### 1. **ES6 Modules (import/export)**

Современный стандартный способ модульности в JavaScript.

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// main.js
import { add, subtract, PI } from "./math.js";

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(PI); // 3.14159
```

### 2. **CommonJS (require/module.exports)**

Используется в Node.js и старых системах сборки.

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract,
  PI: 3.14159
};

// main.js
const { add, subtract, PI } = require("./math.js");

console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
console.log(PI); // 3.14159
```

### 3. **AMD (Asynchronous Module Definition)**

Используется в старых системах, таких как RequireJS.

```javascript
// math.js
define(function() {
  return {
    add: function(a, b) {
      return a + b;
    },
    subtract: function(a, b) {
      return a - b;
    }
  };
});

// main.js
require(["math"], function(math) {
  console.log(math.add(2, 3)); // 5
});
```

### 4. **UMD (Universal Module Definition)**

Универсальный формат, работающий везде.

```javascript
// math.js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.math = factory();
  }
}(typeof self !== "undefined" ? self : this, function() {
  return {
    add: function(a, b) {
      return a + b;
    }
  };
}));
```

## ES6 Modules (современный стандарт)

### Named Exports:

```javascript
// utils.js
export function formatDate(date) {
  return date.toISOString();
}

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// main.js
import { formatDate, formatCurrency } from "./utils.js";
```

### Default Export:

```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// main.js
import User from "./User.js";
const user = new User("John");
```

### Mixed Exports:

```javascript
// config.js
export const API_URL = "https://api.example.com";
export default {
  timeout: 5000,
  retries: 3
};

// main.js
import config, { API_URL } from "./config.js";
```

### Re-export:

```javascript
// index.js
export { add, subtract } from "./math.js";
export { formatDate } from "./utils.js";

// main.js
import { add, formatDate } from "./index.js";
```

## CommonJS (Node.js)

### module.exports:

```javascript
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// main.js
const math = require("./math.js");
console.log(math.add(2, 3)); // 5
```

### exports:

```javascript
// math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// main.js
const { add, subtract } = require("./math.js");
console.log(add(2, 3)); // 5
```

## Практические примеры

### Пример 1: Структура проекта

```
project/
  ├── src/
  │   ├── utils/
  │   │   ├── math.js
  │   │   └── format.js
  │   ├── components/
  │   │   └── User.js
  │   └── main.js
  └── package.json
```

```javascript
// utils/math.js
export function add(a, b) {
  return a + b;
}

// utils/format.js
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// components/User.js
import { formatCurrency } from "../utils/format.js";

export default class User {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }
  
  getFormattedBalance() {
    return formatCurrency(this.balance);
  }
}

// main.js
import User from "./components/User.js";
import { add } from "./utils/math.js";

const user = new User("John", 1000);
console.log(user.getFormattedBalance()); // "$1000.00"
```

### Пример 2: Конфигурация

```javascript
// config.js
export const API_URL = "https://api.example.com";
export const API_KEY = "your-api-key";
export const TIMEOUT = 5000;

// api.js
import { API_URL, API_KEY, TIMEOUT } from "./config.js";

export async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    },
    signal: AbortSignal.timeout(TIMEOUT)
  });
  return response.json();
}

// main.js
import { fetchData } from "./api.js";

const data = await fetchData("/users");
```

### Пример 3: Утилиты

```javascript
// utils/validation.js
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

// utils/format.js
export function formatPhone(phone) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

// main.js
import { isValidEmail, isValidPhone } from "./utils/validation.js";
import { formatPhone } from "./utils/format.js";

if (isValidEmail("user@example.com")) {
  console.log("Valid email");
}

const phone = "1234567890";
if (isValidPhone(phone)) {
  console.log(formatPhone(phone)); // "(123) 456-7890"
}
```

## Сравнение методов

### ES6 Modules vs CommonJS:

```javascript
// ES6 Modules - статический анализ, tree-shaking
import { add } from "./math.js";

// CommonJS - динамический, runtime
const { add } = require("./math.js");
```

### Преимущества ES6 Modules:

- ✅ **Статический анализ** — проверка на этапе компиляции
- ✅ **Tree-shaking** — удаление неиспользуемого кода
- ✅ **Асинхронная загрузка** — в браузере
- ✅ **Стандарт** — официальный стандарт JavaScript

## Лучшие практики

### ✅ Делайте:

1. **Используйте ES6 Modules** — современный стандарт
2. **Организуйте код** — по функциональности
3. **Используйте именованные экспорты** — для утилит
4. **Используйте default экспорт** — для классов/компонентов

### ❌ Не делайте:

1. **Не смешивайте системы** — будьте последовательны
2. **Не создавайте циклические зависимости** — избегайте
3. **Не экспортируйте все** — только необходимое
4. **Не забывайте про типы** — используйте TypeScript если нужно

## Заключение

Способы обмена кодом между файлами:

- **ES6 Modules** — современный стандарт (import/export)
- **CommonJS** — для Node.js (require/module.exports)
- **AMD** — для старых систем (define/require)
- **UMD** — универсальный формат

**Помните:** ES6 Modules — это современный стандарт для обмена кодом между файлами. Используйте его для создания модульного, поддерживаемого и масштабируемого кода. Понимание различных методов критически важно для организации кода в JavaScript проектах.

