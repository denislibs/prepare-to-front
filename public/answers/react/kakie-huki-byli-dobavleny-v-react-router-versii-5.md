# Какие хуки были добавлены в React Router версии 5?

В React Router версии 5 были добавлены хуки для работы с маршрутизацией в функциональных компонентах. Эти хуки упрощают доступ к роутингу и навигации.

## Основные хуки

### 1. **useHistory**

Доступ к объекту истории для навигации.

```jsx
import { useHistory } from 'react-router-dom';

function Component() {
    const history = useHistory();
    
    const handleClick = () => {
        history.push('/about');
    };
    
    return <button onClick={handleClick}>Перейти</button>;
}
```

### 2. **useLocation**

Доступ к текущему местоположению.

```jsx
import { useLocation } from 'react-router-dom';

function Component() {
    const location = useLocation();
    console.log(location.pathname);
    return <div>Текущий путь: {location.pathname}</div>;
}
```

### 3. **useParams**

Доступ к параметрам маршрута.

```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { id } = useParams();
    return <div>Пользователь: {id}</div>;
}
```

### 4. **useRouteMatch**

Доступ к информации о совпадении маршрута.

```jsx
import { useRouteMatch } from 'react-router-dom';

function Component() {
    const match = useRouteMatch('/users/:id');
    return <div>{match ? 'Совпадает' : 'Не совпадает'}</div>;
}
```

## Заключение

**Хуки React Router v5:**

1. ✅ useHistory — навигация
2. ✅ useLocation — текущее местоположение
3. ✅ useParams — параметры маршрута
4. ✅ useRouteMatch — совпадение маршрута

**Рекомендации:**

- Используйте хуки в функциональных компонентах
- Заменяйте HOC на хуки
- Упрощайте код навигации

Хуки React Router упрощают работу с маршрутизацией в функциональных компонентах.



