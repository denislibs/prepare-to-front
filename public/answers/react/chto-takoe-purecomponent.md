# Что такое `PureComponent`?

`PureComponent` — это базовый класс в React, который автоматически реализует поверхностное сравнение (shallow comparison) пропсов и состояния для предотвращения ненужных перерисовок. Это оптимизация производительности для классовых компонентов.

## Что такое `PureComponent`?

`PureComponent` — это классовый компонент React, который автоматически выполняет `shouldComponentUpdate` с поверхностным сравнением пропсов и состояния.

## Использование

### Базовый синтаксис:

```jsx
class MyComponent extends React.PureComponent {
    render() {
        return <div>{this.props.name}</div>;
    }
}
```

## Сравнение с обычным компонентом

### Обычный компонент:

```jsx
class RegularComponent extends React.Component {
    render() {
        return <div>{this.props.name}</div>;
    }
}
```

Перерисовывается при каждом обновлении родителя.

### PureComponent:

```jsx
class OptimizedComponent extends React.PureComponent {
    render() {
        return <div>{this.props.name}</div>;
    }
}
```

Перерисовывается только при изменении пропсов или состояния.

## Как работает

### Поверхностное сравнение:

`PureComponent` выполняет поверхностное сравнение (shallow comparison) пропсов и состояния.

```jsx
class UserCard extends React.PureComponent {
    render() {
        return (
            <div>
                <h2>{this.props.user.name}</h2>
                <p>{this.props.user.email}</p>
            </div>
        );
    }
}

// При обновлении родителя
// PureComponent сравнивает:
// - this.props.user === nextProps.user
// - this.state === nextState

// Если объекты те же (по ссылке), перерисовка не происходит
```

## Примеры использования

### Базовый пример:

```jsx
class Counter extends React.PureComponent {
    render() {
        return (
            <div>
                <p>Счет: {this.props.count}</p>
            </div>
        );
    }
}

// Перерисовывается только если this.props.count изменился
```

### С вложенными объектами:

```jsx
class UserProfile extends React.PureComponent {
    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        );
    }
}

// ⚠️ Проблема: если передать новый объект с теми же данными
<UserProfile user={{ name: 'John', email: 'john@example.com' }} />
// PureComponent перерисует, так как это новый объект
```

## Ограничения

### 1. **Поверхностное сравнение**

`PureComponent` сравнивает только первый уровень объектов.

```jsx
// Проблема с вложенными объектами
class Component extends React.PureComponent {
    render() {
        return <div>{this.props.data.items[0].name}</div>;
    }
}

// Даже если items[0].name не изменился,
// но data.items - новый массив, компонент перерисуется
```

### 2. **Новые объекты/массивы**

Создание новых объектов/массивов всегда вызывает перерисовку.

```jsx
// ❌ Проблема
function Parent() {
    const data = { name: 'John' }; // Новый объект каждый рендер
    return <Child data={data} />;
}

// ✅ Решение
function Parent() {
    const data = useMemo(() => ({ name: 'John' }), []);
    return <Child data={data} />;
}
```

## Эквивалент для функциональных компонентов

### `React.memo`:

```jsx
const MemoizedComponent = React.memo(function Component({ name }) {
    return <div>{name}</div>;
});

// Эквивалент PureComponent для функциональных компонентов
```

### С кастомным сравнением:

```jsx
const MemoizedComponent = React.memo(
    function Component({ user }) {
        return <div>{user.name}</div>;
    },
    (prevProps, nextProps) => {
        // Кастомное сравнение
        return prevProps.user.id === nextProps.user.id;
    }
);
```

## Когда использовать

### ✅ Хорошие случаи:

1. Компоненты с простыми пропсами
2. Компоненты, которые редко меняются
3. Компоненты в списках

### ❌ Плохие случаи:

1. Компоненты с часто меняющимися пропсами
2. Компоненты с глубоко вложенными объектами
3. Когда нужна полная контроль над `shouldComponentUpdate`

## Пример оптимизации

### Без PureComponent:

```jsx
class UserList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.users.map(user => (
                    <UserItem 
                        key={user.id} 
                        user={user}
                        // Перерисовывается при каждом обновлении родителя
                    />
                ))}
            </ul>
        );
    }
}
```

### С PureComponent:

```jsx
class UserItem extends React.PureComponent {
    render() {
        return <li>{this.props.user.name}</li>;
    }
}

class UserList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.users.map(user => (
                    <UserItem 
                        key={user.id} 
                        user={user}
                        // Перерисовывается только если user изменился
                    />
                ))}
            </ul>
        );
    }
}
```

## Заключение

**`PureComponent` — это:**

1. ✅ Оптимизированный классовый компонент
2. ✅ Автоматическое поверхностное сравнение
3. ✅ Предотвращение ненужных перерисовок

**Как работает:**

- Поверхностное сравнение пропсов и состояния
- Автоматический `shouldComponentUpdate`
- Перерисовка только при изменениях

**Ограничения:**

- Только поверхностное сравнение
- Проблемы с новыми объектами/массивами
- Не работает с глубоко вложенными структурами

**Рекомендации:**

- Используйте для простых компонентов
- Для функциональных компонентов используйте `React.memo`
- Избегайте создания новых объектов в пропсах
- Понимайте ограничения поверхностного сравнения

`PureComponent` — полезная оптимизация для классовых компонентов, но требует понимания его ограничений.



