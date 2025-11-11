# Как можно сгруппировать опции внутри тэга `<select>`?

В HTML можно группировать опции в `<select>` с помощью элемента `<optgroup>`, который создает визуальную и логическую группировку опций.

## Группировка опций

### Элемент `<optgroup>`

`<optgroup>` группирует опции в `<select>` и создает заголовок группы.

```html
<select>
    <optgroup label="Фрукты">
        <option value="apple">Яблоко</option>
        <option value="banana">Банан</option>
    </optgroup>
    <optgroup label="Овощи">
        <option value="carrot">Морковь</option>
        <option value="tomato">Помидор</option>
    </optgroup>
</select>
```

## Атрибуты

### `label` — Заголовок группы:

```html
<optgroup label="Категория 1">
    <option>Опция 1</option>
</optgroup>
```

### `disabled` — Отключение группы:

```html
<optgroup label="Недоступно" disabled>
    <option>Опция</option>
</optgroup>
```

## Примеры использования

### Группировка по категориям:

```html
<select name="product">
    <optgroup label="Электроника">
        <option value="phone">Телефон</option>
        <option value="laptop">Ноутбук</option>
    </optgroup>
    <optgroup label="Одежда">
        <option value="shirt">Рубашка</option>
        <option value="pants">Брюки</option>
    </optgroup>
</select>
```

### Многоуровневая группировка:

```html
<select>
    <optgroup label="Европа">
        <option value="ru">Россия</option>
        <option value="de">Германия</option>
    </optgroup>
    <optgroup label="Азия">
        <option value="cn">Китай</option>
        <option value="jp">Япония</option>
    </optgroup>
</select>
```

## Стилизация

```css
optgroup {
    font-weight: bold;
    color: #333;
}

option {
    padding: 5px;
}
```

## Доступность

`<optgroup>` улучшает доступность, группируя связанные опции для скринридеров.

## Заключение

**Группировка опций:**

1. ✅ Используйте `<optgroup>` для группировки
2. ✅ Используйте `label` для заголовка группы
3. ✅ Используйте `disabled` для отключения группы

**Преимущества:**
- Улучшенная организация
- Лучший UX
- Улучшенная доступность

`<optgroup>` — простой способ организации опций в выпадающих списках.

