# Что такое «опрос» (Polling)? Как его реализовать в React?

Polling (опрос) — это техника периодического запроса данных с сервера для получения обновлений. В React это реализуется через `setInterval` или `useEffect` с таймером.

## Что такое Polling?

Polling — это периодический запрос данных с сервера через определенные интервалы времени для получения актуальной информации.

## Реализация

### С `useEffect` и `setInterval`:

```jsx
function DataComponent() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        };
        
        // Первый запрос
        fetchData();
        
        // Периодические запросы каждые 5 секунд
        const interval = setInterval(fetchData, 5000);
        
        // Очистка при размонтировании
        return () => clearInterval(interval);
    }, []);
    
    if (!data) return <div>Загрузка...</div>;
    return <div>{data.message}</div>;
}
```

### С кастомным хуком:

```jsx
function usePolling(url, interval = 5000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
        
        fetchData();
        const intervalId = setInterval(fetchData, interval);
        
        return () => clearInterval(intervalId);
    }, [url, interval]);
    
    return { data, loading };
}

// Использование
function Component() {
    const { data, loading } = usePolling('/api/data', 5000);
    
    if (loading) return <div>Загрузка...</div>;
    return <div>{data?.message}</div>;
}
```

### С условным polling:

```jsx
function Component({ isActive }) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (!isActive) return;
        
        const fetchData = async () => {
            const response = await fetch('/api/data');
            const result = await response.json();
            setData(result);
        };
        
        fetchData();
        const interval = setInterval(fetchData, 5000);
        
        return () => clearInterval(interval);
    }, [isActive]);
    
    return <div>{data?.message}</div>;
}
```

## Оптимизации

### Остановка при ошибках:

```jsx
function usePolling(url, interval = 5000) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let shouldPoll = true;
        
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Ошибка запроса');
                const result = await response.json();
                if (shouldPoll) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (shouldPoll) {
                    setError(err);
                    shouldPoll = false; // Остановить polling при ошибке
                }
            }
        };
        
        fetchData();
        const intervalId = setInterval(fetchData, interval);
        
        return () => {
            shouldPoll = false;
            clearInterval(intervalId);
        };
    }, [url, interval]);
    
    return { data, error };
}
```

## Заключение

**Polling — это:**

1. ✅ Периодический запрос данных
2. ✅ Обновление через интервалы
3. ✅ Получение актуальной информации

**Реализация:**

- `useEffect` с `setInterval`
- Кастомные хуки
- Условный polling

**Рекомендации:**

- Очищайте интервалы при размонтировании
- Обрабатывайте ошибки
- Используйте кастомные хуки для переиспользования

Polling — полезная техника для получения периодических обновлений данных.



