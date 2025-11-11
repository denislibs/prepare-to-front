# Что такое роутинг и как его создать в Angular?

Роутинг (маршрутизация) в Angular — это механизм навигации между различными представлениями (компонентами) в одностраничном приложении (SPA). Роутинг позволяет создавать многостраничные приложения без перезагрузки страницы, обеспечивая плавную навигацию и лучший пользовательский опыт. Понимание работы роутинга и умение его правильно настроить является одним из ключевых навыков Angular разработчика.

## Что такое роутинг?

Роутинг в Angular — это система, которая:
- Определяет, какой компонент отображать для каждого URL
- Управляет навигацией между страницами приложения
- Поддерживает историю браузера (кнопки назад/вперед)
- Позволяет передавать параметры через URL
- Поддерживает защиту маршрутов (guards)
- Обеспечивает ленивую загрузку модулей

## Базовое создание роутинга

### Шаг 1: Установка RouterModule

Angular CLI автоматически настраивает роутинг при создании проекта с флагом `--routing`. Если роутинг не был настроен, можно добавить его вручную.

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

// Определение маршрутов
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Настройка роутинга
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Шаг 2: Добавление RouterOutlet в шаблон

`<router-outlet>` — это директива, которая указывает Angular, где отображать компоненты для текущего маршрута.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active">Главная</a>
      <a routerLink="/about" routerLinkActive="active">О нас</a>
      <a routerLink="/contact" routerLinkActive="active">Контакты</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      font-weight: bold;
      color: blue;
    }
  `]
})
export class AppComponent { }
```

## Типы маршрутов

### 1. **Простой маршрут**

Маршрут, который отображает компонент.

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent }
];
```

### 2. **Маршрут по умолчанию**

Маршрут, который отображается при пустом пути.

```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
```

### 3. **Маршрут с редиректом**

Маршрут, который перенаправляет на другой маршрут.

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
```

**Важно:** `pathMatch: 'full'` означает, что путь должен полностью совпадать. Без этого Angular будет пытаться сопоставить пустой путь с каждым маршрутом.

### 4. **Маршрут с параметрами**

Маршрут, который принимает параметры из URL.

```typescript
const routes: Routes = [
  { path: 'user/:id', component: UserComponent }
];
```

**Использование:**
```typescript
// user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  template: '<p>Пользователь ID: {{ userId }}</p>'
})
export class UserComponent implements OnInit {
  userId: string = '';
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Получение параметра из URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    
    // Или подписка на изменения параметров
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
    });
  }
}
```

**Навигация:**
```html
<a [routerLink]="['/user', userId]">Пользователь</a>
```

```typescript
// Программная навигация
import { Router } from '@angular/router';

constructor(private router: Router) {}

navigateToUser(userId: number) {
  this.router.navigate(['/user', userId]);
}
```

### 5. **Маршрут с query параметрами**

Маршрут с дополнительными параметрами в query string.

```typescript
// Навигация с query параметрами
this.router.navigate(['/search'], {
  queryParams: { q: 'angular', page: 1 }
});
// URL: /search?q=angular&page=1
```

**Получение query параметров:**
```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  // Получение query параметров
  this.route.queryParams.subscribe(params => {
    const query = params['q'];
    const page = params['page'];
  });
}
```

### 6. **Вложенные маршруты (Child Routes)**

Маршруты, которые вложены в другие маршруты.

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  }
];
```

**В ProductsComponent:**
```typescript
@Component({
  selector: 'app-products',
  template: `
    <h2>Продукты</h2>
    <nav>
      <a routerLink="." routerLinkActive="active">Список</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class ProductsComponent { }
```

### 7. **Lazy Loading маршруты**

Маршруты, которые загружают модули лениво.

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

## Навигация

### 1. **Использование RouterLink**

Директива для навигации в шаблонах.

```html
<!-- Простая навигация -->
<a routerLink="/home">Главная</a>
<a routerLink="/about">О нас</a>

<!-- Навигация с параметрами -->
<a [routerLink]="['/user', userId]">Пользователь</a>

<!-- Навигация с query параметрами -->
<a [routerLink]="['/search']" [queryParams]="{q: 'angular'}">Поиск</a>

<!-- Активный класс -->
<a routerLink="/home" routerLinkActive="active">Главная</a>

<!-- Точное совпадение -->
<a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Главная</a>
```

### 2. **Программная навигация**

Навигация через Router сервис.

```typescript
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-navigation',
  template: '<button (click)="navigate()">Перейти</button>'
})
export class NavigationComponent {
  constructor(private router: Router) {}
  
  // Простая навигация
  navigate() {
    this.router.navigate(['/home']);
  }
  
  // Навигация с параметрами
  navigateWithParams() {
    this.router.navigate(['/user', 123]);
  }
  
  // Навигация с query параметрами
  navigateWithQuery() {
    this.router.navigate(['/search'], {
      queryParams: { q: 'angular', page: 1 }
    });
  }
  
  // Навигация с дополнительными опциями
  navigateWithExtras() {
    const extras: NavigationExtras = {
      queryParams: { q: 'angular' },
      fragment: 'section1',
      state: { data: 'some data' }
    };
    this.router.navigate(['/page'], extras);
  }
  
  // Навигация относительно текущего маршрута
  navigateRelative() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
```

## Защита маршрутов (Route Guards)

Guards позволяют контролировать доступ к маршрутам.

### 1. **CanActivate**

Проверяет, может ли пользователь активировать маршрут.

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// Использование
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
```

### 2. **CanActivateChild**

Проверяет доступ к дочерним маршрутам.

```typescript
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  canActivateChild(): boolean {
    // Логика проверки
    return true;
  }
}

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AdminGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

### 3. **CanDeactivate**

Проверяет, может ли пользователь покинуть маршрут.

```typescript
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// В компоненте
export class EditComponent implements CanComponentDeactivate {
  hasUnsavedChanges = false;
  
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges) {
      return confirm('У вас есть несохраненные изменения. Вы уверены, что хотите уйти?');
    }
    return true;
  }
}

// В маршрутах
const routes: Routes = [
  {
    path: 'edit',
    component: EditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
```

### 4. **Resolve**

Предзагружает данные перед активацией маршрута.

```typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId!);
  }
}

// Использование
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    resolve: {
      user: UserResolver
    }
  }
];

// В компоненте
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Данные уже загружены через resolver
    const user = this.route.snapshot.data['user'];
  }
}
```

## Разница между forRoot и forChild

### **RouterModule.forRoot()**

Используется в корневом модуле приложения для настройки основного роутера.

```typescript
// app-routing.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Характеристики:**
- Создает основной Router сервис
- Настраивает провайдеры роутера
- Используется только один раз в приложении
- Обычно в AppModule или AppRoutingModule

### **RouterModule.forChild()**

Используется в feature модулях для добавления дополнительных маршрутов.

```typescript
// user-routing.module.ts
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
```

**Характеристики:**
- Не создает новый Router сервис
- Использует существующий роутер
- Может использоваться в нескольких модулях
- Используется в feature модулях

## Полный пример настройки роутинга

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Для отладки
    useHash: false, // Hash location strategy
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте lazy loading** для больших модулей
2. **Группируйте связанные маршруты** в feature модули
3. **Используйте guards** для защиты маршрутов
4. **Используйте resolvers** для предзагрузки данных
5. **Обрабатывайте ошибки** с wildcard маршрутом

### ❌ Не делайте:

1. **Не используйте forRoot** в feature модулях
2. **Не забывайте про guards** для защищенных маршрутов
3. **Не создавайте слишком глубокую вложенность** маршрутов
4. **Не забывайте обрабатывать** несуществующие маршруты

## Заключение

Роутинг в Angular — это мощная система навигации:

- **Определение маршрутов** — через массив Routes
- **Навигация** — через RouterLink и Router сервис
- **Защита маршрутов** — через Guards
- **Предзагрузка данных** — через Resolvers
- **Lazy loading** — для оптимизации производительности

**Помните:** правильная настройка роутинга критически важна для создания масштабируемых и производительных Angular приложений. Используйте lazy loading для больших модулей, guards для защиты маршрутов и resolvers для оптимизации загрузки данных.

