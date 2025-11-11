# Как трансформировать Angular-компоненты в пользовательские элементы?

Трансформация Angular компонентов в пользовательские элементы (Custom Elements) позволяет использовать Angular компоненты вне Angular приложений, в любом HTML документе или другом фреймворке. Это мощная возможность для создания переиспользуемых компонентов и библиотек. Понимание процесса трансформации критически важно для создания компонентов, которые могут работать независимо от Angular.

## Процесс трансформации

### Шаг 1: Установка зависимостей

```bash
ng add @angular/elements
```

Это установит необходимые пакеты для работы с Custom Elements.

### Шаг 2: Создание Angular компонента

Создайте обычный Angular компонент:

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
      background: white;
    }
    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
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

### Шаг 3: Регистрация как Custom Element

В модуле приложения зарегистрируйте компонент как Custom Element:

```typescript
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [BrowserModule],
  // НЕ добавляйте в bootstrap, если используете DoBootstrap
  // bootstrap: [AppComponent]
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

### Шаг 4: Использование Custom Element

После регистрации компонент можно использовать в любом HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="path/to/angular-elements-bundle.js"></script>
</head>
<body>
  <!-- Использование Custom Element -->
  <user-card 
    user='{"name":"Иван","email":"ivan@example.com"}'
    (edit)="handleEdit($event)">
  </user-card>
  
  <script>
    function handleEdit(event) {
      console.log('Edit event:', event.detail);
    }
  </script>
</body>
</html>
```

## Работа с данными

### Передача объектов через атрибуты

Поскольку атрибуты HTML могут быть только строками, нужно сериализовать объекты:

```typescript
@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <p>{{ product.description }}</p>
    </div>
  `
})
export class ProductCardComponent {
  private _product!: Product;
  
  @Input() 
  set product(value: Product) {
    this._product = value;
  }
  
  get product(): Product {
    return this._product;
  }
  
  // Для Custom Elements - обработка строкового атрибута
  @Input() 
  set productData(value: string) {
    if (value) {
      try {
        this._product = JSON.parse(value);
      } catch (e) {
        console.error('Ошибка парсинга productData:', e);
      }
    }
  }
}
```

**Использование:**
```html
<product-card 
  product-data='{"name":"Товар","price":100,"description":"Описание"}'>
</product-card>
```

### Обработка событий

События Custom Elements работают через CustomEvent:

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

**Использование:**
```html
<app-button 
  label="Нажми меня"
  (button-click)="handleClick()">
</app-button>

<script>
  document.querySelector('app-button')
    .addEventListener('buttonClick', (event) => {
      console.log('Button clicked!');
    });
</script>
```

## Создание библиотеки Custom Elements

### Структура проекта:

```
elements-library/
  src/
    lib/
      button/
        button.component.ts
      user-card/
        user-card.component.ts
      elements.module.ts
```

### elements.module.ts:

```typescript
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ButtonComponent } from './button/button.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    UserCardComponent
  ],
  imports: [BrowserModule]
})
export class ElementsModule {
  constructor(private injector: Injector) {
    // Регистрация всех Custom Elements
    this.registerCustomElements();
  }
  
  private registerCustomElements() {
    // Регистрация ButtonComponent
    const buttonElement = createCustomElement(ButtonComponent, {
      injector: this.injector
    });
    customElements.define('app-button', buttonElement);
    
    // Регистрация UserCardComponent
    const userCardElement = createCustomElement(UserCardComponent, {
      injector: this.injector
    });
    customElements.define('user-card', userCardElement);
  }
}
```

## Сборка для production

### Настройка angular.json:

```json
{
  "projects": {
    "elements-library": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/elements",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### main.ts для библиотеки:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsModule } from './elements.module';

platformBrowserDynamic()
  .bootstrapModule(ElementsModule)
  .catch(err => console.error(err));
```

## Обработка зависимостей

### Использование сервисов:

```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData(): Observable<any> {
    return this.http.get('/api/data');
  }
}

@Component({
  selector: 'app-data-display',
  template: '<div>{{ data$ | async | json }}</div>'
})
export class DataDisplayComponent {
  data$ = this.dataService.getData();
  
  constructor(private dataService: DataService) {}
}
```

## Ограничения и решения

### Ограничения:

1. **Только строковые атрибуты** — объекты нужно сериализовать
2. **Ограниченная поддержка Angular директив** — не все директивы работают
3. **Размер бандла** — включает Angular runtime
4. **Полифиллы** — нужны для старых браузеров

### Решения:

1. **Используйте JSON.stringify** для объектов
2. **Избегайте сложных директив** в Custom Elements
3. **Оптимизируйте бандл** — tree-shaking, минификация
4. **Включайте полифиллы** для поддержки старых браузеров

## Практический пример

### Полный пример компонента:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card" [class.active]="user.active">
      <div class="user-header">
        <h3>{{ user.name }}</h3>
        <span class="badge" *ngIf="user.verified">✓</span>
      </div>
      <p class="email">{{ user.email }}</p>
      <div class="actions">
        <button (click)="onEdit()">Редактировать</button>
        <button (click)="onDelete()">Удалить</button>
      </div>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
    }
    .user-card.active {
      border-color: #007bff;
    }
    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .badge {
      color: green;
      font-weight: bold;
    }
    .actions button {
      margin-right: 8px;
    }
  `]
})
export class UserCardComponent {
  private _user!: User;
  
  @Input() 
  set user(value: User | string) {
    if (typeof value === 'string') {
      this._user = JSON.parse(value);
    } else {
      this._user = value;
    }
  }
  
  get user(): User {
    return this._user;
  }
  
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();
  
  onEdit() {
    this.edit.emit(this.user);
  }
  
  onDelete() {
    this.delete.emit(this.user.id);
  }
}
```

## Заключение

Трансформация Angular компонентов в Custom Elements:

- **Установка @angular/elements** — необходимый пакет
- **Создание компонента** — обычный Angular компонент
- **Регистрация через createCustomElement** — преобразование в Custom Element
- **Использование в любом HTML** — кросс-фреймворковая совместимость

**Помните:** трансформация Angular компонентов в Custom Elements позволяет создавать переиспользуемые компоненты, которые могут работать вне Angular приложений. Используйте это для создания библиотек компонентов или интеграции Angular компонентов в другие проекты.

