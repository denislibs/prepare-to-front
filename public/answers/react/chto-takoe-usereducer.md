# Что такое `useReducer()`?

`useReducer` — это хук React, который является альтернативой `useState` для управления сложным состоянием. Он принимает редюсер и начальное состояние, возвращая текущее состояние и функцию dispatch.

## Что такое useReducer?

`useReducer` — это хук для управления состоянием через паттерн reducer, похожий на Redux.

## Использование

### Базовый синтаксис:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Пример:

```jsx
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

## Когда использовать

### ✅ useReducer для:

- Сложного состояния
- Множественных подсостояний
- Логики обновления состояния

### ✅ useState для:

- Простого состояния
- Примитивных значений
- Простых обновлений

## Заключение

**useReducer — это:**

1. ✅ Хук для сложного состояния
2. ✅ Паттерн reducer
3. ✅ Альтернатива useState

**Использование:**

- Сложное состояние
- Множественные подсостояния
- Предсказуемые обновления

**Рекомендации:**

- Используйте для сложного состояния
- Используйте useState для простого
- Понимайте паттерн reducer

useReducer — мощный инструмент для управления сложным состоянием.



