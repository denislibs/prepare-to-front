# Как можно изменить форму картинки или HTML элемента?

Форму HTML элементов можно изменить с помощью CSS свойства `clip-path` или `border-radius` для простых форм. Также можно использовать SVG маски для сложных форм.

## Способы изменения формы

### 1. **`border-radius`** — Скругление углов

```css
.element {
    border-radius: 10px; /* Все углы */
    border-radius: 50%; /* Круг */
    border-radius: 10px 20px 30px 40px; /* Каждый угол отдельно */
}
```

### 2. **`clip-path`** — Обрезка по пути

```css
.element {
    clip-path: circle(50%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    clip-path: inset(10% 20% 30% 40%);
}
```

### 3. **SVG маски**

```html
<svg>
    <defs>
        <mask id="circle-mask">
            <circle cx="50%" cy="50%" r="50%" fill="white"/>
        </mask>
    </defs>
</svg>

<img src="photo.jpg" style="mask: url(#circle-mask);">
```

## Примеры

### Круг:

```css
.element {
    border-radius: 50%;
    width: 200px;
    height: 200px;
}
```

### Треугольник:

```css
.element {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid blue;
}
```

### Многоугольник:

```css
.element {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

## Заключение

**Способы изменения формы:**

1. ✅ `border-radius` — скругление углов
2. ✅ `clip-path` — обрезка по пути
3. ✅ SVG маски — сложные формы

**Рекомендации:**
- Используйте `border-radius` для простых форм
- Используйте `clip-path` для сложных форм
- Используйте SVG для очень сложных форм

Правильный выбор метода зависит от сложности нужной формы.

