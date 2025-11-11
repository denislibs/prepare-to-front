# Какие CSS-свойства используются для создания анимаций и плавных переходов?

В CSS для создания анимаций и плавных переходов используются свойства `transition`, `animation`, `transform` и связанные с ними свойства. Каждое свойство имеет свое назначение.

## Свойства для переходов (Transitions)

### `transition` — Основное свойство

```css
.element {
    transition: property duration timing-function delay;
}
```

### Отдельные свойства:

```css
.element {
    transition-property: all;        /* Какие свойства анимировать */
    transition-duration: 0.3s;      /* Длительность */
    transition-timing-function: ease; /* Функция времени */
    transition-delay: 0s;            /* Задержка */
}
```

### Пример:

```css
.button {
    background-color: blue;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: red;
}
```

## Свойства для анимаций (Animations)

### `animation` — Основное свойство

```css
.element {
    animation: name duration timing-function delay iteration-count direction fill-mode;
}
```

### Отдельные свойства:

```css
.element {
    animation-name: slide;           /* Имя анимации */
    animation-duration: 1s;          /* Длительность */
    animation-timing-function: ease;  /* Функция времени */
    animation-delay: 0s;              /* Задержка */
    animation-iteration-count: 1;     /* Количество повторений */
    animation-direction: normal;      /* Направление */
    animation-fill-mode: forwards;     /* Режим заполнения */
    animation-play-state: running;    /* Состояние воспроизведения */
}
```

### Определение анимации:

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
    animation: slide 1s ease;
}
```

## Свойства для трансформаций (Transforms)

### `transform` — Трансформация

```css
.element {
    transform: translateX(50px) rotate(45deg) scale(1.2);
}
```

### Функции трансформации:

```css
.element {
    transform: translate(10px, 20px);    /* Смещение */
    transform: rotate(45deg);            /* Поворот */
    transform: scale(1.5);                /* Масштаб */
    transform: skew(10deg, 5deg);         /* Наклон */
}
```

## Примеры использования

### Простой переход:

```css
.card {
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.card:hover {
    opacity: 1;
}
```

### Множественные переходы:

```css
.button {
    background-color: blue;
    color: white;
    transform: scale(1);
    transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
    background-color: red;
    transform: scale(1.1);
}
```

### Анимация:

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.element {
    animation: fadeIn 0.5s ease-out;
}
```

### Комплексная анимация:

```css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.element {
    animation: bounce 1s infinite;
}
```

## Функции времени (Timing Functions)

```css
.element {
    transition-timing-function: ease;        /* По умолчанию */
    transition-timing-function: linear;      /* Линейная */
    transition-timing-function: ease-in;     /* Ускорение */
    transition-timing-function: ease-out;    /* Замедление */
    transition-timing-function: ease-in-out;  /* Ускорение и замедление */
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* Кастомная */
}
```

## Свойства для производительности

### `will-change` — Оптимизация

```css
.element {
    will-change: transform;
}
```

### `transform` и `opacity` — GPU ускорение

```css
.element {
    transform: translateZ(0); /* Активирует GPU */
}
```

## Заключение

**Свойства для переходов:**
- `transition` — основное свойство
- `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`

**Свойства для анимаций:**
- `animation` — основное свойство
- `animation-name`, `animation-duration`, `animation-timing-function`, и другие
- `@keyframes` — определение анимации

**Свойства для трансформаций:**
- `transform` — трансформация элементов

**Рекомендации:**
- Используйте `transition` для простых переходов
- Используйте `animation` для сложных анимаций
- Используйте `transform` и `opacity` для производительности
- Используйте `will-change` для оптимизации

Правильное использование этих свойств создает плавные и производительные анимации.

