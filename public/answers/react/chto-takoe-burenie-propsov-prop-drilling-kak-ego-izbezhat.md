# Что такое «бурение пропсов» (Prop Drilling)? Как его избежать?

Prop Drilling (бурение пропсов) — это ситуация, когда данные передаются через множество уровней компонентов через props, даже если промежуточные компоненты не используют эти данные. Это создает избыточный код и усложняет поддержку.

## Что такое Prop Drilling?

Prop Drilling — это передача данных через несколько уровней компонентов, когда промежуточные компоненты не используют эти данные, а только передают их дальше.

## Проблема

### Пример Prop Drilling:

```jsx
function App() {
    const [user, setUser] = useState({ name: 'Иван' });
    
    return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
    // Layout не использует user, но передает дальше
    return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
    // Header не использует user, но передает дальше
    return <Profile user={user} setUser={setUser} />;
}

function Profile({ user, setUser }) {
    // Только Profile использует user
    return <div>{user.name}</div>;
}
```

## Решения

### 1. **Context API**

```jsx
const UserContext = createContext();

function App() {
    const [user, setUser] = useState({ name: 'Иван' });
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Layout />
        </UserContext.Provider>
    );
}

function Layout() {
    return <Header />;
}

function Header() {
    return <Profile />;
}

function Profile() {
    const { user } = useContext(UserContext);
    return <div>{user.name}</div>;
}
```

### 2. **Состояние ближе к использованию**

```jsx
// Поднять состояние только до необходимого уровня
function App() {
    return <Layout />;
}

function Layout() {
    return <Header />;
}

function Header() {
    const [user, setUser] = useState({ name: 'Иван' });
    return <Profile user={user} setUser={setUser} />;
}

function Profile({ user, setUser }) {
    return <div>{user.name}</div>;
}
```

### 3. **Композиция компонентов**

```jsx
function App() {
    const [user, setUser] = useState({ name: 'Иван' });
    
    return (
        <Layout>
            <Profile user={user} setUser={setUser} />
        </Layout>
    );
}
```

## Заключение

**Prop Drilling — это:**

1. ✅ Передача данных через множество уровней
2. ✅ Проблема поддержки кода
3. ✅ Избыточная передача props

**Решения:**

- Context API
- Состояние ближе к использованию
- Композиция компонентов

**Рекомендации:**

- Используйте Context для глобальных данных
- Размещайте состояние ближе к использованию
- Избегайте избыточной передачи props

Избегание Prop Drilling делает код более чистым и поддерживаемым.



