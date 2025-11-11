# Как в React реализовать двустороннее связывание данных?

Двустороннее связывание данных (Two-Way Data Binding) в React реализуется через комбинацию управляемых компонентов и обработчиков событий. React использует однонаправленный поток данных, но можно создать эффект двустороннего связывания.

## Реализация

### Управляемый компонент:

```jsx
function Input({ value, onChange }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

function App() {
    const [value, setValue] = useState('');
    
    return (
        <div>
            <Input value={value} onChange={setValue} />
            <p>Значение: {value}</p>
        </div>
    );
}
```

### С множественными полями:

```jsx
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    
    const handleChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };
    
    return (
        <form>
            <input
                value={formData.name}
                onChange={handleChange('name')}
            />
            <input
                value={formData.email}
                onChange={handleChange('email')}
            />
        </form>
    );
}
```

## Кастомный хук

### useTwoWayBinding:

```jsx
function useTwoWayBinding(initialValue) {
    const [value, setValue] = useState(initialValue);
    
    const bind = {
        value,
        onChange: (e) => setValue(e.target.value)
    };
    
    return [value, setValue, bind];
}

// Использование
function Component() {
    const [name, setName, nameBind] = useTwoWayBinding('');
    
    return (
        <div>
            <input {...nameBind} />
            <p>{name}</p>
        </div>
    );
}
```

## Заключение

**Двустороннее связывание:**

1. ✅ Управляемые компоненты
2. ✅ Обработчики событий
3. ✅ Синхронизация состояния

**Реализация:**

- Управляемые компоненты
- Кастомные хуки
- Обработчики onChange

**Рекомендации:**

- Используйте управляемые компоненты
- Создавайте кастомные хуки для переиспользования
- Синхронизируйте состояние и UI

Двустороннее связывание в React реализуется через управляемые компоненты и обработчики событий.



