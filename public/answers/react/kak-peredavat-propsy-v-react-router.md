# Как передавать пропсы в React Router?

В React Router пропсы можно передавать несколькими способами: через компонент в Route, через state в навигации, или через render prop.

## Способы передачи

### 1. **Через элемент Route**

```jsx
<Route path="/user" element={<UserProfile name="Иван" />} />
```

### 2. **Через state в навигации**

```jsx
navigate('/user', { state: { name: 'Иван' } });

// В компоненте
const location = useLocation();
const name = location.state?.name;
```

### 3. **Через render prop (v5)**

```jsx
<Route path="/user" render={(props) => <UserProfile {...props} name="Иван" />} />
```

## Примеры

### С state:

```jsx
function App() {
    return (
        <Routes>
            <Route path="/user" element={<UserProfile />} />
        </Routes>
    );
}

function LinkComponent() {
    const navigate = useNavigate();
    
    return (
        <button onClick={() => navigate('/user', { state: { id: 1 } })}>
            Перейти
        </button>
    );
}

function UserProfile() {
    const location = useLocation();
    const { id } = location.state || {};
    return <div>Пользователь: {id}</div>;
}
```

## Заключение

**Передача пропсов:**

1. ✅ Через element в Route
2. ✅ Через state в навигации
3. ✅ Через render prop (v5)

**Рекомендации:**

- Используйте state для временных данных
- Используйте параметры маршрута для постоянных данных
- Выбирайте подходящий способ

Передача пропсов в React Router зависит от версии и требований.



