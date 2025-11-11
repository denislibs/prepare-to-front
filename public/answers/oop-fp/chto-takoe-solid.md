# Что такое SOLID?

SOLID — это набор из пяти принципов объектно-ориентированного программирования, которые помогают создавать гибкий, поддерживаемый и расширяемый код. Эти принципы были сформулированы Робертом Мартином.

## Принципы SOLID

### 1. **S - Single Responsibility Principle (Принцип единственной ответственности)**

Класс должен иметь только одну причину для изменения.

```javascript
// ❌ Плохо
class User {
    save() { /* сохранение */ }
    sendEmail() { /* отправка email */ }
    generateReport() { /* генерация отчета */ }
}

// ✅ Хорошо
class User {
    save() { /* сохранение */ }
}

class EmailService {
    sendEmail() { /* отправка email */ }
}

class ReportGenerator {
    generateReport() { /* генерация отчета */ }
}
```

### 2. **O - Open/Closed Principle (Принцип открытости/закрытости)**

Классы должны быть открыты для расширения, но закрыты для модификации.

```javascript
// ✅ Хорошо
class Shape {
    area() {
        throw new Error('Метод должен быть переопределен');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
}
```

### 3. **L - Liskov Substitution Principle (Принцип подстановки Лисков)**

Объекты подклассов должны заменять объекты базового класса без нарушения функциональности.

```javascript
class Bird {
    fly() {
        console.log('Птица летит');
    }
}

class Sparrow extends Bird {
    fly() {
        console.log('Воробей летит');
    }
}

// Объект Sparrow должен работать везде, где используется Bird
```

### 4. **I - Interface Segregation Principle (Принцип разделения интерфейса)**

Клиенты не должны зависеть от интерфейсов, которые они не используют.

```javascript
// ❌ Плохо
class Worker {
    work() { }
    eat() { }
    sleep() { }
}

// ✅ Хорошо
class Workable {
    work() { }
}

class Eatable {
    eat() { }
}

class Sleepable {
    sleep() { }
}
```

### 5. **D - Dependency Inversion Principle (Принцип инверсии зависимостей)**

Зависимости должны быть на абстракциях, а не на конкретных реализациях.

```javascript
// ❌ Плохо
class MySQLDatabase {
    save(data) { }
}

class UserService {
    constructor() {
        this.db = new MySQLDatabase(); // Зависимость от конкретной реализации
    }
}

// ✅ Хорошо
class Database {
    save(data) {
        throw new Error('Метод должен быть реализован');
    }
}

class MySQLDatabase extends Database {
    save(data) { }
}

class UserService {
    constructor(database) {
        this.db = database; // Зависимость от абстракции
    }
}
```

## Заключение

**SOLID — это:**

1. ✅ S - Single Responsibility
2. ✅ O - Open/Closed
3. ✅ L - Liskov Substitution
4. ✅ I - Interface Segregation
5. ✅ D - Dependency Inversion

**Преимущества:**

- Гибкость кода
- Поддерживаемость
- Расширяемость
- Тестируемость

**Рекомендации:**

- Применяйте принципы SOLID при проектировании
- Рефакторите код для соответствия принципам
- Используйте для улучшения качества кода

SOLID — важные принципы для создания качественного программного обеспечения.

