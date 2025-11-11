# Что такое Angular?

Angular — это платформа и фреймворк для создания одностраничных приложений (SPA - Single Page Applications) с использованием TypeScript и HTML. Angular разработан командой Google и является одним из самых популярных фреймворков для разработки веб-приложений.

## Основные характеристики

### 1. **TypeScript-based**

Angular написан на TypeScript и требует использования TypeScript для разработки приложений.

```typescript
// ✅ TypeScript компонент
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Привет, Angular!</h1>'
})
export class AppComponent {
  title = 'Мое приложение';
}
```

### 2. **Компонентная архитектура**

Angular использует компонентную архитектуру, где приложение состоит из переиспользуемых компонентов.

```typescript
// ✅ Компонент
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserComponent {
  user = {
    name: 'Иван Иванов',
    email: 'ivan@example.com'
  };
}
```

### 3. **Двустороннее связывание данных**

Angular поддерживает двустороннее связывание данных через директиву `[(ngModel)]`.

```typescript
// ✅ Компонент с двусторонним связыванием
import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <input [(ngModel)]="name" placeholder="Введите имя">
    <p>Привет, {{ name }}!</p>
  `
})
export class FormComponent {
  name = '';
}
```

### 4. **Dependency Injection (DI)**

Angular имеет встроенную систему внедрения зависимостей.

```typescript
// ✅ Сервис
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return ['Иван', 'Мария', 'Петр'];
  }
}

// ✅ Использование в компоненте
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UsersComponent {
  users: string[] = [];
  
  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }
}
```

### 5. **Роутинг**

Angular имеет мощную систему маршрутизации.

```typescript
// ✅ Настройка роутинга
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Ключевые возможности

### 1. **Директивы**

```typescript
// ✅ Структурные директивы
<div *ngIf="isVisible">Видимый контент</div>
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>

// ✅ Атрибутные директивы
<div [ngClass]="{'active': isActive}">Контент</div>
<div [ngStyle]="{'color': textColor}">Текст</div>
```

### 2. **Сервисы**

```typescript
// ✅ Сервис для работы с данными
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    return this.http.get('/api/data');
  }
}
```

### 3. **Формы**

```typescript
// ✅ Реактивные формы
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Имя">
      <button type="submit">Отправить</button>
    </form>
  `
})
export class FormComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }
  
  onSubmit() {
    console.log(this.form.value);
  }
}
```

### 4. **HTTP клиент**

```typescript
// ✅ HTTP запросы
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }
}
```

## Архитектура Angular приложения

```
src/
├── app/
│   ├── components/        # Компоненты
│   ├── services/          # Сервисы
│   ├── modules/          # Модули
│   ├── routing/          # Роутинг
│   ├── models/           # Модели данных
│   └── app.module.ts     # Корневой модуль
├── assets/               # Статические файлы
└── index.html            # Главный HTML
```

## Преимущества Angular

1. **TypeScript** — статическая типизация, лучшая поддержка IDE
2. **Мощная экосистема** — множество библиотек и инструментов
3. **CLI инструменты** — Angular CLI для быстрой разработки
4. **Документация** — отличная документация и сообщество
5. **Enterprise-ready** — подходит для больших приложений
6. **Тестирование** — встроенная поддержка тестирования

## Версии Angular

- **AngularJS (1.x)** — первая версия (устарела)
- **Angular 2+** — современная версия (TypeScript)
- **Текущая версия** — Angular 17+ (на момент 2024)

## Заключение

Angular — это мощный фреймворк для создания современных веб-приложений:

- **TypeScript-based** — статическая типизация
- **Компонентная архитектура** — переиспользуемые компоненты
- **Dependency Injection** — встроенная система DI
- **Роутинг** — мощная система маршрутизации
- **Реактивность** — работа с RxJS Observable

Angular подходит для создания больших, масштабируемых приложений с четкой архитектурой и хорошей поддержкой командной разработки.

