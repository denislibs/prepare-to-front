# Как можно создать объекты с приватными свойствами и методами в JavaScript?

Приватные свойства и методы — это свойства и методы, которые недоступны извне объекта и могут использоваться только внутри самого объекта. Понимание способов создания приватных свойств критически важно для инкапсуляции и создания безопасного кода.

## Способы создания приватных свойств

### 1. **Символы (Symbols)**

Использование Symbol для создания "приватных" свойств.

```javascript
const _name = Symbol("name");
const _age = Symbol("age");

class Person {
  constructor(name, age) {
    this[_name] = name;
    this[_age] = age;
  }
  
  getName() {
    return this[_name];
  }
  
  getAge() {
    return this[_age];
  }
}

const person = new Person("John", 30);
console.log(person.getName()); // "John"
console.log(person[_name]); // "John" (все еще доступно, но не очевидно)
```

### 2. **WeakMap**

Использование WeakMap для хранения приватных данных.

```javascript
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    privateData.set(this, { name, age });
  }
  
  getName() {
    return privateData.get(this).name;
  }
  
  getAge() {
    return privateData.get(this).age;
  }
  
  setName(name) {
    const data = privateData.get(this);
    data.name = name;
  }
}

const person = new Person("John", 30);
console.log(person.getName()); // "John"
console.log(person.name); // undefined (приватное свойство)
```

### 3. **Замыкания (Closures)**

Использование замыканий для создания приватных переменных.

```javascript
function createPerson(name, age) {
  // Приватные переменные
  let _name = name;
  let _age = age;
  
  // Публичные методы
  return {
    getName() {
      return _name;
    },
    getAge() {
      return _age;
    },
    setName(name) {
      _name = name;
    },
    setAge(age) {
      _age = age;
    }
  };
}

const person = createPerson("John", 30);
console.log(person.getName()); // "John"
console.log(person._name); // undefined (приватное свойство)
```

### 4. **Приватные поля (Private Fields) - ES2022**

Современный синтаксис для приватных полей.

```javascript
class Person {
  // Приватные поля
  #name;
  #age;
  
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  
  getName() {
    return this.#name;
  }
  
  getAge() {
    return this.#age;
  }
  
  setName(name) {
    this.#name = name;
  }
}

const person = new Person("John", 30);
console.log(person.getName()); // "John"
console.log(person.#name); // SyntaxError: Private field '#name' must be declared in an enclosing class
```

### 5. **Приватные методы (Private Methods) - ES2022**

Современный синтаксис для приватных методов.

```javascript
class Person {
  #name;
  #age;
  
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  
  // Публичный метод
  getName() {
    return this.#name;
  }
  
  // Приватный метод
  #validateAge(age) {
    return age > 0 && age < 150;
  }
  
  setAge(age) {
    if (this.#validateAge(age)) {
      this.#age = age;
    } else {
      throw new Error("Invalid age");
    }
  }
}

const person = new Person("John", 30);
person.setAge(25); // OK
person.setAge(-5); // Error: Invalid age
person.#validateAge(25); // SyntaxError: Private method '#validateAge' must be declared in an enclosing class
```

## Практические примеры

### Пример 1: Банковский счет с приватным балансом

```javascript
// Использование WeakMap
const accountData = new WeakMap();

class BankAccount {
  constructor(initialBalance) {
    accountData.set(this, {
      balance: initialBalance,
      transactions: []
    });
  }
  
  deposit(amount) {
    const data = accountData.get(this);
    if (amount > 0) {
      data.balance += amount;
      data.transactions.push({ type: "deposit", amount });
    }
  }
  
  withdraw(amount) {
    const data = accountData.get(this);
    if (amount > 0 && amount <= data.balance) {
      data.balance -= amount;
      data.transactions.push({ type: "withdraw", amount });
    }
  }
  
  getBalance() {
    return accountData.get(this).balance;
  }
  
  getTransactions() {
    return [...accountData.get(this).transactions];
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
console.log(account.balance); // undefined (приватное свойство)
```

### Пример 2: Кэш с приватными данными

```javascript
// Использование приватных полей
class Cache {
  #data = new Map();
  #maxSize = 100;
  
  set(key, value) {
    if (this.#data.size >= this.#maxSize) {
      const firstKey = this.#data.keys().next().value;
      this.#data.delete(firstKey);
    }
    this.#data.set(key, value);
  }
  
  get(key) {
    return this.#data.get(key);
  }
  
  clear() {
    this.#data.clear();
  }
  
  size() {
    return this.#data.size;
  }
}

const cache = new Cache();
cache.set("key1", "value1");
console.log(cache.get("key1")); // "value1"
console.log(cache.#data); // SyntaxError: Private field '#data' must be declared in an enclosing class
```

### Пример 3: API клиент с приватным токеном

```javascript
// Использование замыканий
function createApiClient(apiKey) {
  // Приватный токен
  let _apiKey = apiKey;
  let _requestCount = 0;
  
  // Приватный метод
  function _makeRequest(url, options) {
    _requestCount++;
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${_apiKey}`
      }
    });
  }
  
  // Публичные методы
  return {
    get(url) {
      return _makeRequest(url, { method: "GET" });
    },
    
    post(url, data) {
      return _makeRequest(url, {
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    
    getRequestCount() {
      return _requestCount;
    },
    
    updateApiKey(newKey) {
      _apiKey = newKey;
    }
  };
}

const api = createApiClient("secret-key");
api.get("https://api.example.com/data");
console.log(api.getRequestCount()); // 1
console.log(api._apiKey); // undefined (приватное свойство)
```

## Сравнение методов

### Символы:

- ✅ Простота использования
- ❌ Не полностью приватные (доступны через Object.getOwnPropertySymbols)
- ❌ Не поддерживают наследование

### WeakMap:

- ✅ Полная приватность
- ✅ Поддержка наследования
- ❌ Сложнее в использовании

### Замыкания:

- ✅ Полная приватность
- ✅ Простота для простых случаев
- ❌ Не работают с классами напрямую

### Приватные поля (ES2022):

- ✅ Нативный синтаксис
- ✅ Полная приватность
- ✅ Поддержка наследования
- ❌ Требует современный JavaScript

## Лучшие практики

### ✅ Делайте:

1. **Используйте приватные поля** — для современного кода (ES2022)
2. **Используйте WeakMap** — для совместимости
3. **Используйте замыкания** — для функционального подхода
4. **Документируйте приватные свойства** — объясняйте их назначение

### ❌ Не делайте:

1. **Не используйте префикс _** — это соглашение, а не реальная приватность
2. **Не полагайтесь на символы** — для настоящей приватности
3. **Не забывайте про совместимость** — проверяйте поддержку браузерами
4. **Не усложняйте** — используйте простейший подходящий метод

## Заключение

Способы создания приватных свойств:

- **Символы** — просто, но не полностью приватно
- **WeakMap** — полная приватность, совместимость
- **Замыкания** — полная приватность, функциональный подход
- **Приватные поля (ES2022)** — нативный синтаксис, полная приватность

**Помните:** приватные свойства и методы критически важны для инкапсуляции. Используйте приватные поля (ES2022) для современного кода, WeakMap для совместимости и замыкания для функционального подхода. Понимание различных методов создания приватных свойств критически важно для написания безопасного и поддерживаемого кода.

