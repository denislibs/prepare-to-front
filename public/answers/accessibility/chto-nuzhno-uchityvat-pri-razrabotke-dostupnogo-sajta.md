# Что нужно учитывать при разработке доступного сайта?

Разработка доступного сайта требует комплексного подхода, учитывающего различные аспекты доступности на всех этапах разработки. Вот основные факторы, которые необходимо учитывать.

## Планирование и дизайн

### 1. **Семантическая структура**

```html
<!-- ✅ Правильная иерархия заголовков -->
<h1>Главный заголовок</h1>
  <h2>Раздел 1</h2>
    <h3>Подраздел 1.1</h3>
  <h2>Раздел 2</h2>

<!-- ✅ Семантические HTML5 элементы -->
<header>
  <nav aria-label="Основная навигация">
    <ul>
      <li><a href="/">Главная</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Заголовок статьи</h1>
    <p>Содержимое</p>
  </article>
</main>

<aside>
  <h2>Дополнительная информация</h2>
</aside>

<footer>
  <p>Копирайт</p>
</footer>
```

### 2. **Цвет и контраст**

```css
/* ✅ Достаточный контраст (WCAG AA: 4.5:1) */
.text {
  color: #333333; /* Темно-серый */
  background-color: #ffffff; /* Белый */
  /* Контраст: 12.63:1 ✓ */
}

/* ✅ Крупный текст (WCAG AA: 3:1) */
.large-text {
  color: #666666;
  background-color: #ffffff;
  font-size: 18pt;
  /* Контраст: 5.74:1 ✓ */
}

/* ❌ Недостаточный контраст */
.low-contrast {
  color: #cccccc;
  background-color: #ffffff;
  /* Контраст: 1.6:1 ✗ */
}
```

**Важно:**
- Не полагайтесь только на цвет для передачи информации
- Используйте иконки, текст, паттерны в дополнение к цвету

```html
<!-- ✅ Хорошо - цвет + текст -->
<span class="status success">
  <span class="icon">✓</span>
  Успешно
</span>

<!-- ❌ Плохо - только цвет -->
<span class="status success"></span>
```

## Разработка

### 3. **Альтернативный текст для изображений**

```html
<!-- ✅ Информативное изображение -->
<img 
  src="chart.png" 
  alt="График продаж за 2023 год показывает рост на 25% по сравнению с 2022 годом"
>

<!-- ✅ Декоративное изображение -->
<img src="decoration.png" alt="">

<!-- ✅ Сложное изображение -->
<img 
  src="diagram.png" 
  alt="Схема процесса разработки"
>
<details>
  <summary>Подробное описание схемы</summary>
  <p>Схема показывает три этапа: планирование, разработка и тестирование...</p>
</details>
```

### 4. **Доступность с клавиатуры**

```html
<!-- ✅ Все интерактивные элементы доступны -->
<button onclick="submit()" tabindex="0">
  Отправить
</button>

<a href="/page" tabindex="0">
  Ссылка
</a>

<!-- ✅ Кастомные элементы -->
<div 
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="if(event.key === 'Enter' || event.key === ' ') handleClick()"
>
  Кастомная кнопка
</div>

<!-- ✅ Видимый фокус -->
<style>
button:focus,
a:focus,
input:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
</style>
```

### 5. **Формы**

```html
<!-- ✅ Доступная форма -->
<form>
  <fieldset>
    <legend>Контактная информация</legend>
    
    <label for="name">
      Имя 
      <span aria-label="обязательное поле">*</span>
    </label>
    <input 
      type="text" 
      id="name"
      name="name"
      required
      aria-required="true"
      aria-describedby="name-help"
      autocomplete="name"
    >
    <span id="name-help" class="help-text">
      Введите ваше полное имя
    </span>
    
    <label for="email">
      Email 
      <span aria-label="обязательное поле">*</span>
    </label>
    <input 
      type="email" 
      id="email"
      name="email"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="email-error email-help"
      autocomplete="email"
    >
    <span id="email-help" class="help-text">
      Мы не будем делиться вашим email
    </span>
    <span id="email-error" role="alert" aria-live="polite"></span>
  </fieldset>
  
  <button type="submit">Отправить</button>
</form>
```

### 6. **ARIA атрибуты**

```html
<!-- ✅ Правильное использование ARIA -->
<div 
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <h2 id="modal-title">Подтверждение</h2>
  <p id="modal-description">
    Вы уверены, что хотите удалить этот элемент?
  </p>
  <button aria-label="Подтвердить удаление">Да</button>
  <button aria-label="Отменить удаление">Нет</button>
</div>

<!-- ✅ Живые области для динамического контента -->
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  Форма успешно отправлена
</div>
```

## Медиа-контент

### 7. **Видео и аудио**

```html
<!-- ✅ Видео с субтитрами -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="ru" 
    label="Русские субтитры"
    default
  >
  <track 
    kind="descriptions" 
    src="descriptions.vtt" 
    srclang="ru"
  >
</video>

<!-- ✅ Аудио с транскриптом -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
</audio>
<p>
  <a href="transcript.txt">Читать транскрипт</a>
</p>
```

### 8. **Масштабирование**

```css
/* ✅ Относительные единицы */
.text {
  font-size: 1rem; /* вместо фиксированных px */
  line-height: 1.5;
}

/* ✅ Адаптивные размеры */
.responsive-text {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

/* ✅ Медиа-запросы для увеличения */
@media (min-width: 1200px) {
  .text {
    font-size: 1.2rem;
  }
}
```

## Навигация

### 9. **Skip Links**

```html
<!-- ✅ Пропуск повторяющегося контента -->
<a href="#main-content" class="skip-link">
  Перейти к основному контенту
</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>

<main id="main-content">
  <h1>Основной контент</h1>
</main>
```

### 10. **Ориентиры (Landmarks)**

```html
<!-- ✅ Использование ARIA landmarks -->
<header role="banner">
  <h1>Заголовок сайта</h1>
</header>

<nav role="navigation" aria-label="Основная навигация">
  <ul>
    <li><a href="/">Главная</a></li>
  </ul>
</nav>

<main role="main">
  <article>
    <h2>Заголовок статьи</h2>
  </article>
</main>

<aside role="complementary" aria-label="Дополнительная информация">
  <h2>Дополнительно</h2>
</aside>

<footer role="contentinfo">
  <p>Копирайт</p>
</footer>
```

## Тестирование

### 11. **Автоматическое тестирование**

```bash
# Lighthouse
lighthouse https://example.com --only-categories=accessibility

# Pa11y
pa11y https://example.com

# axe DevTools
# Установить расширение в браузер
```

### 12. **Ручное тестирование**

- **Тестирование с клавиатуры** — навигация только с клавиатуры
- **Тестирование со скринридерами** — NVDA, JAWS, VoiceOver
- **Проверка контрастности** — Color Contrast Analyzer
- **Масштабирование** — увеличение до 200%

## Чек-лист для разработки

### ✅ Планирование
- [ ] Определить целевой уровень WCAG (обычно AA)
- [ ] Составить план доступности
- [ ] Выбрать инструменты тестирования

### ✅ Дизайн
- [ ] Достаточный контраст цветов (4.5:1)
- [ ] Не полагаться только на цвет
- [ ] Понятная навигация
- [ ] Доступные формы

### ✅ Разработка
- [ ] Семантическая разметка
- [ ] Альтернативный текст для изображений
- [ ] Доступность с клавиатуры
- [ ] ARIA атрибуты где необходимо
- [ ] Правильная структура заголовков

### ✅ Тестирование
- [ ] Автоматическое тестирование
- [ ] Ручное тестирование
- [ ] Тестирование со скринридерами
- [ ] Тестирование с клавиатуры

## Заключение

При разработке доступного сайта необходимо учитывать:

1. **Планирование** — структура, дизайн, стандарты
2. **Разработка** — семантика, клавиатура, формы, ARIA
3. **Медиа** — альтернативы, субтитры, транскрипты
4. **Навигация** — skip links, ориентиры, понятная структура
5. **Тестирование** — автоматическое и ручное

**Помните:** доступность должна быть частью процесса разработки с самого начала, а не добавляться в конце. Это делает сайт доступным для всех пользователей и помогает избежать дорогостоящих переделок.

