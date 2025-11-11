# Разница между компонентом и модулем в Angular?

Понимание разницы между компонентами и модулями в Angular является фундаментальным для правильной архитектуры приложения. Компоненты и модули выполняют разные роли и имеют различные назначения, хотя они тесно связаны друг с другом. Правильное использование компонентов и модулей критически важно для создания масштабируемых и поддерживаемых Angular приложений.

## Что такое компонент?

Компонент в Angular — это класс с декоратором `@Component()`, который определяет представление (view) и логику для части пользовательского интерфейса. Компонент состоит из шаблона (HTML), стилей (CSS) и TypeScript класса с логикой.

### Характеристики компонента:

- ✅ **Определяет представление** — шаблон с HTML
- ✅ **Содержит логику** — TypeScript класс с методами
- ✅ **Имеет стили** — CSS/SCSS стили
- ✅ **Может иметь входные/выходные данные** — @Input() и @Output()
- ✅ **Имеет жизненный цикл** — ngOnInit, ngOnDestroy и т.д.
- ✅ **Является директивой** — компонент это директива с шаблоном

### Пример компонента:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card', // Селектор для использования в шаблонах
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
  @Input() user!: User; // Входные данные
  @Output() edit = new EventEmitter<User>(); // Выходные события
  
  onEdit() {
    this.edit.emit(this.user);
  }
}
```

## Что такое модуль?

Модуль в Angular — это класс с декоратором `@NgModule()`, который организует компоненты, директивы, пайпы и сервисы в функциональные блоки. Модуль определяет контекст компиляции и группирует связанную функциональность.

### Характеристики модуля:

- ✅ **Организует компоненты** — группирует связанные компоненты
- ✅ **Объявляет компоненты, директивы, пайпы** — через declarations
- ✅ **Импортирует другие модули** — через imports
- ✅ **Экспортирует функциональность** — через exports
- ✅ **Предоставляет сервисы** — через providers
- ✅ **Определяет область видимости** — что доступно в модуле

### Пример модуля:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card.component';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';

@NgModule({
  // Компоненты, директивы, пайпы, объявленные в этом модуле
  declarations: [
    UserCardComponent,
    UserListComponent
  ],
  
  // Модули, которые нужны для работы этого модуля
  imports: [
    CommonModule, // Для *ngIf, *ngFor и т.д.
    FormsModule   // Для [(ngModel)]
  ],
  
  // Что экспортируется для использования в других модулях
  exports: [
    UserCardComponent,
    UserListComponent
  ],
  
  // Сервисы, предоставляемые этим модулем
  providers: [
    UserService
  ],
  
  // Компонент для загрузки при старте модуля (опционально)
  bootstrap: [] // Обычно только в AppModule
})
export class UserModule { }
```

## Ключевые различия

### 1. **Назначение**

**Компонент:**
- Определяет часть UI
- Отображает данные
- Обрабатывает пользовательский ввод
- Содержит логику представления

**Модуль:**
- Организует код
- Группирует связанную функциональность
- Определяет область видимости
- Управляет зависимостями

### 2. **Структура**

**Компонент:**
```typescript
@Component({
  selector: 'app-user',
  template: '...',
  styles: ['...']
})
export class UserComponent { }
```

**Модуль:**
```typescript
@NgModule({
  declarations: [...],
  imports: [...],
  exports: [...],
  providers: [...]
})
export class UserModule { }
```

### 3. **Использование**

**Компонент:**
- Используется в шаблонах как HTML элемент
- Может быть вложенным
- Может иметь входные/выходные данные

```html
<!-- Использование компонента -->
<app-user-card [user]="currentUser" (edit)="handleEdit($event)"></app-user-card>
```

**Модуль:**
- Импортируется в другие модули
- Не используется напрямую в шаблонах
- Определяет контекст для компонентов

```typescript
// Импорт модуля
@NgModule({
  imports: [UserModule] // Импорт модуля
})
export class AppModule { }
```

### 4. **Область видимости**

**Компонент:**
- Виден только в модуле, где объявлен
- Может быть экспортирован модулем
- Используется через селектор

**Модуль:**
- Определяет область видимости для компонентов
- Экспортирует компоненты для использования в других модулях
- Может быть lazy-loaded

### 5. **Жизненный цикл**

**Компонент:**
- Имеет жизненный цикл (ngOnInit, ngOnDestroy и т.д.)
- Создается и уничтожается динамически
- Может быть переиспользован

**Модуль:**
- Загружается один раз
- Не имеет жизненного цикла
- Определяет контекст компиляции

## Взаимосвязь компонентов и модулей

### Компонент должен быть объявлен в модуле:

```typescript
// user-card.component.ts
@Component({
  selector: 'app-user-card',
  template: '...'
})
export class UserCardComponent { }

// user.module.ts
@NgModule({
  declarations: [
    UserCardComponent // Компонент должен быть объявлен
  ]
})
export class UserModule { }
```

### Модуль может экспортировать компоненты:

```typescript
@NgModule({
  declarations: [
    UserCardComponent,
    UserListComponent
  ],
  exports: [
    UserCardComponent, // Экспорт для использования в других модулях
    UserListComponent
  ]
})
export class UserModule { }

// Использование в другом модуле
@NgModule({
  imports: [UserModule] // Теперь можно использовать UserCardComponent
})
export class AppModule { }
```

## Практические примеры

### Пример 1: Простой компонент в модуле

```typescript
// greeting.component.ts
@Component({
  selector: 'app-greeting',
  template: '<h1>Привет, {{ name }}!</h1>'
})
export class GreetingComponent {
  @Input() name: string = '';
}

// app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent // Объявление компонента
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Использование
@Component({
  template: '<app-greeting [name]="userName"></app-greeting>'
})
export class AppComponent {
  userName = 'Иван';
}
```

### Пример 2: Feature модуль с компонентами

```typescript
// user-card.component.ts
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: User;
}

// user-list.component.ts
@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <app-user-card 
        *ngFor="let user of users" 
        [user]="user">
      </app-user-card>
    </div>
  `
})
export class UserListComponent {
  @Input() users: User[] = [];
}

// user.module.ts
@NgModule({
  declarations: [
    UserCardComponent,
    UserListComponent
  ],
  imports: [CommonModule], // Для *ngFor
  exports: [
    UserListComponent // Экспорт для использования в других модулях
  ]
})
export class UserModule { }

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule // Импорт модуля
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Пример 3: Shared модуль

```typescript
// shared.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    CommonModule // Экспорт CommonModule для использования *ngIf, *ngFor
  ]
})
export class SharedModule { }

// Использование в других модулях
@NgModule({
  imports: [SharedModule] // Теперь доступны все экспортированные компоненты
})
export class FeatureModule { }
```

## Сравнительная таблица

| Характеристика | Компонент | Модуль |
|----------------|-----------|--------|
| **Декоратор** | @Component() | @NgModule() |
| **Назначение** | UI представление | Организация кода |
| **Содержит** | Шаблон, стили, логика | Компоненты, директивы, сервисы |
| **Использование** | HTML элемент | Импорт в другие модули |
| **Жизненный цикл** | Да (ngOnInit и т.д.) | Нет |
| **Область видимости** | Определяется модулем | Определяет область видимости |
| **Может быть вложенным** | Да | Нет (но может импортировать другие модули) |

## Лучшие практики

### ✅ Делайте:

1. **Объявляйте компоненты в модулях** — каждый компонент должен быть в declarations
2. **Группируйте связанные компоненты** — в feature модули
3. **Экспортируйте переиспользуемые компоненты** — через exports
4. **Используйте Shared модули** — для общих компонентов
5. **Создавайте feature модули** — для функциональных блоков

### ❌ Не делайте:

1. **Не объявляйте компонент в нескольких модулях** — один компонент = один модуль
2. **Не импортируйте модуль, если не нужны его экспорты** — это увеличивает бандл
3. **Не создавайте слишком большие модули** — разделяйте на feature модули
4. **Не забывайте экспортировать** — если компонент нужен в других модулях

## Заключение

Разница между компонентом и модулем:

- **Компонент** — определяет часть UI, имеет шаблон, стили и логику, используется как HTML элемент
- **Модуль** — организует код, группирует компоненты, директивы и сервисы, определяет область видимости

**Помните:** компоненты и модули работают вместе. Компоненты определяют UI, а модули организуют компоненты и управляют их областью видимости. Правильная организация компонентов в модули создает чистую архитектуру и делает приложение более поддерживаемым и масштабируемым.

