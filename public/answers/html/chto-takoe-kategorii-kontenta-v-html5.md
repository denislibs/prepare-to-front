# Что такое категории контента в HTML5?

Категории контента в HTML5 — это система классификации HTML-элементов по их назначению и поведению. Эта система помогает понять, какие элементы можно использовать в определенных контекстах и как они взаимодействуют друг с другом.

## Что такое категории контента?

Категории контента — это способ группировки HTML-элементов по их семантическому значению и правилам использования. Каждый элемент может принадлежать к одной или нескольким категориям, что определяет его допустимое использование в HTML-документе.

## Основные категории контента

### 1. **Metadata Content (Метаданные)**

Элементы, которые предоставляют информацию о документе:

```html
<head>
    <title>Заголовок</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <style>body { margin: 0; }</style>
    <base href="https://example.com/">
</head>
```

**Элементы**: `<base>`, `<link>`, `<meta>`, `<noscript>`, `<script>`, `<style>`, `<title>`

### 2. **Flow Content (Потоковый контент)**

Большинство элементов, которые используются в теле документа:

```html
<body>
    <p>Параграф</p>
    <div>Блок</div>
    <span>Строка</span>
    <a href="#">Ссылка</a>
    <img src="photo.jpg" alt="Фото">
    <form>Форма</form>
</body>
```

**Элементы**: Почти все элементы, кроме metadata и phrasing content

### 3. **Sectioning Content (Секционирующий контент)**

Элементы, которые создают секции в структуре документа:

```html
<article>
    <h1>Статья</h1>
    <p>Контент статьи</p>
</article>

<section>
    <h2>Секция</h2>
    <p>Контент секции</p>
</section>

<nav>
    <ul>
        <li><a href="#">Ссылка</a></li>
    </ul>
</nav>

<aside>
    <p>Боковая панель</p>
</aside>
```

**Элементы**: `<article>`, `<aside>`, `<nav>`, `<section>`

### 4. **Heading Content (Заголовочный контент)**

Элементы заголовков:

```html
<h1>Главный заголовок</h1>
<h2>Заголовок уровня 2</h2>
<h3>Заголовок уровня 3</h3>
<h4>Заголовок уровня 4</h4>
<h5>Заголовок уровня 5</h5>
<h6>Заголовок уровня 6</h6>
```

**Элементы**: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`

### 5. **Phrasing Content (Фразовый контент)**

Элементы, которые размечают текст внутри параграфов:

```html
<p>
    Это <strong>жирный</strong> текст с 
    <em>курсивом</em> и <a href="#">ссылкой</a>.
    Также <code>код</code> и <span>обертка</span>.
</p>
```

**Элементы**: `<a>`, `<abbr>`, `<b>`, `<bdi>`, `<bdo>`, `<br>`, `<button>`, `<cite>`, `<code>`, `<data>`, `<dfn>`, `<em>`, `<i>`, `<input>`, `<kbd>`, `<label>`, `<mark>`, `<output>`, `<q>`, `<ruby>`, `<s>`, `<samp>`, `<select>`, `<small>`, `<span>`, `<strong>`, `<sub>`, `<sup>`, `<textarea>`, `<time>`, `<u>`, `<var>`, `<wbr>`

### 6. **Embedded Content (Встроенный контент)**

Элементы, которые импортируют другой ресурс:

```html
<img src="photo.jpg" alt="Фото">
<video src="video.mp4" controls></video>
<audio src="audio.mp3" controls></audio>
<iframe src="page.html"></iframe>
<embed src="content.swf">
<object data="file.pdf"></object>
<canvas width="800" height="600"></canvas>
<svg>...</svg>
```

**Элементы**: `<audio>`, `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<math>`, `<object>`, `<picture>`, `<svg>`, `<video>`

### 7. **Interactive Content (Интерактивный контент)**

Элементы, с которыми пользователь может взаимодействовать:

```html
<a href="#">Ссылка</a>
<button>Кнопка</button>
<input type="text">
<select>
    <option>Вариант</option>
</select>
<textarea></textarea>
<details>
    <summary>Раскрыть</summary>
</details>
```

**Элементы**: `<a>`, `<button>`, `<details>`, `<embed>`, `<iframe>`, `<input>`, `<label>`, `<select>`, `<textarea>`

### 8. **Palpable Content (Ощутимый контент)**

Контент, который виден пользователю (не пустой):

```html
<p>Видимый текст</p>
<div>Видимый блок</div>
```

**Характеристика**: Элемент считается palpable, если он содержит хотя бы один node, который является palpable.

### 9. **Script-supporting Elements (Элементы поддержки скриптов)**

Элементы, которые не отображаются напрямую, но используются скриптами:

```html
<script>
    console.log('Hello');
</script>
<template>
    <div>Шаблон</div>
</template>
```

**Элементы**: `<script>`, `<template>`

## Пересечение категорий

Элементы могут принадлежать к нескольким категориям одновременно:

```html
<!-- <a> принадлежит к: Flow, Phrasing, Interactive -->
<a href="#">Ссылка</a>

<!-- <button> принадлежит к: Flow, Phrasing, Interactive -->
<button>Кнопка</button>

<!-- <img> принадлежит к: Flow, Phrasing, Embedded, Interactive -->
<img src="photo.jpg" alt="Фото">
```

## Правила использования

### 1. **Вложенность элементов**

Элементы можно вкладывать только в соответствии с их категориями:

```html
<!-- Правильно: Flow в Flow -->
<div><p>Текст</p></div>

<!-- Правильно: Phrasing в Phrasing -->
<p><strong><em>Текст</em></strong></p>

<!-- Неправильно: Block в Inline -->
<span><div>Блок</div></span>  <!-- ОШИБКА! -->
```

### 2. **Контекст использования**

Некоторые элементы можно использовать только в определенных контекстах:

```html
<!-- <li> только внутри <ul>, <ol>, <menu> -->
<ul>
    <li>Элемент списка</li>
</ul>

<!-- <dt> и <dd> только внутри <dl> -->
<dl>
    <dt>Термин</dt>
    <dd>Определение</dd>
</dl>

<!-- <tr> только внутри <table> -->
<table>
    <tr>
        <td>Ячейка</td>
    </tr>
</table>
```

### 3. **Содержимое элементов**

Категории определяют, какой контент может содержать элемент:

```html
<!-- <p> может содержать только Phrasing content -->
<p>
    Текст с <strong>выделением</strong> и <a href="#">ссылкой</a>
</p>

<!-- <div> может содержать Flow content -->
<div>
    <p>Параграф</p>
    <div>Блок</div>
    <ul>
        <li>Список</li>
    </ul>
</div>
```

## Практическое применение

### Структура документа:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Metadata Content -->
    <meta charset="UTF-8">
    <title>Заголовок</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Flow Content -->
    <header>
        <!-- Sectioning Content -->
        <nav>
            <!-- Flow Content -->
            <ul>
                <li><a href="#">Главная</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <!-- Sectioning Content -->
        <article>
            <!-- Heading Content -->
            <h1>Заголовок статьи</h1>
            
            <!-- Flow Content -->
            <p>
                <!-- Phrasing Content -->
                Текст с <strong>выделением</strong> и 
                <a href="#">ссылкой</a>.
            </p>
            
            <!-- Embedded Content -->
            <img src="photo.jpg" alt="Фото">
        </article>
    </main>
    
    <footer>
        <p>Подвал</p>
    </footer>
</body>
</html>
```

## Заключение

Категории контента в HTML5:
- Классифицируют элементы по назначению
- Определяют правила вложенности
- Улучшают понимание структуры документа
- Помогают создавать валидную разметку

Основные категории:
- **Metadata** — информация о документе
- **Flow** — основной контент
- **Sectioning** — секции документа
- **Heading** — заголовки
- **Phrasing** — текстовая разметка
- **Embedded** — встроенный контент
- **Interactive** — интерактивные элементы

Понимание категорий контента помогает создавать семантически правильную и валидную HTML-разметку.

