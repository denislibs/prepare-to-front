# Блочная модель CSS?

Блочная модель CSS (CSS Box Model) — это фундаментальная концепция, которая описывает, как браузер вычисляет размеры и расположение элементов на странице. Каждый элемент представлен как прямоугольный блок, состоящий из нескольких слоев.

## Компоненты блочной модели

### Структура блока:

```
┌─────────────────────────────────────┐
│         MARGIN (внешний отступ)      │
│  ┌───────────────────────────────┐  │
│  │      BORDER (граница)          │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   PADDING (внутренний)   │  │  │
│  │  │  ┌───────────────────┐   │  │  │
│  │  │  │   CONTENT (контент)│   │  │  │
│  │  │  └───────────────────┘   │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Компоненты

### 1. **Content (Контент)**

Внутренняя область, содержащая текст, изображения и другой контент.

```css
.element {
    width: 200px;   /* Ширина контента */
    height: 100px;  /* Высота контента */
}
```

### 2. **Padding (Внутренний отступ)**

Пространство между контентом и границей.

```css
.element {
    padding: 10px;           /* Все стороны */
    padding: 10px 20px;      /* Вертикально/горизонтально */
    padding: 10px 20px 30px 40px; /* Top Right Bottom Left */
    
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 30px;
    padding-left: 40px;
}
```

### 3. **Border (Граница)**

Линия вокруг padding.

```css
.element {
    border: 2px solid black;
    border-width: 2px;
    border-style: solid;
    border-color: black;
    
    border-top: 1px solid red;
    border-radius: 5px; /* Скругление углов */
}
```

### 4. **Margin (Внешний отступ)**

Пространство за пределами границы, отделяющее элемент от других.

```css
.element {
    margin: 10px;
    margin: 10px 20px;
    margin: 10px 20px 30px 40px;
    
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 30px;
    margin-left: 40px;
}
```

## Вычисление размеров

### Стандартная блочная модель (content-box):

```
Общая ширина = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
Общая высота = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

**Пример:**
```css
.box {
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}

/* Фактическая ширина = 200 + 20*2 + 5*2 + 10*2 = 270px */
```

### Альтернативная модель (border-box):

```css
.box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 5px solid black;
}

/* width включает padding и border */
/* Фактическая ширина контента = 200 - 20*2 - 5*2 = 150px */
```

## Box-sizing

### `content-box` (по умолчанию):

```css
.element {
    box-sizing: content-box;
    width: 200px;
    padding: 20px;
    /* Общая ширина = 200 + 40 = 240px */
}
```

### `border-box`:

```css
.element {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    /* Общая ширина = 200px (padding включен) */
}
```

**Рекомендация:**
```css
* {
    box-sizing: border-box;
}
```

## Схлопывание margin (Margin Collapsing)

Вертикальные margin соседних элементов схлопываются (объединяются):

```css
.box1 {
    margin-bottom: 20px;
}

.box2 {
    margin-top: 30px;
}

/* Фактический отступ между элементами = max(20px, 30px) = 30px */
/* Не 20 + 30 = 50px! */
```

**Не схлопываются:**
- Горизонтальные margin
- Margin родителя и первого/последнего дочернего элемента
- Элементы с `display: flex` или `display: grid`

## Практические примеры

### Карточка с padding и border:

```css
.card {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px;
    box-sizing: border-box; /* Рекомендуется */
}
```

### Кнопка с внутренним отступом:

```css
.button {
    padding: 10px 20px;
    border: 2px solid #3498db;
    margin: 5px;
    box-sizing: border-box;
}
```

### Контейнер с отступами:

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto; /* Центрирование */
    padding: 20px;
    box-sizing: border-box;
}
```

## Визуализация в DevTools

В инструментах разработчика браузера можно увидеть блочную модель:

```
┌─────────────────────────────┐
│ margin: 10px                │
│ ┌─────────────────────────┐ │
│ │ border: 2px solid black │ │
│ │ ┌─────────────────────┐ │ │
│ │ │ padding: 20px       │ │ │
│ │ │ ┌─────────────────┐ │ │ │
│ │ │ │ content: 200x100 │ │ │ │
│ │ │ └─────────────────┘ │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Заключение

**Блочная модель CSS состоит из:**

1. **Content** — контент элемента
2. **Padding** — внутренний отступ
3. **Border** — граница
4. **Margin** — внешний отступ

**Ключевые моменты:**
- ✅ По умолчанию `width/height` относятся только к content
- ✅ `box-sizing: border-box` включает padding и border в width/height
- ✅ Margin схлопываются вертикально
- ✅ Padding и border добавляются к размерам в content-box

**Рекомендация:**
```css
* {
    box-sizing: border-box;
}
```

Понимание блочной модели критично для правильной верстки и контроля размеров элементов.

