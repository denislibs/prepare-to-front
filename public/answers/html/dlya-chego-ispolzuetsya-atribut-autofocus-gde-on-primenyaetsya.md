# Для чего используется атрибут `autofocus`? Где он применяется?

Атрибут `autofocus` в HTML автоматически устанавливает фокус на элемент при загрузке страницы. Это улучшает UX, особенно для форм и интерактивных элементов.

## Что такое `autofocus`?

`autofocus` — это булевый атрибут, который автоматически устанавливает фокус на элемент при загрузке страницы.

## Использование

### Базовый синтаксис:

```html
<input type="text" autofocus>
```

## Где применяется?

### Элементы форм:

```html
<!-- Текстовое поле -->
<input type="text" name="username" autofocus>

<!-- Текстовая область -->
<textarea name="message" autofocus></textarea>

<!-- Кнопка -->
<button type="submit" autofocus>Отправить</button>

<!-- Выпадающий список -->
<select name="country" autofocus>
    <option value="ru">Россия</option>
</select>
```

## Примеры использования

### Форма входа:

```html
<form>
    <label for="username">Имя пользователя:</label>
    <input type="text" id="username" name="username" autofocus>
    
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password">
    
    <button type="submit">Войти</button>
</form>
```

### Поисковая форма:

```html
<form>
    <input type="search" name="query" placeholder="Поиск..." autofocus>
    <button type="submit">Найти</button>
</form>
```

### Модальное окно:

```html
<dialog>
    <form>
        <input type="text" name="name" autofocus>
        <button type="submit">Отправить</button>
    </form>
</dialog>
```

## Ограничения

### Только один элемент

На странице должен быть только один элемент с `autofocus`. Если их несколько, фокус получит первый в DOM.

### Доступность

Использование `autofocus` может быть проблематичным для пользователей скринридеров, так как они могут не ожидать автоматического фокуса.

### UX

Автоматический фокус может мешать пользователям, которые хотят прокрутить страницу или выполнить другое действие.

## Лучшие практики

### 1. Используйте осознанно

```html
<!-- Хорошо: форма входа -->
<form>
    <input type="text" name="username" autofocus>
</form>

<!-- Плохо: на главной странице -->
<input type="text" autofocus>
```

### 2. Учитывайте контекст

Используйте `autofocus` только когда это улучшает UX (формы, модальные окна).

### 3. Предоставляйте альтернативу

```html
<input type="text" name="search" autofocus>
<!-- Пользователь может убрать фокус, нажав Tab или кликнув в другое место -->
```

## Альтернатива через JavaScript

### Программный фокус:

```javascript
window.addEventListener('load', () => {
    const input = document.querySelector('input[type="text"]');
    input.focus();
});
```

### Условный фокус:

```javascript
if (!document.querySelector('input:focus')) {
    const input = document.querySelector('input[type="text"]');
    input.focus();
}
```

## Заключение

**`autofocus` используется для:**

1. ✅ Автоматической установки фокуса на элемент
2. ✅ Улучшения UX в формах
3. ✅ Ускорения взаимодействия с формой

**Где применяется:**

- Элементы форм (`<input>`, `<textarea>`, `<select>`, `<button>`)
- Модальные окна
- Поисковые формы

**Ограничения:**

- Только один элемент на странице
- Может мешать доступности
- Может мешать UX

**Рекомендации:**

- Используйте осознанно
- Учитывайте контекст
- Тестируйте с скринридерами

Правильное использование `autofocus` улучшает UX, но требует осторожности.

