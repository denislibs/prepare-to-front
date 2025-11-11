# Принцип работы ChangeDetectionStrategy.onPush?

`ChangeDetectionStrategy.OnPush` — это стратегия обнаружения изменений в Angular, которая оптимизирует производительность компонента, уменьшая количество проверок изменений. Понимание принципа работы OnPush стратегии критически важно для создания производительных Angular приложений и правильной работы с изменяемыми и неизменяемыми данными.

## Что такое Change Detection?

Change Detection (обнаружение изменений) — это процесс, при котором Angular проверяет, изменились ли данные компонента, и обновляет DOM при необходимости. По умолчанию Angular использует стратегию `Default`, которая проверяет все компоненты при каждом цикле обнаружения изменений.

## Стратегии Change Detection

Angular предоставляет две стратегии:

### 1. **Default (по умолчанию)**

- Проверяет компонент при каждом цикле Change Detection
- Проверяет все свойства компонента
- Может быть медленным для больших приложений

### 2. **OnPush**

- Проверяет компонент только при определенных условиях
- Требует неизменяемых данных или Observable
- Значительно улучшает производительность

## Принцип работы OnPush

### Когда OnPush компонент проверяется?

Компонент с OnPush стратегией проверяется только в следующих случаях:

1. **Изменение ссылки @Input()** — когда изменяется ссылка на объект, переданный через @Input()
2. **События компонента** — когда происходит событие в самом компоненте или его дочерних компонентах
3. **Observable с async pipe** — когда Observable испускает новое значение и используется async pipe
4. **Явный вызов** — когда вызывается `ChangeDetectorRef.detectChanges()` или `markForCheck()`

### Как это работает?

```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div>
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>Счетчик: {{ count }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
  count = 0;
  
  increment() {
    this.count++; // ❌ НЕ обновится автоматически!
    // Нужно использовать ChangeDetectorRef
  }
}
```

## Работа с неизменяемыми данными

OnPush работает правильно только с неизменяемыми (immutable) данными.

### ❌ Неправильно (мутация):

```typescript
@Component({
  selector: 'app-parent',
  template: '<app-user-card [user]="user"></app-user-card>'
})
export class ParentComponent {
  user = { name: 'Иван', email: 'ivan@example.com' };
  
  updateUser() {
    // ❌ Мутация - OnPush не обнаружит изменение
    this.user.name = 'Новое имя';
    // Компонент НЕ обновится!
  }
}
```

### ✅ Правильно (неизменяемые данные):

```typescript
@Component({
  selector: 'app-parent',
  template: '<app-user-card [user]="user"></app-user-card>'
})
export class ParentComponent {
  user = { name: 'Иван', email: 'ivan@example.com' };
  
  updateUser() {
    // ✅ Создание нового объекта - OnPush обнаружит изменение
    this.user = {
      ...this.user,
      name: 'Новое имя'
    };
    // Компонент обновится, так как изменилась ссылка
  }
}
```

## Работа с Observable

OnPush отлично работает с Observable и async pipe.

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$: Observable<User[]>;
  
  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
    // async pipe автоматически запускает Change Detection при новых значениях
  }
}
```

## Явное управление Change Detection

Иногда нужно явно запустить Change Detection.

### ChangeDetectorRef.detectChanges()

Принудительно запускает Change Detection для компонента и его дочерних компонентов.

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<p>Счетчик: {{ count }}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = 0;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  increment() {
    this.count++;
    // Явный запуск Change Detection
    this.cdr.detectChanges();
  }
}
```

### ChangeDetectorRef.markForCheck()

Помечает компонент для проверки в следующем цикле Change Detection.

```typescript
@Component({
  selector: 'app-data',
  template: '<p>{{ data }}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataComponent {
  data = 'Начальные данные';
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateData() {
    // Асинхронная операция
    setTimeout(() => {
      this.data = 'Новые данные';
      // Пометить для проверки
      this.cdr.markForCheck();
    }, 1000);
  }
}
```

## Практические примеры

### Пример 1: Правильное использование OnPush

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      <app-user-card [user]="user"></app-user-card>
    </div>
    <button (click)="addUser()">Добавить пользователя</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users: User[] = [];
  
  addUser() {
    // ✅ Создание нового массива
    this.users = [...this.users, newUser];
    // OnPush обнаружит изменение ссылки
  }
  
  updateUser(index: number, updatedUser: User) {
    // ✅ Создание нового массива с обновленным элементом
    this.users = [
      ...this.users.slice(0, index),
      updatedUser,
      ...this.users.slice(index + 1)
    ];
  }
}
```

### Пример 2: OnPush с Observable

```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="data$ | async as data">
      <h2>{{ data.title }}</h2>
      <p>{{ data.description }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  data$: Observable<DashboardData>;
  
  constructor(private dataService: DataService) {
    this.data$ = this.dataService.getDashboardData();
    // async pipe автоматически запускает Change Detection
  }
}
```

### Пример 3: OnPush с событиями

```typescript
@Component({
  selector: 'app-interactive',
  template: `
    <div>
      <p>Кликов: {{ clickCount }}</p>
      <button (click)="handleClick()">Клик</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveComponent {
  clickCount = 0;
  
  handleClick() {
    this.clickCount++;
    // События автоматически запускают Change Detection
    // Компонент обновится
  }
}
```

### Пример 4: OnPush с сервисом

```typescript
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  public state$ = this.stateSubject.asObservable();
}

@Component({
  selector: 'app-state',
  template: `
    <div *ngIf="state$ | async as state">
      <p>Пользователей: {{ state.userCount }}</p>
      <p>Загрузка: {{ state.loading }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateComponent {
  state$ = this.stateService.state$;
  
  constructor(private stateService: StateService) {}
  // async pipe автоматически обновит компонент
}
```

## Преимущества OnPush

### ✅ Производительность:

- Меньше проверок изменений
- Лучшая производительность для больших приложений
- Меньше нагрузки на браузер

### ✅ Предсказуемость:

- Четкие условия обновления
- Легче отлаживать
- Явное управление обновлениями

## Ограничения OnPush

### ⚠️ Требования:

- Неизменяемые данные для @Input()
- Observable с async pipe для асинхронных данных
- Явное управление для некоторых случаев

## Лучшие практики

### ✅ Делайте:

1. **Используйте неизменяемые данные** — создавайте новые объекты/массивы
2. **Используйте Observable с async pipe** — автоматическое обновление
3. **Используйте markForCheck()** — для асинхронных операций
4. **Используйте detectChanges()** — когда нужно немедленное обновление
5. **Применяйте везде** — для всех компонентов, где возможно

### ❌ Не делайте:

1. **Не мутируйте данные** — создавайте новые объекты
2. **Не забывайте про async pipe** — для Observable
3. **Не используйте без понимания** — нужно понимать принцип работы
4. **Не смешивайте стратегии** — будьте последовательны

## Заключение

Принцип работы ChangeDetectionStrategy.OnPush:

- **Проверяется только при определенных условиях** — изменение ссылки @Input(), события, Observable, явный вызов
- **Требует неизменяемых данных** — или Observable с async pipe
- **Значительно улучшает производительность** — меньше проверок
- **Предсказуемое поведение** — четкие условия обновления

**Помните:** OnPush — это мощный инструмент оптимизации, но он требует правильного подхода к работе с данными. Используйте неизменяемые структуры данных, Observable с async pipe и явное управление Change Detection когда необходимо. Это значительно улучшит производительность приложения.

