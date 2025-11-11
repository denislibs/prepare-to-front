# Типы паттернов?

Паттерны проектирования делятся на три основные категории в зависимости от того, какую проблему они решают. Понимание типов паттернов помогает выбрать правильный паттерн для задачи.

## Три типа паттернов

### 1. **Порождающие (Creational)**

Паттерны, связанные с созданием объектов.

**Примеры:**
- Singleton — один экземпляр
- Factory — создание объектов
- Builder — пошаговое создание
- Prototype — клонирование объектов

```javascript
// Factory
class CarFactory {
    createCar(type) {
        if (type === 'sedan') {
            return new Sedan();
        } else if (type === 'suv') {
            return new SUV();
        }
    }
}
```

### 2. **Структурные (Structural)**

Паттерны, связанные с организацией классов и объектов.

**Примеры:**
- Adapter — адаптация интерфейсов
- Decorator — добавление функциональности
- Facade — упрощение интерфейса
- Proxy — контроль доступа

```javascript
// Adapter
class OldAPI {
    request() {
        return 'old data';
    }
}

class NewAPI {
    fetch() {
        return 'new data';
    }
}

class Adapter {
    constructor(api) {
        this.api = api;
    }
    
    request() {
        return this.api.fetch();
    }
}
```

### 3. **Поведенческие (Behavioral)**

Паттерны, связанные с взаимодействием объектов.

**Примеры:**
- Observer — уведомления
- Strategy — выбор алгоритма
- Command — инкапсуляция запросов
- Chain of Responsibility — цепочка обработчиков

```javascript
// Strategy
class PaymentStrategy {
    pay(amount) {
        throw new Error('Должен быть реализован');
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Оплата картой: ${amount}`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Оплата PayPal: ${amount}`);
    }
}
```

## Заключение

**Типы паттернов:**

1. ✅ Порождающие — создание объектов
2. ✅ Структурные — организация
3. ✅ Поведенческие — взаимодействие

**Рекомендации:**

- Изучайте паттерны каждого типа
- Выбирайте подходящий тип для задачи
- Комбинируйте паттерны при необходимости

Понимание типов паттернов помогает в правильном выборе решения.

