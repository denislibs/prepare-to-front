# Что такое MVC?

MVC (Model-View-Controller) — это архитектурный паттерн, который разделяет приложение на три основных компонента: Model (модель), View (представление) и Controller (контроллер). Это один из самых популярных паттернов для организации кода.

## Что такое MVC?

MVC — это архитектурный паттерн, который разделяет логику приложения на три компонента для улучшения организации кода и разделения ответственности.

## Компоненты MVC

### 1. **Model (Модель)**

Представляет данные и бизнес-логику.

```javascript
class UserModel {
    constructor() {
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    getUsers() {
        return this.users;
    }
}
```

### 2. **View (Представление)**

Отображает данные пользователю.

```javascript
class UserView {
    render(users) {
        const html = users.map(user => 
            `<div>${user.name} - ${user.email}</div>`
        ).join('');
        document.getElementById('app').innerHTML = html;
    }
}
```

### 3. **Controller (Контроллер)**

Обрабатывает пользовательский ввод и координирует Model и View.

```javascript
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    addUser(name, email) {
        const user = { name, email };
        this.model.addUser(user);
        this.view.render(this.model.getUsers());
    }
}
```

## Поток данных

```
Пользователь → Controller → Model → View → Пользователь
```

## Преимущества

### 1. **Разделение ответственности**

Каждый компонент имеет свою роль.

### 2. **Переиспользование**

Компоненты можно переиспользовать.

### 3. **Тестируемость**

Легче тестировать отдельные компоненты.

## Заключение

**MVC — это:**

1. ✅ Model — данные и логика
2. ✅ View — представление
3. ✅ Controller — координация

**Преимущества:**

- Разделение ответственности
- Переиспользование
- Тестируемость

**Рекомендации:**

- Используйте для организации кода
- Разделяйте ответственность
- Тестируйте компоненты отдельно

MVC — проверенный паттерн для организации приложений.

