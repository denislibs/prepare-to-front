# Разница между состоянием(`state`) и пропсами(`props`)?

Состояние (`state`) и пропсы (`props`) — это два способа передачи данных в React-компонентах. Понимание различий критично для правильной работы с компонентами.

## Что такое Props?

Props (properties) — это данные, передаваемые от родительского компонента к дочернему. Props неизменяемы (immutable) и доступны только для чтения.

## Что такое State?

State — это внутреннее состояние компонента, которое может изменяться со временем. State управляется компонентом и может обновляться.

## Основные различия

### 1. **Источник данных**

**Props:**
- Передаются от родителя
- Внешние данные

**State:**
- Управляются компонентом
- Внутренние данные

### 2. **Изменяемость**

**Props:**
- Неизменяемы (immutable)
- Только для чтения

**State:**
- Изменяемы (mutable)
- Обновляются через `setState` или `useState`

### 3. **Доступность**

**Props:**
- Доступны во всех методах компонента
- Передаются как параметры

**State:**
- Доступны только внутри компонента
- Приватные данные компонента

## Примеры

### Props:

```jsx
// Родительский компонент
function App() {
    const name = 'Иван';
    return <Greeting name={name} />;
}

// Дочерний компонент
function Greeting({ name }) {
    return <h1>Привет, {name}!</h1>;
}
```

### State:

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Счет: {count}</p>
            <button onClick={() => setCount(count + 1)}>Увеличить</button>
        </div>
    );
}
```

## Сравнение

### Props (неизменяемые):

```jsx
function UserCard({ user }) {
    // ❌ Нельзя изменить props
    // user.name = 'Новое имя'; // Ошибка!
    
    return <div>{user.name}</div>;
}
```

### State (изменяемые):

```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    // ✅ Можно изменить state
    const increment = () => {
        setCount(count + 1);
    };
    
    return <button onClick={increment}>{count}</button>;
}
```

## Когда использовать

### Используйте Props для:

- ✅ Данных от родителя
- ✅ Конфигурации компонента
- ✅ Неизменяемых данных
- ✅ Callback-функций

### Используйте State для:

- ✅ Внутреннего состояния компонента
- ✅ Данных, которые изменяются
- ✅ UI состояния (открыт/закрыт)
- ✅ Пользовательского ввода

## Комбинирование

### Props и State вместе:

```jsx
function Counter({ initialCount }) {
    // initialCount - из props
    const [count, setCount] = useState(initialCount); // state
    
    return (
        <div>
            <p>Счет: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}
```

## Поднятие состояния вверх

### Когда нужно поднять state:

```jsx
// ❌ Проблема: state в дочернем компоненте
function Child() {
    const [value, setValue] = useState('');
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// ✅ Решение: поднять state в родителя
function Parent() {
    const [value, setValue] = useState('');
    return <Child value={value} onChange={setValue} />;
}

function Child({ value, onChange }) {
    return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
```

## Заключение

**Props:**

1. ✅ Передаются от родителя
2. ✅ Неизменяемы
3. ✅ Только для чтения
4. ✅ Внешние данные

**State:**

1. ✅ Управляются компонентом
2. ✅ Изменяемы
3. ✅ Обновляются через setState/useState
4. ✅ Внутренние данные

**Когда использовать:**

- Props — для данных от родителя
- State — для внутреннего состояния

**Рекомендации:**

- Используйте props для передачи данных
- Используйте state для изменяемого состояния
- Поднимайте state при необходимости

Правильное понимание различий между props и state критично для создания эффективных React-компонентов.



