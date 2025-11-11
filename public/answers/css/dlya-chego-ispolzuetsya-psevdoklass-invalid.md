# Для чего используется псевдокласс `:invalid`?

Псевдокласс `:invalid` в CSS применяется к элементам форм, которые не прошли валидацию HTML5. Это позволяет визуально указывать пользователю на ошибки ввода.

## Что такое `:invalid`?

`:invalid` — это псевдокласс, который выбирает элементы форм с невалидными значениями согласно правилам валидации HTML5.

## Использование

### Базовый синтаксис:

```css
input:invalid {
    border-color: red;
}
```

## Примеры использования

### Подсветка невалидных полей:

```css
input:invalid {
    border: 2px solid red;
    background-color: #ffe6e6;
}

input:invalid:focus {
    outline: 2px solid red;
}
```

### Сообщение об ошибке:

```css
input:invalid + .error-message {
    display: block;
    color: red;
}
```

### Иконка ошибки:

```css
.input-wrapper:has(input:invalid)::after {
    content: "⚠";
    color: red;
}
```

## Работа с типами input

### Email:

```css
input[type="email"]:invalid {
    border-color: red;
}
```

### URL:

```css
input[type="url"]:invalid {
    border-color: red;
}
```

### Number:

```css
input[type="number"]:invalid {
    border-color: red;
}
```

### Pattern:

```css
input[pattern]:invalid {
    border-color: red;
}
```

## Комбинирование с другими псевдоклассами

### `:invalid` и `:focus`:

```css
input:invalid:focus {
    border-color: red;
    box-shadow: 0 0 5px red;
}
```

### `:invalid` и `:not(:placeholder-shown)`:

```css
input:invalid:not(:placeholder-shown) {
    border-color: red;
}
```

## Лучшие практики

### 1. **Показывайте ошибки только после взаимодействия**

```css
input:invalid:not(:focus):not(:placeholder-shown) {
    border-color: red;
}
```

### 2. **Используйте с `:valid`**

```css
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}
```

### 3. **Предоставляйте понятные сообщения**

```html
<input type="email" required>
<span class="error-message">Введите корректный email</span>
```

```css
input:invalid + .error-message {
    display: block;
}
```

## Заключение

**`:invalid` используется для:**

1. ✅ Визуального указания на ошибки валидации
2. ✅ Улучшения UX форм
3. ✅ Подсветки невалидных полей

**Использование:**

- Подсветка границ
- Сообщения об ошибках
- Иконки ошибок

**Рекомендации:**

- Показывайте ошибки после взаимодействия
- Используйте с `:valid` для контраста
- Предоставляйте понятные сообщения

Правильное использование `:invalid` улучшает валидацию форм и пользовательский опыт.

