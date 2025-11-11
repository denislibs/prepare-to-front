# Что такое History API в браузере?

History API — это JavaScript API, которое позволяет управлять историей браузера и создавать одностраничные приложения (SPA) без перезагрузки страницы. Это основа для клиентской маршрутизации в современных веб-приложениях.

## Что такое History API?

History API предоставляет методы для работы с историей браузера, позволяя программно изменять URL и управлять навигацией без перезагрузки страницы.

## Основные методы

### 1. **history.pushState()**

Добавляет новую запись в историю.

```javascript
history.pushState(
    { page: 'about' },  // state
    'О нас',            // title
    '/about'            // URL
);
```

### 2. **history.replaceState()**

Заменяет текущую запись в истории.

```javascript
history.replaceState(
    { page: 'home' },
    'Главная',
    '/'
);
```

### 3. **history.back()**

Переход назад.

```javascript
history.back();
```

### 4. **history.forward()**

Переход вперед.

```javascript
history.forward();
```

### 5. **history.go()**

Переход на определенное количество шагов.

```javascript
history.go(-2); // На 2 шага назад
history.go(1);  // На 1 шаг вперед
```

## События

### popstate

Срабатывает при изменении истории.

```javascript
window.addEventListener('popstate', (event) => {
    console.log('State:', event.state);
    // Обработка изменения URL
});
```

## Примеры

### SPA маршрутизация:

```javascript
// Навигация
function navigate(path) {
    history.pushState({ path }, '', path);
    renderPage(path);
}

// Обработка навигации
window.addEventListener('popstate', (event) => {
    renderPage(event.state?.path || window.location.pathname);
});

function renderPage(path) {
    // Рендеринг страницы
    if (path === '/about') {
        document.body.innerHTML = '<h1>О нас</h1>';
    }
}
```

## Заключение

**History API — это:**

1. ✅ Управление историей браузера
2. ✅ Изменение URL без перезагрузки
3. ✅ Основа для SPA

**Методы:**

- pushState()
- replaceState()
- back()
- forward()
- go()

**Рекомендации:**

- Используйте для SPA
- Обрабатывайте popstate
- Обновляйте контент при изменении URL

History API — ключевой инструмент для создания современных веб-приложений.

