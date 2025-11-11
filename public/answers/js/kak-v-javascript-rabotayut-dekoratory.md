# Как в JavaScript работают декораторы? Как они могут быть использованы для модификации поведения классов и методов?

Декораторы (decorators) в JavaScript — это специальный синтаксис, который позволяет модифицировать классы, методы, свойства и параметры функций. Понимание декораторов критически важно для создания переиспользуемого кода и применения паттернов проектирования.

## Что такое декораторы?

Декораторы — это функции, которые принимают целевой объект и возвращают модифицированную версию или обертку над ним.

### Характеристики:

- ✅ **Модификация поведения** — изменение функциональности
- ✅ **Переиспользование** — применение к разным объектам
- ✅ **Композиция** — комбинирование нескольких декораторов
- ✅ **Метапрограммирование** — программирование программ

## Типы декораторов

### 1. **Декораторы методов**

Модифицируют поведение методов класса.

```javascript
// Простой декоратор для логирования
function log(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a, b) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Calling add with args: [2, 3], add returned: 5
```

### 2. **Декораторы классов**

Модифицируют поведение всего класса.

```javascript
// Декоратор для добавления статического метода
function addStaticMethod(methodName, method) {
  return function(target) {
    target[methodName] = method;
    return target;
  };
}

@addStaticMethod("create", function() {
  return new this();
})
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = User.create(); // Использование статического метода
```

### 3. **Декораторы свойств**

Модифицируют поведение свойств класса.

```javascript
// Декоратор для readonly свойства
function readonly(target, propertyKey, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly
  name = "John";
}

const person = new Person();
person.name = "Jane"; // TypeError: Cannot assign to read only property
```

## Практические примеры

### Пример 1: Декоратор для измерения времени

```javascript
function measureTime(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${end - start} milliseconds`);
    return result;
  };
  
  return descriptor;
}

class DataProcessor {
  @measureTime
  processData(data) {
    // Обработка данных
    return data.map(x => x * 2);
  }
}
```

### Пример 2: Декоратор для кэширования

```javascript
function cache(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();
  
  descriptor.value = function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log(`Cache hit for ${propertyKey}`);
      return cache.get(key);
    }
    
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
  
  return descriptor;
}

class MathUtils {
  @cache
  fibonacci(n) {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
```

### Пример 3: Декоратор для валидации

```javascript
function validate(validator) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      if (!validator(...args)) {
        throw new Error(`Validation failed for ${propertyKey}`);
      }
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

class UserService {
  @validate((name, age) => name && age > 0)
  createUser(name, age) {
    return { name, age };
  }
}
```

### Пример 4: Декоратор для debounce

```javascript
function debounce(delay) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let timeoutId;
    
    descriptor.value = function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
    
    return descriptor;
  };
}

class SearchService {
  @debounce(300)
  search(query) {
    console.log("Searching for:", query);
  }
}
```

### Пример 5: Декоратор для автобиндинга

```javascript
function autobind(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  
  return {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      Object.defineProperty(this, propertyKey, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}

class EventHandler {
  @autobind
  handleClick() {
    console.log("Clicked", this);
  }
}

const handler = new EventHandler();
const button = document.querySelector("button");
button.addEventListener("click", handler.handleClick); // this правильно привязан
```

## Композиция декораторов

### Несколько декораторов:

```javascript
class Service {
  @log
  @measureTime
  @cache
  expensiveOperation(data) {
    // Дорогая операция
    return data;
  }
}

// Декораторы применяются снизу вверх:
// 1. cache
// 2. measureTime
// 3. log
```

## Декораторы с параметрами

### Декораторы-фабрики:

```javascript
function retry(maxAttempts) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args) {
      let lastError;
      
      for (let i = 0; i < maxAttempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          console.log(`Attempt ${i + 1} failed, retrying...`);
        }
      }
      
      throw lastError;
    };
    
    return descriptor;
  };
}

class ApiService {
  @retry(3)
  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  }
}
```

## Поддержка в JavaScript

### Текущий статус:

- ⚠️ **Stage 3** — предложение находится на стадии 3
- ⚠️ **Требует транспиляции** — нужен Babel или TypeScript
- ⚠️ **Экспериментальная поддержка** — в некоторых движках

### Использование с Babel:

```javascript
// Требуется плагин @babel/plugin-proposal-decorators
// .babelrc
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

### Использование с TypeScript:

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## Альтернатива: Функциональные декораторы

### Без синтаксиса декораторов:

```javascript
// Функциональный подход
function logDecorator(fn) {
  return function(...args) {
    console.log("Calling function with args:", args);
    const result = fn.apply(this, args);
    console.log("Function returned:", result);
    return result;
  };
}

class Calculator {
  add = logDecorator(function(a, b) {
    return a + b;
  });
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте для переиспользования** — общей функциональности
2. **Комбинируйте декораторы** — для сложной логики
3. **Документируйте декораторы** — объясняйте их назначение
4. **Тестируйте декораторы** — отдельно от основной логики

### ❌ Не делайте:

1. **Не злоупотребляйте** — используйте только когда нужно
2. **Не усложняйте** — простые случаи лучше без декораторов
3. **Не забывайте про производительность** — декораторы добавляют overhead
4. **Не смешивайте стили** — будьте последовательны

## Заключение

Декораторы в JavaScript:

- **Модификация поведения** — классов, методов, свойств
- **Переиспользование** — общей функциональности
- **Композиция** — комбинирование нескольких декораторов
- **Практические применения** — логирование, кэширование, валидация

**Помните:** декораторы — это мощный инструмент для модификации поведения классов и методов. Используйте их для логирования, кэширования, валидации и других переиспользуемых паттернов. Понимание декораторов критически важно для создания гибкого и поддерживаемого кода в JavaScript.

