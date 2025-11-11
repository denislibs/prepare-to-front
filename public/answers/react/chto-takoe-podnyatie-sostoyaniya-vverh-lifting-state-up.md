# Что такое поднятие состояния вверх (Lifting State Up)?

Поднятие состояния вверх (Lifting State Up) — это паттерн в React, где состояние перемещается из дочернего компонента в ближайшего общего родителя. Это позволяет синхронизировать данные между несколькими компонентами.

## Что такое Lifting State Up?

Lifting State Up — это перемещение состояния из дочернего компонента в родительский компонент для совместного использования несколькими компонентами.

## Проблема

### Состояние в дочернем компоненте:

```jsx
function TemperatureInput() {
    const [temperature, setTemperature] = useState('');
    
    return (
        <input
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
        />
    );
}

// Проблема: два компонента не могут синхронизироваться
```

## Решение

### Поднятие состояния:

```jsx
function Calculator() {
    const [temperature, setTemperature] = useState('');
    
    return (
        <div>
            <TemperatureInput
                temperature={temperature}
                onTemperatureChange={setTemperature}
            />
            <TemperatureDisplay temperature={temperature} />
        </div>
    );
}

function TemperatureInput({ temperature, onTemperatureChange }) {
    return (
        <input
            value={temperature}
            onChange={(e) => onTemperatureChange(e.target.value)}
        />
    );
}
```

## Примеры

### Синхронизация компонентов:

```jsx
function App() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <Counter count={count} onIncrement={() => setCount(count + 1)} />
            <Display count={count} />
        </div>
    );
}
```

## Заключение

**Lifting State Up — это:**

1. ✅ Перемещение состояния в родителя
2. ✅ Синхронизация между компонентами
3. ✅ Единый источник истины

**Использование:**

- Синхронизация компонентов
- Общие данные
- Единый источник истины

**Рекомендации:**

- Поднимайте состояние до общего родителя
- Используйте для синхронизации
- Избегайте избыточного поднятия

Поднятие состояния вверх — важный паттерн для управления состоянием в React.



