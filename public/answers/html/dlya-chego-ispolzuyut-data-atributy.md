# Для чего используют `data-*` атрибуты?

Атрибуты `data-*` в HTML используются для хранения пользовательских данных, которые не имеют стандартных HTML-атрибутов. Они позволяют связывать произвольные данные с HTML-элементами для использования в JavaScript, CSS и других технологиях.

## Что такое data-* атрибуты?

`data-*` атрибуты — это глобальные атрибуты HTML5, которые позволяют хранить пользовательские данные в формате `data-имя="значение"`. Имя после `data-` должно быть в нижнем регистре и может содержать дефисы.

## Синтаксис

```html
<element data-имя="значение">
```

**Правила:**
- Начинается с `data-`
- Имя после `data-` должно быть в нижнем регистре
- Может содержать дефисы: `data-user-id="123"`
- Значение всегда строка

## Примеры использования

### 1. **Хранение данных для JavaScript**

```html
<div data-user-id="123" data-role="admin" data-status="active">
    Пользователь
</div>

<script>
    const div = document.querySelector('div');
    const userId = div.dataset.userId; // "123"
    const role = div.dataset.role;     // "admin"
    const status = div.dataset.status; // "active"
</script>
```

**Доступ через JavaScript:**
- `data-user-id` → `element.dataset.userId` (camelCase)
- `data-user-name` → `element.dataset.userName`
- `data-role` → `element.dataset.role`

### 2. **Хранение конфигурации**

```html
<button data-action="delete" data-item-id="456">
    Удалить
</button>

<script>
    document.querySelector('button').addEventListener('click', function() {
        const action = this.dataset.action;    // "delete"
        const itemId = this.dataset.itemId;   // "456"
        // Выполнить действие
    });
</script>
```

### 3. **Хранение состояния**

```html
<div data-state="collapsed" data-expanded="false">
    Контент
</div>

<script>
    const div = document.querySelector('div');
    if (div.dataset.state === 'collapsed') {
        // Свернуть
    }
</script>
```

### 4. **Хранение настроек**

```html
<div data-theme="dark" data-language="ru" data-animation="true">
    Настройки
</div>
```

### 5. **Хранение метаданных**

```html
<article data-author="Иван Иванов" 
         data-published="2024-01-15" 
         data-category="технологии">
    Статья
</article>
```

## Доступ через JavaScript

### Через `dataset` API (рекомендуется):

```javascript
// Получение
const userId = element.dataset.userId;
const role = element.dataset.role;

// Установка
element.dataset.userId = "456";
element.dataset.role = "user";

// Проверка существования
if ('userId' in element.dataset) {
    console.log(element.dataset.userId);
}

// Удаление
delete element.dataset.userId;
```

### Через `getAttribute`:

```javascript
// Получение
const userId = element.getAttribute('data-user-id');

// Установка
element.setAttribute('data-user-id', '456');

// Удаление
element.removeAttribute('data-user-id');
```

### Преобразование имен:

```html
<!-- HTML -->
<div data-user-id="123" data-user-name="Иван"></div>

<!-- JavaScript -->
element.dataset.userId    // "123" (kebab-case → camelCase)
element.dataset.userName  // "Иван"
```

## Использование в CSS

### CSS селекторы:

```css
/* По data-атрибуту */
[data-theme="dark"] {
    background-color: #000;
    color: #fff;
}

/* По наличию атрибута */
[data-loading] {
    opacity: 0.5;
}

/* По частичному совпадению */
[data-button^="primary"] {
    background-color: blue;
}
```

### CSS переменные:

```html
<div data-color="#3498db" style="--color: attr(data-color);">
    Элемент
</div>
```

## Практические примеры

### Модальное окно:

```html
<button data-modal="login" data-modal-size="large">
    Войти
</button>

<div id="login-modal" data-modal-type="login" data-modal-size="large">
    <!-- Содержимое модального окна -->
</div>

<script>
    document.querySelector('button').addEventListener('click', function() {
        const modalId = this.dataset.modal;
        const modalSize = this.dataset.modalSize;
        openModal(modalId, modalSize);
    });
</script>
```

### Таблица с данными:

```html
<table>
    <tr data-user-id="123" data-status="active">
        <td>Иван Иванов</td>
        <td>admin@example.com</td>
        <td>
            <button data-action="delete" data-user-id="123">Удалить</button>
        </td>
    </tr>
</table>
```

### Аккордеон:

```html
<div class="accordion">
    <button data-toggle="accordion" data-target="section1">
        Раздел 1
    </button>
    <div id="section1" data-accordion-section>
        Контент
    </div>
</div>
```

### Карусель:

```html
<div class="carousel" data-slides="5" data-autoplay="true" data-interval="3000">
    <!-- Слайды -->
</div>
```

## Преимущества data-* атрибутов

### 1. **Семантика**

Отделяют пользовательские данные от HTML-атрибутов:

```html
<!-- Плохо -->
<div id="user-123" class="admin active">Пользователь</div>

<!-- Хорошо -->
<div data-user-id="123" data-role="admin" data-status="active">
    Пользователь
</div>
```

### 2. **Валидность HTML**

`data-*` атрибуты валидны в HTML5:

```html
<!-- Валидно -->
<div data-custom-attribute="value">Контент</div>
```

### 3. **Доступность**

Не влияют на доступность, но могут использоваться для улучшения:

```html
<button data-action="delete" aria-label="Удалить элемент">
    ×
</button>
```

### 4. **Гибкость**

Можно хранить любые данные:

```html
<div data-json='{"name":"John","age":30}'>
    Контент
</div>
```

## Ограничения

### 1. **Только строки**

Значения всегда строки:

```html
<div data-count="5"></div>

<script>
    const count = element.dataset.count; // "5" (строка)
    const num = parseInt(element.dataset.count); // 5 (число)
</script>
```

### 2. **Нет валидации**

Браузер не проверяет формат данных:

```html
<!-- Нет проверки -->
<div data-email="invalid-email"></div>
```

### 3. **Производительность**

Большое количество `data-*` атрибутов может замедлить работу:

```html
<!-- Избыточно -->
<div data-a="1" data-b="2" data-c="3" ... data-z="26"></div>
```

## Альтернативы

### Для сложных данных используйте JSON:

```html
<div data-config='{"theme":"dark","lang":"ru"}'>
    Контент
</div>

<script>
    const config = JSON.parse(element.dataset.config);
    console.log(config.theme); // "dark"
</script>
```

### Для больших объемов данных:

```javascript
// Вместо множества data-* атрибутов
const data = {
    userId: 123,
    role: 'admin',
    status: 'active'
};
element.dataset.userData = JSON.stringify(data);
```

## Заключение

**`data-*` атрибуты используются для:**

1. ✅ Хранения пользовательских данных
2. ✅ Связывания данных с элементами для JavaScript
3. ✅ Хранения конфигурации и настроек
4. ✅ Передачи метаданных
5. ✅ Использования в CSS селекторах

**Преимущества:**
- Валидность HTML5
- Простота использования
- Доступ через `dataset` API
- Гибкость для любых данных

**Рекомендации:**
- Используйте для небольших объемов данных
- Именуйте в нижнем регистре с дефисами
- Доступ через `dataset` API (camelCase)
- Для сложных данных используйте JSON

`data-*` атрибуты — мощный инструмент для связывания данных с HTML-элементами и создания интерактивных веб-приложений.

