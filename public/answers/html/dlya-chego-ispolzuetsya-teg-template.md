# Для чего используется тэг `<template>`?

Тэг `<template>` в HTML используется для хранения HTML-шаблонов, которые не отображаются на странице, но могут быть клонированы и использованы через JavaScript. Это полезно для создания динамического контента.

## Что такое `<template>`?

`<template>` — это HTML-элемент, который служит контейнером для HTML-шаблонов, которые не отображаются при загрузке страницы, но могут быть использованы позже через JavaScript.

## Использование

### Базовый синтаксис:

```html
<template id="myTemplate">
    <div class="card">
        <h2>Заголовок</h2>
        <p>Текст</p>
    </div>
</template>
```

## Особенности

### 1. **Не отображается**

Содержимое `<template>` не отображается на странице при загрузке.

### 2. **Не выполняется**

Скрипты и стили внутри `<template>` не выполняются до клонирования.

### 3. **Инертность**

Элементы внутри `<template>` инертны (не загружают ресурсы).

## Использование с JavaScript

### Клонирование шаблона:

```html
<template id="cardTemplate">
    <div class="card">
        <h2 class="title"></h2>
        <p class="content"></p>
    </div>
</template>

<script>
    const template = document.querySelector('#cardTemplate');
    const clone = template.content.cloneNode(true);
    
    clone.querySelector('.title').textContent = 'Новый заголовок';
    clone.querySelector('.content').textContent = 'Новый текст';
    
    document.body.appendChild(clone);
</script>
```

## Примеры использования

### Динамический список:

```html
<template id="listItemTemplate">
    <li class="item">
        <span class="name"></span>
        <button class="delete">Удалить</button>
    </li>
</template>

<ul id="list"></ul>

<script>
    const template = document.querySelector('#listItemTemplate');
    const list = document.querySelector('#list');
    
    function addItem(name) {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.name').textContent = name;
        list.appendChild(clone);
    }
    
    addItem('Элемент 1');
    addItem('Элемент 2');
</script>
```

### Карточки товаров:

```html
<template id="productTemplate">
    <div class="product-card">
        <img class="product-image" src="" alt="">
        <h3 class="product-title"></h3>
        <p class="product-price"></p>
        <button class="add-to-cart">В корзину</button>
    </div>
</template>

<div id="products"></div>

<script>
    const template = document.querySelector('#productTemplate');
    const container = document.querySelector('#products');
    
    const products = [
        { title: 'Товар 1', price: '1000₽', image: 'product1.jpg' },
        { title: 'Товар 2', price: '2000₽', image: 'product2.jpg' }
    ];
    
    products.forEach(product => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.product-title').textContent = product.title;
        clone.querySelector('.product-price').textContent = product.price;
        clone.querySelector('.product-image').src = product.image;
        container.appendChild(clone);
    });
</script>
```

### Модальное окно:

```html
<template id="modalTemplate">
    <div class="modal">
        <div class="modal-content">
            <h2 class="modal-title"></h2>
            <p class="modal-text"></p>
            <button class="modal-close">Закрыть</button>
        </div>
    </div>
</template>

<script>
    function showModal(title, text) {
        const template = document.querySelector('#modalTemplate');
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.modal-title').textContent = title;
        clone.querySelector('.modal-text').textContent = text;
        
        clone.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(clone.querySelector('.modal'));
        });
        
        document.body.appendChild(clone);
    }
    
    showModal('Заголовок', 'Текст модального окна');
</script>
```

## Преимущества

### 1. **Производительность**

Шаблоны не рендерятся до использования, что улучшает производительность.

### 2. **Организация**

Шаблоны хранятся в HTML, что упрощает организацию кода.

### 3. **Переиспользование**

Один шаблон может быть использован многократно.

### 4. **Читаемость**

Код становится более читаемым и понятным.

## Альтернативы

### Строки в JavaScript:

```javascript
const template = `
    <div class="card">
        <h2>${title}</h2>
        <p>${content}</p>
    </div>
`;
```

### JavaScript-шаблонизаторы:

- Handlebars
- Mustache
- EJS

## Заключение

**`<template>` используется для:**

1. ✅ Хранения HTML-шаблонов
2. ✅ Создания динамического контента
3. ✅ Улучшения производительности
4. ✅ Организации кода

**Особенности:**

- Не отображается на странице
- Не выполняется до клонирования
- Инертность элементов

**Использование:**

- Клонирование через JavaScript
- Динамическое создание контента
- Переиспользование шаблонов

**Рекомендации:**

- Используйте для повторяющихся элементов
- Комбинируйте с JavaScript для динамического контента
- Храните шаблоны в HTML

Правильное использование `<template>` упрощает создание динамического контента и улучшает производительность.

