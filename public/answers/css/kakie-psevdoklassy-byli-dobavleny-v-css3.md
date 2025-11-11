# Какие псевдоклассы были добавлены в CSS3?

CSS3 добавил множество новых псевдоклассов, которые расширили возможности стилизации элементов. Эти псевдоклассы позволяют выбирать элементы по их состоянию, позиции и другим критериям.

## Новые псевдоклассы CSS3

### 1. **Структурные псевдоклассы**

#### `:nth-child(n)`

```css
li:nth-child(2) {
    color: red; /* Второй элемент */
}

li:nth-child(odd) {
    background-color: #f0f0f0; /* Нечетные */
}

li:nth-child(even) {
    background-color: #fff; /* Четные */
}

li:nth-child(3n) {
    color: blue; /* Каждый третий */
}
```

#### `:nth-last-child(n)`

```css
li:nth-last-child(1) {
    font-weight: bold; /* Последний элемент */
}
```

#### `:nth-of-type(n)`

```css
p:nth-of-type(2) {
    color: red; /* Второй параграф */
}
```

#### `:nth-last-of-type(n)`

```css
p:nth-last-of-type(1) {
    margin-bottom: 0; /* Последний параграф */
}
```

#### `:first-of-type` и `:last-of-type`

```css
p:first-of-type {
    font-size: 1.2em;
}

p:last-of-type {
    margin-bottom: 0;
}
```

#### `:only-child` и `:only-of-type`

```css
.only:only-child {
    color: blue; /* Единственный дочерний элемент */
}

p:only-of-type {
    font-weight: bold; /* Единственный параграф */
}
```

### 2. **Псевдоклассы состояния форм**

#### `:checked`

```css
input[type="checkbox"]:checked {
    background-color: green;
}
```

#### `:disabled` и `:enabled`

```css
input:disabled {
    opacity: 0.5;
}

input:enabled {
    border-color: blue;
}
```

#### `:required` и `:optional`

```css
input:required {
    border-color: red;
}

input:optional {
    border-color: gray;
}
```

#### `:valid` и `:invalid`

```css
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}
```

#### `:in-range` и `:out-of-range`

```css
input:in-range {
    border-color: green;
}

input:out-of-range {
    border-color: red;
}
```

#### `:read-only` и `:read-write`

```css
input:read-only {
    background-color: #f0f0f0;
}

input:read-write {
    background-color: white;
}
```

### 3. **Псевдоклассы UI состояния**

#### `:target`

```css
#section:target {
    background-color: yellow;
}
```

#### `:not(selector)`

```css
p:not(.special) {
    color: blue;
}

div:not(:first-child) {
    margin-top: 1rem;
}
```

### 4. **Псевдоклассы языка**

#### `:lang()`

```css
p:lang(en) {
    font-family: Arial;
}

p:lang(ru) {
    font-family: 'Times New Roman';
}
```

## Примеры использования

### Чередование строк:

```css
tr:nth-child(even) {
    background-color: #f0f0f0;
}
```

### Валидация форм:

```css
input:invalid {
    border: 2px solid red;
}

input:valid {
    border: 2px solid green;
}
```

### Исключение элементов:

```css
.button:not(:disabled) {
    cursor: pointer;
}
```

## Заключение

**Основные псевдоклассы CSS3:**

1. ✅ Структурные (`:nth-child`, `:nth-of-type`, и др.)
2. ✅ Состояния форм (`:checked`, `:valid`, `:invalid`, и др.)
3. ✅ UI состояния (`:target`, `:not`)
4. ✅ Язык (`:lang`)

**Преимущества:**

- Более гибкая стилизация
- Валидация форм
- Структурный выбор элементов

**Рекомендации:**

- Используйте для структурного выбора
- Используйте для валидации форм
- Комбинируйте с другими селекторами

Псевдоклассы CSS3 значительно расширили возможности стилизации.

