# Как семантически правильно сверстать картинку с подписью?

Для семантически правильной верстки изображения с подписью в HTML5 используется комбинация элементов `<figure>` и `<figcaption>`. Это обеспечивает правильную семантическую связь между изображением и его описанием.

## Семантическая верстка изображения с подписью

### Базовый пример:

```html
<figure>
    <img src="photo.jpg" alt="Описание изображения">
    <figcaption>Подпись к изображению</figcaption>
</figure>
```

## Элементы для верстки

### 1. **`<figure>`** — Контейнер для иллюстрации

Элемент `<figure>` группирует медиа-контент (изображение, видео, диаграмму) с его подписью. Это семантический контейнер, который указывает, что контент является иллюстрацией.

### 2. **`<figcaption>`** — Подпись

Элемент `<figcaption>` содержит подпись для `<figure>`. Он должен быть первым или последним дочерним элементом `<figure>`.

## Примеры использования

### Простое изображение с подписью:

```html
<figure>
    <img src="landscape.jpg" alt="Горный пейзаж">
    <figcaption>Горный пейзаж в Альпах, Швейцария</figcaption>
</figure>
```

### Изображение с подписью и ссылкой:

```html
<figure>
    <a href="large-photo.jpg">
        <img src="thumbnail.jpg" alt="Миниатюра">
    </a>
    <figcaption>
        <strong>Фото 1:</strong> Описание изображения. 
        <a href="large-photo.jpg">Открыть в полном размере</a>
    </figcaption>
</figure>
```

### Несколько изображений с общей подписью:

```html
<figure>
    <img src="photo1.jpg" alt="Фото 1">
    <img src="photo2.jpg" alt="Фото 2">
    <img src="photo3.jpg" alt="Фото 3">
    <figcaption>Три фотографии из серии "Природа"</figcaption>
</figure>
```

### Изображение с подписью и дополнительной информацией:

```html
<figure>
    <img src="chart.png" alt="График продаж">
    <figcaption>
        <strong>График продаж за 2024 год</strong>
        <p>Данные показывают рост продаж на 25% по сравнению с предыдущим годом</p>
    </figcaption>
</figure>
```

### Видео с подписью:

```html
<figure>
    <video controls>
        <source src="video.mp4" type="video/mp4">
    </video>
    <figcaption>Демонстрация работы приложения</figcaption>
</figure>
```

### SVG с подписью:

```html
<figure>
    <svg width="200" height="200">
        <circle cx="100" cy="100" r="50" fill="blue"/>
    </svg>
    <figcaption>Схематическое изображение круга</figcaption>
</figure>
```

## Позиционирование `<figcaption>`

### Подпись снизу (рекомендуется):

```html
<figure>
    <img src="photo.jpg" alt="Описание">
    <figcaption>Подпись под изображением</figcaption>
</figure>
```

### Подпись сверху:

```html
<figure>
    <figcaption>Подпись над изображением</figcaption>
    <img src="photo.jpg" alt="Описание">
</figure>
```

## Стилизация

### Базовые стили:

```css
figure {
    margin: 1em 0;
    padding: 0;
}

figure img {
    display: block;
    max-width: 100%;
    height: auto;
}

figcaption {
    font-size: 0.9em;
    color: #666;
    text-align: center;
    margin-top: 0.5em;
    font-style: italic;
}
```

### Стилизованный пример:

```html
<figure class="photo-figure">
    <img src="photo.jpg" alt="Описание">
    <figcaption class="photo-caption">
        <strong>Заголовок подписи</strong>
        <span class="photo-author">Фото: Иван Иванов</span>
    </figcaption>
</figure>
```

```css
.photo-figure {
    margin: 2em 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: #f9f9f9;
}

.photo-figure img {
    width: 100%;
    height: auto;
    display: block;
}

.photo-caption {
    padding: 1em;
    background: #fff;
    border-top: 1px solid #ddd;
}

.photo-author {
    display: block;
    margin-top: 0.5em;
    font-size: 0.85em;
    color: #888;
}
```

## Доступность

### Правильная доступность:

```html
<figure>
    <img src="photo.jpg" 
         alt="Детальное описание изображения для скринридеров">
    <figcaption>
        Подпись к изображению, которая дополняет alt-текст
    </figcaption>
</figure>
```

**Важно:**
- `alt` должен содержать описание изображения
- `<figcaption>` дополняет `alt`, но не заменяет его
- Оба элемента важны для доступности

## Неправильные подходы

### ❌ Неправильно — использование `<div>`:

```html
<div class="image-container">
    <img src="photo.jpg" alt="Описание">
    <p class="caption">Подпись</p>
</div>
```

**Проблемы:**
- Нет семантической связи между изображением и подписью
- Скринридеры не понимают связь
- Плохо для SEO

### ❌ Неправильно — подпись вне контейнера:

```html
<img src="photo.jpg" alt="Описание">
<p>Подпись</p>
```

**Проблемы:**
- Нет семантической связи
- Подпись может быть отделена от изображения

### ✅ Правильно — использование `<figure>`:

```html
<figure>
    <img src="photo.jpg" alt="Описание">
    <figcaption>Подпись</figcaption>
</figure>
```

## Примеры из практики

### Галерея изображений:

```html
<section class="gallery">
    <h2>Галерея фотографий</h2>
    
    <figure>
        <img src="photo1.jpg" alt="Фото 1: Горный пейзаж">
        <figcaption>Горный пейзаж в Альпах</figcaption>
    </figure>
    
    <figure>
        <img src="photo2.jpg" alt="Фото 2: Озеро">
        <figcaption>Озеро в горах</figcaption>
    </figure>
    
    <figure>
        <img src="photo3.jpg" alt="Фото 3: Лес">
        <figcaption>Лесной массив</figcaption>
    </figure>
</section>
```

### Статья с иллюстрациями:

```html
<article>
    <h1>Заголовок статьи</h1>
    
    <p>Вводный текст статьи...</p>
    
    <figure>
        <img src="diagram.png" alt="Диаграмма процесса">
        <figcaption>
            <strong>Рисунок 1:</strong> Схема рабочего процесса
        </figcaption>
    </figure>
    
    <p>Продолжение статьи...</p>
</article>
```

## Заключение

**Семантически правильная верстка изображения с подписью:**

```html
<figure>
    <img src="photo.jpg" alt="Описание изображения">
    <figcaption>Подпись к изображению</figcaption>
</figure>
```

**Ключевые моменты:**
- ✅ Используйте `<figure>` для группировки изображения и подписи
- ✅ Используйте `<figcaption>` для подписи (первый или последний дочерний элемент)
- ✅ Всегда добавляйте `alt` к изображению
- ✅ `<figcaption>` дополняет, но не заменяет `alt`
- ✅ Подпись может содержать HTML (ссылки, форматирование)

**Преимущества:**
- Семантическая связь между изображением и подписью
- Улучшенная доступность для скринридеров
- Лучшее SEO
- Легкая стилизация и поддержка кода

Использование `<figure>` и `<figcaption>` — это правильный и семантически корректный способ верстки изображений с подписями в HTML5.

