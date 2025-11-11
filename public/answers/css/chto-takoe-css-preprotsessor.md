# Что такое CSS препроцессор?

CSS препроцессор — это инструмент, который расширяет возможности CSS, добавляя переменные, вложенность, миксины, функции и другие возможности программирования. Код препроцессора компилируется в обычный CSS.

## Что такое CSS препроцессор?

CSS препроцессор — это язык, который компилируется в CSS. Он добавляет возможности, которых нет в обычном CSS, делая код более поддерживаемым и удобным для написания.

## Популярные препроцессоры

### 1. **SASS/SCSS**

Наиболее популярный препроцессор.

```scss
// Переменные
$primary-color: #3498db;
$font-size: 16px;

// Вложенность
.container {
    width: 100%;
    
    .item {
        padding: 10px;
        color: $primary-color;
    }
}

// Миксины
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button {
    @include flex-center;
}
```

### 2. **Less**

Похож на SASS, но с JavaScript синтаксисом.

```less
@primary-color: #3498db;

.container {
    width: 100%;
    
    .item {
        color: @primary-color;
    }
}
```

### 3. **Stylus**

Более гибкий синтаксис.

```stylus
primary-color = #3498db

.container
    width 100%
    
    .item
        color primary-color
```

## Основные возможности

### 1. **Переменные**

```scss
$primary-color: #3498db;
$font-size: 16px;

.button {
    background: $primary-color;
    font-size: $font-size;
}
```

### 2. **Вложенность**

```scss
.nav {
    ul {
        list-style: none;
        
        li {
            display: inline-block;
            
            a {
                text-decoration: none;
            }
        }
    }
}
```

### 3. **Миксины**

```scss
@mixin border-radius($radius) {
    border-radius: $radius;
    -webkit-border-radius: $radius;
}

.button {
    @include border-radius(5px);
}
```

### 4. **Наследование**

```scss
.button {
    padding: 10px 20px;
    border: none;
}

.button-primary {
    @extend .button;
    background: blue;
}
```

### 5. **Функции**

```scss
@function calculate-rem($size) {
    @return $size / 16px * 1rem;
}

.text {
    font-size: calculate-rem(24px);
}
```

### 6. **Импорты**

```scss
@import 'variables';
@import 'mixins';
@import 'components';
```

## Преимущества

### 1. **Поддерживаемость**

Переменные и миксины делают код более поддерживаемым.

### 2. **Переиспользование**

Миксины и функции позволяют переиспользовать код.

### 3. **Организация**

Импорты позволяют организовывать код в модули.

### 4. **Производительность**

Компиляция в оптимизированный CSS.

## Недостатки

### 1. **Компиляция**

Требуется процесс компиляции перед использованием.

### 2. **Дополнительный инструмент**

Нужно настроить инструменты сборки.

### 3. **Отладка**

Сложнее отлаживать скомпилированный CSS.

## Современные альтернативы

### CSS Custom Properties (переменные):

```css
:root {
    --primary-color: #3498db;
    --font-size: 16px;
}

.button {
    background: var(--primary-color);
    font-size: var(--font-size);
}
```

### PostCSS

Инструмент для трансформации CSS с плагинами.

## Заключение

**CSS препроцессоры предоставляют:**

1. ✅ Переменные
2. ✅ Вложенность
3. ✅ Миксины
4. ✅ Функции
5. ✅ Импорты
6. ✅ Наследование

**Популярные препроцессоры:**
- SASS/SCSS
- Less
- Stylus

**Преимущества:**
- Поддерживаемость
- Переиспользование кода
- Организация
- Расширенные возможности

**Недостатки:**
- Требуется компиляция
- Дополнительные инструменты

CSS препроцессоры — мощный инструмент для улучшения организации и поддерживаемости CSS кода.

