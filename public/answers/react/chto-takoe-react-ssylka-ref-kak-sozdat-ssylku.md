# Что такое React-ссылка (`ref`)? Как создать ссылку?

React-ссылка (ref) — это способ получить прямой доступ к DOM-элементу или экземпляру компонента. Refs используются для работы с DOM напрямую, фокусировки элементов, измерения размеров и интеграции с библиотеками, не использующими React.

## Что такое ref?

Ref — это способ получить прямой доступ к DOM-элементу или экземпляру классового компонента.

## Создание ref

### С `useRef` (функциональные компоненты):

```jsx
import { useRef } from 'react';

function Input() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>Фокус</button>
        </div>
    );
}
```

### С `createRef` (классовые компоненты):

```jsx
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    
    focusInput = () => {
        this.inputRef.current.focus();
    };
    
    render() {
        return (
            <div>
                <input ref={this.inputRef} />
                <button onClick={this.focusInput}>Фокус</button>
            </div>
        );
    }
}
```

## Использование

### Фокусировка элемента:

```jsx
function Form() {
    const inputRef = useRef(null);
    
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    return <input ref={inputRef} />;
}
```

### Измерение размеров:

```jsx
function Component() {
    const divRef = useRef(null);
    
    useEffect(() => {
        const width = divRef.current.offsetWidth;
        const height = divRef.current.offsetHeight;
        console.log(`Размеры: ${width}x${height}`);
    }, []);
    
    return <div ref={divRef}>Контент</div>;
}
```

### Интеграция с библиотеками:

```jsx
function Chart() {
    const chartRef = useRef(null);
    
    useEffect(() => {
        // Использование сторонней библиотеки
        const chart = new ChartLibrary(chartRef.current);
        return () => chart.destroy();
    }, []);
    
    return <div ref={chartRef} />;
}
```

## Refs для компонентов

### Классовые компоненты:

```jsx
class Child extends React.Component {
    method() {
        console.log('Метод вызван');
    }
    
    render() {
        return <div>Child</div>;
    }
}

class Parent extends React.Component {
    childRef = React.createRef();
    
    handleClick = () => {
        this.childRef.current.method();
    };
    
    render() {
        return (
            <div>
                <Child ref={this.childRef} />
                <button onClick={this.handleClick}>Вызвать метод</button>
            </div>
        );
    }
}
```

### Функциональные компоненты (с `forwardRef`):

```jsx
const Child = React.forwardRef((props, ref) => {
    return <input ref={ref} />;
});

function Parent() {
    const inputRef = useRef(null);
    
    return (
        <div>
            <Child ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Фокус</button>
        </div>
    );
}
```

## Callback refs

### Альтернативный способ:

```jsx
function Input() {
    const inputRef = useRef(null);
    
    const setInputRef = (element) => {
        inputRef.current = element;
        if (element) {
            element.focus();
        }
    };
    
    return <input ref={setInputRef} />;
}
```

## Когда использовать

### ✅ Используйте refs для:

- Фокусировки элементов
- Измерения размеров
- Интеграции с библиотеками
- Работы с медиа (видео, аудио)

### ❌ Не используйте refs для:

- Управления состоянием (используйте state)
- Обновления UI (используйте props и state)

## Заключение

**Ref — это:**

1. ✅ Способ получить доступ к DOM-элементу
2. ✅ Создается через `useRef` или `createRef`
3. ✅ Доступ через `ref.current`

**Использование:**

- Фокусировка элементов
- Измерение размеров
- Интеграция с библиотеками

**Рекомендации:**

- Используйте refs для прямого доступа к DOM
- Не используйте для управления состоянием
- Используйте `forwardRef` для передачи refs в функциональные компоненты

Refs — мощный инструмент для работы с DOM напрямую, когда это необходимо.



