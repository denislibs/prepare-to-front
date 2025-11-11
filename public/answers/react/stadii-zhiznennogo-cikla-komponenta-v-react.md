# Стадии жизненного цикла компонента в React?

Жизненный цикл компонента в React состоит из трех основных стадий: монтирование (Mounting), обновление (Updating) и размонтирование (Unmounting). Понимание этих стадий помогает правильно управлять компонентами.

## Стадии жизненного цикла

### 1. **Монтирование (Mounting)**

Стадия, когда компонент создается и вставляется в DOM.

### 2. **Обновление (Updating)**

Стадия, когда компонент обновляется при изменении пропсов или состояния.

### 3. **Размонтирование (Unmounting)**

Стадия, когда компонент удаляется из DOM.

## Стадия 1: Монтирование (Mounting)

### Порядок вызова методов:

1. `constructor()` — инициализация
2. `render()` — первый рендер
3. `componentDidMount()` — после монтирования

### Пример:

```jsx
class Component extends React.Component {
    constructor(props) {
        super(props);
        console.log('1. constructor');
        this.state = { count: 0 };
    }
    
    componentDidMount() {
        console.log('3. componentDidMount');
        // Компонент смонтирован в DOM
    }
    
    render() {
        console.log('2. render');
        return <div>Hello</div>;
    }
}
```

### Что происходит:

1. React создает экземпляр компонента
2. Вызывает `constructor` для инициализации
3. Вызывает `render` для создания виртуального DOM
4. Вставляет компонент в реальный DOM
5. Вызывает `componentDidMount`

## Стадия 2: Обновление (Updating)

### Порядок вызова методов:

1. `shouldComponentUpdate()` — проверка необходимости обновления
2. `render()` — перерисовка
3. `getSnapshotBeforeUpdate()` — перед обновлением DOM
4. `componentDidUpdate()` — после обновления

### Пример:

```jsx
class Component extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('1. shouldComponentUpdate');
        return true; // или false для пропуска обновления
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('3. getSnapshotBeforeUpdate');
        return null; // или значение для componentDidUpdate
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('4. componentDidUpdate');
        // Компонент обновлен
    }
    
    render() {
        console.log('2. render');
        return <div>Hello</div>;
    }
}
```

### Триггеры обновления:

1. Изменение `props`
2. Изменение `state`
3. Вызов `forceUpdate()`

## Стадия 3: Размонтирование (Unmounting)

### Порядок вызова методов:

1. `componentWillUnmount()` — перед удалением

### Пример:

```jsx
class Component extends React.Component {
    componentWillUnmount() {
        console.log('componentWillUnmount');
        // Очистка ресурсов:
        // - Таймеры
        // - Подписки
        // - Отмена запросов
        clearInterval(this.timer);
    }
    
    render() {
        return <div>Hello</div>;
    }
}
```

### Что происходит:

1. React определяет, что компонент нужно удалить
2. Вызывает `componentWillUnmount`
3. Удаляет компонент из DOM

## Полный цикл

### Пример полного жизненного цикла:

```jsx
class LifecycleDemo extends React.Component {
    constructor(props) {
        super(props);
        console.log('Монтирование: constructor');
        this.state = { count: 0 };
    }
    
    componentDidMount() {
        console.log('Монтирование: componentDidMount');
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Обновление: shouldComponentUpdate');
        return true;
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Обновление: getSnapshotBeforeUpdate');
        return null;
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Обновление: componentDidUpdate');
    }
    
    componentWillUnmount() {
        console.log('Размонтирование: componentWillUnmount');
    }
    
    render() {
        console.log('render');
        return (
            <div>
                <p>Счет: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Увеличить
                </button>
            </div>
        );
    }
}
```

## Визуализация

### Монтирование:

```
constructor → render → componentDidMount
```

### Обновление:

```
shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
```

### Размонтирование:

```
componentWillUnmount
```

## Эквиваленты в функциональных компонентах

### С хуками:

```jsx
function Component() {
    // Монтирование
    useEffect(() => {
        console.log('Монтирование');
        return () => {
            console.log('Размонтирование');
        };
    }, []);
    
    // Обновление
    useEffect(() => {
        console.log('Обновление');
    });
    
    return <div>Hello</div>;
}
```

## Практические примеры

### Загрузка данных:

```jsx
class DataComponent extends React.Component {
    state = { data: null };
    
    componentDidMount() {
        // Загрузка при монтировании
        this.loadData();
    }
    
    componentDidUpdate(prevProps) {
        // Перезагрузка при изменении пропсов
        if (prevProps.id !== this.props.id) {
            this.loadData();
        }
    }
    
    componentWillUnmount() {
        // Отмена запроса при размонтировании
        if (this.request) {
            this.request.abort();
        }
    }
    
    loadData() {
        this.request = fetch(`/api/data/${this.props.id}`)
            .then(res => res.json())
            .then(data => this.setState({ data }));
    }
    
    render() {
        return <div>{this.state.data?.name}</div>;
    }
}
```

## Заключение

**Три стадии жизненного цикла:**

1. ✅ **Монтирование** — создание и вставка в DOM
2. ✅ **Обновление** — изменение компонента
3. ✅ **Размонтирование** — удаление из DOM

**Методы по стадиям:**

- Монтирование: `constructor`, `render`, `componentDidMount`
- Обновление: `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`
- Размонтирование: `componentWillUnmount`

**Рекомендации:**

- Используйте `componentDidMount` для загрузки данных
- Очищайте ресурсы в `componentWillUnmount`
- Оптимизируйте с `shouldComponentUpdate`
- Рассмотрите хуки для новых проектов

Понимание стадий жизненного цикла критично для правильной работы с компонентами React.



