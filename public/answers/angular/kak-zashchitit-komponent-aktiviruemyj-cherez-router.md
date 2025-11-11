# Как защитить компонент активируемый через роутер?

Защита маршрутов (route guards) в Angular — это механизм, который позволяет контролировать доступ к компонентам, активируемым через роутер. Route guards используются для проверки прав доступа, аутентификации, валидации данных и других условий перед активацией маршрута. Понимание различных типов guards и умение их правильно использовать критически важно для создания безопасных Angular приложений.

## Типы Route Guards

Angular предоставляет несколько типов guards для различных сценариев защиты:

### 1. **CanActivate** — Защита активации маршрута

Проверяет, может ли пользователь активировать маршрут. Используется для проверки аутентификации и прав доступа.

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Разрешить активацию
    } else {
      // Перенаправить на страницу входа
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false; // Запретить активацию
    }
  }
}
```

**Использование:**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard] // Защита маршрута
  }
];
```

### 2. **CanActivateChild** — Защита дочерних маршрутов

Проверяет доступ к дочерним маршрутам. Полезно для защиты группы маршрутов.

```typescript
import { Injectable } from '@angular/core';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
```

**Использование:**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AdminGuard], // Защита всех дочерних маршрутов
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

### 3. **CanDeactivate** — Защита деактивации маршрута

Проверяет, может ли пользователь покинуть маршрут. Используется для предупреждения о несохраненных изменениях.

```typescript
import { Injectable } from '@angular/core';
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
```

**Использование в компоненте:**
```typescript
@Component({
  selector: 'app-edit-user',
  template: `
    <form [formGroup]="form">
      <input formControlName="name">
      <button (click)="save()">Сохранить</button>
    </form>
  `
})
export class EditUserComponent implements CanComponentDeactivate {
  form!: FormGroup;
  hasUnsavedChanges = false;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['']
    });
    
    // Отслеживание изменений
    this.form.valueChanges.subscribe(() => {
      this.hasUnsavedChanges = true;
    });
  }
  
  save() {
    // Сохранение данных
    this.hasUnsavedChanges = false;
  }
  
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges) {
      return confirm('У вас есть несохраненные изменения. Вы уверены, что хотите уйти?');
    }
    return true;
  }
}
```

**Использование в маршрутах:**
```typescript
const routes: Routes = [
  {
    path: 'user/:id/edit',
    component: EditUserComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
```

### 4. **Resolve** — Предзагрузка данных

Загружает данные перед активацией маршрута. Обеспечивает наличие данных при инициализации компонента.

```typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    const userId = route.paramMap.get('id');
    return this.userService.getUser(userId!);
  }
}
```

**Использование:**
```typescript
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    resolve: {
      user: UserResolver // Данные загружаются до активации
    }
  }
];

// В компоненте
export class UserComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Данные уже загружены через resolver
    const user = this.route.snapshot.data['user'];
    // Или подписка на изменения
    this.route.data.subscribe(data => {
      const user = data['user'];
    });
  }
}
```

### 5. **CanLoad** — Защита загрузки модуля

Проверяет, может ли модуль быть загружен. Используется для защиты lazy-loaded модулей.

```typescript
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canLoad(route: Route): boolean {
    if (this.authService.isAdmin()) {
      return true; // Разрешить загрузку модуля
    } else {
      this.router.navigate(['/unauthorized']);
      return false; // Запретить загрузку модуля
    }
  }
}
```

**Использование:**
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminModuleGuard] // Защита загрузки модуля
  }
];
```

## Комбинирование нескольких guards

Можно использовать несколько guards одновременно:

```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard], // Оба guard должны вернуть true
    canDeactivate: [CanDeactivateGuard]
  }
];
```

## Асинхронные guards

Guards могут возвращать Observable или Promise:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AsyncAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuth().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
```

## Практические примеры

### Пример 1: Полная защита админ-панели

```typescript
// auth.guard.ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

// admin.guard.ts
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}

// routes
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard], // Сначала проверка аутентификации, затем прав
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

### Пример 2: Защита с ролями

```typescript
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getUserRoles();
    
    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (hasRole) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}

// Использование
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'superadmin'] }
  }
];
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте guards для защиты маршрутов** — не полагайтесь только на UI
2. **Комбинируйте guards** — для многоуровневой защиты
3. **Используйте Resolve** — для предзагрузки критических данных
4. **Обрабатывайте ошибки** — в асинхронных guards
5. **Тестируйте guards** — отдельно от компонентов

### ❌ Не делайте:

1. **Не храните чувствительные данные** в guards
2. **Не делайте тяжелые операции** в guards синхронно
3. **Не забывайте обрабатывать ошибки** в асинхронных guards
4. **Не дублируйте логику** — создавайте переиспользуемые guards

## Заключение

Защита компонентов через роутер:

- **CanActivate** — проверка перед активацией маршрута
- **CanActivateChild** — проверка дочерних маршрутов
- **CanDeactivate** — проверка перед деактивацией
- **Resolve** — предзагрузка данных
- **CanLoad** — защита загрузки lazy модулей

**Помните:** guards — это первая линия защиты маршрутов. Используйте их для проверки аутентификации, прав доступа и других условий. Комбинируйте разные типы guards для создания многоуровневой защиты приложения.

