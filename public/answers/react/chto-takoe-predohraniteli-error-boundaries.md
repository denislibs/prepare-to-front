# Что такое предохранители (Error Boundaries)?

Предохранители (Error Boundaries) в React — это компоненты, которые перехватывают ошибки JavaScript в любом месте дерева дочерних компонентов, логируют их и отображают резервный UI вместо падения всего приложения.

## Что такое Error Boundaries?

Error Boundaries — это классовые компоненты React, которые перехватывают ошибки в дочерних компонентах и отображают резервный UI.

## Создание Error Boundary

### Базовый пример:

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Ошибка:', error, errorInfo);
        // Можно отправить ошибку в сервис логирования
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Что-то пошло не так.</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }
        
        return this.props.children;
    }
}
```

## Использование

### Обертка компонентов:

```jsx
function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Content />
            <Footer />
        </ErrorBoundary>
    );
}
```

### Множественные Error Boundaries:

```jsx
function App() {
    return (
        <div>
            <ErrorBoundary>
                <Header />
            </ErrorBoundary>
            <ErrorBoundary>
                <Content />
            </ErrorBoundary>
            <ErrorBoundary>
                <Footer />
            </ErrorBoundary>
        </div>
    );
}
```

## Что перехватывают Error Boundaries

### ✅ Перехватывают:

- Ошибки рендеринга
- Ошибки в методах жизненного цикла
- Ошибки в конструкторах

### ❌ Не перехватывают:

- Ошибки в обработчиках событий
- Ошибки в асинхронном коде
- Ошибки в самом Error Boundary

## Обработка ошибок в событиях

### Try-catch для событий:

```jsx
function Component() {
    const handleClick = () => {
        try {
            // Код, который может вызвать ошибку
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    return <button onClick={handleClick}>Клик</button>;
}
```

## Заключение

**Error Boundaries — это:**

1. ✅ Компоненты для перехвата ошибок
2. ✅ Резервный UI при ошибках
3. ✅ Защита от падения приложения

**Использование:**

- Обертка компонентов
- Множественные границы
- Логирование ошибок

**Ограничения:**

- Только классовые компоненты
- Не перехватывают ошибки в событиях
- Не перехватывают асинхронные ошибки

**Рекомендации:**

- Используйте для защиты от ошибок
- Размещайте на разных уровнях
- Логируйте ошибки

Error Boundaries — важный инструмент для создания надежных React-приложений.



