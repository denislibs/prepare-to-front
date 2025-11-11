# Какой тэг использовать для того, что бы сверстать кнопку?

Для создания кнопки в HTML можно использовать несколько элементов, каждый из которых имеет свое назначение и семантическое значение. Выбор правильного элемента зависит от контекста использования и функциональности кнопки.

## Элементы для создания кнопок

### 1. **`<button>` — Основной элемент для кнопок**

**Рекомендуется для:**
- Интерактивных действий на странице
- Отправки форм
- JavaScript обработчиков
- Любых действий, не связанных с навигацией

```html
<!-- Простая кнопка -->
<button type="button">Нажми меня</button>

<!-- Кнопка отправки формы -->
<button type="submit">Отправить</button>

<!-- Кнопка сброса формы -->
<button type="reset">Сбросить</button>

<!-- Кнопка с иконкой -->
<button type="button">
    <img src="icon.svg" alt="Иконка">
    Текст кнопки
</button>

<!-- Кнопка с доступностью -->
<button type="button" aria-label="Закрыть окно">
    ×
</button>
```

**Преимущества `<button>`:**
- ✅ Семантически правильный
- ✅ Может содержать HTML контент (текст, изображения, иконки)
- ✅ Поддерживает все типы событий
- ✅ Хорошая доступность из коробки
- ✅ Правильная работа с клавиатурой

### 2. **`<input type="button">` — Кнопка без содержимого**

**Используется для:**
- Простых кнопок без HTML контента
- Кнопок с только текстом
- Совместимости со старыми формами

```html
<input type="button" value="Нажми меня" onclick="handleClick()">

<input type="submit" value="Отправить форму">

<input type="reset" value="Сбросить">
```

**Ограничения:**
- ❌ Не может содержать HTML (только текст через `value`)
- ❌ Менее гибкий, чем `<button>`
- ❌ Не может содержать иконки или изображения

### 3. **`<input type="submit">` — Кнопка отправки формы**

**Используется для:**
- Отправки форм
- Специфичных кнопок отправки

```html
<form action="/submit" method="POST">
    <input type="text" name="email">
    <input type="submit" value="Отправить">
</form>
```

### 4. **`<a>` с ролью кнопки — Ссылка как кнопка**

**Используется для:**
- Кнопок, которые выглядят как ссылки
- Действий, которые не должны выглядеть как навигация
- Когда нужна стилизация ссылки, но поведение кнопки

```html
<!-- НЕ рекомендуется -->
<a href="#" onclick="handleClick(); return false;">Кнопка</a>

<!-- Лучше использовать button -->
<button type="button">Кнопка</button>

<!-- Если нужна ссылка, используйте ссылку -->
<a href="/page">Перейти</a>
```

## Сравнение элементов

### `<button>` vs `<input type="button">`

```html
<!-- button - более гибкий -->
<button type="button">
    <svg>...</svg>
    <span>Текст</span>
</button>

<!-- input - только текст -->
<input type="button" value="Текст">
```

### `<button>` vs `<a>` для действий

```html
<!-- Для действия на странице -->
<button type="button" onclick="handleAction()">
    Выполнить действие
</button>

<!-- Для навигации -->
<a href="/page">Перейти на страницу</a>
```

## Типы кнопок

### 1. **`type="button"`** — Обычная кнопка

```html
<button type="button">Кнопка</button>
```

- Не отправляет форму
- Используется для JavaScript действий
- По умолчанию для `<button>` вне формы

### 2. **`type="submit"`** — Отправка формы

```html
<form>
    <input type="text" name="email">
    <button type="submit">Отправить</button>
</form>
```

- Отправляет форму при клике
- По умолчанию для `<button>` внутри формы

### 3. **`type="reset"`** — Сброс формы

```html
<form>
    <input type="text" name="email">
    <button type="reset">Сбросить</button>
</form>
```

- Сбрасывает все поля формы к начальным значениям

## Практические примеры

### Кнопка с иконкой и текстом:

```html
<button type="button" class="btn btn-primary">
    <svg class="icon" aria-hidden="true">
        <use href="#save-icon"></use>
    </svg>
    <span>Сохранить</span>
</button>
```

### Кнопка только с иконкой:

```html
<button type="button" aria-label="Закрыть" class="btn-icon">
    <svg aria-hidden="true">
        <use href="#close-icon"></use>
    </svg>
</button>
```

### Кнопка отправки формы:

```html
<form id="contact-form">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">
        Отправить форму
    </button>
</form>
```

### Группа кнопок:

```html
<div class="button-group" role="group" aria-label="Действия">
    <button type="button">Сохранить</button>
    <button type="button">Отменить</button>
    <button type="button">Удалить</button>
</div>
```

### Кнопка с загрузкой:

```html
<button type="submit" disabled aria-busy="true">
    <span class="spinner" aria-hidden="true"></span>
    Отправка...
</button>
```

## Доступность кнопок

### Правильная доступность:

```html
<!-- С текстом -->
<button type="button">Сохранить</button>

<!-- Только иконка - нужен aria-label -->
<button type="button" aria-label="Закрыть окно">
    <svg aria-hidden="true">×</svg>
</button>

<!-- С описанием -->
<button type="button" 
        aria-label="Удалить элемент"
        aria-describedby="delete-help">
    Удалить
</button>
<div id="delete-help">Это действие нельзя отменить</div>
```

### Клавиатурная навигация:

```html
<!-- Автоматически получает фокус через Tab -->
<button type="button" tabindex="0">Кнопка</button>

<!-- Исключить из табуляции -->
<button type="button" tabindex="-1">Скрытая кнопка</button>
```

## Стилизация кнопок

```html
<!-- Базовые классы -->
<button type="button" class="btn">Обычная</button>
<button type="button" class="btn btn-primary">Основная</button>
<button type="button" class="btn btn-secondary">Вторичная</button>
<button type="button" class="btn btn-danger">Опасная</button>

<!-- Размеры -->
<button type="button" class="btn btn-sm">Маленькая</button>
<button type="button" class="btn">Обычная</button>
<button type="button" class="btn btn-lg">Большая</button>

<!-- Состояния -->
<button type="button" disabled>Отключена</button>
<button type="button" aria-busy="true">Загрузка...</button>
```

## Заключение

**Для создания кнопки используйте:**

1. **`<button type="button">`** — основной элемент для кнопок
   - ✅ Рекомендуется в большинстве случаев
   - ✅ Гибкий, может содержать HTML
   - ✅ Хорошая доступность

2. **`<input type="button">`** — для простых текстовых кнопок
   - ⚠️ Только текст, без HTML
   - ⚠️ Менее гибкий

3. **`<input type="submit">`** — для отправки форм
   - ✅ Специфично для форм

**НЕ используйте `<a>` для кнопок**, если это не навигация. Используйте семантически правильные элементы для лучшей доступности и SEO.

