# Типы `<input>` элементов в HTML?

Элемент `<input>` в HTML имеет множество типов, каждый из которых предназначен для ввода определенного вида данных. Тип определяется атрибутом `type`, который влияет на поведение, валидацию и внешний вид поля ввода.

## Основные типы input

### 1. **`text`** — Текстовое поле (по умолчанию)

```html
<input type="text" name="username" placeholder="Введите имя">
```

- Однострочный текст
- Базовый тип для текстового ввода

### 2. **`password`** — Пароль

```html
<input type="password" name="password" placeholder="Введите пароль">
```

- Скрывает введенный текст (точки или звездочки)
- Не отправляет значение при автозаполнении

### 3. **`email`** — Email адрес

```html
<input type="email" name="email" placeholder="email@example.com">
```

- Валидация формата email
- На мобильных устройствах показывает клавиатуру с @

### 4. **`tel`** — Телефон

```html
<input type="tel" name="phone" placeholder="+7 (999) 123-45-67">
```

- Для телефонных номеров
- На мобильных показывает цифровую клавиатуру

### 5. **`url`** — URL адрес

```html
<input type="url" name="website" placeholder="https://example.com">
```

- Валидация формата URL
- Должен начинаться с протокола (http://, https://)

### 6. **`search`** — Поиск

```html
<input type="search" name="query" placeholder="Поиск...">
```

- Для поисковых запросов
- Может иметь кнопку очистки в некоторых браузерах

### 7. **`number`** — Число

```html
<input type="number" name="age" min="0" max="120" step="1">
```

- Только числовой ввод
- Атрибуты: `min`, `max`, `step`

### 8. **`range`** — Диапазон (слайдер)

```html
<input type="range" name="volume" min="0" max="100" value="50">
```

- Визуальный слайдер
- Атрибуты: `min`, `max`, `step`, `value`

### 9. **`date`** — Дата

```html
<input type="date" name="birthday">
```

- Выбор даты через календарь
- Формат: YYYY-MM-DD

### 10. **`time`** — Время

```html
<input type="time" name="appointment">
```

- Выбор времени
- Формат: HH:MM

### 11. **`datetime-local`** — Дата и время

```html
<input type="datetime-local" name="event">
```

- Выбор даты и времени
- Формат: YYYY-MM-DDTHH:MM

### 12. **`month`** — Месяц

```html
<input type="month" name="period">
```

- Выбор месяца и года
- Формат: YYYY-MM

### 13. **`week`** — Неделя

```html
<input type="week" name="week">
```

- Выбор недели и года
- Формат: YYYY-Www

### 14. **`color`** — Цвет

```html
<input type="color" name="favcolor" value="#ff0000">
```

- Выбор цвета через палитру
- Возвращает значение в формате #RRGGBB

### 15. **`checkbox`** — Чекбокс

```html
<input type="checkbox" name="agree" value="yes" id="agree">
<label for="agree">Согласен с условиями</label>
```

- Множественный выбор
- Можно выбрать несколько значений

### 16. **`radio`** — Радиокнопка

```html
<input type="radio" name="gender" value="male" id="male">
<label for="male">Мужской</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">Женский</label>
```

- Одиночный выбор из группы
- Все радиокнопки с одинаковым `name` — одна группа

### 17. **`file`** — Файл

```html
<input type="file" name="upload" accept="image/*">
```

- Загрузка файлов
- Атрибут `accept` для фильтрации типов файлов

### 18. **`submit`** — Кнопка отправки

```html
<input type="submit" value="Отправить">
```

- Отправляет форму
- По умолчанию отправляет форму при клике

### 19. **`reset`** — Кнопка сброса

```html
<input type="reset" value="Сбросить">
```

- Сбрасывает все поля формы к начальным значениям

### 20. **`button`** — Кнопка

```html
<input type="button" value="Нажми меня" onclick="handleClick()">
```

- Обычная кнопка без действия по умолчанию
- Используется с JavaScript

### 21. **`image`** — Изображение-кнопка

```html
<input type="image" src="submit.png" alt="Отправить">
```

- Изображение как кнопка отправки
- Отправляет координаты клика

### 22. **`hidden`** — Скрытое поле

```html
<input type="hidden" name="token" value="abc123">
```

- Скрытое поле (не видно пользователю)
- Используется для передачи данных

## Специальные атрибуты

### Для валидации:

```html
<input type="email" required>
<input type="text" minlength="3" maxlength="20">
<input type="number" min="0" max="100" step="5">
<input type="url" pattern="https?://.+">
```

### Для UX:

```html
<input type="text" placeholder="Введите текст">
<input type="email" autocomplete="email">
<input type="text" autofocus>
<input type="text" readonly>
<input type="text" disabled>
```

## Примеры использования

### Форма регистрации:

```html
<form>
    <label for="username">Имя пользователя:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" required minlength="8">
    
    <label for="age">Возраст:</label>
    <input type="number" id="age" name="age" min="18" max="100">
    
    <label for="birthday">Дата рождения:</label>
    <input type="date" id="birthday" name="birthday">
    
    <label for="website">Веб-сайт:</label>
    <input type="url" id="website" name="website">
    
    <label>
        <input type="checkbox" name="agree" required>
        Согласен с условиями
    </label>
    
    <input type="submit" value="Зарегистрироваться">
</form>
```

### Поисковая форма:

```html
<form>
    <input type="search" name="q" placeholder="Поиск..." autofocus>
    <input type="submit" value="Найти">
</form>
```

### Настройки:

```html
<form>
    <label for="volume">Громкость:</label>
    <input type="range" id="volume" name="volume" min="0" max="100" value="50">
    <output for="volume">50</output>
    
    <label for="color">Цвет темы:</label>
    <input type="color" id="color" name="color" value="#3498db">
    
    <input type="submit" value="Сохранить">
</form>
```

## Мобильная оптимизация

Некоторые типы автоматически показывают правильную клавиатуру на мобильных устройствах:

- `type="email"` → клавиатура с @
- `type="tel"` → цифровая клавиатура
- `type="number"` → цифровая клавиатура
- `type="url"` → клавиатура с .com

## Заключение

**Основные типы input:**

1. **Текст**: `text`, `password`, `email`, `tel`, `url`, `search`
2. **Числа**: `number`, `range`
3. **Дата/время**: `date`, `time`, `datetime-local`, `month`, `week`
4. **Выбор**: `checkbox`, `radio`, `file`, `color`
5. **Кнопки**: `submit`, `reset`, `button`, `image`
6. **Служебные**: `hidden`

**Рекомендации:**
- ✅ Используйте правильный тип для нужного вида данных
- ✅ Добавляйте валидацию через `required`, `pattern`, `min`, `max`
- ✅ Используйте `placeholder` для подсказок
- ✅ Связывайте с `<label>` для доступности
- ✅ Используйте `autocomplete` для улучшения UX

Правильный выбор типа input улучшает UX, валидацию и доступность форм.

