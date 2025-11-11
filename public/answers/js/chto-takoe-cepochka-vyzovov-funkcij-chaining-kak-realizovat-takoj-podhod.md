# Что такое цепочка вызовов функций (chaining)? Как реализовать такой подход?

Цепочка вызовов функций (method chaining) — это паттерн программирования, при котором методы объекта возвращают сам объект, что позволяет вызывать несколько методов последовательно в одной строке. Понимание цепочки вызовов критически важно для создания удобного и читаемого API, особенно для библиотек и утилит.

## Что такое chaining?

Цепочка вызовов — это способ вызова нескольких методов объекта последовательно, где каждый метод возвращает объект, позволяя вызывать следующий метод.

### Характеристики:

- ✅ **Последовательные вызовы** — методы вызываются один за другим
- ✅ **Возврат this** — каждый метод возвращает объект
- ✅ **Читаемость** — код читается как предложение
- ✅ **Удобство** — компактный и выразительный код

### Пример:

```javascript
// Без chaining
const result = obj.method1();
result.method2();
result.method3();

// С chaining
obj.method1().method2().method3();
```

## Как реализовать chaining?

### Базовый принцип:

Каждый метод должен возвращать `this` (или объект), чтобы можно было вызвать следующий метод.

```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(num) {
    this.value += num;
    return this; // Возвращаем this для chaining
  }
  
  multiply(num) {
    this.value *= num;
    return this; // Возвращаем this для chaining
  }
  
  subtract(num) {
    this.value -= num;
    return this; // Возвращаем this для chaining
  }
  
  getValue() {
    return this.value; // Не возвращаем this - конец цепочки
  }
}

// Использование
const calc = new Calculator(10);
const result = calc
  .add(5)
  .multiply(2)
  .subtract(3)
  .getValue();

console.log(result); // 27 ((10 + 5) * 2 - 3)
```

## Практические примеры

### Пример 1: Query Builder

```javascript
class QueryBuilder {
  constructor() {
    this.query = {
      select: [],
      from: null,
      where: [],
      orderBy: null
    };
  }
  
  select(fields) {
    this.query.select = Array.isArray(fields) ? fields : [fields];
    return this;
  }
  
  from(table) {
    this.query.from = table;
    return this;
  }
  
  where(condition) {
    this.query.where.push(condition);
    return this;
  }
  
  orderBy(field, direction = "ASC") {
    this.query.orderBy = { field, direction };
    return this;
  }
  
  build() {
    // Построение SQL запроса
    return this.query;
  }
}

// Использование
const query = new QueryBuilder()
  .select(["name", "email"])
  .from("users")
  .where({ age: { $gt: 18 } })
  .where({ active: true })
  .orderBy("name", "ASC")
  .build();
```

### Пример 2: DOM манипуляции

```javascript
class ElementWrapper {
  constructor(element) {
    this.element = element;
  }
  
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }
  
  removeClass(className) {
    this.element.classList.remove(className);
    return this;
  }
  
  setText(text) {
    this.element.textContent = text;
    return this;
  }
  
  setStyle(property, value) {
    this.element.style[property] = value;
    return this;
  }
  
  append(child) {
    this.element.appendChild(child);
    return this;
  }
}

// Использование
const wrapper = new ElementWrapper(document.getElementById("myDiv"));
wrapper
  .addClass("active")
  .setText("Hello")
  .setStyle("color", "red")
  .setStyle("fontSize", "20px");
```

### Пример 3: Математические операции

```javascript
class NumberChain {
  constructor(value) {
    this.value = value;
  }
  
  add(num) {
    this.value += num;
    return this;
  }
  
  subtract(num) {
    this.value -= num;
    return this;
  }
  
  multiply(num) {
    this.value *= num;
    return this;
  }
  
  divide(num) {
    if (num === 0) throw new Error("Division by zero");
    this.value /= num;
    return this;
  }
  
  pow(num) {
    this.value = Math.pow(this.value, num);
    return this;
  }
  
  valueOf() {
    return this.value;
  }
  
  toString() {
    return String(this.value);
  }
}

// Использование
const result = new NumberChain(10)
  .add(5)
  .multiply(2)
  .subtract(3)
  .divide(4);

console.log(result.valueOf()); // 5.5
```

### Пример 4: Встроенные примеры

```javascript
// Массивы - встроенный chaining
const result = [1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);

console.log(result); // 12

// jQuery - классический пример
$("#myElement")
  .addClass("active")
  .css("color", "red")
  .fadeIn(300)
  .delay(1000)
  .fadeOut(300);
```

## Реализация с функциями

### Функциональный подход:

```javascript
function createChain(value) {
  return {
    value,
    add(num) {
      return createChain(this.value + num);
    },
    multiply(num) {
      return createChain(this.value * num);
    },
    subtract(num) {
      return createChain(this.value - num);
    },
    getValue() {
      return this.value;
    }
  };
}

// Использование
const result = createChain(10)
  .add(5)
  .multiply(2)
  .getValue();

console.log(result); // 30
```

## Условный chaining

### С условиями:

```javascript
class ConditionalChain {
  constructor(value) {
    this.value = value;
  }
  
  when(condition, callback) {
    if (condition) {
      callback(this.value);
    }
    return this;
  }
  
  unless(condition, callback) {
    if (!condition) {
      callback(this.value);
    }
    return this;
  }
}

// Использование
new ConditionalChain(10)
  .when(true, val => console.log("True:", val))
  .unless(false, val => console.log("Not false:", val));
```

## Лучшие практики

### ✅ Делайте:

1. **Возвращайте this** — из методов для продолжения цепочки
2. **Используйте для fluent API** — удобных интерфейсов
3. **Разделяйте мутирующие и немutирующие методы** — некоторые могут не возвращать this
4. **Документируйте** — какие методы можно цепочкой

### ❌ Не делайте:

1. **Не возвращайте this** — из методов, которые должны завершать цепочку
2. **Не злоупотребляйте** — используйте только когда уместно
3. **Не смешивайте стили** — будьте последовательны
4. **Не забывайте про отладку** — сложнее отлаживать цепочки

## Преимущества и недостатки

### Преимущества:

- ✅ **Читаемость** — код читается как предложение
- ✅ **Компактность** — меньше строк кода
- ✅ **Выразительность** — понятный поток операций
- ✅ **Удобство** — для библиотек и API

### Недостатки:

- ⚠️ **Отладка** — сложнее отлаживать цепочки
- ⚠️ **Ошибки** — сложнее найти место ошибки
- ⚠️ **Производительность** — создание промежуточных объектов
- ⚠️ **Гибкость** — менее гибко чем отдельные вызовы

## Заключение

Цепочка вызовов функций (chaining):

- **Последовательные вызовы** — методы вызываются один за другим
- **Возврат this** — каждый метод возвращает объект
- **Реализация** — возвращайте `this` из методов
- **Применение** — для удобных API и библиотек

**Помните:** цепочка вызовов — это мощный паттерн для создания удобных и читаемых API. Реализуйте его, возвращая `this` из методов, которые должны поддерживать chaining. Используйте chaining для создания fluent интерфейсов, но помните о сложностях отладки и используйте его только когда это действительно улучшает читаемость кода.

