# Опишите базовую структуру HTML-страницы?

Базовая структура HTML-страницы — это фундаментальный каркас, который определяет организацию и иерархию элементов в HTML-документе. Понимание базовой структуры критически важно для создания валидных и правильно работающих веб-страниц.

## Базовая структура HTML-страницы

### Минимальная структура HTML5:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Заголовок страницы</title>
</head>
<body>
    <!-- Контент страницы -->
</body>
</html>
```

## Компоненты структуры

### 1. **DOCTYPE Declaration**

```html
<!DOCTYPE html>
```

- Первая строка документа
- Определяет версию HTML (HTML5)
- Активирует стандартный режим рендеринга

### 2. **Элемент `<html>`**

```html
<html lang="ru">
```

- Корневой элемент документа
- Содержит весь контент страницы
- Атрибут `lang` указывает язык документа

### 3. **Элемент `<head>`**

Секция с метаданными документа:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Заголовок страницы</title>
    <meta name="description" content="Описание страницы">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
```

**Основные элементы `<head>`:**

- `<meta charset="UTF-8">` — кодировка символов (обязательно!)
- `<title>` — заголовок страницы (обязательно!)
- `<meta name="viewport">` — настройки для мобильных устройств
- `<meta name="description">` — описание для SEO
- `<link>` — подключение внешних ресурсов (CSS, иконки)
- `<script>` — подключение JavaScript
- `<style>` — встроенные CSS стили

### 4. **Элемент `<body>`**

Секция с видимым содержимым страницы:

```html
<body>
    <header>
        <h1>Заголовок сайта</h1>
        <nav>
            <ul>
                <li><a href="#">Главная</a></li>
                <li><a href="#">О нас</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h2>Заголовок статьи</h2>
            <p>Текст статьи...</p>
        </article>
    </main>
    
    <footer>
        <p>Подвал сайта</p>
    </footer>
</body>
```

## Полная структура HTML5 страницы

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Метаданные -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO -->
    <title>Заголовок страницы</title>
    <meta name="description" content="Описание страницы для поисковых систем">
    <meta name="keywords" content="ключевые, слова">
    <meta name="author" content="Автор">
    
    <!-- Open Graph для социальных сетей -->
    <meta property="og:title" content="Заголовок">
    <meta property="og:description" content="Описание">
    <meta property="og:image" content="image.jpg">
    
    <!-- Иконки -->
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    
    <!-- Стили -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Скрипты (если нужны в head) -->
    <script src="script.js" defer></script>
</head>
<body>
    <!-- Шапка сайта -->
    <header>
        <h1>Название сайта</h1>
        <nav>
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/about">О нас</a></li>
                <li><a href="/contact">Контакты</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- Основной контент -->
    <main>
        <article>
            <header>
                <h2>Заголовок статьи</h2>
                <p>Дата публикации: <time datetime="2024-01-15">15 января 2024</time></p>
            </header>
            
            <section>
                <h3>Подзаголовок</h3>
                <p>Текст параграфа с <strong>выделением</strong> и <a href="#">ссылкой</a>.</p>
                
                <figure>
                    <img src="photo.jpg" alt="Описание изображения">
                    <figcaption>Подпись к изображению</figcaption>
                </figure>
            </section>
        </article>
        
        <!-- Боковая панель -->
        <aside>
            <h3>Дополнительная информация</h3>
            <p>Контент боковой панели</p>
        </aside>
    </main>
    
    <!-- Подвал сайта -->
    <footer>
        <p>&copy; 2024 Название сайта. Все права защищены.</p>
        <address>
            Контакты: <a href="mailto:info@example.com">info@example.com</a>
        </address>
    </footer>
    
    <!-- Скрипты в конце body -->
    <script src="main.js"></script>
</body>
</html>
```

## Семантическая структура HTML5

### Основные семантические элементы:

```html
<body>
    <!-- Шапка -->
    <header>
        <h1>Заголовок</h1>
        <nav>Навигация</nav>
    </header>
    
    <!-- Основной контент -->
    <main>
        <!-- Статья -->
        <article>
            <header>
                <h2>Заголовок статьи</h2>
            </header>
            <section>
                <h3>Секция</h3>
                <p>Контент</p>
            </section>
        </article>
        
        <!-- Боковая панель -->
        <aside>
            <h3>Дополнительно</h3>
        </aside>
    </main>
    
    <!-- Подвал -->
    <footer>
        <p>Подвал</p>
    </footer>
</body>
```

## Важные правила структуры

### 1. **Обязательные элементы**

- `<!DOCTYPE html>` — обязательно
- `<html>` — обязательно
- `<head>` — обязательно
- `<body>` — обязательно
- `<meta charset>` — обязательно в `<head>`
- `<title>` — обязательно в `<head>`

### 2. **Порядок элементов**

```html
<!DOCTYPE html>  <!-- 1. DOCTYPE -->
<html>           <!-- 2. html -->
    <head>       <!-- 3. head -->
        <!-- Метаданные -->
    </head>
    <body>       <!-- 4. body -->
        <!-- Контент -->
    </body>
</html>
```

### 3. **Вложенность**

- `<head>` и `<body>` должны быть прямыми детьми `<html>`
- Только один `<head>` и один `<body>` на страницу
- `<title>` должен быть внутри `<head>`

## Адаптивная структура

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Адаптивная страница</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <!-- Адаптивное меню -->
        </nav>
    </header>
    
    <main>
        <!-- Контент, адаптирующийся под размер экрана -->
    </main>
    
    <footer>
        <!-- Подвал -->
    </footer>
</body>
</html>
```

## Заключение

Базовая структура HTML-страницы состоит из:

1. **DOCTYPE** — декларация типа документа
2. **`<html>`** — корневой элемент
3. **`<head>`** — метаданные документа
4. **`<body>`** — видимое содержимое

**Обязательные элементы:**
- `<!DOCTYPE html>`
- `<html lang="...">`
- `<head>` с `<meta charset="UTF-8">` и `<title>`
- `<body>` с контентом

Правильная структура обеспечивает:
- Валидность HTML
- Правильный рендеринг в браузерах
- Хорошую доступность
- Оптимизацию для SEO

Всегда следуйте базовой структуре для создания качественных веб-страниц.

