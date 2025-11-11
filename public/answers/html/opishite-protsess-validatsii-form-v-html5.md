# Опишите процесс валидации форм в HTML5?

Валидация форм в HTML5 происходит автоматически на стороне клиента с помощью встроенных атрибутов и типов input. Браузер проверяет данные перед отправкой формы.

## Что такое валидация форм?

Валидация форм — это процесс проверки данных, введенных пользователем, на соответствие определенным правилам перед отправкой на сервер.

## Типы валидации

### 1. **Встроенная валидация HTML5**

Браузер автоматически проверяет данные на основе атрибутов элементов формы.

### 2. **JavaScript валидация**

Дополнительная проверка с помощью JavaScript для более сложных правил.

## Атрибуты валидации

### `required` — Обязательное поле

```html
<input type="text" name="username" required>
```

Браузер не отправит форму, если поле пустое.

### `type` — Тип данных

```html
<input type="email" name="email">
<input type="url" name="website">
<input type="number" name="age">
<input type="date" name="birthday">
```

Браузер проверяет формат данных.

### `pattern` — Регулярное выражение

```html
<input type="text" name="phone" pattern="[0-9]{10}">
```

Браузер проверяет соответствие регулярному выражению.

### `min` и `max` — Ограничения

```html
<input type="number" name="age" min="18" max="100">
<input type="date" name="birthday" min="2000-01-01" max="2024-12-31">
```

### `minlength` и `maxlength` — Длина строки

```html
<input type="text" name="username" minlength="3" maxlength="20">
```

### `step` — Шаг для чисел

```html
<input type="number" name="quantity" min="0" max="100" step="5">
```

## Процесс валидации

### 1. **Проверка при отправке**

```html
<form id="myForm">
    <input type="email" name="email" required>
    <button type="submit">Отправить</button>
</form>
```

При нажатии на кнопку отправки браузер проверяет все поля.

### 2. **Визуальная обратная связь**

Браузер показывает сообщения об ошибках и подсвечивает невалидные поля.

### 3. **Блокировка отправки**

Если есть ошибки, форма не отправляется.

## Примеры

### Полная форма с валидацией:

```html
<form action="/submit" method="post">
    <label for="email">Email:</label>
    <input type="email" 
           id="email" 
           name="email" 
           required 
           placeholder="email@example.com">
    
    <label for="age">Возраст:</label>
    <input type="number" 
           id="age" 
           name="age" 
           min="18" 
           max="100" 
           required>
    
    <label for="phone">Телефон:</label>
    <input type="tel" 
           id="phone" 
           name="phone" 
           pattern="[0-9]{10}" 
           title="10 цифр"
           required>
    
    <button type="submit">Отправить</button>
</form>
```

### Отключение валидации:

```html
<form novalidate>
    <input type="email" name="email">
    <button type="submit">Отправить</button>
</form>
```

## JavaScript валидация

### Проверка валидности:

```javascript
const form = document.querySelector('form');
const email = document.querySelector('input[type="email"]');

form.addEventListener('submit', (e) => {
    if (!email.validity.valid) {
        e.preventDefault();
        alert('Email невалиден');
    }
});
```

### Свойство `validity`:

```javascript
const input = document.querySelector('input');

if (input.validity.valueMissing) {
    console.log('Поле пустое');
}

if (input.validity.typeMismatch) {
    console.log('Неверный тип данных');
}

if (input.validity.patternMismatch) {
    console.log('Не соответствует паттерну');
}

if (input.validity.rangeOverflow) {
    console.log('Значение слишком большое');
}

if (input.validity.rangeUnderflow) {
    console.log('Значение слишком маленькое');
}
```

## Кастомные сообщения

### `setCustomValidity()`:

```javascript
const input = document.querySelector('input');

input.addEventListener('input', () => {
    if (input.value.length < 3) {
        input.setCustomValidity('Минимум 3 символа');
    } else {
        input.setCustomValidity('');
    }
});
```

## Заключение

**Процесс валидации:**

1. ✅ Браузер проверяет поля при отправке
2. ✅ Показывает сообщения об ошибках
3. ✅ Блокирует отправку при ошибках
4. ✅ Подсвечивает невалидные поля

**Атрибуты валидации:**

- `required` — обязательное поле
- `type` — тип данных
- `pattern` — регулярное выражение
- `min`/`max` — ограничения
- `minlength`/`maxlength` — длина

**Рекомендации:**

- Используйте встроенную валидацию HTML5
- Добавляйте JavaScript для сложных правил
- Предоставляйте понятные сообщения об ошибках
- Всегда валидируйте на сервере

Правильная валидация форм улучшает UX и безопасность приложения.

