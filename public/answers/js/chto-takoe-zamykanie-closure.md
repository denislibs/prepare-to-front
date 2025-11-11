# Что такое замыкание (Closure)?

Замыкание (Closure) — это одна из самых важных и мощных концепций в JavaScript. Замыкание позволяет функции сохранять доступ к переменным из внешней области видимости даже после того, как внешняя функция завершила выполнение. Понимание замыканий критически важно для написания эффективного и правильного JavaScript кода.

## Что такое Closure?

Closure (замыкание) — это комбинация функции и лексического окружения, в котором эта функция была объявлена. Замыкание позволяет внутренней функции получать доступ к переменным внешней функции даже после завершения выполнения внешней функции.

### Характеристики:

- ✅ **Сохранение доступа** — к переменным внешней области видимости
- ✅ **Лексическая область видимости** — определяется местом объявления
- ✅ **Инкапсуляция** — позволяет создавать приватные переменные
- ✅ **Мощный инструмент** — для создания паттернов проектирования

## Базовый пример

```javascript
function outer() {
  let outerVar = "Я из внешней функции";
  
  function inner() {
    console.log(outerVar); // Доступ к outerVar через замыкание
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // "Я из внешней функции" - outerVar все еще доступна
```

## Как работают замыкания?

### Механизм работы:

1. **Внешняя функция** создает переменные в своей области видимости
2. **Внутренняя функция** объявлена внутри внешней функции
3. **Внутренняя функция** имеет доступ к переменным внешней функции
4. **Внешняя функция возвращает** внутреннюю функцию
5. **Замыкание сохраняет** доступ к переменным внешней функции

```javascript
function createCounter() {
  let count = 0; // Переменная во внешней области видимости
  
  return function() {
    count++; // Доступ к count через замыкание
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// count недоступна напрямую, но сохраняется через замыкание
```

## Практические примеры

### Пример 1: Счетчик

```javascript
function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.getValue()); // 11
```

### Пример 2: Приватные переменные

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Приватная переменная
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Недостаточно средств";
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
account.withdraw(200);
console.log(account.getBalance()); // 1300
// balance недоступна напрямую - она приватная
```

### Пример 3: Мемоизация

```javascript
function memoize(fn) {
  const cache = {}; // Кеш через замыкание
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      return cache[key];
    }
    
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Использование
const expensiveFunction = (n) => {
  console.log("Вычисление...");
  return n * n;
};

const memoized = memoize(expensiveFunction);
console.log(memoized(5)); // "Вычисление..." 25
console.log(memoized(5)); // 25 (из кеша, без "Вычисление...")
```

### Пример 4: Модульный паттерн

```javascript
const module = (function() {
  let privateVar = 0; // Приватная переменная
  
  function privateFunction() {
    return "Приватная функция";
  }
  
  return {
    publicMethod: function() {
      privateVar++;
      return privateFunction() + " вызвана " + privateVar + " раз";
    },
    getPrivateVar: function() {
      return privateVar;
    }
  };
})();

console.log(module.publicMethod()); // "Приватная функция вызвана 1 раз"
console.log(module.getPrivateVar()); // 1
// privateVar и privateFunction недоступны напрямую
```

### Пример 5: Обработчики событий

```javascript
function setupButton(buttonId, message) {
  const button = document.getElementById(buttonId);
  
  button.addEventListener('click', function() {
    // message доступна через замыкание
    alert(message);
  });
}

setupButton('btn1', 'Кнопка 1 нажата');
setupButton('btn2', 'Кнопка 2 нажата');
```

### Пример 6: Циклы и замыкания

```javascript
// ❌ Проблема - все функции ссылаются на одну переменную
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 100);
}

// ✅ Решение 1 - IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}

// ✅ Решение 2 - let (создает новую переменную для каждой итерации)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}
```

## Замыкания и производительность

### Память:

Замыкания сохраняют ссылки на переменные внешней области видимости, что может привести к утечкам памяти, если не быть осторожным.

```javascript
// Потенциальная утечка памяти
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  
  return function() {
    // largeData сохраняется в замыкании, даже если не используется
    console.log("Handler");
  };
}

// Решение - очистка ссылок
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  
  return function() {
    console.log("Handler");
    // Очистка после использования
    largeData.length = 0;
  };
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте замыкания** — для инкапсуляции и приватных переменных
2. **Очищайте ссылки** — на большие объекты после использования
3. **Используйте модульный паттерн** — для организации кода
4. **Понимайте область видимости** — для правильного использования

### ❌ Не делайте:

1. **Не создавайте утечки памяти** — очищайте ненужные ссылки
2. **Не злоупотребляйте замыканиями** — используйте только когда нужно
3. **Не забывайте про производительность** — замыкания могут влиять на память

## Заключение

Замыкания:

- **Комбинация функции и окружения** — сохранение доступа к внешним переменным
- **Лексическая область видимости** — определяется местом объявления
- **Инкапсуляция** — создание приватных переменных
- **Мощный инструмент** — для паттернов проектирования

**Помните:** замыкания — это фундаментальная концепция JavaScript, которая позволяет создавать мощные и гибкие конструкции. Используйте замыкания для инкапсуляции, создания приватных переменных и реализации различных паттернов проектирования. Понимание замыканий критически важно для написания качественного JavaScript кода.

