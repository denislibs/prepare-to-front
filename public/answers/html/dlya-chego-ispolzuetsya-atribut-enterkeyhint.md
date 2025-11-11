# Для чего используется атрибут `enterkeyhint`?

Атрибут `enterkeyhint` в HTML указывает мобильным устройствам, какую подсказку показывать на клавише Enter виртуальной клавиатуры. Это улучшает UX на мобильных устройствах.

## Что такое enterkeyhint?

`enterkeyhint` — это атрибут для элементов форм, который определяет подсказку на клавише Enter.

## Значения

### `enter` — Enter (по умолчанию)

```html
<input type="text" enterkeyhint="enter">
```

### `done` — Готово

```html
<input type="text" enterkeyhint="done">
```

### `go` — Перейти

```html
<input type="text" enterkeyhint="go">
```

### `next` — Далее

```html
<input type="text" enterkeyhint="next">
```

### `previous` — Назад

```html
<input type="text" enterkeyhint="previous">
```

### `search` — Поиск

```html
<input type="search" enterkeyhint="search">
```

### `send` — Отправить

```html
<input type="text" enterkeyhint="send">
```

## Примеры использования

### Форма входа:

```html
<form>
    <input type="text" enterkeyhint="next" placeholder="Имя пользователя">
    <input type="password" enterkeyhint="done" placeholder="Пароль">
    <button type="submit">Войти</button>
</form>
```

### Поиск:

```html
<input type="search" enterkeyhint="search" placeholder="Поиск...">
```

### Многошаговая форма:

```html
<input type="text" enterkeyhint="next" placeholder="Шаг 1">
<input type="text" enterkeyhint="next" placeholder="Шаг 2">
<input type="text" enterkeyhint="done" placeholder="Шаг 3">
```

## Заключение

**`enterkeyhint` используется для:**

1. ✅ Улучшения UX на мобильных устройствах
2. ✅ Показ правильной подсказки на клавише Enter
3. ✅ Улучшения навигации по формам

**Значения:**
- `done` — завершение
- `go` — переход
- `next` — следующий шаг
- `search` — поиск
- `send` — отправка

**Рекомендации:**
- Используйте для улучшения мобильного UX
- Выбирайте значение по контексту
- Комбинируйте с правильными типами input

Правильное использование `enterkeyhint` улучшает пользовательский опыт на мобильных устройствах.

