# Расскажите о медиафункции `prefers-reduced-motion`?

Медиафункция `prefers-reduced-motion` в CSS позволяет определять, предпочитает ли пользователь уменьшенное количество анимаций. Это важно для доступности и комфорта пользователей.

## Что такое `prefers-reduced-motion`?

`prefers-reduced-motion` — это CSS медиа-запрос, который проверяет настройки пользователя на уменьшение анимаций в операционной системе.

## Использование

### Базовый синтаксис:

```css
@media (prefers-reduced-motion: reduce) {
    /* Стили для пользователей, предпочитающих меньше анимаций */
}
```

### Значения:

- `no-preference` — пользователь не указал предпочтение (по умолчанию)
- `reduce` — пользователь предпочитает меньше анимаций

## Примеры использования

### Отключение анимаций:

```css
/* Обычные стили с анимациями */
.button {
    transition: transform 0.3s ease;
}

.button:hover {
    transform: scale(1.1);
}

/* Отключить анимации для пользователей с prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .button {
        transition: none;
    }
    
    .button:hover {
        transform: none;
    }
}
```

### Упрощение переходов:

```css
.element {
    transition: all 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
    .element {
        transition: opacity 0.2s ease;
        /* Только простые переходы */
    }
}
```

### Отключение сложных анимаций:

```css
@keyframes slide {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

.slide-in {
    animation: slide 0.5s ease;
}

@media (prefers-reduced-motion: reduce) {
    .slide-in {
        animation: none;
        /* Отключить анимацию */
    }
}
```

## Практические примеры

### Карточка с hover-эффектом:

```css
.card {
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

@media (prefers-reduced-motion: reduce) {
    .card {
        transition: none;
    }
    
    .card:hover {
        transform: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
}
```

### Модальное окно:

```css
.modal {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .modal {
        animation: none;
        opacity: 1;
    }
}
```

### Плавная прокрутка:

```css
html {
    scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}
```

## Зачем это нужно?

### 1. **Доступность**

Некоторые пользователи испытывают головокружение или тошноту от анимаций (вестибулярные расстройства).

### 2. **Производительность**

Уменьшение анимаций может улучшить производительность на слабых устройствах.

### 3. **Комфорт**

Некоторые пользователи просто предпочитают меньше анимаций.

## Настройки в ОС

### Windows:

Settings → Ease of Access → Display → Show animations

### macOS:

System Preferences → Accessibility → Display → Reduce motion

### iOS:

Settings → Accessibility → Motion → Reduce Motion

### Android:

Settings → Accessibility → Remove animations

## Лучшие практики

### 1. **Всегда проверяйте**

```css
/* Хорошо: проверяем предпочтение */
@media (prefers-reduced-motion: reduce) {
    /* Упрощаем или отключаем анимации */
}
```

### 2. **Не удаляйте функциональность**

```css
/* Плохо: полностью удаляем функциональность */
@media (prefers-reduced-motion: reduce) {
    .modal {
        display: none; /* Неправильно */
    }
}

/* Хорошо: упрощаем, но сохраняем функциональность */
@media (prefers-reduced-motion: reduce) {
    .modal {
        animation: none;
        opacity: 1; /* Правильно */
    }
}
```

### 3. **Используйте для всех анимаций**

Применяйте проверку ко всем анимациям и переходам на сайте.

## Заключение

**`prefers-reduced-motion` используется для:**

1. ✅ Улучшения доступности
2. ✅ Учета предпочтений пользователей
3. ✅ Улучшения производительности
4. ✅ Создания комфортного опыта

**Использование:**

- Отключение анимаций
- Упрощение переходов
- Учет настроек пользователя

**Рекомендации:**

- Всегда проверяйте предпочтение пользователя
- Не удаляйте функциональность, только упрощайте
- Применяйте ко всем анимациям
- Тестируйте с включенной настройкой

Правильное использование `prefers-reduced-motion` критично для доступности и комфорта пользователей.

