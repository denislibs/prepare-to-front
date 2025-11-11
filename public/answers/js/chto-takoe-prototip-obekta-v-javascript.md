# Что такое прототип объекта в JavaScript?

Прототип объекта — это механизм в JavaScript, который позволяет объектам наследовать свойства и методы от других объектов. Каждый объект в JavaScript имеет скрытое свойство `[[Prototype]]`, которое ссылается на другой объект или `null`. Понимание прототипов критически важно для работы с объектами, наследованием и созданием эффективных структур данных.

## Что такое прототип?

Прототип — это объект, от которого другой объект наследует свойства и методы. Когда вы обращаетесь к свойству объекта, JavaScript сначала ищет его в самом объекте, а если не находит, то ищет в прототипе, затем в прототипе прототипа, и так далее по цепочке прототипов.

### Характеристики:

- ✅ **Цепочка прототипов** — объекты связаны через прототипы
- ✅ **Наследование** — свойства и методы наследуются
- ✅ **Динамическое** — можно изменять во время выполнения
- ✅ **Делегирование** — поиск свойств идет по цепочке

## Как работает прототип?

### Цепочка прототипов:

```javascript
const obj = { name: "John" };

// obj имеет прототип Object.prototype
// Object.prototype имеет прототип null

// Поиск свойства:
// 1. Ищется в obj
// 2. Если не найдено - ищется в Object.prototype
// 3. Если не найдено - возвращается undefined
```

### Пример:

```javascript
const obj = { name: "John" };

// Собственное свойство
console.log(obj.name); // "John" (из самого объекта)

// Унаследованное свойство
console.log(obj.toString); // function (из Object.prototype)
console.log(obj.toString()); // "[object Object]"

// Несуществующее свойство
console.log(obj.nonExistent); // undefined
```

## Получение прототипа

### Object.getPrototypeOf():

```javascript
const obj = {};
const proto = Object.getPrototypeOf(obj);
console.log(proto === Object.prototype); // true
```

### __proto__ (устаревший):

```javascript
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
// ⚠️ Не рекомендуется использовать
```

## Установка прототипа

### Object.create():

```javascript
const parent = {
  greet: function() {
    return "Hello";
  }
};

const child = Object.create(parent);
child.name = "John";

console.log(child.greet()); // "Hello" (унаследовано)
console.log(Object.getPrototypeOf(child) === parent); // true
```

### Object.setPrototypeOf():

```javascript
const obj = {};
const proto = { method: function() { return "test"; } };

Object.setPrototypeOf(obj, proto);
console.log(obj.method()); // "test"
// ⚠️ Медленно, не рекомендуется
```

## Прототип функции-конструктора

### Создание объектов через конструктор:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const person = new Person("John");
console.log(person.greet()); // "Hello, I'm John"

// Прототип экземпляра ссылается на Person.prototype
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

## Практические примеры

### Пример 1: Базовое наследование

```javascript
const animal = {
  name: "Animal",
  speak: function() {
    return `${this.name} makes a sound`;
  }
};

const dog = Object.create(animal);
dog.name = "Dog";
dog.bark = function() {
  return "Woof!";
};

console.log(dog.speak()); // "Dog makes a sound" (унаследовано)
console.log(dog.bark()); // "Woof!" (собственный метод)
```

### Пример 2: Многоуровневое наследование

```javascript
const grandparent = {
  grandparentMethod: function() {
    return "Grandparent";
  }
};

const parent = Object.create(grandparent);
parent.parentMethod = function() {
  return "Parent";
};

const child = Object.create(parent);
child.childMethod = function() {
  return "Child";
};

console.log(child.childMethod()); // "Child"
console.log(child.parentMethod()); // "Parent" (из parent)
console.log(child.grandparentMethod()); // "Grandparent" (из grandparent)
```

### Пример 3: Проверка прототипа

```javascript
const parent = { prop: "value" };
const child = Object.create(parent);

// Проверка прототипа
console.log(Object.getPrototypeOf(child) === parent); // true
console.log(parent.isPrototypeOf(child)); // true
console.log(Object.prototype.isPrototypeOf(child)); // true
```

### Пример 4: Изменение прототипа

```javascript
const proto = { value: 1 };
const obj1 = Object.create(proto);
const obj2 = Object.create(proto);

// Изменение прототипа влияет на все объекты
proto.value = 2;
console.log(obj1.value); // 2
console.log(obj2.value); // 2
```

## Свойство prototype

### У функций есть свойство prototype:

```javascript
function Person(name) {
  this.name = name;
}

// Person.prototype - объект, который будет прототипом экземпляров
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const person = new Person("John");
// person.__proto__ === Person.prototype
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Object.create()** — для создания объектов с прототипом
2. **Используйте Object.getPrototypeOf()** — для получения прототипа
3. **Понимайте цепочку** — как работает поиск свойств
4. **Используйте классы ES6** — для удобного синтаксиса

### ❌ Не делайте:

1. **Не используйте __proto__** — используйте Object.getPrototypeOf()
2. **Не изменяйте встроенные прототипы** — это плохая практика
3. **Не используйте setPrototypeOf()** — медленно, используйте Object.create()

## Заключение

Прототип объекта:

- **Механизм наследования** — объекты наследуют от прототипов
- **Цепочка прототипов** — поиск свойств идет по цепочке
- **Динамическое** — можно изменять во время выполнения
- **Object.getPrototypeOf()** — для получения прототипа

**Помните:** прототип — это фундаментальный механизм JavaScript для наследования. Каждый объект имеет прототип, от которого наследует свойства и методы. Понимание прототипов критически важно для работы с объектами, создания эффективных структур данных и понимания того, как работает JavaScript.

