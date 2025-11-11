# Как работают `transition` и `animation`, и в чем их отличия?

`transition` и `animation` — это CSS механизмы для создания анимаций, но они работают по-разному: `transition` для простых переходов между состояниями, а `animation` для сложных многоэтапных анимаций.

## Transition — Переходы

### Что это:

`transition` создает плавный переход между двумя состояниями элемента при изменении свойства.

### Как работает:

```css
.element {
    background-color: blue;
    transition: background-color 0.3s ease;
}

.element:hover {
    background-color: red; /* Плавный переход */
}
```

### Синтаксис:

```css
transition: property duration timing-function delay;
```

### Примеры:

```css
/* Одно свойство */
.element {
    transition: color 0.3s ease;
}

/* Несколько свойств */
.element {
    transition: color 0.3s, transform 0.5s;
}

/* Все свойства */
.element {
    transition: all 0.3s ease;
}
```

## Animation — Анимации

### Что это:

`animation` создает сложные многоэтапные анимации с помощью ключевых кадров.

### Как работает:

```css
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

.element {
    animation: slide 1s ease infinite;
}
```

### Синтаксис:

```css
animation: name duration timing-function delay iteration-count direction fill-mode;
```

## Разница

| Характеристика | Transition | Animation |
|----------------|------------|-----------|
| **Сложность** | Простые переходы | Сложные анимации |
| **Триггер** | Изменение свойства | Автоматически |
| **Этапы** | Два состояния | Множество кадров |
| **Повторение** | Нет | Да (infinite) |
| **Контроль** | Ограниченный | Полный |

## Когда использовать

### Transition для:

- Простых переходов (hover, focus)
- Изменения одного свойства
- Плавных эффектов

### Animation для:

- Сложных многоэтапных анимаций
- Постоянных анимаций
- Анимаций без триггера

## Заключение

**Разница:**

- **`transition`**: Простые переходы между состояниями
- **`animation`**: Сложные многоэтапные анимации

**Использование:**
- Transition для hover, focus эффектов
- Animation для сложных анимаций

**Преимущества:**
- Transition — простота
- Animation — гибкость и контроль

Правильный выбор зависит от сложности анимации.

