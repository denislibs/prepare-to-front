# Как с помощью CSS определить, поддерживается ли свойство в браузере?

Определение поддержки CSS-свойств в браузере возможно с помощью `@supports` (feature queries), который позволяет применять стили только если браузер поддерживает определенное свойство или значение.

## Что такое `@supports`?

`@supports` — это CSS правило (feature query), которое проверяет, поддерживает ли браузер определенное CSS-свойство или значение.

## Использование

### Базовый синтаксис:

```css
@supports (свойство: значение) {
    /* Стили применяются, если свойство поддерживается */
}
```

## Примеры использования

### Проверка свойства:

```css
@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Проверка значения:

```css
@supports (position: sticky) {
    .header {
        position: sticky;
        top: 0;
    }
}
```

### Отрицание:

```css
@supports not (display: grid) {
    .container {
        display: flex; /* Fallback для старых браузеров */
    }
}
```

### Комбинация условий:

```css
@supports (display: grid) and (grid-template-columns: repeat(3, 1fr)) {
    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}

@supports (display: flex) or (display: grid) {
    .container {
        display: flex;
    }
}
```

## Практические примеры

### CSS Grid с fallback:

```css
.container {
    display: flex; /* Fallback */
}

@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### Custom properties:

```css
.element {
    color: blue; /* Fallback */
}

@supports (--custom-property: value) {
    .element {
        color: var(--primary-color);
    }
}
```

### Backdrop filter:

```css
.modal {
    background-color: rgba(0, 0, 0, 0.5); /* Fallback */
}

@supports (backdrop-filter: blur(10px)) {
    .modal {
        backdrop-filter: blur(10px);
        background-color: rgba(0, 0, 0, 0.3);
    }
}
```

## Альтернативы

### JavaScript:

```javascript
if (CSS.supports('display', 'grid')) {
    // Использовать Grid
} else {
    // Fallback
}
```

### Progressive Enhancement:

Используйте базовые стили, которые работают везде, и улучшайте для поддерживающих браузеров.

## Заключение

**`@supports` используется для:**

1. ✅ Проверки поддержки свойств
2. ✅ Предоставления fallback
3. ✅ Progressive enhancement

**Синтаксис:**

- `@supports (property: value)` — проверка
- `@supports not` — отрицание
- `@supports (a) and (b)` — и
- `@supports (a) or (b)` — или

**Рекомендации:**

- Используйте для проверки поддержки
- Предоставляйте fallback
- Используйте progressive enhancement

Правильное использование `@supports` улучшает совместимость и пользовательский опыт.

