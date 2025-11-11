# Что такое компонент-переключатель (Switching Component)?

Компонент-переключатель (Switching Component) в React — это паттерн, где компонент отображает разные дочерние компоненты в зависимости от определенного условия или значения. Это полезно для создания навигации, табов, модальных окон и других переключаемых интерфейсов.

## Что такое Switching Component?

Switching Component — это компонент, который условно рендерит разные дочерние компоненты на основе пропса или состояния.

## Базовый пример

### Простой переключатель:

```jsx
function SwitchingComponent({ view }) {
    switch (view) {
        case 'home':
            return <HomePage />;
        case 'about':
            return <AboutPage />;
        case 'contact':
            return <ContactPage />;
        default:
            return <NotFoundPage />;
    }
}

// Использование
function App() {
    const [view, setView] = useState('home');
    
    return (
        <div>
            <nav>
                <button onClick={() => setView('home')}>Главная</button>
                <button onClick={() => setView('about')}>О нас</button>
                <button onClick={() => setView('contact')}>Контакты</button>
            </nav>
            <SwitchingComponent view={view} />
        </div>
    );
}
```

## Примеры использования

### Табы:

```jsx
function Tabs({ activeTab, tabs }) {
    return (
        <div>
            <div className="tab-buttons">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={activeTab === tab.id ? 'active' : ''}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
```

### Модальные окна:

```jsx
function ModalSwitcher({ modalType, onClose }) {
    switch (modalType) {
        case 'login':
            return <LoginModal onClose={onClose} />;
        case 'register':
            return <RegisterModal onClose={onClose} />;
        case 'settings':
            return <SettingsModal onClose={onClose} />;
        default:
            return null;
    }
}
```

### Роутинг:

```jsx
function Router({ route }) {
    const routes = {
        '/': <HomePage />,
        '/about': <AboutPage />,
        '/contact': <ContactPage />,
    };
    
    return routes[route] || <NotFoundPage />;
}
```

## С объектом-маппингом

### Использование объекта:

```jsx
function ViewSwitcher({ view }) {
    const views = {
        list: <ListView />,
        grid: <GridView />,
        card: <CardView />,
    };
    
    return views[view] || <DefaultView />;
}
```

## Заключение

**Switching Component — это:**

1. ✅ Компонент, переключающий дочерние компоненты
2. ✅ Условный рендеринг на основе условия
3. ✅ Паттерн для навигации и переключения

**Использование:**

- Навигация между страницами
- Табы
- Модальные окна
- Разные представления данных

**Рекомендации:**

- Используйте для переключения между компонентами
- Применяйте для навигации
- Используйте объекты-маппинги для простоты

Switching Component — полезный паттерн для создания переключаемых интерфейсов.



