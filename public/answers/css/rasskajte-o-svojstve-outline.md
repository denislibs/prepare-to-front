# Расскажите о свойстве `outline`?

Свойство `outline` в CSS создает контур вокруг элемента, который не занимает место в макете (в отличие от `border`). Это полезно для индикации фокуса и доступности.

## Что такое `outline`?

`outline` — это свойство, которое рисует контур вокруг элемента. В отличие от `border`, `outline` не влияет на размеры элемента и не занимает место в потоке документа.

## Использование

### Базовый синтаксис:

```css
.element {
    outline: 2px solid blue;
}
```

### Отдельные свойства:

```css
.element {
    outline-width: 2px;
    outline-style: solid;
    outline-color: blue;
    outline-offset: 5px; /* Отступ от элемента */
}
```

## Значения

### `outline-width`:

```css
.element {
    outline-width: 2px;
    outline-width: thin;
    outline-width: medium;
    outline-width: thick;
}
```

### `outline-style`:

```css
.element {
    outline-style: solid;
    outline-style: dashed;
    outline-style: dotted;
    outline-style: double;
    outline-style: none; /* Убрать outline */
}
```

### `outline-color`:

```css
.element {
    outline-color: blue;
    outline-color: #3498db;
    outline-color: currentColor; /* Цвет текста */
}
```

### `outline-offset`:

```css
.element {
    outline-offset: 5px; /* Отступ от границы элемента */
}
```

## Примеры использования

### Фокус на элементах форм:

```css
input:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
}
```

### Доступность:

```css
a:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
}
```

### Удаление outline (осторожно):

```css
.button:focus {
    outline: none; /* Только если есть альтернативный индикатор фокуса */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
```

## Отличия от `border`

### `outline`:

- ✅ Не занимает место в макете
- ✅ Не влияет на размеры элемента
- ✅ Рисуется поверх элемента
- ✅ Не может иметь скругленные углы

### `border`:

- ❌ Занимает место в макете
- ❌ Влияет на размеры элемента
- ❌ Рисуется внутри элемента
- ✅ Может иметь скругленные углы

## Заключение

**`outline` используется для:**

1. ✅ Индикации фокуса
2. ✅ Улучшения доступности
3. ✅ Визуального выделения элементов

**Особенности:**

- Не занимает место в макете
- Не влияет на размеры
- Рисуется поверх элемента

**Рекомендации:**

- Используйте для индикации фокуса
- Не удаляйте без альтернативы
- Используйте `outline-offset` для отступа

Правильное использование `outline` критично для доступности и UX.

