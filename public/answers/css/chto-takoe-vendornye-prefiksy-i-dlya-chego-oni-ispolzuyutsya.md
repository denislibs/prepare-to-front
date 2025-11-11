# Что такое вендорные префиксы? И для чего они используются?

Вендорные префиксы (vendor prefixes) — это префиксы, добавляемые к CSS свойствам для поддержки экспериментальных или нестандартных свойств в разных браузерах до их стандартизации.

## Что такое вендорные префиксы?

Вендорные префиксы — это префиксы, которые браузеры добавляют к CSS свойствам для поддержки экспериментальных функций.

## Основные префиксы

### `-webkit-` — WebKit браузеры

Chrome, Safari, Edge (новые версии):

```css
.element {
    -webkit-transform: rotate(45deg);
    -webkit-border-radius: 5px;
    -webkit-box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}
```

### `-moz-` — Mozilla Firefox

```css
.element {
    -moz-transform: rotate(45deg);
    -moz-border-radius: 5px;
    -moz-box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}
```

### `-ms-` — Microsoft Internet Explorer/Edge (старые версии)

```css
.element {
    -ms-transform: rotate(45deg);
    -ms-flexbox: flex;
}
```

### `-o-` — Opera (старые версии)

```css
.element {
    -o-transform: rotate(45deg);
}
```

## Примеры использования

### Transform с префиксами:

```css
.element {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg); /* Стандартное свойство */
}
```

### Flexbox с префиксами:

```css
.container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}
```

### Border-radius:

```css
.element {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
```

## Современное использование

### Автопрефиксер

Инструменты автоматически добавляют префиксы:

```css
/* Исходный код */
.element {
    transform: rotate(45deg);
}

/* После автопрефиксера */
.element {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
}
```

## Когда использовать

### Используйте когда:

- ✅ Нужна поддержка старых браузеров
- ✅ Свойство еще не стандартизировано
- ✅ Экспериментальные функции

### Не используйте когда:

- ❌ Свойство уже стандартизировано
- ❌ Современные браузеры поддерживают без префикса
- ❌ Используете автопрефиксер

## Заключение

**Вендорные префиксы используются для:**

1. ✅ Поддержки экспериментальных свойств
2. ✅ Совместимости со старыми браузерами
3. ✅ Тестирования новых функций

**Основные префиксы:**
- `-webkit-` — Chrome, Safari
- `-moz-` — Firefox
- `-ms-` — IE/Edge (старые)
- `-o-` — Opera (старые)

**Рекомендации:**
- Используйте автопрефиксер
- Всегда добавляйте стандартное свойство
- Проверяйте необходимость префиксов

**Современный подход:**
- Автопрефиксер автоматически добавляет префиксы
- Меньше необходимости в ручном добавлении
- Фокус на стандартных свойствах

Вендорные префиксы — важная часть истории CSS, но в современных проектах часто обрабатываются автоматически.

