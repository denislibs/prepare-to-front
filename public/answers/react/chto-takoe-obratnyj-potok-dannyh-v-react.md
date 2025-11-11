# Что такое обратный поток данных в React?

Обратный поток данных (Data Flow Up) в React — это передача данных от дочернего компонента к родительскому через callback-функции. Это дополняет однонаправленный поток данных сверху вниз.

## Однонаправленный поток

### Сверху вниз:

```jsx
function Parent() {
    const data = 'Hello';
    return <Child data={data} />;
}
```

## Обратный поток

### Снизу вверх:

```jsx
function Parent() {
    const [value, setValue] = useState('');
    
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    
    return <Child value={value} onChange={handleChange} />;
}

function Child({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
```

## Заключение

**Обратный поток данных:**

1. ✅ Передача данных снизу вверх
2. ✅ Через callback-функции
3. ✅ Дополняет однонаправленный поток

**Использование:**

- Обновление состояния родителя
- Обработка событий
- Синхронизация данных

**Рекомендации:**

- Используйте callbacks для обратного потока
- Комбинируйте с однонаправленным потоком
- Понимайте паттерны передачи данных

Обратный поток данных — важная часть архитектуры React.



