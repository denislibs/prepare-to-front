# Как React обрабатывает, или ограничивает использование пропсов определенного типа?

React предоставляет механизм проверки типов пропсов через `PropTypes` и TypeScript. Это помогает обнаруживать ошибки на этапе разработки и документировать ожидаемые типы пропсов.

## PropTypes

### Базовое использование:

```jsx
import PropTypes from 'prop-types';

function Button({ text, onClick, disabled }) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};
```

## Типы PropTypes

### Основные типы:

```jsx
Component.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    isActive: PropTypes.bool,
    items: PropTypes.array,
    user: PropTypes.object,
    onClick: PropTypes.func,
    node: PropTypes.node,
    element: PropTypes.element
};
```

### Сложные типы:

```jsx
Component.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number
    }),
    status: PropTypes.oneOf(['active', 'inactive']),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
};
```

## TypeScript

### С типами:

```tsx
interface ButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ text, onClick, disabled }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}
```

## Значения по умолчанию

### PropTypes:

```jsx
Component.propTypes = {
    count: PropTypes.number
};

Component.defaultProps = {
    count: 0
};
```

### TypeScript:

```tsx
interface Props {
    count?: number;
}

function Component({ count = 0 }: Props) {
    return <div>{count}</div>;
}
```

## Заключение

**Проверка типов пропсов:**

1. ✅ PropTypes — для JavaScript
2. ✅ TypeScript — для типобезопасности
3. ✅ Обнаружение ошибок на этапе разработки

**Рекомендации:**

- Используйте PropTypes или TypeScript
- Документируйте ожидаемые типы
- Устанавливайте значения по умолчанию

Проверка типов пропсов помогает создавать более надежные компоненты.



