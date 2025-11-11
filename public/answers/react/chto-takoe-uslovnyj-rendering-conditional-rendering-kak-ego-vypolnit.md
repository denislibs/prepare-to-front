# Что такое условный рендеринг (Conditional Rendering)? Как его выполнить?

Условный рендеринг (Conditional Rendering) в React — это способ отображать разные элементы или компоненты в зависимости от условий. Это позволяет создавать динамические интерфейсы, которые реагируют на состояние приложения.

## Что такое условный рендеринг?

Условный рендеринг — это отображение разных элементов в зависимости от условий, таких как состояние компонента или значения пропсов.

## Способы условного рендеринга

### 1. **Оператор `if`**

```jsx
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Добро пожаловать!</h1>;
    }
    return <h1>Войдите в систему</h1>;
}
```

### 2. **Тернарный оператор**

```jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Добро пожаловать!</h1>
            ) : (
                <h1>Войдите в систему</h1>
            )}
        </div>
    );
}
```

### 3. **Логический оператор `&&`**

```jsx
function Notification({ message }) {
    return (
        <div>
            {message && <div className="notification">{message}</div>}
        </div>
    );
}
```

### 4. **Немедленно вызываемая функция (IIFE)**

```jsx
function Component({ condition }) {
    return (
        <div>
            {(() => {
                if (condition === 'A') return <ComponentA />;
                if (condition === 'B') return <ComponentB />;
                return <DefaultComponent />;
            })()}
        </div>
    );
}
```

## Примеры использования

### Простое условие:

```jsx
function UserProfile({ user }) {
    if (!user) {
        return <div>Загрузка...</div>;
    }
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

### Множественные условия:

```jsx
function Status({ status }) {
    return (
        <div>
            {status === 'loading' && <Spinner />}
            {status === 'error' && <ErrorMessage />}
            {status === 'success' && <SuccessMessage />}
        </div>
    );
}
```

### С тернарным оператором:

```jsx
function Button({ isDisabled }) {
    return (
        <button disabled={isDisabled}>
            {isDisabled ? 'Отключено' : 'Включено'}
        </button>
    );
}
```

### Условное отображение списка:

```jsx
function TodoList({ todos }) {
    return (
        <div>
            {todos.length > 0 ? (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>{todo.text}</li>
                    ))}
                </ul>
            ) : (
                <p>Нет задач</p>
            )}
        </div>
    );
}
```

## Предотвращение рендеринга

### Возврат `null`:

```jsx
function Warning({ show }) {
    if (!show) {
        return null; // Не рендерится
    }
    
    return <div className="warning">Предупреждение</div>;
}
```

## Переменные для условий

### Сохранение в переменную:

```jsx
function Component({ user, isAdmin }) {
    let content;
    
    if (isAdmin) {
        content = <AdminPanel />;
    } else if (user) {
        content = <UserPanel />;
    } else {
        content = <LoginForm />;
    }
    
    return <div>{content}</div>;
}
```

## Заключение

**Условный рендеринг — это:**

1. ✅ Отображение элементов по условиям
2. ✅ Различные способы реализации
3. ✅ Динамические интерфейсы

**Способы:**

- Оператор `if`
- Тернарный оператор `? :`
- Логический оператор `&&`
- IIFE

**Использование:**

- Условное отображение компонентов
- Обработка состояний загрузки/ошибки
- Динамические интерфейсы

**Рекомендации:**

- Используйте тернарный оператор для простых условий
- Используйте `if` для сложной логики
- Используйте `&&` для условного отображения одного элемента
- Возвращайте `null` для предотвращения рендеринга

Условный рендеринг — важная часть создания динамических и интерактивных интерфейсов в React.



