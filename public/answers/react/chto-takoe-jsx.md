# Что такое `JSX`?

JSX (JavaScript XML) — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код в JavaScript. JSX используется в React для описания структуры пользовательского интерфейса.

## Что такое JSX?

JSX — это синтаксис, похожий на HTML, который компилируется в вызовы `React.createElement()`. Это делает код более читаемым и интуитивным.

## Базовый синтаксис

### Пример JSX:

```jsx
const element = <h1>Hello, World!</h1>;
```

### Компилируется в:

```javascript
const element = React.createElement('h1', null, 'Hello, World!');
```

## Использование

### Элементы:

```jsx
const element = <div>Привет</div>;
```

### С атрибутами:

```jsx
const element = <div className="container" id="main">Привет</div>;
```

### С выражениями:

```jsx
const name = 'Иван';
const element = <h1>Привет, {name}!</h1>;
```

### Вложенные элементы:

```jsx
const element = (
    <div>
        <h1>Заголовок</h1>
        <p>Текст</p>
    </div>
);
```

## Особенности JSX

### 1. **Атрибуты в camelCase**

```jsx
// HTML
<div class="container"></div>

// JSX
<div className="container"></div>
```

### 2. **Самозакрывающиеся теги**

```jsx
// HTML
<img src="image.jpg" alt="Image">

// JSX
<img src="image.jpg" alt="Image" />
```

### 3. **JavaScript выражения в фигурных скобках**

```jsx
const count = 5;
const element = <div>Счет: {count}</div>;
```

### 4. **Условный рендеринг**

```jsx
const isLoggedIn = true;
const element = (
    <div>
        {isLoggedIn ? <h1>Добро пожаловать</h1> : <h1>Войдите</h1>}
    </div>
);
```

## Примеры

### Компонент:

```jsx
function Welcome({ name }) {
    return <h1>Привет, {name}!</h1>;
}
```

### С условиями:

```jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn && <h1>Добро пожаловать!</h1>}
        </div>
    );
}
```

### С циклами:

```jsx
function List({ items }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
```

## Компиляция

### До компиляции (JSX):

```jsx
function App() {
    return (
        <div className="container">
            <h1>Hello</h1>
        </div>
    );
}
```

### После компиляции (JavaScript):

```javascript
function App() {
    return React.createElement(
        'div',
        { className: 'container' },
        React.createElement('h1', null, 'Hello')
    );
}
```

## Правила JSX

### 1. **Один корневой элемент**

```jsx
// ✅ Правильно
function Component() {
    return (
        <div>
            <h1>Заголовок</h1>
            <p>Текст</p>
        </div>
    );
}

// ❌ Неправильно
function Component() {
    return (
        <h1>Заголовок</h1>
        <p>Текст</p>
    );
}
```

### 2. **Фрагменты**

```jsx
// ✅ С фрагментом
function Component() {
    return (
        <>
            <h1>Заголовок</h1>
            <p>Текст</p>
        </>
    );
}
```

### 3. **Зарезервированные слова**

```jsx
// class → className
<div className="container"></div>

// for → htmlFor
<label htmlFor="input"></label>
```

## Заключение

**JSX — это:**

1. ✅ Синтаксическое расширение JavaScript
2. ✅ HTML-подобный синтаксис
3. ✅ Компилируется в React.createElement

**Особенности:**

- Атрибуты в camelCase
- Самозакрывающиеся теги
- JavaScript выражения в {}
- Один корневой элемент

**Преимущества:**

- Читаемость
- Интуитивность
- Близость к HTML

**Рекомендации:**

- Используйте JSX для описания UI
- Понимайте компиляцию
- Следуйте правилам JSX

JSX делает код React более читаемым и интуитивным.



