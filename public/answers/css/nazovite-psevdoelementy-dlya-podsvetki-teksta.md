# Назовите псевдоэлементы для подсветки текста?

Псевдоэлементы для подсветки текста позволяют стилизовать выделенный пользователем текст. Это улучшает визуальное представление выделения и пользовательский опыт.

## Псевдоэлементы для подсветки

### 1. **`::selection` — Выделенный текст**

```css
::selection {
    background-color: yellow;
    color: black;
}
```

Стилизует текст, выделенный пользователем.

### 2. **`::moz-selection` — Для Firefox**

```css
::moz-selection {
    background-color: yellow;
    color: black;
}
```

Для совместимости с Firefox.

### 3. **`::-webkit-selection` — Для WebKit**

```css
::-webkit-selection {
    background-color: yellow;
    color: black;
}
```

Для совместимости с WebKit (устарело, используйте `::selection`).

## Примеры использования

### Кастомное выделение:

```css
::selection {
    background-color: #3498db;
    color: white;
}

::-moz-selection {
    background-color: #3498db;
    color: white;
}
```

### Для конкретных элементов:

```css
p::selection {
    background-color: yellow;
    color: black;
}

h1::selection {
    background-color: blue;
    color: white;
}
```

### Ограничения:

```css
::selection {
    background-color: #3498db;
    color: white;
    /* Можно использовать только: color, background-color, cursor, outline, text-decoration, text-emphasis-color, text-shadow */
}
```

## Поддерживаемые свойства

### Можно использовать:

- `color`
- `background-color`
- `cursor`
- `outline`
- `text-decoration`
- `text-emphasis-color`
- `text-shadow`

### Нельзя использовать:

- `margin`
- `padding`
- `border`
- `font-size`
- И другие свойства макета

## Заключение

**Псевдоэлементы для подсветки:**

1. ✅ `::selection` — выделенный текст
2. ✅ `::moz-selection` — для Firefox (устарело)
3. ✅ `::-webkit-selection` — для WebKit (устарело)

**Использование:**

- Кастомное выделение
- Улучшение визуального представления
- Улучшение UX

**Ограничения:**

- Ограниченный набор свойств
- Только цветовые и текстовые свойства

**Рекомендации:**

- Используйте `::selection` для кастомного выделения
- Учитывайте ограничения свойств
- Тестируйте в разных браузерах

Правильное использование псевдоэлементов для подсветки улучшает визуальное представление и UX.

