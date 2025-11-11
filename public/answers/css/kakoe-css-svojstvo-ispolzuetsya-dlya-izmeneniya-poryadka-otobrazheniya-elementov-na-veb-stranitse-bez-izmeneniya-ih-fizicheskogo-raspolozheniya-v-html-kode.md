# Какое CSS-свойство используется для изменения порядка отображения элементов на веб-странице без изменения их физического расположения в HTML-коде?

Свойство `order` в CSS Flexbox и CSS Grid позволяет изменять визуальный порядок отображения элементов без изменения их физического расположения в HTML-коде.

## Свойство `order`

### Базовое использование:

```css
.element {
    order: 2; /* Элемент отобразится вторым */
}
```

### Значения:

- `0` — значение по умолчанию
- Положительные числа — порядок отображения
- Отрицательные числа — обратный порядок

## Использование в Flexbox

### Базовый пример:

```html
<div class="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
</div>
```

```css
.container {
    display: flex;
}

.item-1 {
    order: 3; /* Отобразится третьим */
}

.item-2 {
    order: 1; /* Отобразится первым */
}

.item-3 {
    order: 2; /* Отобразится вторым */
}
```

**Визуальный порядок:** 2, 3, 1

### Респонсивный порядок:

```css
.item-1 {
    order: 1;
}

.item-2 {
    order: 2;
}

.item-3 {
    order: 3;
}

@media (max-width: 768px) {
    .item-1 {
        order: 3; /* На мобильных — последним */
    }
    
    .item-3 {
        order: 1; /* На мобильных — первым */
    }
}
```

## Использование в CSS Grid

### Grid с `order`:

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.item-1 {
    order: 3;
}

.item-2 {
    order: 1;
}

.item-3 {
    order: 2;
}
```

## Примеры использования

### Изменение порядка колонок:

```html
<div class="layout">
    <aside class="sidebar">Боковая панель</aside>
    <main class="content">Основной контент</main>
</div>
```

```css
.layout {
    display: flex;
}

.sidebar {
    order: 2; /* Справа */
}

.content {
    order: 1; /* Слева */
}
```

### Адаптивный порядок:

```css
.mobile-first {
    order: 1;
}

.desktop-first {
    order: 2;
}

@media (min-width: 768px) {
    .mobile-first {
        order: 2;
    }
    
    .desktop-first {
        order: 1;
    }
}
```

### Скрытие элементов:

```css
.hidden-mobile {
    order: -1; /* В начале */
}

@media (max-width: 768px) {
    .hidden-mobile {
        display: none; /* Скрыть на мобильных */
    }
}
```

## Важные замечания

### 1. **Только для Flexbox и Grid**

`order` работает только внутри контейнеров с `display: flex` или `display: grid`.

### 2. **Не влияет на DOM**

HTML-структура остается неизменной, меняется только визуальное отображение.

### 3. **Доступность**

Скринридеры читают элементы в порядке DOM, а не визуальном порядке.

### 4. **Табуляция**

Навигация с клавиатуры следует порядку DOM, а не визуальному.

## Альтернативы

### CSS Grid `grid-area`:

```css
.container {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar content"
        "footer footer";
}

.sidebar {
    grid-area: sidebar;
}

.content {
    grid-area: content;
}
```

### Flexbox `flex-direction`:

```css
.container {
    display: flex;
    flex-direction: column-reverse; /* Обратный порядок */
}
```

## Заключение

**Свойство `order`:**

1. ✅ Изменяет визуальный порядок элементов
2. ✅ Работает в Flexbox и CSS Grid
3. ✅ Не изменяет HTML-структуру
4. ✅ Полезно для адаптивного дизайна

**Использование:**

- Flexbox: `display: flex` + `order`
- CSS Grid: `display: grid` + `order`
- Адаптивный дизайн: изменение `order` в медиа-запросах

**Ограничения:**

- Не влияет на порядок в DOM
- Не влияет на доступность (скринридеры)
- Не влияет на навигацию с клавиатуры

**Рекомендации:**

- Используйте для визуального изменения порядка
- Будьте осторожны с доступностью
- Тестируйте с клавиатурой и скринридерами

Свойство `order` — мощный инструмент для управления визуальным порядком элементов.

