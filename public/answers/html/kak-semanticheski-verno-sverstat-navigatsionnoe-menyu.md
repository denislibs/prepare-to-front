# Как семантически верно сверстать навигационное меню?

Семантически правильная верстка навигационного меню использует элемент `<nav>` и структурированный список ссылок. Это улучшает доступность, SEO и понимание структуры сайта.

## Семантическая верстка навигации

### Базовая структура:

```html
<nav>
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
        <li><a href="/contact">Контакты</a></li>
    </ul>
</nav>
```

## Компоненты

### 1. **`<nav>`** — Семантический контейнер

```html
<nav aria-label="Основная навигация">
    <!-- Навигационные ссылки -->
</nav>
```

### 2. **`<ul>`** — Список ссылок

```html
<nav>
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
    </ul>
</nav>
```

### 3. **`<a>`** — Ссылки навигации

```html
<nav>
    <ul>
        <li><a href="/" aria-current="page">Главная</a></li>
        <li><a href="/about">О нас</a></li>
    </ul>
</nav>
```

## Примеры

### Простое меню:

```html
<nav>
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/products">Продукты</a></li>
        <li><a href="/about">О нас</a></li>
        <li><a href="/contact">Контакты</a></li>
    </ul>
</nav>
```

### С активной ссылкой:

```html
<nav>
    <ul>
        <li><a href="/" aria-current="page">Главная</a></li>
        <li><a href="/about">О нас</a></li>
    </ul>
</nav>
```

### Многоуровневое меню:

```html
<nav>
    <ul>
        <li><a href="/">Главная</a></li>
        <li>
            <a href="/products">Продукты</a>
            <ul>
                <li><a href="/products/category1">Категория 1</a></li>
                <li><a href="/products/category2">Категория 2</a></li>
            </ul>
        </li>
        <li><a href="/contact">Контакты</a></li>
    </ul>
</nav>
```

## Доступность

### ARIA атрибуты:

```html
<nav aria-label="Основная навигация">
    <ul>
        <li><a href="/" aria-current="page">Главная</a></li>
    </ul>
</nav>
```

### Клавиатурная навигация:

```html
<nav>
    <ul>
        <li><a href="/" tabindex="0">Главная</a></li>
    </ul>
</nav>
```

## Стилизация

```css
nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
}

nav a {
    text-decoration: none;
    color: #333;
    padding: 10px;
}

nav a:hover {
    color: blue;
}

nav a[aria-current="page"] {
    font-weight: bold;
    color: blue;
}
```

## Заключение

**Семантически правильная навигация:**

1. ✅ Использует `<nav>` для контейнера
2. ✅ Использует `<ul>` для списка
3. ✅ Использует `<li>` для элементов
4. ✅ Использует `<a>` для ссылок
5. ✅ Включает ARIA атрибуты для доступности

**Преимущества:**
- Улучшенная доступность
- Лучшее SEO
- Семантическая структура
- Легкая стилизация

Правильная семантическая верстка навигации улучшает доступность и понимание структуры сайта.

