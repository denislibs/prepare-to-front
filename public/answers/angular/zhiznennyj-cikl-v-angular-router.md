# Жизненный цикл в Angular Router?

Жизненный цикл Angular Router — это последовательность событий и хуков, которые происходят при навигации между маршрутами в Angular приложении. Понимание жизненного цикла роутера критически важно для правильной обработки навигации, загрузки данных, управления состоянием и обеспечения хорошего пользовательского опыта. Каждый этап жизненного цикла предоставляет возможности для выполнения определенных действий.

## Обзор жизненного цикла роутера

Жизненный цикл роутера начинается, когда пользователь инициирует навигацию (например, кликает на ссылку или вызывает программную навигацию), и заканчивается, когда новый компонент полностью загружен и отображен. Весь процесс состоит из нескольких этапов, каждый из которых имеет свое назначение.

## Последовательность событий жизненного цикла

### 1. **Начало навигации**

Навигация начинается, когда пользователь или код инициирует переход на новый маршрут.

```typescript
// Пользователь кликает на ссылку
<a routerLink="/user/123">Пользователь</a>

// Или программная навигация
this.router.navigate(['/user', 123]);
```

### 2. **Проверка CanDeactivate**

Перед уходом с текущего маршрута Angular проверяет, может ли пользователь покинуть текущий компонент. Это выполняется через guard `CanDeactivate`.

```typescript
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
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
    // Проверка, может ли пользователь покинуть компонент
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

// В компоненте
export class EditComponent implements CanComponentDeactivate {
  hasUnsavedChanges = false;
  
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges) {
      return confirm('У вас есть несохраненные изменения. Вы уверены?');
    }
    return true;
  }
}
```

**Когда используется:**
- Предупреждение о несохраненных изменениях
- Валидация формы перед уходом
- Очистка ресурсов перед навигацией

### 3. **Проверка CanActivate**

После проверки CanDeactivate Angular проверяет, может ли пользователь активировать новый маршрут через guard `CanActivate`.

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
      return true;
    } else {
      // Перенаправление на страницу входа
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}

// Использование в маршрутах
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
```

**Когда используется:**
- Проверка аутентификации
- Проверка прав доступа
- Проверка условий для доступа к маршруту

### 4. **Resolve (Предзагрузка данных)**

Если маршрут имеет resolver, Angular выполняет его для предзагрузки данных перед активацией компонента.

```typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const userId = route.paramMap.get('id');
    // Данные загружаются до активации компонента
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
    // Или подписка на изменения
    this.route.data.subscribe(data => {
      const user = data['user'];
    });
  }
}
```

**Когда используется:**
- Предзагрузка критически важных данных
- Обеспечение наличия данных перед отображением компонента
- Улучшение пользовательского опыта (нет задержек)

### 5. **Проверка CanActivateChild**

Если маршрут имеет дочерние маршруты, Angular проверяет `CanActivateChild` для дочерних маршрутов.

```typescript
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Проверка доступа к дочерним маршрутам
    return this.checkAdminAccess();
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

### 6. **Деактивация текущего компонента**

Перед активацией нового компонента Angular деактивирует текущий компонент.

```typescript
export class CurrentComponent implements OnDestroy {
  ngOnDestroy() {
    // Вызывается при деактивации компонента
    // Очистка подписок, таймеров, ресурсов
    console.log('Компонент деактивирован');
  }
}
```

### 7. **Активация нового компонента**

Angular активирует новый компонент и выполняет его жизненный цикл.

```typescript
export class NewComponent implements OnInit, OnActivate {
  ngOnInit() {
    // Вызывается после инициализации компонента
    console.log('Компонент инициализирован');
  }
}
```

### 8. **События роутера**

Angular Router предоставляет события, на которые можно подписаться для отслеживания навигации.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Подписка на все события навигации
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Навигация началась:', event.url);
        // Показать индикатор загрузки
      }
      
      if (event instanceof NavigationEnd) {
        console.log('Навигация завершена:', event.url);
        // Скрыть индикатор загрузки
      }
      
      if (event instanceof NavigationCancel) {
        console.log('Навигация отменена:', event.url);
        // Навигация была отменена (например, guard вернул false)
      }
      
      if (event instanceof NavigationError) {
        console.error('Ошибка навигации:', event.error);
        // Обработка ошибок навигации
      }
    });
    
    // Или фильтрация конкретных событий
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Переход на:', event.url);
      });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

## Полная последовательность жизненного цикла

```
1. NavigationStart
   ↓
2. CanDeactivate (проверка возможности ухода)
   ↓
3. CanActivate (проверка возможности активации)
   ↓
4. Resolve (предзагрузка данных)
   ↓
5. CanActivateChild (для дочерних маршрутов)
   ↓
6. Деактивация текущего компонента (ngOnDestroy)
   ↓
7. Активация нового компонента
   ↓
8. NavigationEnd или NavigationCancel или NavigationError
```

## Практические примеры

### Пример 1: Отслеживание навигации с индикатором загрузки

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="loading" class="loading">
      Загрузка...
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  private subscription!: Subscription;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.subscription = this.router.events
      .pipe(
        filter(event => 
          event instanceof NavigationStart || 
          event instanceof NavigationEnd
        )
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

### Пример 2: Сохранение состояния перед навигацией

```typescript
import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  template: '<form>...</form>'
})
export class FormComponent implements OnDestroy {
  formData: any = {};
  private subscription!: Subscription;
  
  constructor(private router: Router) {
    // Сохранение данных перед навигацией
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.saveFormData();
      });
  }
  
  saveFormData() {
    localStorage.setItem('formData', JSON.stringify(this.formData));
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

### Пример 3: Аналитика навигации

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Отслеживание навигации для аналитики
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Отправка данных в аналитику
        this.trackPageView(event.url);
      });
  }
  
  trackPageView(url: string) {
    // Интеграция с Google Analytics, Яндекс.Метрика и т.д.
    console.log('Просмотр страницы:', url);
    // gtag('config', 'GA_MEASUREMENT_ID', { page_path: url });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

## Хуки жизненного цикла компонента при навигации

При навигации компоненты проходят через свой жизненный цикл:

```typescript
export class UserComponent implements 
  OnInit, 
  OnDestroy,
  OnActivate,
  OnDeactivate {
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Вызывается после инициализации компонента
    console.log('Компонент инициализирован');
    
    // Получение данных из resolver
    const user = this.route.snapshot.data['user'];
    
    // Или подписка на параметры маршрута
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      this.loadUser(userId!);
    });
  }
  
  ngOnDestroy() {
    // Вызывается при деактивации компонента
    console.log('Компонент уничтожен');
    // Очистка подписок, таймеров
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте guards** для защиты маршрутов
2. **Используйте resolvers** для предзагрузки данных
3. **Отслеживайте события роутера** для аналитики и индикаторов загрузки
4. **Очищайте ресурсы** в ngOnDestroy
5. **Обрабатывайте ошибки** навигации

### ❌ Не делайте:

1. **Не забывайте отписываться** от событий роутера
2. **Не делайте тяжелые операции** в guards
3. **Не блокируйте навигацию** без необходимости
4. **Не забывайте обрабатывать** NavigationError

## Заключение

Жизненный цикл Angular Router включает:

- **NavigationStart** — начало навигации
- **CanDeactivate** — проверка возможности ухода
- **CanActivate** — проверка возможности активации
- **Resolve** — предзагрузка данных
- **Деактивация компонента** — очистка ресурсов
- **Активация компонента** — инициализация нового компонента
- **NavigationEnd/Cancel/Error** — завершение навигации

**Помните:** понимание жизненного цикла роутера позволяет правильно управлять навигацией, загружать данные, защищать маршруты и обеспечивать хороший пользовательский опыт. Используйте guards для защиты, resolvers для предзагрузки данных и события роутера для отслеживания навигации.

