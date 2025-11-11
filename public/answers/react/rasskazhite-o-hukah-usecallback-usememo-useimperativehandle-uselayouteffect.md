# Расскажите о хуках `useCallback()`, `useMemo()`, `useImperativeHandle()`, `useLayoutEffect()`?

Эти хуки — продвинутые инструменты React для оптимизации и управления компонентами. Каждый хук решает специфические задачи.

## useCallback

### Что это?

`useCallback` мемоизирует функцию, предотвращая её пересоздание при каждом рендере.

### Использование:

```jsx
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

### Пример:

```jsx
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

## useMemo

### Что это?

`useMemo` мемоизирует результат вычисления, пересчитывая только при изменении зависимостей.

### Использование:

```jsx
const memoizedValue = useMemo(() => {
    return expensiveCalculation(a, b);
}, [a, b]);
```

### Пример:

```jsx
function Component({ items, filter }) {
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter);
    }, [items, filter]);
    
    return <div>{filteredItems.map(item => <Item key={item.id} item={item} />)}</div>;
}
```

## useImperativeHandle

### Что это?

`useImperativeHandle` позволяет настроить значение ref, которое передается родительскому компоненту.

### Использование:

```jsx
const Child = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    
    return <input ref={inputRef} />;
});
```

## useLayoutEffect

### Что это?

`useLayoutEffect` похож на `useEffect`, но выполняется синхронно после всех DOM-мутаций, но до отрисовки браузером.

### Использование:

```jsx
useLayoutEffect(() => {
    // Выполняется синхронно перед отрисовкой
    measureDOM();
}, []);
```

### Когда использовать:

- Измерение DOM
- Анимации
- Когда нужна синхронность

## Заключение

**useCallback:**

1. ✅ Мемоизирует функции
2. ✅ Предотвращает пересоздание
3. ✅ Для оптимизации пропсов

**useMemo:**

1. ✅ Мемоизирует значения
2. ✅ Оптимизирует вычисления
3. ✅ Для дорогих операций

**useImperativeHandle:**

1. ✅ Настраивает ref
2. ✅ Для передачи методов родителю
3. ✅ С forwardRef

**useLayoutEffect:**

1. ✅ Синхронный эффект
2. ✅ Перед отрисовкой
3. ✅ Для измерений DOM

**Рекомендации:**

- Используйте useCallback для функций в пропсах
- Используйте useMemo для дорогих вычислений
- Используйте useLayoutEffect для синхронных операций
- Понимайте различия

Эти хуки — мощные инструменты для оптимизации и управления компонентами.



