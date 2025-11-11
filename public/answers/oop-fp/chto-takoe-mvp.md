# Что такое MVP?

MVP (Model-View-Presenter) — это архитектурный паттерн, который является вариацией MVC. В MVP Presenter берет на себя больше ответственности, чем Controller в MVC, обеспечивая более тесную связь между View и логикой.

## Что такое MVP?

MVP — это архитектурный паттерн, который разделяет приложение на Model, View и Presenter, где Presenter обрабатывает всю логику представления.

## Компоненты MVP

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
}
```

### 2. **View (Представление)**

Пассивный компонент, отображает данные.

```javascript
class UserView {
    showUsers(users) {
        // Отображение пользователей
    }
    
    getUserInput() {
        // Получение ввода пользователя
    }
}
```

### 3. **Presenter (Презентер)**

Обрабатывает всю логику представления.

```javascript
class UserPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    addUser(name, email) {
        const user = { name, email };
        this.model.addUser(user);
        this.view.showUsers(this.model.users);
    }
}
```

## Различия с MVC

| Характеристика | MVC | MVP |
|----------------|-----|-----|
| View | Активная | Пассивная |
| Логика | В Controller | В Presenter |
| Связь | View знает о Model | View не знает о Model |

## Заключение

**MVP — это:**

1. ✅ Model — данные
2. ✅ View — пассивное представление
3. ✅ Presenter — вся логика

**Преимущества:**

- Четкое разделение
- Тестируемость
- Пассивная View

**Рекомендации:**

- Используйте для четкого разделения
- Делайте View пассивной
- Тестируйте Presenter

MVP — хороший выбор для тестируемых приложений.

