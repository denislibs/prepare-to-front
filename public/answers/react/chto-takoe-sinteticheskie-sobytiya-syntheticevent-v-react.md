# Что такое синтетические события (SyntheticEvent) в React?

Синтетические события (SyntheticEvent) в React — это обертки над нативными событиями браузера, которые обеспечивают кроссбраузерную совместимость и единообразный API. Это тот же механизм, что и синтетические события, но с акцентом на объект SyntheticEvent.

## Что такое SyntheticEvent?

SyntheticEvent — это объект-обертка над нативным событием браузера, который предоставляет единообразный API независимо от браузера.

## Характеристики

### 1. **Кроссбраузерная совместимость**

```jsx
function Component() {
    const handleClick = (e) => {
        // e - это SyntheticEvent
        e.preventDefault();
        e.stopPropagation();
        // Работает одинаково во всех браузерах
    };
    
    return <button onClick={handleClick}>Клик</button>;
}
```

### 2. **Единообразный API**

```jsx
function Component() {
    const handleEvent = (e) => {
        console.log(e.type); // 'click', 'change', etc.
        console.log(e.target); // Элемент, на котором произошло событие
        console.log(e.currentTarget); // Элемент, к которому привязан обработчик
    };
    
    return <div onClick={handleEvent}>Контент</div>;
}
```

### 3. **Пулинг событий**

React переиспользует объекты событий для производительности.

```jsx
function Component() {
    const handleClick = (e) => {
        // Используйте e синхронно
        const value = e.target.value;
        
        // ❌ Не работает асинхронно
        setTimeout(() => {
            console.log(e.target.value); // null!
        }, 100);
        
        // ✅ Сохраните значение
        const savedValue = e.target.value;
        setTimeout(() => {
            console.log(savedValue); // Работает
        }, 100);
    };
    
    return <input onClick={handleClick} />;
}
```

## Доступ к нативному событию

### nativeEvent:

```jsx
function Component() {
    const handleClick = (e) => {
        // SyntheticEvent
        console.log(e.type);
        
        // Нативное событие
        const nativeEvent = e.nativeEvent;
        console.log(nativeEvent);
    };
    
    return <button onClick={handleClick}>Клик</button>;
}
```

## Типы событий

### Поддерживаемые события:

- Mouse Events: onClick, onMouseDown, onMouseUp, etc.
- Keyboard Events: onKeyDown, onKeyUp, onKeyPress
- Form Events: onChange, onSubmit, onInput
- Focus Events: onFocus, onBlur
- Touch Events: onTouchStart, onTouchEnd
- Pointer Events: onPointerDown, onPointerUp

## Заключение

**SyntheticEvent — это:**

1. ✅ Обертка над нативными событиями
2. ✅ Кроссбраузерная совместимость
3. ✅ Единообразный API

**Особенности:**

- Кроссбраузерная совместимость
- Единообразный API
- Пулинг для производительности
- Доступ к nativeEvent

**Рекомендации:**

- Используйте синтетические события для всех событий
- Помните о пулинге при асинхронном использовании
- Используйте e.nativeEvent для доступа к нативному событию

SyntheticEvent обеспечивает единообразную работу с событиями во всех браузерах.



