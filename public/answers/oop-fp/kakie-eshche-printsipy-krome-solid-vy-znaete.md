# Какие ещё принципы кроме SOLID вы знаете?

Кроме SOLID существуют другие важные принципы проектирования, которые помогают создавать качественный код. Понимание этих принципов расширяет возможности разработчика.

## Дополнительные принципы

### 1. **DRY (Don't Repeat Yourself)**

Избегание повторения кода.

```javascript
// ❌ Повторение
function calculateArea1(width, height) {
    return width * height;
}

function calculateArea2(w, h) {
    return w * h;
}

// ✅ DRY
function calculateArea(width, height) {
    return width * height;
}
```

### 2. **KISS (Keep It Simple, Stupid)**

Простота важнее сложности.

```javascript
// ❌ Сложно
const result = array.filter(x => x > 0).map(x => x * 2).reduce((a, b) => a + b, 0);

// ✅ Просто
let sum = 0;
for (let x of array) {
    if (x > 0) {
        sum += x * 2;
    }
}
```

### 3. **YAGNI (You Aren't Gonna Need It)**

Не добавляйте функциональность, пока она не нужна.

### 4. **GRASP (General Responsibility Assignment Software Patterns)**

Принципы назначения ответственности.

### 5. **Composition over Inheritance**

Предпочтение композиции наследованию.

```javascript
// ✅ Композиция
class Car {
    constructor() {
        this.engine = new Engine();
    }
}
```

## Заключение

**Дополнительные принципы:**

1. ✅ DRY — избегание повторения
2. ✅ KISS — простота
3. ✅ YAGNI — не добавляйте лишнего
4. ✅ GRASP — назначение ответственности
5. ✅ Composition over Inheritance

**Рекомендации:**

- Применяйте DRY для избежания повторения
- Следуйте KISS для простоты
- Используйте YAGNI для фокуса
- Рассматривайте GRASP для проектирования

Эти принципы дополняют SOLID и помогают создавать качественный код.

