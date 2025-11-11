# Какие CSS-препроцессоры вы знаете? Преимущества их использования?

CSS-препроцессоры — это инструменты, которые расширяют возможности CSS, добавляя переменные, вложенность, миксины и другие функции. Наиболее популярные: Sass/SCSS, Less и Stylus.

## Популярные препроцессоры

### 1. **Sass/SCSS**

```scss
// Переменные
$primary-color: #3498db;
$spacing: 1rem;

// Вложенность
.button {
    background-color: $primary-color;
    padding: $spacing;
    
    &:hover {
        background-color: darken($primary-color, 10%);
    }
    
    &--primary {
        background-color: $primary-color;
    }
}

// Миксины
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    @include flex-center;
}
```

### 2. **Less**

```less
// Переменные
@primary-color: #3498db;
@spacing: 1rem;

// Вложенность
.button {
    background-color: @primary-color;
    padding: @spacing;
    
    &:hover {
        background-color: darken(@primary-color, 10%);
    }
}

// Миксины
.flex-center() {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    .flex-center();
}
```

### 3. **Stylus**

```stylus
// Переменные
primary-color = #3498db
spacing = 1rem

// Вложенность
.button
    background-color primary-color
    padding spacing
    
    &:hover
        background-color darken(primary-color, 10%)
```

## Преимущества использования

### 1. **Переменные**

```scss
// Одно место для изменения
$primary-color: #3498db;

.button {
    background-color: $primary-color;
}

.link {
    color: $primary-color;
}
```

### 2. **Вложенность**

```scss
// Вместо повторения
.card {
    padding: 1rem;
    
    &__header {
        font-size: 1.2rem;
    }
    
    &__body {
        margin-top: 1rem;
    }
}
```

### 3. **Миксины**

```scss
@mixin button($color) {
    background-color: $color;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    
    &:hover {
        background-color: darken($color, 10%);
    }
}

.button-primary {
    @include button(#3498db);
}

.button-secondary {
    @include button(#2ecc71);
}
```

### 4. **Функции**

```scss
@function calculate-rem($px) {
    @return $px / 16 * 1rem;
}

.element {
    font-size: calculate-rem(24px); // 1.5rem
}
```

### 5. **Импорты**

```scss
// _variables.scss
$primary-color: #3498db;

// main.scss
@import 'variables';
@import 'components/button';
@import 'components/card';
```

### 6. **Условные операторы**

```scss
@if $theme == 'dark' {
    background-color: #000;
} @else {
    background-color: #fff;
}
```

### 7. **Циклы**

```scss
@for $i from 1 through 5 {
    .spacing-#{$i} {
        margin: #{$i * 0.5}rem;
    }
}
```

## Примеры использования

### Компонент с переменными:

```scss
$card-padding: 1rem;
$card-border-radius: 8px;
$card-shadow: 0 2px 4px rgba(0,0,0,0.1);

.card {
    padding: $card-padding;
    border-radius: $card-border-radius;
    box-shadow: $card-shadow;
}
```

### Миксин для медиа-запросов:

```scss
@mixin respond-to($breakpoint) {
    @if $breakpoint == 'mobile' {
        @media (max-width: 768px) {
            @content;
        }
    }
}

.element {
    font-size: 16px;
    
    @include respond-to('mobile') {
        font-size: 14px;
    }
}
```

## Заключение

**Популярные препроцессоры:**

1. ✅ **Sass/SCSS** — самый популярный
2. ✅ **Less** — простой синтаксис
3. ✅ **Stylus** — минималистичный

**Преимущества:**

1. ✅ Переменные для консистентности
2. ✅ Вложенность для читаемости
3. ✅ Миксины для переиспользования
4. ✅ Функции для вычислений
5. ✅ Импорты для организации
6. ✅ Условные операторы и циклы

**Рекомендации:**
- Используйте для больших проектов
- Организуйте код в модули
- Используйте переменные для тем
- Компилируйте в продакшене

CSS-препроцессоры значительно упрощают разработку и поддержку CSS-кода.

