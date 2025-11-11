# Что такое Dependency injection?

Dependency Injection (DI) — это техника, при которой зависимости объекта предоставляются извне, а не создаются внутри объекта. Это реализация принципа Inversion of Control.

## Что такое Dependency Injection?

DI — это паттерн, при котором зависимости передаются объекту извне, а не создаются внутри объекта.

## Примеры

### Без DI:

```javascript
class UserService {
    constructor() {
        this.database = new MySQLDatabase(); // Создание внутри
    }
}
```

### С DI:

```javascript
class UserService {
    constructor(database) {
        this.database = database; // Инжектируется извне
    }
}

const database = new MySQLDatabase();
const userService = new UserService(database);
```

## Типы DI

### 1. **Constructor Injection**

Зависимости через конструктор.

```javascript
class UserService {
    constructor(database, logger) {
        this.database = database;
        this.logger = logger;
    }
}
```

### 2. **Property Injection**

Зависимости через свойства.

```javascript
class UserService {
    setDatabase(database) {
        this.database = database;
    }
}
```

### 3. **Method Injection**

Зависимости через методы.

```javascript
class UserService {
    processUser(user, database) {
        // Использование database
    }
}
```

## Преимущества

### 1. **Тестируемость**

Легко подменять зависимости.

### 2. **Гибкость**

Легко изменять реализации.

### 3. **Слабая связность**

Компоненты не зависят от конкретных реализаций.

## Заключение

**Dependency Injection — это:**

1. ✅ Предоставление зависимостей извне
2. ✅ Реализация IoC
3. ✅ Слабая связность

**Типы:**

- Constructor Injection
- Property Injection
- Method Injection

**Преимущества:**

- Тестируемость
- Гибкость
- Слабая связность

**Рекомендации:**

- Используйте Constructor Injection
- Применяйте для тестируемости
- Используйте DI контейнеры

Dependency Injection — важный паттерн для создания качественного кода.

