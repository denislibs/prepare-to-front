# Какие глобальные атрибуты есть в HTML?

Глобальные атрибуты в HTML — это атрибуты, которые могут быть использованы с любым HTML-элементом. Они предоставляют общие возможности для всех элементов, независимо от их типа. Понимание глобальных атрибутов важно для эффективной работы с HTML.

## Что такое глобальные атрибуты?

Глобальные атрибуты — это стандартизированные атрибуты, определенные в спецификации HTML, которые применимы ко всем элементам HTML. Они не зависят от конкретного типа элемента и предоставляют универсальную функциональность.

## Список глобальных атрибутов

### 1. **`accesskey`** — Горячая клавиша

Определяет клавишу для активации элемента:

```html
<button accesskey="s">Сохранить (Alt+S)</button>
<a href="#" accesskey="h">Главная (Alt+H)</a>
```

- Улучшает доступность
- Работает с Alt (Windows) или Ctrl+Alt (Mac)

### 2. **`autocapitalize`** — Автоматическая капитализация

Управляет автоматической капитализацией текста (в основном для мобильных устройств):

```html
<input type="text" autocapitalize="none">
<input type="text" autocapitalize="sentences">
<input type="text" autocapitalize="words">
<input type="text" autocapitalize="characters">
```

### 3. **`autofocus`** — Автофокус

Автоматически устанавливает фокус на элемент при загрузке страницы:

```html
<input type="text" autofocus>
<button autofocus>Кнопка</button>
```

- Только один элемент на странице должен иметь autofocus
- Улучшает UX для форм

### 4. **`class`** — Класс

Определяет один или несколько классов для элемента:

```html
<div class="container">Контент</div>
<p class="text primary large">Текст</p>
```

- Может содержать несколько классов через пробел
- Используется для CSS и JavaScript

### 5. **`contenteditable`** — Редактируемый контент

Указывает, можно ли редактировать содержимое элемента:

```html
<div contenteditable="true">Редактируемый текст</div>
<div contenteditable="false">Не редактируемый</div>
<div contenteditable="plaintext-only">Только текст</div>
```

- Позволяет создавать интерактивные редакторы
- Значения: `true`, `false`, `plaintext-only`

### 6. **`data-*`** — Пользовательские данные

Позволяет хранить произвольные данные:

```html
<div data-user-id="123" 
     data-role="admin" 
     data-status="active">
    Контент
</div>
```

- Доступны через JavaScript: `element.dataset.userId`
- Преобразование: `data-user-id` → `userId` (camelCase)

### 7. **`dir`** — Направление текста

Определяет направление текста:

```html
<p dir="ltr">Слева направо (Left to Right)</p>
<p dir="rtl">Справа налево (Right to Left)</p>
<p dir="auto">Автоматическое определение</p>
```

- Важно для арабского, иврита и других RTL языков

### 8. **`draggable`** — Перетаскивание

Указывает, можно ли перетаскивать элемент:

```html
<div draggable="true">Перетаскиваемый элемент</div>
<div draggable="false">Не перетаскиваемый</div>
<div draggable="auto">По умолчанию</div>
```

- Используется с Drag and Drop API

### 9. **`enterkeyhint`** — Подсказка для клавиши Enter

Определяет, какая подсказка показывается на клавише Enter (мобильные устройства):

```html
<input type="text" enterkeyhint="done">
<input type="text" enterkeyhint="go">
<input type="text" enterkeyhint="next">
<input type="text" enterkeyhint="search">
<input type="text" enterkeyhint="send">
```

### 10. **`hidden`** — Скрытие элемента

Скрывает элемент от пользователя:

```html
<div hidden>Скрытый контент</div>
<p hidden>Не виден пользователю</p>
```

- Элемент не отображается, но остается в DOM
- Можно показать через CSS: `[hidden] { display: block !important; }`

### 11. **`id`** — Уникальный идентификатор

Определяет уникальный идентификатор элемента:

```html
<div id="header">Шапка</div>
<section id="main-content">Контент</section>
```

- Должен быть уникальным на странице
- Используется для якорных ссылок: `#header`
- Доступ через JavaScript: `document.getElementById('header')`

### 12. **`inputmode`** — Режим ввода

Подсказывает браузеру, какую клавиатуру показывать (мобильные устройства):

```html
<input type="text" inputmode="none">
<input type="text" inputmode="text">
<input type="text" inputmode="tel">
<input type="text" inputmode="url">
<input type="text" inputmode="email">
<input type="text" inputmode="numeric">
<input type="text" inputmode="decimal">
<input type="text" inputmode="search">
```

### 13. **`is`** — Кастомный элемент

Указывает, что элемент является кастомным элементом:

```html
<button is="custom-button">Кнопка</button>
```

### 14. **`itemid`**, **`itemprop`**, **`itemref`**, **`itemscope`**, **`itemtype`** — Микроданные

Используются для структурированных данных (Schema.org):

```html
<div itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Иван Иванов</span>
    <span itemprop="jobTitle">Разработчик</span>
</div>
```

### 15. **`lang`** — Язык контента

Определяет язык содержимого элемента:

```html
<html lang="ru">
<p lang="en">English text</p>
<p lang="fr">Texte français</p>
```

- Улучшает доступность и SEO
- Формат: ISO 639-1 (ru, en, fr и т.д.)

### 16. **`nonce`** — Одноразовый номер

Используется для Content Security Policy (CSP):

```html
<script nonce="random-value">console.log('Hello');</script>
<style nonce="random-value">body { margin: 0; }</style>
```

### 17. **`part`** — Часть элемента

Используется для Shadow DOM стилизации:

```html
<div part="header">Шапка</div>
```

### 18. **`slot`** — Слот

Используется в Shadow DOM для распределения контента:

```html
<div slot="header">Контент для слота</div>
```

### 19. **`spellcheck`** — Проверка орфографии

Включает или отключает проверку орфографии:

```html
<textarea spellcheck="true">Текст с проверкой</textarea>
<input type="text" spellcheck="false">
<div contenteditable spellcheck="true">Редактируемый</div>
```

### 20. **`style`** — Инлайновые стили

Определяет CSS стили напрямую в элементе:

```html
<div style="color: red; font-size: 16px;">Текст</div>
<p style="margin: 0; padding: 10px;">Параграф</p>
```

- Не рекомендуется для больших проектов
- Используется для быстрых стилей или динамических значений

### 21. **`tabindex`** — Порядок табуляции

Определяет порядок перехода между элементами при нажатии Tab:

```html
<button tabindex="1">Первая кнопка</button>
<button tabindex="2">Вторая кнопка</button>
<button tabindex="0">По умолчанию</button>
<button tabindex="-1">Исключить из табуляции</button>
```

- `0` — естественный порядок
- Положительные числа — кастомный порядок
- `-1` — исключает из табуляции, но доступен программно

### 22. **`title`** — Всплывающая подсказка

Определяет всплывающую подсказку при наведении:

```html
<a href="#" title="Подробнее о ссылке">Ссылка</a>
<abbr title="HyperText Markup Language">HTML</abbr>
```

- Показывается при наведении курсора
- Улучшает доступность

### 23. **`translate`** — Перевод

Указывает, должен ли элемент переводиться:

```html
<span translate="yes">Переводимый текст</span>
<code translate="no">console.log()</code>
```

## Примеры использования

### Комплексный пример:

```html
<div id="user-card"
     class="card user-card active"
     data-user-id="123"
     data-role="admin"
     data-status="online"
     title="Карточка пользователя"
     lang="ru"
     dir="ltr"
     tabindex="0"
     role="article"
     aria-label="Информация о пользователе"
     contenteditable="false"
     draggable="true"
     spellcheck="true">
    
    <h2 class="user-name" translate="yes">Иван Иванов</h2>
    <p class="user-email" translate="no">ivan@example.com</p>
    
    <button accesskey="e"
            autofocus
            tabindex="1"
            title="Редактировать (Alt+E)">
        Редактировать
    </button>
</div>
```

### Форма с глобальными атрибутами:

```html
<form id="contact-form"
      class="form contact-form"
      data-form-type="contact"
      lang="ru"
      novalidate>
    
    <label for="name" class="label">Имя:</label>
    <input type="text"
           id="name"
           name="name"
           class="input"
           autofocus
           required
           placeholder="Введите имя"
           autocomplete="name"
           spellcheck="true"
           inputmode="text"
           enterkeyhint="next"
           tabindex="1"
           aria-label="Поле ввода имени"
           title="Введите ваше имя">
    
    <label for="email" class="label">Email:</label>
    <input type="email"
           id="email"
           name="email"
           class="input"
           required
           placeholder="email@example.com"
           autocomplete="email"
           inputmode="email"
           enterkeyhint="next"
           tabindex="2"
           aria-label="Поле ввода email"
           title="Введите ваш email">
    
    <button type="submit"
            class="button submit-button"
            tabindex="3"
            enterkeyhint="send"
            accesskey="s"
            title="Отправить форму (Alt+S)"
            aria-label="Отправить контактную форму">
        Отправить
    </button>
</form>
```

## Заключение

Глобальные атрибуты HTML:
- Применимы ко всем HTML-элементам
- Предоставляют универсальную функциональность
- Улучшают доступность и UX
- Позволяют настраивать поведение элементов

Основные глобальные атрибуты:
- **Идентификация**: `id`, `class`
- **Доступность**: `title`, `lang`, `dir`, `tabindex`, `accesskey`
- **Данные**: `data-*`
- **Поведение**: `contenteditable`, `draggable`, `hidden`, `spellcheck`
- **Стили**: `style`
- **Мобильные**: `inputmode`, `enterkeyhint`, `autocapitalize`

Правильное использование глобальных атрибутов делает веб-страницы более доступными, функциональными и удобными для пользователей.

