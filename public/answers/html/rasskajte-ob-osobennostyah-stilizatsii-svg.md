# Расскажите об особенностях стилизации `<svg>`?

SVG можно стилизовать через CSS, но есть особенности: можно стилизовать как через внешний CSS, так и через атрибуты внутри SVG, использовать CSS переменные и анимации.

## Способы стилизации SVG

### 1. **Внешний CSS**

```css
svg {
    width: 200px;
    height: 200px;
}

svg circle {
    fill: blue;
    stroke: black;
    stroke-width: 2px;
}

svg path {
    fill: red;
}
```

### 2. **Атрибуты внутри SVG**

```html
<svg>
    <circle cx="50" cy="50" r="40" fill="blue" stroke="black"/>
</svg>
```

### 3. **CSS классы**

```html
<svg>
    <circle class="icon-circle" cx="50" cy="50" r="40"/>
</svg>
```

```css
.icon-circle {
    fill: blue;
    stroke: black;
}
```

### 4. **CSS переменные**

```css
:root {
    --icon-color: #3498db;
}

svg path {
    fill: var(--icon-color);
}
```

## Особенности стилизации

### Свойства вместо атрибутов:

```css
/* Вместо fill="blue" */
svg path {
    fill: blue;
}

/* Вместо stroke="black" */
svg path {
    stroke: black;
    stroke-width: 2px;
}
```

### Анимации:

```css
svg circle {
    fill: blue;
    transition: fill 0.3s;
}

svg circle:hover {
    fill: red;
}
```

### Медиа-запросы:

```css
@media (prefers-color-scheme: dark) {
    svg path {
        fill: white;
    }
}
```

## Ограничения

### Некоторые свойства не работают:

```css
/* Не работает */
svg {
    background-color: blue; /* Работает на контейнере, не на SVG */
}

/* Работает */
.svg-container {
    background-color: blue;
}
```

## Заключение

**Особенности стилизации SVG:**

1. ✅ Можно стилизовать через внешний CSS
2. ✅ Можно использовать атрибуты внутри SVG
3. ✅ Поддерживает CSS переменные
4. ✅ Поддерживает анимации и переходы
5. ✅ Поддерживает медиа-запросы

**Рекомендации:**
- Используйте CSS для стилизации
- Используйте CSS переменные для тем
- Комбинируйте с анимациями для интерактивности

SVG — гибкий формат, который хорошо интегрируется с CSS.

