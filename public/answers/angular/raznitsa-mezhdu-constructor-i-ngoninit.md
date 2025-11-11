# Разница между constructor и ngOnInit?

`constructor` и `ngOnInit` — это два разных метода в Angular компонентах, которые выполняются на разных этапах жизненного цикла компонента. Понимание разницы между ними важно для правильной инициализации компонента.

## constructor

`constructor` — это стандартный метод класса TypeScript/JavaScript, который вызывается при создании экземпляра класса.

### Характеристики:

- Вызывается **до** всех хуков жизненного цикла
- Вызывается **до** инициализации `@Input()` свойств
- Используется для **базовой инициализации** класса
- Не является частью Angular жизненного цикла

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>{{ name }}</p>'
})
export class UserComponent {
  name: string;
  
  constructor() {
    // Вызывается первым
    // @Input() свойства еще не инициализированы
    this.name = 'Иван';
    console.log('Constructor вызван');
  }
}
```

## ngOnInit

`ngOnInit` — это хук жизненного цикла Angular, который вызывается после инициализации компонента.

### Характеристики:

- Вызывается **после** `constructor`
- Вызывается **после** инициализации `@Input()` свойств
- Используется для **инициализации компонента**
- Является частью Angular жизненного цикла

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>{{ name }}</p>'
})
export class UserComponent implements OnInit {
  @Input() name: string = '';
  
  constructor() {
    // @Input() свойства еще не инициализированы
    console.log('Constructor:', this.name); // ''
  }
  
  ngOnInit() {
    // @Input() свойства уже инициализированы
    console.log('ngOnInit:', this.name); // Значение из родителя
  }
}
```

## Ключевые различия

### 1. Время вызова

```typescript
@Component({
  selector: 'app-example',
  template: '<p>{{ message }}</p>'
})
export class ExampleComponent {
  @Input() userId!: number;
  message = '';
  
  constructor() {
    // 1. Вызывается первым
    // @Input() свойства еще не инициализированы
    console.log('Constructor - userId:', this.userId); // undefined
    this.message = 'Инициализация...';
  }
  
  ngOnInit() {
    // 2. Вызывается после constructor
    // @Input() свойства уже инициализированы
    console.log('ngOnInit - userId:', this.userId); // Значение из родителя
    this.loadUser();
  }
  
  loadUser() {
    // Загрузка данных на основе userId
  }
}
```

### 2. Доступ к @Input() свойствам

```typescript
@Component({
  selector: 'app-user',
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {
  @Input() user: any;
  
  constructor() {
    // ❌ user еще undefined
    // console.log(this.user.name); // Ошибка!
  }
  
  ngOnInit() {
    // ✅ user уже инициализирован
    console.log(this.user.name); // Работает
  }
}
```

### 3. Внедрение зависимостей

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UsersComponent implements OnInit {
  users: string[] = [];
  
  // ✅ Внедрение зависимостей в constructor
  constructor(private userService: UserService) {
    // Сервис доступен, но инициализация данных должна быть в ngOnInit
  }
  
  // ✅ Инициализация данных в ngOnInit
  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```

## Когда использовать каждый

### Используйте constructor для:

1. **Внедрения зависимостей**
```typescript
constructor(
  private userService: UserService,
  private http: HttpClient
) {
  // Внедрение зависимостей
}
```

2. **Базовой инициализации переменных**
```typescript
constructor() {
  this.isLoading = false;
  this.error = null;
}
```

### Используйте ngOnInit для:

1. **Инициализации на основе @Input()**
```typescript
ngOnInit() {
  if (this.userId) {
    this.loadUser(this.userId);
  }
}
```

2. **Загрузки данных**
```typescript
ngOnInit() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
}
```

3. **Настройки подписок**
```typescript
ngOnInit() {
  this.subscription = this.userService.getUser()
    .subscribe(user => {
      this.user = user;
    });
}
```

4. **Инициализации форм**
```typescript
ngOnInit() {
  this.form = this.fb.group({
    name: ['', Validators.required]
  });
}
```

## Практический пример

```typescript
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() userId!: number;
  user: any;
  private subscription!: Subscription;
  
  // ✅ Constructor - внедрение зависимостей
  constructor(private userService: UserService) {
    console.log('Constructor - userId:', this.userId); // undefined
    // Не загружаем данные здесь, так как userId еще не инициализирован
  }
  
  // ✅ ngOnInit - инициализация компонента
  ngOnInit() {
    console.log('ngOnInit - userId:', this.userId); // Значение из родителя
    
    if (this.userId) {
      this.loadUser();
    }
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  private loadUser() {
    this.subscription = this.userService.getUser(this.userId)
      .subscribe(user => {
        this.user = user;
      });
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Внедряйте зависимости в constructor**
2. **Инициализируйте данные в ngOnInit**
3. **Используйте ngOnInit для работы с @Input()**
4. **Используйте ngOnInit для подписок**

### ❌ Не делайте:

1. **Не загружайте данные в constructor** (если они зависят от @Input())
2. **Не обращайтесь к @Input() в constructor**
3. **Не делайте тяжелые операции в constructor**

## Заключение

Разница между `constructor` и `ngOnInit`:

- **constructor** — вызывается первым, до инициализации `@Input()`, используется для внедрения зависимостей
- **ngOnInit** — вызывается после `constructor`, после инициализации `@Input()`, используется для инициализации компонента

**Помните:**
- Используйте `constructor` для внедрения зависимостей
- Используйте `ngOnInit` для инициализации данных и работы с `@Input()` свойствами
- Всегда реализуйте интерфейс `OnInit` для использования `ngOnInit`

