# Разница между `useEffect()` и `componentDidMount()`?

`useEffect()` и `componentDidMount()` — это способы выполнения побочных эффектов в React. `useEffect` используется в функциональных компонентах, а `componentDidMount` — в классовых.

## componentDidMount

### Характеристики:

- Метод жизненного цикла классового компонента
- Вызывается после монтирования
- Выполняется один раз
- Идеален для загрузки данных

### Пример:

```jsx
class Component extends React.Component {
    componentDidMount() {
        // Выполняется после монтирования
        fetchData().then(data => {
            this.setState({ data });
        });
    }
    
    render() {
        return <div>{this.state.data}</div>;
    }
}
```

## useEffect

### Характеристики:

- Хук для функциональных компонентов
- Выполняется после рендера
- Может выполняться при каждом обновлении или один раз
- Гибче в использовании

### Пример:

```jsx
function Component() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        // Выполняется после рендера
        fetchData().then(setData);
    }, []); // Пустой массив = один раз
    
    return <div>{data}</div>;
}
```

## Различия

### componentDidMount:

- Только после монтирования
- Один раз
- Только в классовых компонентах

### useEffect:

- После каждого рендера (по умолчанию)
- Можно контролировать через зависимости
- В функциональных компонентах

## Эквиваленты

### componentDidMount:

```jsx
useEffect(() => {
    // Код
}, []); // Пустой массив
```

### componentDidUpdate:

```jsx
useEffect(() => {
    // Код
}); // Без зависимостей
```

### componentWillUnmount:

```jsx
useEffect(() => {
    return () => {
        // Очистка
    };
}, []);
```

## Заключение

**componentDidMount:**

1. ✅ Метод классового компонента
2. ✅ После монтирования
3. ✅ Один раз

**useEffect:**

1. ✅ Хук функционального компонента
2. ✅ После рендера
3. ✅ Гибкий контроль

**Рекомендации:**

- Используйте useEffect для новых проектов
- Понимайте различия
- Контролируйте выполнение через зависимости

useEffect — современная и более гибкая альтернатива componentDidMount.



