# Почему импортировать сервис из SharedModule в lazy loaded модуль считается плохой практикой?

Импортирование сервисов из SharedModule в lazy loaded модули считается плохой практикой по нескольким важным причинам, связанным с производительностью, управлением зависимостями и архитектурой приложения. Понимание этих проблем критически важно для создания эффективных и масштабируемых Angular приложений.

## Проблема с сервисами в SharedModule

### Что происходит при импорте SharedModule с сервисами?

Когда SharedModule содержит сервисы в массиве `providers`, и этот модуль импортируется в lazy loaded модуль, создается **новый экземпляр сервиса** для каждого lazy loaded модуля. Это приводит к нескольким серьезным проблемам.

## Основные проблемы

### 1. **Множественные экземпляры сервисов**

Каждый lazy loaded модуль получает свой собственный экземпляр сервиса, что нарушает принцип singleton и может привести к неожиданному поведению.

```typescript
// ❌ ПЛОХАЯ ПРАКТИКА
// shared.module.ts
@NgModule({
  declarations: [ButtonComponent, CardComponent],
  providers: [
    UserService, // Сервис в providers
    ConfigService
  ],
  exports: [ButtonComponent, CardComponent, CommonModule]
})
export class SharedModule { }

// user.module.ts (lazy loaded)
@NgModule({
  declarations: [UserListComponent],
  imports: [SharedModule] // Импорт SharedModule
})
export class UserModule { }

// product.module.ts (lazy loaded)
@NgModule({
  declarations: [ProductListComponent],
  imports: [SharedModule] // Импорт SharedModule
})
export class ProductModule { }
```

**Проблема:**
- UserModule получит свой экземпляр UserService
- ProductModule получит свой экземпляр UserService
- Это два разных экземпляра, не синхронизированные между собой

```typescript
// В UserModule
@Component({...})
export class UserListComponent {
  constructor(private userService: UserService) {
    this.userService.setUsers([...]);
    // Изменения в этом экземпляре
  }
}

// В ProductModule
@Component({...})
export class ProductListComponent {
  constructor(private userService: UserService) {
    // Это ДРУГОЙ экземпляр UserService!
    // Не видит изменения из UserModule
    const users = this.userService.getUsers(); // Может быть пустым
  }
}
```

### 2. **Увеличение размера бандла**

Сервисы из SharedModule включаются в каждый lazy loaded модуль, что увеличивает размер каждого бандла.

```typescript
// Если SharedModule содержит большие сервисы
@NgModule({
  providers: [
    LargeService, // Большой сервис с множеством зависимостей
    AnotherLargeService
  ]
})
export class SharedModule { }

// Каждый lazy loaded модуль будет содержать эти сервисы
// user.module.js - содержит LargeService
// product.module.js - содержит LargeService (дублирование!)
// order.module.js - содержит LargeService (дублирование!)
```

**Результат:**
- Дублирование кода в каждом lazy модуле
- Увеличение размера бандлов
- Медленная загрузка модулей

### 3. **Нарушение singleton паттерна**

Сервисы должны быть singleton (один экземпляр на приложение), но при импорте из SharedModule создаются множественные экземпляры.

```typescript
// Сервис должен быть singleton
@Injectable()
export class StateService {
  private state: any = {};
  
  setState(key: string, value: any) {
    this.state[key] = value;
  }
  
  getState(key: string) {
    return this.state[key];
  }
}

// ❌ При импорте из SharedModule в lazy модули
// Каждый модуль получит свой экземпляр StateService
// Состояние не будет синхронизировано между модулями
```

### 4. **Проблемы с зависимостями**

Сложные зависимости между сервисами могут привести к проблемам при создании множественных экземпляров.

```typescript
@Injectable()
export class AuthService {
  private token: string | null = null;
  
  setToken(token: string) {
    this.token = token;
  }
  
  isAuthenticated(): boolean {
    return this.token !== null;
  }
}

@Injectable()
export class ApiService {
  constructor(private authService: AuthService) {}
  
  getData() {
    if (!this.authService.isAuthenticated()) {
      // Проблема: если ApiService в одном модуле,
      // а AuthService в другом - они могут быть разными экземплярами
    }
  }
}
```

## Правильные решения

### Решение 1: Использование providedIn: 'root'

Самое простое и рекомендуемое решение — использовать `providedIn: 'root'` в сервисах.

```typescript
// ✅ ПРАВИЛЬНО
// user.service.ts
@Injectable({
  providedIn: 'root' // Singleton для всего приложения
})
export class UserService {
  private users: User[] = [];
  
  getUsers(): User[] {
    return this.users;
  }
  
  setUsers(users: User[]) {
    this.users = users;
  }
}

// shared.module.ts - БЕЗ providers
@NgModule({
  declarations: [ButtonComponent, CardComponent],
  exports: [ButtonComponent, CardComponent, CommonModule]
  // НЕТ providers!
})
export class SharedModule { }
```

**Преимущества:**
- ✅ Один экземпляр на все приложение
- ✅ Tree-shaking — неиспользуемые сервисы удаляются
- ✅ Не включается в lazy модули
- ✅ Автоматическая регистрация

### Решение 2: Core модуль для сервисов

Создание отдельного Core модуля для сервисов (если не используете providedIn: 'root').

```typescript
// core.module.ts
@NgModule({
  providers: [
    UserService,
    ConfigService,
    AuthService
  ]
})
export class CoreModule {
  // Защита от повторного импорта
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Импортируйте только в AppModule.');
    }
  }
}

// app.module.ts
@NgModule({
  imports: [
    BrowserModule,
    CoreModule // Импорт только в AppModule
  ]
})
export class AppModule { }

// shared.module.ts - БЕЗ сервисов
@NgModule({
  declarations: [ButtonComponent, CardComponent],
  exports: [ButtonComponent, CardComponent]
})
export class SharedModule { }
```

### Решение 3: Отдельные модули для сервисов

Создание отдельных модулей для групп сервисов.

```typescript
// services.module.ts
@NgModule({
  providers: [
    UserService,
    ProductService
  ]
})
export class ServicesModule { }

// app.module.ts
@NgModule({
  imports: [
    BrowserModule,
    ServicesModule // Только в AppModule
  ]
})
export class AppModule { }
```

## Что должно быть в SharedModule?

### ✅ Должно быть:

- Компоненты UI (Button, Card, Modal и т.д.)
- Директивы (Highlight, AutoFocus и т.д.)
- Пайпы (Truncate, FormatCurrency и т.д.)
- Модули (CommonModule, FormsModule и т.д.)

### ❌ НЕ должно быть:

- Сервисы
- Guards
- Interceptors
- Resolvers

## Практический пример проблемы

```typescript
// ❌ ПЛОХО
// shared.module.ts
@NgModule({
  declarations: [ButtonComponent],
  providers: [
    CounterService // Сервис в SharedModule
  ],
  exports: [ButtonComponent]
})
export class SharedModule { }

// user.module.ts (lazy)
@NgModule({
  imports: [SharedModule]
})
export class UserModule { }

// product.module.ts (lazy)
@NgModule({
  imports: [SharedModule]
})
export class ProductModule { }

// Проблема: два разных экземпляра CounterService
// UserModule имеет свой CounterService
// ProductModule имеет свой CounterService
// Они не синхронизированы!
```

```typescript
// ✅ ХОРОШО
// counter.service.ts
@Injectable({
  providedIn: 'root' // Singleton
})
export class CounterService {
  private count = 0;
  
  increment() {
    this.count++;
  }
  
  getCount() {
    return this.count;
  }
}

// shared.module.ts
@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
  // НЕТ providers!
})
export class SharedModule { }

// Теперь все модули используют один экземпляр CounterService
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте providedIn: 'root'** — для всех сервисов
2. **Не включайте сервисы в SharedModule** — только UI элементы
3. **Используйте Core модуль** — если нужен контроль над providers
4. **Документируйте модули** — что содержит каждый модуль

### ❌ Не делайте:

1. **Не добавляйте сервисы в providers SharedModule** — плохая практика
2. **Не импортируйте SharedModule с сервисами** — в lazy модули
3. **Не создавайте множественные экземпляры** — используйте singleton
4. **Не дублируйте код** — используйте providedIn: 'root'

## Заключение

Почему импортировать сервис из SharedModule в lazy loaded модуль плохо:

- **Множественные экземпляры** — каждый модуль получает свой экземпляр
- **Увеличение размера бандла** — дублирование кода в каждом модуле
- **Нарушение singleton** — сервисы должны быть один раз
- **Проблемы с синхронизацией** — разные экземпляры не синхронизированы

**Помните:** используйте `providedIn: 'root'` для сервисов вместо добавления их в SharedModule. SharedModule должен содержать только переиспользуемые UI элементы (компоненты, директивы, пайпы), а не сервисы. Это обеспечивает правильную архитектуру, производительность и избежание проблем с множественными экземплярами.

