# Разница между `JSX` и `HTML`?

JSX и HTML похожи внешне, но имеют важные различия. JSX — это синтаксис JavaScript, который компилируется в JavaScript-код, а HTML — это язык разметки. Понимание различий критично для работы с React.

## Основные различия

### 1. **Атрибуты в camelCase**

**HTML:**
```html
<div class="container"></div>
<label for="input"></label>
```

**JSX:**
```jsx
<div className="container"></div>
<label htmlFor="input"></label>
```

### 2. **Самозакрывающиеся теги**

**HTML:**
```html
<img src="image.jpg" alt="Image">
<br>
<input type="text">
```

**JSX:**
```jsx
<img src="image.jpg" alt="Image" />
<br />
<input type="text" />
```

### 3. **JavaScript выражения**

**HTML:**
```html
<div>Счет: 5</div>
```

**JSX:**
```jsx
const count = 5;
<div>Счет: {count}</div>
```

### 4. **Обработка событий**

**HTML:**
```html
<button onclick="handleClick()">Нажми</button>
```

**JSX:**
```jsx
<button onClick={handleClick}>Нажми</button>
```

### 5. **Стили**

**HTML:**
```html
<div style="color: red; font-size: 16px;">Текст</div>
```

**JSX:**
```jsx
<div style={{ color: 'red', fontSize: '16px' }}>Текст</div>
```

## Детальные различия

### Атрибуты

| HTML | JSX | Причина |
|------|-----|---------|
| `class` | `className` | `class` — зарезервированное слово в JS |
| `for` | `htmlFor` | `for` — зарезервированное слово в JS |
| `tabindex` | `tabIndex` | camelCase |
| `readonly` | `readOnly` | camelCase |

### События

**HTML:**
```html
<button onclick="handleClick()">Нажми</button>
```

**JSX:**
```jsx
<button onClick={handleClick}>Нажми</button>
```

### Стили

**HTML:**
```html
<div style="color: red; background-color: blue;"></div>
```

**JSX:**
```jsx
<div style={{ color: 'red', backgroundColor: 'blue' }}></div>
```

### Комментарии

**HTML:**
```html
<!-- Комментарий -->
```

**JSX:**
```jsx
{/* Комментарий */}
```

## Примеры

### Условный рендеринг

**HTML (не работает напрямую):**
```html
<!-- Нужен JavaScript -->
<div id="content"></div>
<script>
    if (condition) {
        document.getElementById('content').innerHTML = '<h1>Hello</h1>';
    }
</script>
```

**JSX:**
```jsx
<div>
    {condition && <h1>Hello</h1>}
</div>
```

### Списки

**HTML:**
```html
<ul>
    <li>Элемент 1</li>
    <li>Элемент 2</li>
</ul>
```

**JSX:**
```jsx
const items = ['Элемент 1', 'Элемент 2'];
<ul>
    {items.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
</ul>
```

## Компиляция

### JSX компилируется в JavaScript:

```jsx
// JSX
<div className="container">
    <h1>Hello</h1>
</div>
```

```javascript
// Компилируется в
React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'Hello')
)
```

### HTML остается HTML:

```html
<div class="container">
    <h1>Hello</h1>
</div>
```

## Ошибки

### Частые ошибки при переходе с HTML:

```jsx
// ❌ Ошибка: class вместо className
<div class="container"></div>

// ❌ Ошибка: for вместо htmlFor
<label for="input"></label>

// ❌ Ошибка: onclick вместо onClick
<button onclick={handleClick}></button>

// ❌ Ошибка: строка вместо объекта для style
<div style="color: red"></div>
```

## Заключение

**Основные различия:**

1. ✅ Атрибуты в camelCase (`className`, `htmlFor`)
2. ✅ Самозакрывающиеся теги (`<img />`)
3. ✅ JavaScript выражения (`{variable}`)
4. ✅ События в camelCase (`onClick`)
5. ✅ Стили как объекты (`{{ color: 'red' }}`)

**JSX:**

- Компилируется в JavaScript
- Поддерживает выражения
- Типобезопасность (с TypeScript)

**HTML:**

- Статическая разметка
- Не компилируется
- Прямое использование в браузере

**Рекомендации:**

- Запомните основные различия
- Используйте правильные имена атрибутов
- Понимайте компиляцию JSX

Понимание различий между JSX и HTML критично для эффективной работы с React.



