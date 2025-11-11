# Что такое пользовательский элемент (Custom Element)? Как он работает?

Пользовательские элементы (Custom Elements) — это веб-стандарт, который позволяет создавать собственные HTML элементы с собственным поведением и стилями. Custom Elements являются частью Web Components стандарта и позволяют создавать переиспользуемые компоненты, которые могут работать в любом фреймворке или даже без фреймворка. Понимание Custom Elements и их интеграции с Angular критически важно для создания компонентов, которые могут использоваться вне Angular приложений.

## Что такое Custom Element?

Custom Element — это пользовательский HTML элемент, определенный разработчиком, который имеет собственное поведение и стили. Custom Elements расширяют возможности HTML, позволяя создавать семантические и переиспользуемые компоненты.

### Характеристики Custom Elements:

- ✅ **Собственные HTML элементы** — например, `<my-button>`, `<user-card>`
- ✅ **Собственное поведение** — JavaScript логика
- ✅ **Инкапсуляция** — изолированные стили и DOM
- ✅ **Жизненный цикл** — хуки для управления элементом
- ✅ **Кросс-фреймворковая совместимость** — работают везде

## Как работают Custom Elements?

### Базовый пример (Vanilla JavaScript):

```typescript
// Определение Custom Element
class MyButton extends HTMLElement {
  constructor() {
    super();
    // Инициализация элемента
  }
  
  connectedCallback() {
    // Вызывается при добавлении элемента в DOM
    this.innerHTML = '<button>Нажми меня</button>';
    this.querySelector('button')?.addEventListener('click', () => {
      this.handleClick();
    });
  }
  
  disconnectedCallback() {
    // Вызывается при удалении элемента из DOM
    // Очистка ресурсов
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // Вызывается при изменении атрибутов
  }
  
  static get observedAttributes() {
    // Список атрибутов, изменения которых отслеживаются
    return ['disabled', 'label'];
  }
  
  handleClick() {
    // Обработка клика
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { timestamp: Date.now() }
    }));
  }
}

// Регистрация Custom Element
customElements.define('my-button', MyButton);
```

**Использование:**
```html
<my-button label="Кнопка"></my-button>
```

## Жизненный цикл Custom Element

### 1. **constructor()**

Вызывается при создании экземпляра элемента.

```typescript
constructor() {
  super();
  // Инициализация
}
```

### 2. **connectedCallback()**

Вызывается при добавлении элемента в DOM.

```typescript
connectedCallback() {
  // Элемент добавлен в DOM
  // Можно безопасно работать с DOM
}
```

### 3. **disconnectedCallback()**

Вызывается при удалении элемента из DOM.

```typescript
disconnectedCallback() {
  // Элемент удален из DOM
  // Очистка подписок, таймеров
}
```

### 4. **attributeChangedCallback()**

Вызывается при изменении отслеживаемых атрибутов.

```typescript
attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  // Атрибут изменился
  if (name === 'disabled') {
    this.updateDisabledState(newValue);
  }
}
```

### 5. **adoptedCallback()**

Вызывается при перемещении элемента в другой документ.

```typescript
adoptedCallback() {
  // Элемент перемещен в другой документ
}
```

## Интеграция с Angular

Angular предоставляет возможность преобразования Angular компонентов в Custom Elements.

### Установка зависимостей:

```bash
ng add @angular/elements
```

### Создание Angular компонента:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Редактировать</button>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  
  onEdit() {
    this.edit.emit(this.user);
  }
}
```

### Регистрация как Custom Element:

```typescript
import { Injector, createCustomElement } from '@angular/elements';
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [BrowserModule]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  
  ngDoBootstrap() {
    // Преобразование Angular компонента в Custom Element
    const userCardElement = createCustomElement(UserCardComponent, {
      injector: this.injector
    });
    
    // Регистрация Custom Element
    customElements.define('user-card', userCardElement);
  }
}
```

### Использование Custom Element:

```html
<!-- В любом HTML, даже вне Angular -->
<user-card 
  user='{"name":"Иван","email":"ivan@example.com"}'
  (edit)="handleEdit($event)">
</user-card>
```

## Работа с данными в Custom Elements

### Передача данных через атрибуты:

```typescript
@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  // Для Custom Elements нужно обрабатывать строковые атрибуты
  @Input() set productData(value: string) {
    if (value) {
      this.product = JSON.parse(value);
    }
  }
}
```

### События Custom Element:

```typescript
@Component({
  selector: 'app-button',
  template: '<button (click)="handleClick()">{{ label }}</button>'
})
export class ButtonComponent {
  @Input() label = 'Кнопка';
  @Output() buttonClick = new EventEmitter<void>();
  
  handleClick() {
    this.buttonClick.emit();
  }
}
```

## Преимущества Custom Elements

### 1. **Кросс-фреймворковая совместимость**

Custom Elements работают в любом фреймворке или без фреймворка.

```html
<!-- В React приложении -->
<user-card user='{"name":"Иван"}'></user-card>

<!-- В Vue приложении -->
<user-card user='{"name":"Иван"}'></user-card>

<!-- В обычном HTML -->
<user-card user='{"name":"Иван"}'></user-card>
```

### 2. **Переиспользуемость**

Один компонент может использоваться в разных проектах.

### 3. **Инкапсуляция**

Shadow DOM обеспечивает изоляцию стилей и DOM.

### 4. **Стандарт веб-платформы**

Использует нативные возможности браузера.

## Ограничения

### ⚠️ Ограничения Custom Elements:

- Не все браузеры поддерживают (нужны полифиллы для старых)
- Ограниченная интеграция с Angular (нет полной функциональности)
- Сложность передачи сложных данных
- Ограниченная поддержка Angular директив

## Практический пример

### Создание библиотеки компонентов:

```typescript
// button-element.module.ts
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [BrowserModule]
})
export class ButtonElementModule {
  constructor(private injector: Injector) {
    const buttonElement = createCustomElement(ButtonComponent, {
      injector: this.injector
    });
    customElements.define('app-button', buttonElement);
  }
}
```

## Заключение

Custom Elements:

- **Пользовательские HTML элементы** — собственные элементы с поведением
- **Кросс-фреймворковая совместимость** — работают везде
- **Жизненный цикл** — хуки для управления
- **Интеграция с Angular** — через @angular/elements

**Помните:** Custom Elements позволяют создавать переиспользуемые компоненты, которые могут работать вне Angular приложений. Используйте их когда нужно создать компоненты для использования в разных проектах или фреймворках.

