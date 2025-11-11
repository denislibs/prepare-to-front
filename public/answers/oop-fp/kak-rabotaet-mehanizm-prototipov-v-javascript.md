# Как работает механизм прототипов в JavaScript?

Механизм прототипов — это основа наследования в JavaScript. Каждый объект имеет ссылку на прототип, через который он может наследовать свойства и методы. Понимание прототипов критично для работы с JavaScript.

## Как работают прототипы

### 1. **Прототипная цепочка**

Каждый объект имеет ссылку на прототип через свойство `__proto__` или `Object.getPrototypeOf()`.

```javascript
const obj = {};
console.log(obj.__proto__); // Object.prototype
```

### 2. **Поиск свойств**

При обращении к свойству JavaScript ищет его в объекте, затем в прототипе, и так далее по цепочке.

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    return `Привет, ${this.name}!`;
};

const person = new Person('Иван');
person.greet(); // Ищет в person, затем в Person.prototype
```

### 3. **Наследование**

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} издает звук`);
};

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} лает`);
};
```

## Заключение

**Механизм прототипов:**

1. ✅ Прототипная цепочка
2. ✅ Поиск свойств по цепочке
3. ✅ Наследование через прототипы

**Особенности:**

- Каждый объект имеет прототип
- Поиск идет по цепочке
- Можно изменять прототипы

**Рекомендации:**

- Понимайте прототипную цепочку
- Используйте `Object.create()` для наследования
- Избегайте прямого изменения `__proto__`

Прототипы — основа наследования в JavaScript.

