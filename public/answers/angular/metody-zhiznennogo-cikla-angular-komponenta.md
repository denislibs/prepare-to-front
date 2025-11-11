# Методы жизненного цикла Angular компонента?

Жизненный цикл Angular компонента — это последовательность этапов, через которые проходит компонент от создания до уничтожения. Angular предоставляет хуки жизненного цикла (lifecycle hooks), которые позволяют выполнять код на определенных этапах жизни компонента.

## Основные хуки жизненного цикла

### 1. **ngOnChanges**

Вызывается при изменении входных свойств (`@Input()`).

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent implements OnChanges {
  @Input() user: any;
  
  ngOnChanges(changes: SimpleChanges) {
    // Вызывается при изменении @Input() свойств
    if (changes['user']) {
      console.log('Пользователь изменился:', changes['user'].currentValue);
    }
  }
}
```

**Когда вызывается:**
- При изменении `@Input()` свойств
- Перед `ngOnInit()` (если есть изменения)
- При каждом изменении входных данных

### 2. **ngOnInit**

Вызывается один раз после первой проверки `@Input()` свойств.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UsersComponent implements OnInit {
  users: string[] = [];
  
  ngOnInit() {
    // Инициализация компонента
    // Загрузка данных, настройка подписок
    this.loadUsers();
  }
  
  loadUsers() {
    this.users = ['Иван', 'Мария', 'Петр'];
  }
}
```

**Когда вызывается:**
- Один раз после первой проверки `@Input()` свойств
- После `ngOnChanges()` (если есть изменения)
- Идеальное место для инициализации

### 3. **ngDoCheck**

Вызывается при каждой проверке изменений (change detection).

```typescript
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<p>Счетчик: {{ count }}</p>'
})
export class CounterComponent implements DoCheck {
  count = 0;
  previousCount = 0;
  
  ngDoCheck() {
    // Вызывается при каждой проверке изменений
    if (this.count !== this.previousCount) {
      console.log('Счетчик изменился:', this.count);
      this.previousCount = this.count;
    }
  }
}
```

**Когда вызывается:**
- При каждой проверке изменений
- Может вызываться очень часто
- Используйте осторожно для оптимизации

### 4. **ngAfterContentInit**

Вызывается после инициализации проекции контента (`ng-content`).

```typescript
import { Component, AfterContentInit, ContentChild } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') header: any;
  
  ngAfterContentInit() {
    // Вызывается после инициализации ng-content
    console.log('Контент инициализирован:', this.header);
  }
}
```

**Когда вызывается:**
- Один раз после инициализации проекции контента
- После `ngOnInit()`

### 5. **ngAfterContentChecked**

Вызывается после каждой проверки проекции контента.

```typescript
import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<ng-content></ng-content>'
})
export class CardComponent implements AfterContentChecked {
  ngAfterContentChecked() {
    // Вызывается после каждой проверки ng-content
    console.log('Контент проверен');
  }
}
```

**Когда вызывается:**
- После каждой проверки проекции контента
- Может вызываться очень часто

### 6. **ngAfterViewInit**

Вызывается после инициализации представления компонента.

```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input',
  template: '<input #inputRef>'
})
export class InputComponent implements AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef;
  
  ngAfterViewInit() {
    // Вызывается после инициализации представления
    // Теперь можно безопасно обращаться к ViewChild
    this.inputRef.nativeElement.focus();
  }
}
```

**Когда вызывается:**
- Один раз после инициализации представления
- После `ngAfterContentInit()`
- Идеальное место для работы с DOM

### 7. **ngAfterViewChecked**

Вызывается после каждой проверки представления.

```typescript
import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<p>{{ count }}</p>'
})
export class CounterComponent implements AfterViewChecked {
  count = 0;
  
  ngAfterViewChecked() {
    // Вызывается после каждой проверки представления
    console.log('Представление проверено');
  }
}
```

**Когда вызывается:**
- После каждой проверки представления
- Может вызываться очень часто

### 8. **ngOnDestroy**

Вызывается перед уничтожением компонента.

```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent implements OnDestroy {
  private subscription!: Subscription;
  
  constructor(private userService: UserService) {
    this.subscription = this.userService.getUser().subscribe(user => {
      // Обработка данных
    });
  }
  
  ngOnDestroy() {
    // Вызывается перед уничтожением компонента
    // Очистка подписок, таймеров, событий
    this.subscription.unsubscribe();
  }
}
```

**Когда вызывается:**
- Перед уничтожением компонента
- Идеальное место для очистки ресурсов

## Последовательность вызова хуков

```
1. constructor()           // Создание компонента
2. ngOnChanges()          // Изменение @Input()
3. ngOnInit()             // Инициализация
4. ngDoCheck()            // Проверка изменений
5. ngAfterContentInit()   // Инициализация контента
6. ngAfterContentChecked() // Проверка контента
7. ngAfterViewInit()      // Инициализация представления
8. ngAfterViewChecked()   // Проверка представления
9. ngOnDestroy()          // Уничтожение
```

## Практический пример

```typescript
import { 
  Component, 
  OnInit, 
  OnChanges, 
  OnDestroy,
  Input,
  SimpleChanges
} from '@angular/core';
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
export class UserProfileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId!: number;
  user: any;
  private subscription!: Subscription;
  
  constructor(private userService: UserService) {
    console.log('1. Constructor');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges', changes);
    if (changes['userId'] && !changes['userId'].firstChange) {
      this.loadUser();
    }
  }
  
  ngOnInit() {
    console.log('3. ngOnInit');
    this.loadUser();
  }
  
  ngAfterContentInit() {
    console.log('4. ngAfterContentInit');
  }
  
  ngAfterViewInit() {
    console.log('5. ngAfterViewInit');
  }
  
  ngOnDestroy() {
    console.log('6. ngOnDestroy');
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

### ✅ Используйте:

1. **ngOnInit** — для инициализации компонента
2. **ngOnDestroy** — для очистки ресурсов
3. **ngAfterViewInit** — для работы с DOM
4. **ngOnChanges** — для реакции на изменения `@Input()`

### ❌ Избегайте:

1. **ngDoCheck** — может вызываться очень часто
2. **ngAfterViewChecked** — может вызываться очень часто
3. **ngAfterContentChecked** — может вызываться очень часто

## Заключение

Хуки жизненного цикла Angular компонента:

- **ngOnChanges** — изменение `@Input()` свойств
- **ngOnInit** — инициализация (используйте чаще всего)
- **ngDoCheck** — проверка изменений
- **ngAfterContentInit** — инициализация контента
- **ngAfterViewInit** — инициализация представления
- **ngOnDestroy** — очистка ресурсов (обязательно используйте)

**Помните:** всегда очищайте подписки, таймеры и события в `ngOnDestroy()` для предотвращения утечек памяти.

