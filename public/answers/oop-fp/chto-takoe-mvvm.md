# Что такое MVVM?

MVVM (Model-View-ViewModel) — это архитектурный паттерн, который разделяет приложение на три компонента: Model, View и ViewModel. MVVM особенно популярен в фреймворках с двусторонней привязкой данных.

## Что такое MVVM?

MVVM — это архитектурный паттерн, который разделяет логику представления от бизнес-логики через ViewModel, обеспечивая двустороннюю привязку данных.

## Компоненты MVVM

### 1. **Model (Модель)**

Представляет данные и бизнес-логику.

```javascript
class UserModel {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}
```

### 2. **View (Представление)**

Отображает UI и привязана к ViewModel.

```html
<!-- Vue.js пример -->
<template>
    <div>
        <input v-model="viewModel.name" />
        <input v-model="viewModel.email" />
        <button @click="viewModel.save()">Сохранить</button>
    </div>
</template>
```

### 3. **ViewModel (Модель представления)**

Связывает View и Model, содержит логику представления.

```javascript
class UserViewModel {
    constructor() {
        this.name = '';
        this.email = '';
        this.model = null;
    }
    
    save() {
        this.model = new UserModel(this.name, this.email);
        // Сохранение
    }
}
```

## Преимущества

### 1. **Двусторонняя привязка**

Автоматическая синхронизация данных.

### 2. **Разделение логики**

Четкое разделение между View и логикой.

### 3. **Тестируемость**

ViewModel можно тестировать отдельно.

## Заключение

**MVVM — это:**

1. ✅ Model — данные
2. ✅ View — UI
3. ✅ ViewModel — связующее звено

**Преимущества:**

- Двусторонняя привязка
- Разделение логики
- Тестируемость

**Рекомендации:**

- Используйте для приложений с двусторонней привязкой
- Разделяйте ViewModel и View
- Тестируйте ViewModel

MVVM — популярный паттерн для современных фреймворков.

