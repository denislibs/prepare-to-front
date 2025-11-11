# Что такое портал (`Portal`) в React?

Портал (Portal) в React позволяет рендерить дочерние элементы в узел DOM, который находится вне иерархии родительского компонента. Это полезно для модальных окон, тултипов и других элементов, которые должны отображаться поверх остального контента.

## Что такое Portal?

Portal — это способ рендеринга дочерних элементов в узел DOM вне родительского компонента, сохраняя при этом логическую иерархию в React-дереве.

## Использование

### Базовый синтаксис:

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
    return createPortal(
        children,
        document.body
    );
}
```

## Примеры использования

### Модальное окно:

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
}

// Использование
function App() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>Содержимое модального окна</h2>
            </Modal>
        </div>
    );
}
```

### Тултип:

```jsx
function Tooltip({ children, text }) {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    const handleMouseEnter = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setShow(true);
    };
    
    return (
        <>
            <span onMouseEnter={handleMouseEnter} onMouseLeave={() => setShow(false)}>
                {children}
            </span>
            {show && createPortal(
                <div 
                    className="tooltip"
                    style={{ left: position.x, top: position.y }}
                >
                    {text}
                </div>,
                document.body
            )}
        </>
    );
}
```

## Преимущества

### 1. **Визуальное позиционирование**

Элементы могут отображаться поверх всего контента.

```jsx
// Модальное окно всегда поверх всего
function Modal() {
    return createPortal(
        <div className="modal">...</div>,
        document.body
    );
}
```

### 2. **Сохранение логической иерархии**

В React-дереве компонент остается в своем месте.

```jsx
function App() {
    return (
        <div>
            <Header />
            <Content />
            {/* Modal логически здесь, но рендерится в body */}
            <Modal />
        </div>
    );
}
```

### 3. **Избежание проблем с z-index**

Не нужно беспокоиться о z-index родительских элементов.

### 4. **События всплывают**

События все еще всплывают через React-дерево.

```jsx
function App() {
    const handleClick = () => {
        console.log('Клик из портала!');
    };
    
    return (
        <div onClick={handleClick}>
            <Modal />
            {/* События из Modal всплывают к App */}
        </div>
    );
}
```

## Практические примеры

### Модальное окно с затемнением:

```jsx
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="modal-wrapper">
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        document.body
    );
}
```

### Уведомления:

```jsx
function Notification({ message, type }) {
    return createPortal(
        <div className={`notification notification-${type}`}>
            {message}
        </div>,
        document.getElementById('notifications')
    );
}
```

## Обработка событий

### События всплывают:

```jsx
function App() {
    const handleClick = () => {
        console.log('Клик обработан в App');
    };
    
    return (
        <div onClick={handleClick}>
            <Modal>
                <button onClick={(e) => e.stopPropagation()}>
                    Кнопка в модальном окне
                </button>
            </Modal>
        </div>
    );
}
```

## Стилизация

### CSS для модального окна:

```css
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 8px;
}
```

## Заключение

**Portal используется для:**

1. ✅ Рендеринга элементов вне родительского DOM
2. ✅ Модальных окон и тултипов
3. ✅ Элементов поверх всего контента

**Преимущества:**

- Визуальное позиционирование
- Сохранение логической иерархии
- Избежание проблем с z-index
- События всплывают

**Использование:**

- Модальные окна
- Тултипы
- Уведомления
- Выпадающие меню

**Рекомендации:**

- Используйте для элементов поверх контента
- Обрабатывайте события правильно
- Стилизуйте для правильного позиционирования

Portal — мощный инструмент для создания элементов, которые должны отображаться вне обычного потока документа.



