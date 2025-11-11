# Для чего используется ключевое слово `new`?

Ключевое слово `new` в JavaScript используется для создания экземпляров объектов из функций-конструкторов или классов. Понимание того, как работает `new` и что происходит при его использовании, критически важно для работы с объектами, классами и созданием экземпляров в JavaScript.

## Что делает `new`?

Ключевое слово `new` выполняет несколько важных операций при создании объекта:

1. ✅ **Создает новый пустой объект**
2. ✅ **Устанавливает прототип** — связывает объект с прототипом функции
3. ✅ **Привязывает `this`** — к новому объекту
4. ✅ **Вызывает функцию** — с новым объектом как `this`
5. ✅ **Возвращает объект** — если функция не возвращает свой объект

## Как работает `new`?

### Механизм работы:

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person("John");

// Что происходит:
// 1. Создается новый объект: {}
// 2. Устанавливается прототип: Object.setPrototypeOf({}, Person.prototype)
// 3. Вызывается функция: Person.call({}, "John")
// 4. Возвращается объект: { name: "John" }
```

### Эквивалентный код:

```javascript
function Person(name) {
  this.name = name;
}

// new Person("John") эквивалентно:
function createPerson(name) {
  const obj = {}; // 1. Создание объекта
  Object.setPrototypeOf(obj, Person.prototype); // 2. Установка прототипа
  Person.call(obj, name); // 3. Вызов функции с this = obj
  return obj; // 4. Возврат объекта
}
```

## Использование с функциями-конструкторами

### Пример 1: Базовая функция-конструктор

```javascript
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
  this.getInfo = function() {
    return `${this.brand} ${this.model}`;
  };
}

const car = new Car("Toyota", "Camry");
console.log(car.getInfo()); // "Toyota Camry"
console.log(car instanceof Car); // true
```

### Пример 2: С методами в прототипе

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Методы в прототипе (более эффективно)
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

Person.prototype.getAge = function() {
  return this.age;
};

const person = new Person("John", 30);
console.log(person.greet()); // "Hello, I'm John"
console.log(person.getAge()); // 30
```

## Использование с классами ES6

### Пример:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new Person("John", 30);
console.log(person.greet()); // "Hello, I'm John"
```

## Что происходит без `new`?

### Проблема без `new`:

```javascript
function Person(name) {
  this.name = name;
}

// ❌ Без new - this указывает на глобальный объект
const person = Person("John");
console.log(person); // undefined
console.log(name); // "John" (глобальная переменная!)

// В strict mode
"use strict";
function Person(name) {
  this.name = name;
}

const person = Person("John"); // TypeError: Cannot set property 'name' of undefined
```

## Проверка вызова с `new`

### Способ 1: `instanceof`

```javascript
function Person(name) {
  if (!(this instanceof Person)) {
    throw new Error("Person must be called with new");
  }
  this.name = name;
}

const person1 = new Person("John"); // ✅ Работает
const person2 = Person("John"); // ❌ Ошибка
```

### Способ 2: `new.target` (ES6)

```javascript
function Person(name) {
  if (new.target === undefined) {
    throw new Error("Person must be called with new");
  }
  this.name = name;
}

// Или проще
function Person(name) {
  if (!new.target) {
    return new Person(name); // Автоматически добавляет new
  }
  this.name = name;
}
```

## Практические примеры

### Пример 1: Создание объектов

```javascript
function User(name, email) {
  this.name = name;
  this.email = email;
  this.createdAt = new Date();
}

const user = new User("John", "john@example.com");
console.log(user.name); // "John"
console.log(user.createdAt); // Текущая дата
```

### Пример 2: Наследование

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Вызов родительского конструктора
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return "Woof!";
};

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // "Buddy makes a sound"
console.log(dog.bark()); // "Woof!"
```

### Пример 3: Возврат значения из конструктора

```javascript
function Person(name) {
  this.name = name;
  // Если возвращаем объект, он используется вместо this
  return { custom: "object" };
}

const person = new Person("John");
console.log(person); // { custom: "object" } (не { name: "John" })

// Если возвращаем примитив, он игнорируется
function Person2(name) {
  this.name = name;
  return "primitive"; // Игнорируется
}

const person2 = new Person2("John");
console.log(person2); // { name: "John" }
```

## Разница между `new` и без `new`

### С `new`:

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person("John");
console.log(person); // { name: "John" }
console.log(person instanceof Person); // true
```

### Без `new`:

```javascript
function Person(name) {
  this.name = name;
}

const person = Person("John");
console.log(person); // undefined
console.log(name); // "John" (глобальная переменная)
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте `new`** — с конструкторами и классами
2. **Проверяйте вызов** — используйте `new.target` или `instanceof`
3. **Используйте классы ES6** — для более безопасного синтаксиса
4. **Документируйте** — функции, которые требуют `new`

### ❌ Не делайте:

1. **Не забывайте `new`** — при вызове конструкторов
2. **Не смешивайте стили** — будьте последовательны
3. **Не возвращайте примитивы** — из конструкторов (игнорируются)

## Заключение

Ключевое слово `new`:

- **Создает объект** — новый пустой объект
- **Устанавливает прототип** — связывает с прототипом функции
- **Привязывает `this`** — к новому объекту
- **Вызывает функцию** — с новым объектом как контекстом
- **Возвращает объект** — новый экземпляр

**Помните:** `new` — это ключевое слово для создания экземпляров объектов из конструкторов и классов. Оно выполняет несколько важных операций: создает объект, устанавливает прототип, привязывает `this` и вызывает функцию. Всегда используйте `new` при вызове конструкторов и классов, и проверяйте вызов с помощью `new.target` для безопасности.

