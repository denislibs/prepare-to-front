# Что такое Data Binding в Angular?

Data Binding (привязка данных) в Angular — это механизм синхронизации данных между компонентом и шаблоном. Angular поддерживает несколько типов привязки данных для создания интерактивных приложений.

## Типы Data Binding

### 1. **Interpolation (Интерполяция)** - `{{ }}`

Односторонняя привязка от компонента к шаблону.

```typescript
@Component({
  selector: 'app-user',
  template: '<p>Привет, {{ name }}!</p>'
})
export class UserComponent {
  name = 'Иван';
}
```

**Результат:** `<p>Привет, Иван!</p>`

### 2. **Property Binding (Привязка свойств)** - `[property]`

Односторонняя привязка от компонента к свойству DOM элемента.

```typescript
@Component({
  selector: 'app-image',
  template: '<img [src]="imageUrl" [alt]="imageAlt">'
})
export class ImageComponent {
  imageUrl = 'https://example.com/image.jpg';
  imageAlt = 'Описание изображения';
}
```

**Примеры:**
```html
<!-- Привязка к атрибутам -->
<div [id]="elementId">Контент</div>
<button [disabled]="isDisabled">Кнопка</button>

<!-- Привязка к классам -->
<div [class.active]="isActive">Элемент</div>
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">Элемент</div>

<!-- Привязка к стилям -->
<div [style.color]="textColor">Текст</div>
<div [ngStyle]="{'color': textColor, 'font-size': fontSize}">Текст</div>
```

### 3. **Event Binding (Привязка событий)** - `(event)`

Односторонняя привязка от шаблона к компоненту (обработка событий).

```typescript
@Component({
  selector: 'app-button',
  template: '<button (click)="onClick()">Нажми меня</button>'
})
export class ButtonComponent {
  onClick() {
    console.log('Кнопка нажата!');
  }
}
```

**Примеры:**
```html
<!-- События мыши -->
<button (click)="handleClick()">Клик</button>
<button (mouseenter)="handleMouseEnter()">Наведение</button>

<!-- События клавиатуры -->
<input (keyup)="handleKeyUp($event)">
<input (keydown.enter)="handleEnter()">

<!-- События формы -->
<form (submit)="handleSubmit($event)">
  <input (input)="handleInput($event)">
</form>
```

### 4. **Two-Way Binding (Двусторонняя привязка)** - `[(ngModel)]`

Синхронизация данных в обе стороны: от компонента к шаблону и обратно.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <input [(ngModel)]="name" placeholder="Введите имя">
    <p>Привет, {{ name }}!</p>
  `,
  imports: [FormsModule]
})
export class FormComponent {
  name = '';
}
```

**Как это работает:**
- `[(ngModel)]` = `[ngModel]` + `(ngModelChange)`
- Изменение в input → обновление в компоненте
- Изменение в компоненте → обновление в input

### 5. **Attribute Binding (Привязка атрибутов)** - `[attr.attribute]`

Привязка к HTML атрибутам (не свойствам DOM).

```typescript
@Component({
  selector: 'app-button',
  template: '<button [attr.aria-label]="buttonLabel">Кнопка</button>'
})
export class ButtonComponent {
  buttonLabel = 'Нажми для отправки формы';
}
```

## Практические примеры

### Пример 1: Комбинирование типов привязки

```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <div>
      <input 
        [value]="user.name" 
        (input)="user.name = $event.target.value"
        placeholder="Имя"
      >
      <p>Имя: {{ user.name }}</p>
      
      <button 
        [disabled]="!user.name"
        (click)="saveUser()"
      >
        Сохранить
      </button>
    </div>
  `
})
export class UserFormComponent {
  user = { name: '' };
  
  saveUser() {
    console.log('Сохранение:', this.user);
  }
}
```

### Пример 2: Двусторонняя привязка

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="decrement()">-</button>
    <input [(ngModel)]="count" type="number">
    <button (click)="increment()">+</button>
    <p>Счетчик: {{ count }}</p>
  `,
  imports: [FormsModule]
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
}
```

### Пример 3: Привязка к объектам

```typescript
@Component({
  selector: 'app-product',
  template: `
    <div [ngClass]="getProductClasses()">
      <h3>{{ product.name }}</h3>
      <p [style.color]="product.price > 100 ? 'red' : 'green'">
        Цена: {{ product.price }}
      </p>
      <button 
        [disabled]="!product.inStock"
        (click)="addToCart()"
      >
        В корзину
      </button>
    </div>
  `
})
export class ProductComponent {
  product = {
    name: 'Товар',
    price: 150,
    inStock: true
  };
  
  getProductClasses() {
    return {
      'product': true,
      'expensive': this.product.price > 100,
      'out-of-stock': !this.product.inStock
    };
  }
  
  addToCart() {
    console.log('Добавлено в корзину:', this.product);
  }
}
```

## Сравнение типов привязки

| Тип | Синтаксис | Направление | Использование |
|-----|-----------|-------------|---------------|
| Interpolation | `{{ value }}` | Компонент → Шаблон | Отображение данных |
| Property | `[property]="value"` | Компонент → Шаблон | Установка свойств |
| Event | `(event)="handler()"` | Шаблон → Компонент | Обработка событий |
| Two-way | `[(ngModel)]="value"` | Обе стороны | Формы, интерактивные элементы |
| Attribute | `[attr.attribute]="value"` | Компонент → Шаблон | HTML атрибуты |

## Лучшие практики

### ✅ Делайте:

1. **Используйте интерполяцию** для простого отображения данных
2. **Используйте property binding** для динамических свойств
3. **Используйте event binding** для обработки событий
4. **Используйте two-way binding** для форм

### ❌ Не делайте:

1. **Не используйте интерполяцию** для сложных выражений (используйте методы)
2. **Не смешивайте** интерполяцию и property binding без необходимости
3. **Не забывайте** импортировать `FormsModule` для `[(ngModel)]`

## Заключение

Data Binding в Angular — это мощный механизм синхронизации данных:

- **Interpolation** — `{{ }}` для отображения данных
- **Property Binding** — `[property]` для свойств элементов
- **Event Binding** — `(event)` для обработки событий
- **Two-way Binding** — `[(ngModel)]` для двусторонней синхронизации
- **Attribute Binding** — `[attr.attribute]` для HTML атрибутов

**Помните:** правильное использование типов привязки данных делает код более читаемым, поддерживаемым и производительным.

