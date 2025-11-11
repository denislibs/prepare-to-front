# Что такое селектор? И какие селекторы существуют?

Селектор в CSS — это паттерн, который определяет, к каким HTML-элементам будут применены стили. Селекторы являются основой CSS и позволяют точно выбирать элементы для стилизации.

## Что такое селектор?

Селектор — это часть CSS-правила, которая определяет элементы, к которым применяются стили.

```css
селектор {
    свойство: значение;
}
```

## Типы селекторов

### 1. **Универсальный селектор (`*`)**

Выбирает все элементы:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### 2. **Селектор по типу (тегу)**

Выбирает элементы по имени тега:

```css
p {
    color: blue;
}

div {
    margin: 10px;
}

h1, h2, h3 {
    font-weight: bold;
}
```

### 3. **Селектор по классу (`.class`)**

Выбирает элементы с определенным классом:

```css
.button {
    background: blue;
}

.text-primary {
    color: red;
}

.container.main {
    width: 100%;
}
```

### 4. **Селектор по ID (`#id`)**

Выбирает элемент с определенным ID:

```css
#header {
    height: 100px;
}

#main-content {
    width: 1200px;
}
```

### 5. **Селектор по атрибуту**

Выбирает элементы по атрибутам:

```css
/* По наличию атрибута */
[disabled] {
    opacity: 0.5;
}

/* По точному значению */
[type="text"] {
    border: 1px solid #ccc;
}

/* По частичному совпадению */
[href^="https"] {
    color: green;
}

[href$=".pdf"] {
    color: red;
}

[class*="button"] {
    cursor: pointer;
}
```

### 6. **Селектор потомков (пробел)**

Выбирает элементы-потомки:

```css
div p {
    color: blue;
}

.container .item {
    padding: 10px;
}
```

### 7. **Селектор дочерних элементов (`>`)**

Выбирает прямых потомков:

```css
ul > li {
    list-style: none;
}

.container > .item {
    margin: 10px;
}
```

### 8. **Селектор соседних элементов (`+`)**

Выбирает следующий соседний элемент:

```css
h1 + p {
    margin-top: 0;
}

.button + .button {
    margin-left: 10px;
}
```

### 9. **Селектор общих соседей (`~`)**

Выбирает все следующие соседние элементы:

```css
h2 ~ p {
    color: gray;
}
```

### 10. **Псевдоклассы (`:pseudo-class`)**

Выбирают элементы в определенном состоянии:

```css
a:hover {
    color: red;
}

button:active {
    transform: scale(0.95);
}

input:focus {
    border-color: blue;
}

li:first-child {
    font-weight: bold;
}

li:last-child {
    margin-bottom: 0;
}

li:nth-child(2n) {
    background: #f0f0f0;
}
```

### 11. **Псевдоэлементы (`::pseudo-element`)**

Выбирают части элементов:

```css
p::before {
    content: "→ ";
}

p::after {
    content: " ←";
}

p::first-line {
    font-weight: bold;
}

p::first-letter {
    font-size: 2em;
}
```

### 12. **Комбинированные селекторы**

Комбинация нескольких селекторов:

```css
/* И (AND) */
div.container.active {
    display: block;
}

/* ИЛИ (OR) */
h1, h2, h3 {
    color: blue;
}

/* Вложенность */
div.container p.text {
    margin: 10px;
}
```

## Специфичность селекторов

Порядок приоритета (от низкого к высокому):

1. Универсальный (`*`) — 0
2. По тегу — 1
3. По классу — 10
4. По ID — 100
5. Инлайновые стили — 1000
6. `!important` — 10000

## Примеры использования

### Базовые селекторы:

```css
/* По тегу */
p { color: blue; }

/* По классу */
.button { background: red; }

/* По ID */
#header { height: 100px; }
```

### Комбинированные:

```css
/* Потомки */
.container p { margin: 10px; }

/* Дочерние */
.container > .item { padding: 5px; }

/* Соседние */
h1 + p { margin-top: 0; }
```

### С псевдоклассами:

```css
a:hover { color: red; }
input:focus { border-color: blue; }
li:nth-child(odd) { background: #f0f0f0; }
```

### С атрибутами:

```css
[type="email"] { border: 1px solid blue; }
[href^="https"] { color: green; }
[disabled] { opacity: 0.5; }
```

## Заключение

**Основные типы селекторов:**

1. **Универсальный** — `*`
2. **По тегу** — `p`, `div`, `h1`
3. **По классу** — `.class`
4. **По ID** — `#id`
5. **По атрибуту** — `[attr]`, `[attr="value"]`
6. **Потомки** — `div p`
7. **Дочерние** — `div > p`
8. **Соседние** — `h1 + p`, `h1 ~ p`
9. **Псевдоклассы** — `:hover`, `:focus`, `:nth-child()`
10. **Псевдоэлементы** — `::before`, `::after`

**Рекомендации:**
- ✅ Используйте классы для стилизации
- ✅ Избегайте селекторов по ID (высокая специфичность)
- ✅ Используйте семантические селекторы
- ✅ Комбинируйте селекторы для точного выбора

Селекторы — основа CSS, позволяющая точно выбирать и стилизовать элементы.

