# Что такое контекст (`Context`) в React?

Контекст (Context) в React — это механизм передачи данных через дерево компонентов без необходимости передавать пропсы на каждом уровне (избегая prop drilling). Это полезно для глобальных данных, таких как темы, язык, аутентификация.

## Что такое Context?

Context — это API React, который позволяет передавать данные через дерево компонентов без явной передачи пропсов на каждом уровне.

## Создание контекста

### Базовый синтаксис:

```jsx
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

## Использование

### 1. **Создание Provider**

```jsx
const ThemeContext = createContext('light');

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}
```

### 2. **Использование в компоненте**

```jsx
function Button() {
    const theme = useContext(ThemeContext);
    
    return (
        <button className={`button-${theme}`}>
            Кнопка
        </button>
    );
}
```

## Примеры использования

### Тема приложения:

```jsx
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function App() {
    return (
        <ThemeProvider>
            <Header />
            <Content />
        </ThemeProvider>
    );
}

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <header className={`header-${theme}`}>
            <button onClick={toggleTheme}>Переключить тему</button>
        </header>
    );
}
```

### Аутентификация:

```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const login = (userData) => {
        setUser(userData);
    };
    
    const logout = () => {
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function Profile() {
    const { user } = useContext(AuthContext);
    
    if (!user) {
        return <div>Войдите в систему</div>;
    }
    
    return <div>Привет, {user.name}!</div>;
}
```

## Значение по умолчанию

### При создании контекста:

```jsx
const ThemeContext = createContext('light'); // Значение по умолчанию

function Component() {
    // Использует 'light', если нет Provider выше
    const theme = useContext(ThemeContext);
}
```

## Множественные контексты

### Композиция:

```jsx
const ThemeContext = createContext('light');
const LanguageContext = createContext('ru');

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <LanguageContext.Provider value="en">
                <Content />
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
}

function Content() {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    
    return <div className={`content-${theme}`}>{language}</div>;
}
```

## Кастомный хук

### Упрощение использования:

```jsx
const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// Использование
function Component() {
    const { theme, setTheme } = useTheme();
    // ...
}
```

## Когда использовать

### ✅ Хорошие случаи:

- Тема приложения
- Язык интерфейса
- Данные аутентификации
- Глобальное состояние

### ❌ Плохие случаи:

- Локальное состояние компонента
- Данные, используемые только в нескольких компонентах
- Часто меняющиеся данные (может вызвать лишние перерисовки)

## Оптимизация

### Разделение контекстов:

```jsx
// ❌ Плохо: все компоненты перерисовываются при изменении любого значения
const AppContext = createContext();

// ✅ Хорошо: раздельные контексты
const ThemeContext = createContext();
const UserContext = createContext();
```

### Мемоизация значений:

```jsx
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const value = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
```

## Заключение

**Context используется для:**

1. ✅ Передачи данных через дерево компонентов
2. ✅ Избежания prop drilling
3. ✅ Глобального состояния

**Создание:**

- `createContext()` — создание контекста
- `Provider` — предоставление значения
- `useContext()` — использование значения

**Когда использовать:**

- Глобальные данные (тема, язык, аутентификация)
- Избежание prop drilling
- Не для локального состояния

**Рекомендации:**

- Используйте для глобальных данных
- Создавайте кастомные хуки
- Оптимизируйте с мемоизацией
- Разделяйте контексты при необходимости

Context — мощный инструмент для управления глобальным состоянием и избежания prop drilling.



