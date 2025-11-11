# Как создать доступный список в HTML с помощью ARIA ролей?

Создание доступных списков в HTML важно для пользователей скринридеров. Хотя семантические HTML элементы (`<ul>`, `<ol>`) уже доступны, иногда необходимо использовать ARIA роли для кастомных списков или улучшения существующих.

## Семантические HTML списки

### Базовые списки

```html
<!-- ✅ Неупорядоченный список -->
<ul>
  <li>Элемент 1</li>
  <li>Элемент 2</li>
  <li>Элемент 3</li>
</ul>

<!-- ✅ Упорядоченный список -->
<ol>
  <li>Первый элемент</li>
  <li>Второй элемент</li>
  <li>Третий элемент</li>
</ol>

<!-- ✅ Список определений -->
<dl>
  <dt>Термин 1</dt>
  <dd>Определение 1</dd>
  <dt>Термин 2</dt>
  <dd>Определение 2</dd>
</dl>
```

## ARIA роли для списков

### 1. `role="list"` и `role="listitem"`

```html
<!-- ✅ Кастомный список с ARIA -->
<div role="list" aria-label="Список продуктов">
  <div role="listitem">
    <span>Продукт 1</span>
  </div>
  <div role="listitem">
    <span>Продукт 2</span>
  </div>
  <div role="listitem">
    <span>Продукт 3</span>
  </div>
</div>

<!-- ✅ Лучше использовать семантический HTML -->
<ul aria-label="Список продуктов">
  <li>Продукт 1</li>
  <li>Продукт 2</li>
  <li>Продукт 3</li>
</ul>
```

### 2. `role="listbox"` для выпадающих списков

```html
<!-- ✅ Выпадающий список -->
<div 
  role="listbox"
  aria-label="Выберите страну"
  aria-expanded="false"
  tabindex="0"
>
  <div role="option" aria-selected="false">
    Россия
  </div>
  <div role="option" aria-selected="false">
    США
  </div>
  <div role="option" aria-selected="false">
    Великобритания
  </div>
</div>

<!-- ✅ Лучше использовать нативный select -->
<label for="country">Выберите страну</label>
<select id="country" name="country">
  <option value="ru">Россия</option>
  <option value="us">США</option>
  <option value="uk">Великобритания</option>
</select>
```

### 3. `role="menu"` и `role="menuitem"`

```html
<!-- ✅ Меню -->
<div role="menu" aria-label="Действия">
  <button role="menuitem" onclick="edit()">
    Редактировать
  </button>
  <button role="menuitem" onclick="delete()">
    Удалить
  </button>
  <button role="menuitem" onclick="share()">
    Поделиться
  </button>
</div>
```

### 4. `role="tree"` для иерархических списков

```html
<!-- ✅ Древовидная структура -->
<ul role="tree" aria-label="Файловая структура">
  <li role="treeitem" aria-expanded="true">
    <span>Папка 1</span>
    <ul role="group">
      <li role="treeitem">Файл 1.1</li>
      <li role="treeitem">Файл 1.2</li>
    </ul>
  </li>
  <li role="treeitem" aria-expanded="false">
    <span>Папка 2</span>
    <ul role="group">
      <li role="treeitem">Файл 2.1</li>
    </ul>
  </li>
</ul>
```

## Практические примеры

### Пример 1: Навигационное меню

```html
<!-- ✅ Доступная навигация -->
<nav aria-label="Основная навигация">
  <ul role="list">
    <li role="listitem">
      <a href="/" aria-current="page">Главная</a>
    </li>
    <li role="listitem">
      <a href="/products">Продукты</a>
    </li>
    <li role="listitem">
      <a href="/about">О нас</a>
    </li>
    <li role="listitem">
      <a href="/contact">Контакты</a>
    </li>
  </ul>
</nav>

<!-- ✅ Или просто семантический HTML (лучше) -->
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/" aria-current="page">Главная</a></li>
    <li><a href="/products">Продукты</a></li>
    <li><a href="/about">О нас</a></li>
    <li><a href="/contact">Контакты</a></li>
  </ul>
</nav>
```

### Пример 2: Список результатов поиска

```html
<!-- ✅ Список результатов -->
<div role="region" aria-label="Результаты поиска">
  <ol role="list" aria-label="Найдено 5 результатов">
    <li role="listitem">
      <article>
        <h3><a href="/article-1">Статья 1</a></h3>
        <p>Описание статьи...</p>
      </article>
    </li>
    <li role="listitem">
      <article>
        <h3><a href="/article-2">Статья 2</a></h3>
        <p>Описание статьи...</p>
      </article>
    </li>
  </ol>
</div>
```

### Пример 3: Кастомный список с интерактивными элементами

```html
<!-- ✅ Кастомный список -->
<div 
  role="list" 
  aria-label="Список задач"
>
  <div 
    role="listitem"
    aria-label="Задача: Купить продукты"
  >
    <input 
      type="checkbox" 
      id="task-1"
      aria-describedby="task-1-desc"
    >
    <label for="task-1">
      Купить продукты
    </label>
    <span id="task-1-desc" class="sr-only">
      Задача не выполнена
    </span>
  </div>
  
  <div 
    role="listitem"
    aria-label="Задача: Позвонить маме"
  >
    <input 
      type="checkbox" 
      id="task-2"
      checked
      aria-describedby="task-2-desc"
    >
    <label for="task-2">
      Позвонить маме
    </label>
    <span id="task-2-desc" class="sr-only">
      Задача выполнена
    </span>
  </div>
</div>
```

### Пример 4: Хлебные крошки

```html
<!-- ✅ Хлебные крошки -->
<nav aria-label="Хлебные крошки">
  <ol role="list">
    <li role="listitem">
      <a href="/">Главная</a>
    </li>
    <li role="listitem" aria-current="page">
      Продукты
    </li>
  </ol>
</nav>

<!-- ✅ Или просто семантический HTML -->
<nav aria-label="Хлебные крошки">
  <ol>
    <li><a href="/">Главная</a></li>
    <li aria-current="page">Продукты</li>
  </ol>
</nav>
```

## Когда использовать ARIA роли

### ✅ Используйте ARIA когда:

1. **Кастомные виджеты** — когда нельзя использовать семантический HTML
2. **Динамические списки** — когда структура меняется
3. **Сложные интерактивные элементы** — меню, выпадающие списки

### ❌ НЕ используйте ARIA когда:

1. **Семантический HTML доступен** — предпочитайте `<ul>`, `<ol>`
2. **Избыточное использование** — не добавляйте `role="list"` к `<ul>`

```html
<!-- ❌ Плохо - избыточно -->
<ul role="list">
  <li role="listitem">Элемент</li>
</ul>

<!-- ✅ Хорошо - семантический HTML -->
<ul>
  <li>Элемент</li>
</ul>
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте семантический HTML** — `<ul>`, `<ol>`, `<dl>`
2. **Добавляйте ARIA метки** — `aria-label` для описания
3. **Указывайте текущий элемент** — `aria-current="page"`
4. **Используйте ARIA для кастомных виджетов** — когда HTML недостаточно

### ❌ Не делайте:

1. **Не используйте ARIA избыточно** — не добавляйте к семантическим элементам
2. **Не создавайте списки из div** — используйте семантические элементы
3. **Не забывайте метки** — всегда добавляйте `aria-label`

## Заключение

Создание доступных списков:

- **Семантический HTML** — предпочитайте `<ul>`, `<ol>`, `<dl>`
- **ARIA роли** — используйте для кастомных виджетов
- **Метки** — всегда добавляйте `aria-label`
- **Текущий элемент** — указывайте `aria-current` где необходимо

**Помните:** всегда предпочитайте семантический HTML элементам с ARIA ролями. Используйте ARIA только когда семантический HTML недоступен или недостаточен для описания функциональности.

