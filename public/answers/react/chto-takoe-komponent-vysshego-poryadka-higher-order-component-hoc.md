# Что такое Компонент высшего порядка (Higher-Order Component/HOC)?

Компонент высшего порядка (HOC) — это продвинутая техника в React для переиспользования логики компонентов. HOC — это функция, которая принимает компонент и возвращает новый компонент с дополнительной функциональностью.

## Что такое HOC?

HOC (Higher-Order Component) — это функция, которая принимает компонент в качестве аргумента и возвращает новый компонент с расширенной функциональностью.

## Синтаксис

### Базовый синтаксис:

```jsx
function withEnhancement(WrappedComponent) {
    return function EnhancedComponent(props) {
        // Дополнительная логика
        return <WrappedComponent {...props} />;
    };
}
```

## Примеры использования

### Базовый HOC:

```jsx
function withLoading(WrappedComponent) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Загрузка...</div>;
        }
        return <WrappedComponent {...props} />;
    };
}

// Использование
const UserProfileWithLoading = withLoading(UserProfile);
```

### HOC с данными:

```jsx
function withUserData(WrappedComponent) {
    return function WithUserDataComponent(props) {
        const [user, setUser] = useState(null);
        
        useEffect(() => {
            fetchUser().then(setUser);
        }, []);
        
        return <WrappedComponent {...props} user={user} />;
    };
}

// Использование
const ProfileWithUser = withUserData(Profile);
```

### HOC с аутентификацией:

```jsx
function withAuth(WrappedComponent) {
    return function WithAuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        
        useEffect(() => {
            checkAuth().then(setIsAuthenticated);
        }, []);
        
        if (!isAuthenticated) {
            return <div>Пожалуйста, войдите</div>;
        }
        
        return <WrappedComponent {...props} />;
    };
}

// Использование
const ProtectedPage = withAuth(Dashboard);
```

## Конвенции

### 1. **Не изменять оригинальный компонент**

```jsx
// ✅ Правильно
function withEnhancement(WrappedComponent) {
    return function EnhancedComponent(props) {
        return <WrappedComponent {...props} />;
    };
}

// ❌ Неправильно
function withEnhancement(WrappedComponent) {
    WrappedComponent.newProp = 'value'; // Не изменяйте оригинал
    return WrappedComponent;
}
```

### 2. **Передавать пропсы дальше**

```jsx
function withEnhancement(WrappedComponent) {
    return function EnhancedComponent(props) {
        return <WrappedComponent {...props} />; // Передаем все пропсы
    };
}
```

### 3. **Использовать displayName для отладки**

```jsx
function withEnhancement(WrappedComponent) {
    function EnhancedComponent(props) {
        return <WrappedComponent {...props} />;
    }
    
    EnhancedComponent.displayName = `withEnhancement(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    return EnhancedComponent;
}
```

## Практические примеры

### HOC для логирования:

```jsx
function withLogging(WrappedComponent) {
    return function WithLoggingComponent(props) {
        useEffect(() => {
            console.log(`Компонент ${WrappedComponent.name} отрендерен`);
        });
        
        return <WrappedComponent {...props} />;
    };
}
```

### HOC для обработки ошибок:

```jsx
function withErrorBoundary(WrappedComponent) {
    return class extends React.Component {
        state = { hasError: false };
        
        static getDerivedStateFromError(error) {
            return { hasError: true };
        }
        
        componentDidCatch(error, errorInfo) {
            console.error(error, errorInfo);
        }
        
        render() {
            if (this.state.hasError) {
                return <div>Что-то пошло не так</div>;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
}
```

### HOC для стилизации:

```jsx
function withTheme(WrappedComponent) {
    return function WithThemeComponent(props) {
        const theme = useContext(ThemeContext);
        return <WrappedComponent {...props} theme={theme} />;
    };
}
```

## Композиция HOC

### Несколько HOC:

```jsx
const EnhancedComponent = withAuth(
    withLoading(
        withUserData(Profile)
    )
);
```

### С использованием compose:

```jsx
import { compose } from 'redux';

const EnhancedComponent = compose(
    withAuth,
    withLoading,
    withUserData
)(Profile);
```

## Ограничения

### 1. **Сложность отладки**

HOC могут усложнить отладку из-за дополнительных слоев.

### 2. **Refs не передаются автоматически**

```jsx
// Проблема с refs
function withEnhancement(WrappedComponent) {
    return React.forwardRef((props, ref) => {
        return <WrappedComponent {...props} ref={ref} />;
    });
}
```

### 3. **Статические методы не копируются**

Нужно вручную копировать статические методы.

## Альтернативы

### Custom Hooks:

```jsx
// Вместо HOC
function useUserData() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchUser().then(setUser);
    }, []);
    return user;
}

// Использование
function Profile() {
    const user = useUserData();
    return <div>{user?.name}</div>;
}
```

## Заключение

**HOC — это:**

1. ✅ Функция, принимающая компонент и возвращающая новый
2. ✅ Техника переиспользования логики
3. ✅ Способ расширения функциональности компонентов

**Использование:**

- Переиспользование логики
- Добавление функциональности
- Композиция компонентов

**Конвенции:**

- Не изменять оригинальный компонент
- Передавать пропсы дальше
- Использовать displayName

**Ограничения:**

- Сложность отладки
- Проблемы с refs
- Статические методы

**Рекомендации:**

- Используйте Custom Hooks для новой логики
- HOC все еще полезны для некоторых случаев
- Понимайте композицию HOC

HOC — мощная техника, но в современном React часто заменяется Custom Hooks.



