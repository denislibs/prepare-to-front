# Что такое и как работает CSS Flexbox?

CSS Flexbox (Flexible Box Layout) — это одномерная система макета, которая позволяет эффективно распределять пространство и выравнивать элементы в контейнере. Это мощный инструмент для создания гибких и адаптивных макетов.

## Что такое Flexbox?

Flexbox — это CSS-модуль, который предоставляет эффективный способ распределения пространства между элементами и выравнивания их в контейнере, даже когда их размер неизвестен или динамичен.

## Основные концепции

### Flex Container (Родитель)

Элемент с `display: flex` или `display: inline-flex` становится flex-контейнером.

### Flex Items (Дочерние элементы)

Прямые дочерние элементы flex-контейнера становятся flex-элементами.

## Базовое использование

### Создание flex-контейнера:

```css
.container {
    display: flex;
}
```

### Горизонтальное расположение:

```css
.container {
    display: flex;
    flex-direction: row; /* По умолчанию */
}
```

### Вертикальное расположение:

```css
.container {
    display: flex;
    flex-direction: column;
}
```

## Свойства контейнера

### `flex-direction` — Направление

```css
.container {
    flex-direction: row;        /* Горизонтально (по умолчанию) */
    flex-direction: column;    /* Вертикально */
    flex-direction: row-reverse; /* Обратный порядок */
    flex-direction: column-reverse;
}
```

### `justify-content` — Выравнивание по главной оси

```css
.container {
    justify-content: flex-start;   /* В начале (по умолчанию) */
    justify-content: flex-end;      /* В конце */
    justify-content: center;        /* По центру */
    justify-content: space-between; /* Между элементами */
    justify-content: space-around;   /* Вокруг элементов */
    justify-content: space-evenly;  /* Равномерно */
}
```

### `align-items` — Выравнивание по поперечной оси

```css
.container {
    align-items: stretch;      /* Растянуть (по умолчанию) */
    align-items: flex-start;   /* В начале */
    align-items: flex-end;     /* В конце */
    align-items: center;       /* По центру */
    align-items: baseline;    /* По базовой линии */
}
```

### `flex-wrap` — Перенос строк

```css
.container {
    flex-wrap: nowrap;    /* Без переноса (по умолчанию) */
    flex-wrap: wrap;       /* С переносом */
    flex-wrap: wrap-reverse; /* Обратный перенос */
}
```

### `align-content` — Выравнивание строк

```css
.container {
    align-content: stretch;      /* Растянуть */
    align-content: flex-start;   /* В начале */
    align-content: flex-end;      /* В конце */
    align-content: center;       /* По центру */
    align-content: space-between; /* Между строками */
    align-content: space-around;  /* Вокруг строк */
}
```

## Свойства элементов

### `flex-grow` — Коэффициент роста

```css
.item {
    flex-grow: 0; /* Не растет (по умолчанию) */
    flex-grow: 1; /* Растет пропорционально */
    flex-grow: 2; /* Растет в 2 раза быстрее */
}
```

### `flex-shrink` — Коэффициент сжатия

```css
.item {
    flex-shrink: 1; /* Сжимается (по умолчанию) */
    flex-shrink: 0; /* Не сжимается */
}
```

### `flex-basis` — Базовый размер

```css
.item {
    flex-basis: auto; /* Автоматически (по умолчанию) */
    flex-basis: 200px; /* Фиксированный размер */
    flex-basis: 0;     /* Без базового размера */
}
```

### `flex` — Сокращенная запись

```css
.item {
    flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
    flex: 0 1 auto; /* По умолчанию */
    flex: 1 0 200px; /* grow, shrink, basis */
}
```

### `align-self` — Индивидуальное выравнивание

```css
.item {
    align-self: auto;      /* Наследует от align-items */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: stretch;
}
```

### `order` — Порядок отображения

```css
.item {
    order: 0; /* По умолчанию */
    order: 1; /* Позже */
    order: -1; /* Раньше */
}
```

## Примеры использования

### Центрирование:

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

### Равномерное распределение:

```css
.container {
    display: flex;
    justify-content: space-between;
}

.item {
    flex: 1;
}
```

### Адаптивная навигация:

```css
.nav {
    display: flex;
    flex-wrap: wrap;
}

.nav-item {
    flex: 1 1 200px; /* Минимум 200px, растет и сжимается */
}
```

### Карточки в ряд:

```css
.cards {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    flex: 1 1 300px; /* Минимум 300px */
}
```

## Оси

### Главная ось (Main Axis)

Направление, в котором располагаются элементы (`flex-direction`).

### Поперечная ось (Cross Axis)

Перпендикулярная главной оси.

## Заключение

**Flexbox — это:**

1. ✅ Одномерная система макета
2. ✅ Эффективное распределение пространства
3. ✅ Гибкое выравнивание элементов
4. ✅ Адаптивные макеты

**Основные свойства:**

- Контейнер: `display`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`
- Элементы: `flex`, `align-self`, `order`

**Преимущества:**

- Простота использования
- Гибкость
- Адаптивность
- Центрирование элементов

**Рекомендации:**

- Используйте для одномерных макетов
- Комбинируйте с CSS Grid для двумерных макетов
- Тестируйте на разных устройствах

Flexbox — мощный инструмент для создания современных и адаптивных макетов.
