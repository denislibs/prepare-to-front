# Что такое паттерн, или шаблон проектирования?

Паттерн проектирования (Design Pattern) — это типичное решение часто встречающейся проблемы в проектировании программного обеспечения. Паттерны представляют собой проверенные подходы к решению общих задач.

## Что такое паттерн проектирования?

Паттерн проектирования — это переиспользуемое решение типичной проблемы в контексте проектирования программного обеспечения.

## Типы паттернов

### 1. **Порождающие (Creational)**

Создание объектов.

- Singleton
- Factory
- Builder

### 2. **Структурные (Structural)**

Организация классов и объектов.

- Adapter
- Decorator
- Facade

### 3. **Поведенческие (Behavioral)**

Взаимодействие объектов.

- Observer
- Strategy
- Command

## Примеры

### Singleton:

```javascript
class Database {
    static instance = null;
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}
```

### Observer:

```javascript
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}
```

## Заключение

**Паттерн проектирования — это:**

1. ✅ Переиспользуемое решение
2. ✅ Типичная проблема
3. ✅ Проверенный подход

**Типы:**

- Порождающие
- Структурные
- Поведенческие

**Рекомендации:**

- Изучайте паттерны
- Применяйте по необходимости
- Не злоупотребляйте паттернами

Паттерны проектирования — инструменты для решения общих задач.

