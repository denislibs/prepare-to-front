# Разница между компонентом и контейнером?

Компонент (Component) и контейнер (Container) — это паттерн разделения компонентов на презентационные (presentational) и контейнерные (container) компоненты. Это помогает разделить логику и представление.

## Презентационные компоненты (Components)

### Характеристики:

- Отвечают за внешний вид
- Получают данные через props
- Не управляют состоянием
- Переиспользуемые

### Пример:

```jsx
function UserCard({ user, onEdit }) {
    return (
        <div className="user-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={onEdit}>Редактировать</button>
        </div>
    );
}
```

## Контейнерные компоненты (Containers)

### Характеристики:

- Управляют состоянием
- Работают с данными
- Передают данные презентационным компонентам
- Содержат бизнес-логику

### Пример:

```jsx
function UserCardContainer() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUser().then(data => {
            setUser(data);
            setLoading(false);
        });
    }, []);
    
    const handleEdit = () => {
        // Логика редактирования
    };
    
    if (loading) return <div>Загрузка...</div>;
    
    return <UserCard user={user} onEdit={handleEdit} />;
}
```

## Сравнение

### Компонент (Presentation):

- Внешний вид
- Props для данных
- Нет состояния
- Переиспользуемый

### Контейнер (Container):

- Логика и состояние
- Работа с данными
- Управляет состоянием
- Связывает данные и представление

## Современный подход

### С хуками:

```jsx
// Презентационный компонент
function UserCard({ user, onEdit }) {
    return (
        <div>
            <h2>{user.name}</h2>
            <button onClick={onEdit}>Редактировать</button>
        </div>
    );
}

// Кастомный хук для логики
function useUser(userId) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchUser(userId).then(data => {
            setUser(data);
            setLoading(false);
        });
    }, [userId]);
    
    return { user, loading };
}

// Компонент с хуком
function UserCardContainer({ userId }) {
    const { user, loading } = useUser(userId);
    const handleEdit = () => { /* ... */ };
    
    if (loading) return <div>Загрузка...</div>;
    return <UserCard user={user} onEdit={handleEdit} />;
}
```

## Заключение

**Компонент (Presentation):**

1. ✅ Внешний вид
2. ✅ Получает данные через props
3. ✅ Переиспользуемый

**Контейнер (Container):**

1. ✅ Логика и состояние
2. ✅ Работа с данными
3. ✅ Связывает данные и представление

**Различия:**

- Компонент — представление
- Контейнер — логика
- Разделение ответственности

**Рекомендации:**

- Разделяйте презентацию и логику
- Используйте хуки для переиспользования логики
- Делайте компоненты переиспользуемыми

Разделение на компоненты и контейнеры помогает создавать чистую и поддерживаемую архитектуру.



