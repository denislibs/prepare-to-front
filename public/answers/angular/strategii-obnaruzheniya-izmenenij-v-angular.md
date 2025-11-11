# Стратегии обнаружения изменений в Angular?

Angular предоставляет две стратегии обнаружения изменений (Change Detection Strategies), которые определяют, когда и как Angular проверяет компоненты на наличие изменений. Выбор правильной стратегии критически важен для производительности приложения.

## Две стратегии

### 1. **ChangeDetectionStrategy.Default**

Стратегия по умолчанию — проверяет компонент при каждом цикле Change Detection.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.Default, // По умолчанию
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {
  user = { name: 'Иван' };
}
```

**Характеристики:**
- Проверяет компонент **при каждом цикле** Change Detection
- Работает всегда, даже если данные не изменились
- Может быть медленнее на больших приложениях
- Не требует иммутабельных данных

### 2. **ChangeDetectionStrategy.OnPush**

Оптимизированная стратегия — проверяет компонент только при определенных условиях.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush, // Оптимизированная
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {
  @Input() user: any;
}
```

**Характеристики:**
- Проверяет компонент **только когда:**
  - Изменяются `@Input()` свойства (новая ссылка)
  - Происходит событие в компоненте
  - Observable испускает новое значение
  - Явно вызывается `ChangeDetectorRef.detectChanges()`
- Требует **иммутабельных данных**
- Более производительная стратегия

## Когда OnPush проверяет компонент?

### 1. Изменение @Input() свойств

```typescript
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<p>{{ user.name }}</p>'
})
export class UserCardComponent {
  @Input() user: any;
  
  // Компонент проверяется только при изменении @Input() user
  // Новая ссылка на объект = изменение
}
```

**Родительский компонент:**

```typescript
@Component({
  selector: 'app-parent',
  template: '<app-user-card [user]="user"></app-user-card>'
})
export class ParentComponent {
  user = { name: 'Иван' };
  
  updateUser() {
    // ✅ Хорошо - новая ссылка
    this.user = { ...this.user, name: 'Петр' };
    // OnPush обнаружит изменение
    
    // ❌ Плохо - мутация объекта
    // this.user.name = 'Петр';
    // OnPush НЕ обнаружит изменение
  }
}
```

### 2. События в компоненте

```typescript
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="increment()">+</button>
    <p>{{ count }}</p>
  `
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++; // Событие click запустит проверку
    // OnPush обнаружит изменение
  }
}
```

### 3. Observable испускает значение

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<p>{{ data }}</p>'
})
export class DataComponent {
  data: any;
  
  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      // Нужно явно запустить проверку
      this.cdr.markForCheck();
    });
  }
}
```

### 4. Явный вызов ChangeDetectorRef

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<p>{{ message }}</p>'
})
export class ExampleComponent {
  message = '';
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateMessage() {
    this.message = 'Новое сообщение';
    // Явно запустить проверку
    this.cdr.detectChanges();
  }
}
```

## Практические примеры

### Пример 1: OnPush с иммутабельными данными

```typescript
@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="addUser()">Добавить</button>
    <app-user-card 
      *ngFor="let user of users; trackBy: trackById"
      [user]="user"
    ></app-user-card>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  addUser() {
    // ✅ Создание нового массива (иммутабельно)
    this.users = [...this.users, newUser];
    // OnPush обнаружит изменение
  }
  
  updateUser(id: number, newName: string) {
    // ✅ Создание нового массива с обновленным пользователем
    this.users = this.users.map(user => 
      user.id === id ? { ...user, name: newName } : user
    );
    // OnPush обнаружит изменение
  }
  
  trackById(index: number, user: User): number {
    return user.id;
  }
}
```

### Пример 2: OnPush с Observable

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    // Async pipe автоматически запускает проверку
    this.users$ = this.userService.getUsers();
  }
}
```

### Пример 3: Комбинирование стратегий

```typescript
// Родительский компонент - Default
@Component({
  selector: 'app-parent',
  changeDetection: ChangeDetectionStrategy.Default,
  template: '<app-child [data]="data"></app-child>'
})
export class ParentComponent {
  data = { value: 1 };
  
  updateData() {
    this.data.value++; // Default всегда проверяет
  }
}

// Дочерний компонент - OnPush
@Component({
  selector: 'app-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<p>{{ data.value }}</p>'
})
export class ChildComponent {
  @Input() data: any;
  
  // Проверяется только при изменении @Input()
}
```

## Сравнение стратегий

| Характеристика | Default | OnPush |
|---------------|--------|--------|
| Частота проверки | При каждом цикле | Только при изменениях |
| Производительность | Медленнее | Быстрее |
| Требования | Нет | Иммутабельные данные |
| Сложность | Проще | Сложнее |
| Использование | По умолчанию | Для оптимизации |

## Лучшие практики

### ✅ Используйте OnPush когда:

1. **Компонент получает данные через @Input()**
2. **Данные иммутабельны**
3. **Нужна оптимизация производительности**
4. **Компонент использует Observable с async pipe**

### ✅ Используйте Default когда:

1. **Компонент часто мутирует данные**
2. **Простота важнее производительности**
3. **Небольшие приложения**

### ✅ Делайте:

1. **Используйте иммутабельные данные** с OnPush
2. **Используйте async pipe** для Observable
3. **Используйте trackBy** для *ngFor
4. **Используйте markForCheck()** при необходимости

### ❌ Не делайте:

1. **Не мутируйте объекты** при использовании OnPush
2. **Не забывайте markForCheck()** для Observable
3. **Не используйте OnPush** без понимания требований

## Заключение

Стратегии обнаружения изменений в Angular:

- **Default** — проверяет при каждом цикле, проще в использовании
- **OnPush** — проверяет только при изменениях, более производительная

**Рекомендации:**
- Используйте **OnPush** везде, где возможно
- Работайте с **иммутабельными данными**
- Используйте **async pipe** для Observable
- Используйте **markForCheck()** при необходимости

**Помните:** правильный выбор стратегии Change Detection критически важен для производительности больших Angular приложений. OnPush может значительно улучшить производительность, но требует работы с иммутабельными данными.

