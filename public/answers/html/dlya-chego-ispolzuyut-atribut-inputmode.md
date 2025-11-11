# Для чего используют атрибут `inputmode`?

Атрибут `inputmode` в HTML подсказывает браузеру, какую виртуальную клавиатуру показывать на мобильных устройствах. Это улучшает UX при вводе данных на мобильных.

## Что такое inputmode?

`inputmode` — это атрибут для элементов форм, который определяет тип виртуальной клавиатуры на мобильных устройствах.

## Значения

### `none` — Без клавиатуры

```html
<input type="text" inputmode="none">
```

### `text` — Текстовая клавиатура

```html
<input type="text" inputmode="text">
```

### `tel` — Телефонная клавиатура

```html
<input type="tel" inputmode="tel">
```

### `url` — URL клавиатура

```html
<input type="url" inputmode="url">
```

### `email` — Email клавиатура

```html
<input type="email" inputmode="email">
```

### `numeric` — Цифровая клавиатура

```html
<input type="text" inputmode="numeric">
```

### `decimal` — Десятичная клавиатура

```html
<input type="text" inputmode="decimal">
```

### `search` — Поисковая клавиатура

```html
<input type="search" inputmode="search">
```

## Примеры использования

### Телефон:

```html
<input type="tel" inputmode="tel" placeholder="+7 (999) 123-45-67">
```

### Цифры:

```html
<input type="text" inputmode="numeric" placeholder="Введите число">
```

### Email:

```html
<input type="email" inputmode="email" placeholder="email@example.com">
```

## Заключение

**`inputmode` используется для:**

1. ✅ Улучшения UX на мобильных устройствах
2. ✅ Показа правильной клавиатуры
3. ✅ Упрощения ввода данных

**Значения:**
- `tel` — телефонная
- `numeric` — цифровая
- `email` — email
- `url` — URL
- `search` — поисковая

**Рекомендации:**
- Используйте для улучшения мобильного UX
- Выбирайте значение по типу данных
- Комбинируйте с правильными типами input

Правильное использование `inputmode` улучшает пользовательский опыт на мобильных устройствах.

