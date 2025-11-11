# Что такое React хуки (Hooks)?

React хуки (Hooks) — это функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах. Хуки были введены в React 16.8 и стали стандартным способом работы с функциональными компонентами.

## Что такое хуки?

Хуки — это специальные функции, которые начинаются с `use` и позволяют "подключиться" к возможностям React из функциональных компонентов.

## Встроенные хуки

### 1. **`useState` — Состояние**

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Счет: {count}</p>
            <button onClick={() => setCount(count + 1)}>Увеличить</button>
        </div>
    );
}
```

### 2. **`useEffect` — Побочные эффекты**

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);
    
    if (!user) return <div>Загрузка...</div>;
    return <div>{user.name}</div>;
}
```

### 3. **`useContext` — Контекст**

```jsx
import { useContext } from 'react';

const ThemeContext = createContext();

function Button() {
    const theme = useContext(ThemeContext);
    return <button className={theme}>Кнопка</button>;
}
```

### 4. **`useReducer` — Сложное состояние**

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>Счет: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
}
```

### 5. **`useMemo` — Мемоизация значений**

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ a, b }) {
    const result = useMemo(() => {
        return expensiveCalculation(a, b);
    }, [a, b]);
    
    return <div>{result}</div>;
}
```

### 6. **`useCallback` — Мемоизация функций**

```jsx
import { useCallback } from 'react';

function Parent({ items }) {
    const handleClick = useCallback((id) => {
        console.log('Клик:', id);
    }, []);
    
    return (
        <div>
            {items.map(item => (
                <Child key={item.id} item={item} onClick={handleClick} />
            ))}
        </div>
    );
}
```

### 7. **`useRef` — Ссылки**

```jsx
import { useRef } from 'react';

function Input() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>Фокус</button>
        </div>
    );
}
```

## Правила хуков

### 1. **Вызывать только на верхнем уровне**

```jsx
// ✅ Правильно
function Component() {
    const [count, setCount] = useState(0);
    useEffect(() => {}, []);
    return <div>{count}</div>;
}

// ❌ Неправильно
function Component() {
    if (condition) {
        const [count, setCount] = useState(0); // Ошибка!
    }
}
```

### 2. **Вызывать только из React-функций**

```jsx
// ✅ Правильно
function Component() {
    const [count, setCount] = useState(0);
}

// ❌ Неправильно
function regularFunction() {
    const [count, setCount] = useState(0); // Ошибка!
}
```

## Кастомные хуки

### Создание:

```jsx
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(initialValue);
    
    return { count, increment, decrement, reset };
}

// Использование
function Counter() {
    const { count, increment, decrement } = useCounter(0);
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
```

## Преимущества хуков

### 1. **Переиспользование логики**

Кастомные хуки позволяют переиспользовать логику между компонентами.

### 2. **Упрощение компонентов**

Логика разделяется на отдельные хуки.

### 3. **Нет классов**

Можно использовать все возможности React без классов.

## Заключение

**Хуки — это:**

1. ✅ Функции для использования возможностей React
2. ✅ Начинаются с `use`
3. ✅ Работают в функциональных компонентах

**Встроенные хуки:**

- `useState` — состояние
- `useEffect` — побочные эффекты
- `useContext` — контекст
- `useReducer` — сложное состояние
- `useMemo`, `useCallback` — оптимизация
- `useRef` — ссылки

**Правила:**

- Вызывать только на верхнем уровне
- Вызывать только из React-функций

**Рекомендации:**

- Используйте хуки для функциональных компонентов
- Создавайте кастомные хуки для переиспользования
- Следуйте правилам хуков

Хуки — современный способ работы с React, делающий код более чистым и переиспользуемым.



