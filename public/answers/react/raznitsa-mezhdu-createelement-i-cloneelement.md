# Разница между `createElement()` и `cloneElement()`?

`createElement()` и `cloneElement()` — это функции React для создания элементов. `createElement` создает новый элемент, а `cloneElement` клонирует существующий элемент с новыми пропсами.

## createElement

### Что это?

`createElement` создает новый React-элемент.

### Использование:

```jsx
const element = React.createElement('div', { className: 'container' }, 'Hello');
// Эквивалентно: <div className="container">Hello</div>
```

## cloneElement

### Что это?

`cloneElement` клонирует существующий элемент и добавляет/перезаписывает пропсы.

### Использование:

```jsx
const original = <Button text="Click" />;
const cloned = React.cloneElement(original, { disabled: true });
// Результат: <Button text="Click" disabled={true} />
```

## Примеры

### createElement:

```jsx
function createButton(text) {
    return React.createElement('button', { onClick: handleClick }, text);
}
```

### cloneElement:

```jsx
function addPropsToChildren(children, additionalProps) {
    return React.Children.map(children, child => {
        return React.cloneElement(child, additionalProps);
    });
}
```

## Заключение

**createElement:**

1. ✅ Создает новый элемент
2. ✅ Используется для создания элементов
3. ✅ Базовый API React

**cloneElement:**

1. ✅ Клонирует существующий элемент
2. ✅ Добавляет/перезаписывает пропсы
3. ✅ Полезен для композиции

**Различия:**

- createElement — создание
- cloneElement — клонирование
- Разные цели использования

**Рекомендации:**

- Используйте createElement для создания элементов
- Используйте cloneElement для модификации существующих элементов
- Понимайте различия

createElement и cloneElement — разные инструменты для разных задач.



