# Основные принципы доступности?

Основные принципы доступности веб-контента изложены в WCAG (Web Content Accessibility Guidelines) и основаны на четырех фундаментальных принципах, известных как **POUR**:

## 1. Perceivable (Воспринимаемость)

Информация и компоненты интерфейса должны быть представлены пользователям таким образом, чтобы они могли их воспринимать. Это означает, что контент не должен быть скрыт от любого из органов чувств пользователя.

### Ключевые аспекты:

#### Текстовые альтернативы
Все нетекстовые элементы должны иметь текстовые альтернативы.

```html
<!-- ✅ Хорошо -->
<img src="logo.png" alt="Логотип компании TechCorp">

<!-- ❌ Плохо -->
<img src="logo.png">
<img src="logo.png" alt="logo"> <!-- Неинформативный alt -->
```

#### Медиа-контент
Видео и аудио должны иметь альтернативы.

```html
<!-- Видео с субтитрами -->
<video controls>
  <source src="tutorial.mp4" type="video/mp4">
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="ru" 
    label="Русские субтитры"
    default
  >
</video>

<!-- Аудио с транскриптом -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
</audio>
<p>
  <a href="transcript.txt">Читать транскрипт</a>
</p>
```

#### Контрастность
Текст должен иметь достаточный контраст с фоном.

```css
/* ✅ Хорошо - контраст 4.5:1 для обычного текста */
.text {
  color: #000000; /* черный */
  background-color: #ffffff; /* белый */
}

/* ❌ Плохо - низкий контраст */
.text {
  color: #cccccc; /* светло-серый */
  background-color: #ffffff; /* белый */
}
```

#### Масштабируемость
Контент должен быть читаемым при увеличении до 200% без потери функциональности.

```css
/* Использование относительных единиц */
.text {
  font-size: 1rem; /* вместо фиксированных px */
  line-height: 1.5;
}
```

## 2. Operable (Управляемость)

Компоненты интерфейса и навигация должны быть управляемыми. Пользователи должны иметь возможность взаимодействовать со всеми элементами интерфейса.

### Ключевые аспекты:

#### Доступность с клавиатуры
Все функции должны быть доступны с клавиатуры.

```html
<!-- ✅ Хорошо -->
<button onclick="submit()" tabindex="0">Отправить</button>

<!-- ❌ Плохо - div с обработчиком клика -->
<div onclick="submit()">Отправить</div>

<!-- Исправление -->
<div 
  role="button" 
  tabindex="0" 
  onclick="submit()"
  onkeydown="if(event.key === 'Enter' || event.key === ' ') submit()"
>
  Отправить
</div>
```

#### Достаточное время
Пользователям должно быть предоставлено достаточно времени для чтения и использования контента.

```html
<!-- Автоматически обновляющийся контент с возможностью остановки -->
<div>
  <p id="news">Новость 1</p>
  <button onclick="stopAutoUpdate()">Остановить обновление</button>
</div>

<script>
let intervalId = setInterval(() => {
  // обновление контента
}, 5000);

function stopAutoUpdate() {
  clearInterval(intervalId);
}
</script>
```

#### Избегание контента, вызывающего судороги
Не использовать контент, который мигает более 3 раз в секунду.

```css
/* ❌ Плохо - мигающая анимация */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.blink {
  animation: blink 0.5s infinite; /* 2 раза в секунду - допустимо */
}

/* ✅ Хорошо - плавная анимация */
@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.fade {
  animation: fade 1s ease-in-out;
}
```

#### Навигация
Способы навигации должны быть понятными и доступными.

```html
<!-- Skip links -->
<a href="#main-content" class="skip-link">
  Перейти к основному контенту
</a>

<!-- Структурированная навигация -->
<nav aria-label="Основная навигация">
  <ul>
    <li><a href="/" aria-current="page">Главная</a></li>
    <li><a href="/about">О нас</a></li>
    <li><a href="/contact">Контакты</a></li>
  </ul>
</nav>
```

## 3. Understandable (Понятность)

Информация и работа пользовательского интерфейса должны быть понятными. Контент должен быть читаемым и предсказуемым.

### Ключевые аспекты:

#### Читаемость
Текст должен быть читаемым и понятным.

```html
<!-- ✅ Хорошо - понятный язык -->
<p>Для завершения регистрации нажмите кнопку "Отправить".</p>

<!-- ❌ Плохо - технический жаргон -->
<p>Для инициализации процесса регистрации активируйте submit handler.</p>
```

#### Предсказуемость
Веб-страницы должны работать предсказуемым образом.

```html
<!-- ✅ Хорошо - стандартное поведение ссылок -->
<a href="/page">Перейти на страницу</a>

<!-- ❌ Плохо - неожиданное поведение -->
<a href="#" onclick="doSomething(); return false;">Кликни меня</a>
```

#### Помощь в исправлении ошибок
Пользователям должна предоставляться помощь в выявлении и исправлении ошибок.

```html
<!-- ✅ Хорошо - понятное сообщение об ошибке -->
<form>
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
  >
  <span id="email-error" role="alert" class="error-message">
    Пожалуйста, введите корректный email адрес. Пример: user@example.com
  </span>
</form>

<!-- ❌ Плохо - непонятное сообщение -->
<form>
  <input type="email" id="email" name="email">
  <span class="error">Ошибка 404</span>
</form>
```

#### Язык страницы
Язык страницы должен быть указан.

```html
<!-- ✅ Хорошо -->
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мой сайт</title>
</head>
<body>
  <p>Привет, мир!</p>
  
  <!-- Изменение языка для части контента -->
  <p>Hello, <span lang="en">world</span>!</p>
</body>
</html>
```

## 4. Robust (Надежность)

Контент должен быть достаточно надежным для интерпретации различными пользовательскими агентами, включая вспомогательные технологии.

### Ключевые аспекты:

#### Валидная разметка
HTML должен быть валидным и правильно структурированным.

```html
<!-- ✅ Хорошо - валидная структура -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Заголовок</title>
</head>
<body>
  <header>
    <h1>Заголовок страницы</h1>
  </header>
  <main>
    <article>
      <h2>Заголовок статьи</h2>
      <p>Содержимое статьи</p>
    </article>
  </main>
</body>
</html>

<!-- ❌ Плохо - невалидная структура -->
<div>
  <h3>Заголовок</h3>
  <h1>Другой заголовок</h1> <!-- Пропущен h2 -->
</div>
```

#### Правильное использование ARIA
ARIA атрибуты должны использоваться правильно и только когда необходимо.

```html
<!-- ✅ Хорошо - правильное использование ARIA -->
<button 
  aria-label="Закрыть модальное окно"
  onclick="closeModal()"
>
  ×
</button>

<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Заголовок модального окна</h2>
  <p>Содержимое модального окна</p>
</div>

<!-- ❌ Плохо - избыточное использование ARIA -->
<button 
  role="button" 
  aria-label="Кнопка"
  onclick="doSomething()"
>
  Нажми меня
</button>
<!-- role="button" избыточен для элемента <button> -->
```

#### Совместимость
Контент должен работать с текущими и будущими технологиями.

```html
<!-- ✅ Хорошо - прогрессивное улучшение -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <p>Ваш браузер не поддерживает видео. 
    <a href="video.mp4">Скачайте видео</a>
  </p>
</video>
```

## Практический пример: Доступная форма

```html
<form novalidate aria-label="Форма регистрации">
  <fieldset>
    <legend>Контактная информация</legend>
    
    <div class="form-group">
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
    </div>
    
    <div class="form-group">
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
        aria-describedby="email-error"
        autocomplete="email"
      >
      <span 
        id="email-error" 
        role="alert" 
        aria-live="polite"
        class="error-message"
      ></span>
    </div>
    
    <div class="form-group">
      <label for="phone">Телефон</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone"
        aria-describedby="phone-help"
        autocomplete="tel"
      >
      <span id="phone-help" class="help-text">
        Формат: +7 (XXX) XXX-XX-XX
      </span>
    </div>
  </fieldset>
  
  <div class="form-actions">
    <button type="submit">Отправить</button>
    <button type="reset">Очистить</button>
  </div>
</form>
```

## Заключение

Четыре принципа доступности (POUR) — это основа для создания инклюзивных веб-приложений. Следование этим принципам обеспечивает:

- **Воспринимаемость** — контент доступен для всех органов чувств
- **Управляемость** — все функции доступны различными способами
- **Понятность** — информация ясна и предсказуема
- **Надежность** — контент работает с различными технологиями

Применение этих принципов на практике помогает создавать веб-сайты, которые могут использовать все люди, независимо от их способностей или используемых технологий.

