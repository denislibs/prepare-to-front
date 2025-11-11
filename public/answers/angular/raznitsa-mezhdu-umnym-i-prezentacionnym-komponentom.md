# Разница между умным и презентационным компонентами?

Разделение компонентов на умные (smart/container) и презентационные (presentational/dumb) компоненты — это важный архитектурный паттерн в Angular, который помогает создавать более поддерживаемый, тестируемый и переиспользуемый код. Понимание разницы между этими типами компонентов и умение правильно их применять является ключевым навыком для создания масштабируемых Angular приложений.

## Что такое презентационный компонент?

Презентационный компонент (Presentational Component, также называемый "dumb" компонентом) — это компонент, который отвечает только за отображение данных и UI. Он не знает откуда берутся данные, не содержит бизнес-логики и не управляет состоянием приложения.

### Характеристики презентационного компонента:

- **Получает данные через @Input()** — данные передаются извне
- **Отправляет события через @Output()** — уведомляет о действиях пользователя
- **Не знает о сервисах** — не инжектит сервисы (кроме UI сервисов)
- **Не управляет состоянием** — не хранит бизнес-данные
- **Переиспользуемый** — может использоваться в разных контекстах
- **Легко тестируется** — простые входные и выходные данные
- **Фокусируется на UI** — только отображение и стилизация

### Пример презентационного компонента:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <img [src]="user.avatar" [alt]="user.name">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Редактировать</button>
      <button (click)="onDelete()">Удалить</button>
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
  // Получает данные через @Input
  @Input() user!: User;
  
  // Отправляет события через @Output
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  
  onEdit() {
    this.edit.emit(this.user);
  }
  
  onDelete() {
    this.delete.emit(this.user);
  }
}
```

**Использование:**
```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <app-user-card
      *ngFor="let user of users"
      [user]="user"
      (edit)="handleEdit($event)"
      (delete)="handleDelete($event)">
    </app-user-card>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  handleEdit(user: User) {
    // Логика редактирования
  }
  
  handleDelete(user: User) {
    // Логика удаления
  }
}
```

## Что такое умный компонент?

Умный компонент (Smart Component, также называемый "container" компонентом) — это компонент, который управляет данными, бизнес-логикой и состоянием. Он знает откуда берутся данные, как их обрабатывать и что с ними делать.

### Характеристики умного компонента:

- **Управляет данными** — получает данные из сервисов, API, Store
- **Содержит бизнес-логику** — обрабатывает данные, выполняет вычисления
- **Управляет состоянием** — хранит и обновляет состояние
- **Использует сервисы** — инжектит и использует сервисы
- **Координирует презентационные компоненты** — управляет их данными
- **Знает о контексте** — понимает где находится в приложении
- **Менее переиспользуемый** — привязан к конкретному контексту

### Пример умного компонента:

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngIf="loading">Загрузка...</div>
    <div *ngIf="error">{{ error }}</div>
    
    <app-user-card
      *ngFor="let user of users"
      [user]="user"
      (edit)="handleEdit($event)"
      (delete)="handleDelete($event)">
    </app-user-card>
    
    <button (click)="loadMore()">Загрузить еще</button>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Ошибка загрузки пользователей';
        this.loading = false;
      }
    });
  }
  
  handleEdit(user: User) {
    // Бизнес-логика редактирования
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.loadUsers(); // Обновить список
      }
    });
  }
  
  handleDelete(user: User) {
    // Бизнес-логика удаления
    if (confirm('Удалить пользователя?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        }
      });
    }
  }
  
  loadMore() {
    // Логика загрузки дополнительных данных
  }
}
```

## Сравнительная таблица

| Характеристика | Презентационный компонент | Умный компонент |
|----------------|---------------------------|-----------------|
| **Назначение** | Отображение UI | Управление данными и логикой |
| **Данные** | Получает через @Input() | Получает из сервисов, API, Store |
| **События** | Отправляет через @Output() | Обрабатывает события |
| **Сервисы** | Не использует (кроме UI) | Активно использует |
| **Состояние** | Не управляет | Управляет состоянием |
| **Бизнес-логика** | Не содержит | Содержит бизнес-логику |
| **Переиспользуемость** | Высокая | Низкая |
| **Тестируемость** | Легко тестировать | Сложнее тестировать |
| **Зависимости** | Минимальные | Множественные |

## Практические примеры

### Пример 1: Список товаров

**Презентационный компонент (ProductCard):**
```typescript
@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <img [src]="product.image" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      <button (click)="onAddToCart()">В корзину</button>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  
  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
```

**Умный компонент (ProductList):**
```typescript
@Component({
  selector: 'app-product-list',
  template: `
    <app-product-card
      *ngFor="let product of products"
      [product]="product"
      (addToCart)="handleAddToCart($event)">
    </app-product-card>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}
  
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  handleAddToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
```

### Пример 2: Форма входа

**Презентационный компонент (LoginForm):**
```typescript
@Component({
  selector: 'app-login-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="email" type="email" placeholder="Email">
      <input [(ngModel)]="password" type="password" placeholder="Пароль">
      <button type="submit">Войти</button>
    </form>
  `
})
export class LoginFormComponent {
  email = '';
  password = '';
  
  @Output() submit = new EventEmitter<{ email: string; password: string }>();
  
  onSubmit() {
    this.submit.emit({
      email: this.email,
      password: this.password
    });
  }
}
```

**Умный компонент (LoginPage):**
```typescript
@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submit)="handleLogin($event)">
    </app-login-form>
  `
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  handleLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        // Обработка ошибки
      }
    });
  }
}
```

## Преимущества разделения

### Преимущества презентационных компонентов:

1. **Переиспользуемость** — можно использовать в разных контекстах
2. **Тестируемость** — легко тестировать с моками данных
3. **Изоляция** — изменения в бизнес-логике не влияют на UI
4. **Простота** — простые компоненты легче понимать
5. **Независимость** — не зависят от конкретных сервисов

### Преимущества умных компонентов:

1. **Централизация логики** — вся бизнес-логика в одном месте
2. **Управление состоянием** — единое место для управления данными
3. **Координация** — координирует работу презентационных компонентов
4. **Интеграция** — интегрирует приложение с внешними системами

## Лучшие практики

### ✅ Делайте:

1. **Разделяйте компоненты** на умные и презентационные
2. **Используйте презентационные компоненты** для переиспользуемого UI
3. **Используйте умные компоненты** для управления данными
4. **Передавайте данные вниз** через @Input()
5. **Отправляйте события вверх** через @Output()

### ❌ Не делайте:

1. **Не смешивайте логику** в презентационных компонентах
2. **Не делайте презентационные компоненты** зависимыми от сервисов
3. **Не храните бизнес-данные** в презентационных компонентах
4. **Не дублируйте логику** в нескольких умных компонентах

## Когда нарушать правило?

Иногда можно нарушить это разделение:

- **Очень простые компоненты** — не нужно разделять
- **Компоненты-обертки** — могут быть и умными, и презентационными
- **Высокоспецифичные компоненты** — которые используются только в одном месте

## Заключение

Разница между умным и презентационным компонентами:

- **Презентационный компонент** — отображает данные, получает через @Input(), отправляет события через @Output(), переиспользуемый, легко тестируется
- **Умный компонент** — управляет данными и логикой, использует сервисы, управляет состоянием, координирует презентационные компоненты

**Помните:** правильное разделение компонентов на умные и презентационные создает более чистую архитектуру, упрощает тестирование, повышает переиспользуемость кода и делает приложение более поддерживаемым. Стремитесь к тому, чтобы большинство компонентов были презентационными, а умные компоненты координировали их работу.

