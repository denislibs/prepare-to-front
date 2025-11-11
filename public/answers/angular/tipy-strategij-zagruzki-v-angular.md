# Типы стратегий загрузки в Angular?

Стратегии загрузки модулей в Angular определяют, когда и как модули загружаются в приложение. Правильный выбор стратегии загрузки критически важен для оптимизации производительности, особенно для больших приложений. Angular предоставляет несколько стратегий загрузки, каждая из которых имеет свои преимущества и особенности использования.

## Основные стратегии загрузки

### 1. **Eager Loading (Жадная загрузка)**

Eager Loading — это стратегия, при которой модули загружаются сразу при запуске приложения, еще до того, как пользователь начнет взаимодействовать с приложением. Это стратегия по умолчанию в Angular.

#### Характеристики:

- **Время загрузки**: Все модули загружаются при старте приложения
- **Размер начального бандла**: Большой, так как включает все модули
- **Время первого рендера**: Может быть медленнее из-за большого объема кода
- **Использование памяти**: Все модули загружены в память сразу

#### Как это работает:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module'; // Загружается сразу
import { ProductModule } from './product/product.module'; // Загружается сразу
import { OrderModule } from './order/order.module'; // Загружается сразу

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule,      // Eager loading
    ProductModule,   // Eager loading
    OrderModule      // Eager loading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Когда использовать:

- **Маленькие приложения** — когда общий размер приложения небольшой
- **Критически важные модули** — модули, которые нужны сразу при запуске
- **Прототипирование** — для быстрой разработки без оптимизации
- **Модули, используемые везде** — общие модули, которые нужны на всех страницах

#### Преимущества:

1. **Простота реализации** — не требует дополнительной настройки
2. **Предсказуемость** — все модули доступны сразу
3. **Нет задержек** — пользователь не ждет загрузки модулей при навигации
4. **Легче отладка** — все модули загружены, проще найти проблемы

#### Недостатки:

1. **Большой начальный бандл** — все модули включены в основной бандл
2. **Медленная начальная загрузка** — пользователь ждет загрузки всего кода
3. **Неэффективное использование ресурсов** — загружаются модули, которые могут не понадобиться
4. **Плохая производительность на мобильных** — особенно на слабых устройствах

### 2. **Lazy Loading (Ленивая загрузка)**

Lazy Loading — это стратегия, при которой модули загружаются только тогда, когда они действительно нужны, обычно при переходе на соответствующий маршрут. Это одна из самых важных техник оптимизации в Angular.

#### Характеристики:

- **Время загрузки**: Модули загружаются по требованию
- **Размер начального бандла**: Меньше, так как включает только необходимые модули
- **Время первого рендера**: Быстрее, так как меньше кода для загрузки
- **Использование памяти**: Модули загружаются только когда нужны

#### Как это работает:

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    // Модуль загрузится только при переходе на /users
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    // Модуль загрузится только при переходе на /products
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
    // Модуль загрузится только при переходе на /orders
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

#### Структура модуля для lazy loading:

```typescript
// user-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild для lazy модулей
  exports: [RouterModule]
})
export class UserRoutingModule { }

// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule // Роутинг модуля
  ]
})
export class UserModule { }
```

#### Когда использовать:

- **Большие приложения** — когда приложение состоит из множества модулей
- **Модули, используемые редко** — модули, которые нужны не всем пользователям
- **Оптимизация производительности** — для улучшения времени начальной загрузки
- **Модули с большим кодом** — модули, которые содержат много компонентов и сервисов

#### Преимущества:

1. **Меньший начальный бандл** — загружаются только необходимые модули
2. **Быстрая начальная загрузка** — пользователь быстрее видит приложение
3. **Эффективное использование ресурсов** — модули загружаются только когда нужны
4. **Лучшая производительность на мобильных** — особенно важно для слабых устройств
5. **Масштабируемость** — можно добавлять новые модули без увеличения начального бандла

#### Недостатки:

1. **Задержка при навигации** — пользователь ждет загрузки модуля при первом переходе
2. **Сложнее отладка** — модули загружаются динамически
3. **Требует настройки** — нужно правильно настроить роутинг
4. **Потенциальные проблемы с кешированием** — нужно правильно настроить кеширование

### 3. **Preloading Strategy (Стратегия предзагрузки)**

Preloading Strategy — это стратегия, которая комбинирует преимущества eager и lazy loading. Модули загружаются лениво, но предзагружаются в фоновом режиме после начальной загрузки приложения.

#### Типы стратегий предзагрузки:

##### **NoPreloading (по умолчанию)**

Модули загружаются только при переходе на соответствующий маршрут.

```typescript
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NoPreloading // По умолчанию
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

##### **PreloadAllModules**

Все lazy модули предзагружаются после начальной загрузки приложения.

```typescript
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // Предзагрузка всех модулей
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**Как это работает:**
1. Приложение загружается с минимальным набором модулей
2. После загрузки приложения начинается предзагрузка всех lazy модулей в фоне
3. Когда пользователь переходит на маршрут, модуль уже загружен

##### **Custom Preloading Strategy**

Создание собственной стратегии предзагрузки для более тонкого контроля.

```typescript
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Предзагружать только модули с data.preload = true
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}

// Использование
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: { preload: true } // Предзагружать этот модуль
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    data: { preload: false } // Не предзагружать
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectivePreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule { }
```

#### Когда использовать:

- **Баланс между производительностью и удобством** — когда нужна быстрая начальная загрузка, но и быстрая навигация
- **Приоритетные модули** — когда некоторые модули важнее других
- **Большие приложения** — когда не все модули нужно предзагружать

### 4. **Module Federation (Микрофронтенды)**

Module Federation — это продвинутая стратегия, которая позволяет загружать модули из разных приложений, что полезно для микрофронтенд архитектуры.

```typescript
// host-app (основное приложение)
const routes: Routes = [
  {
    path: 'remote',
    loadChildren: () => 
      import('remote-app/Module').then(m => m.RemoteModule)
  }
];
```

## Сравнение стратегий

| Стратегия | Начальная загрузка | Размер бандла | Навигация | Использование |
|-----------|-------------------|---------------|-----------|---------------|
| Eager Loading | Медленная | Большой | Мгновенная | Маленькие приложения |
| Lazy Loading | Быстрая | Маленький | С задержкой | Большие приложения |
| PreloadAllModules | Средняя | Средний | Мгновенная | Средние приложения |
| Custom Preloading | Быстрая | Маленький | Зависит от стратегии | Большие приложения |

## Практические рекомендации

### Для маленьких приложений (< 5 модулей):

```typescript
// Используйте Eager Loading
@NgModule({
  imports: [
    UserModule,
    ProductModule,
    OrderModule
  ]
})
export class AppModule { }
```

### Для средних приложений (5-15 модулей):

```typescript
// Используйте Lazy Loading с PreloadAllModules
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })]
})
export class AppRoutingModule { }
```

### Для больших приложений (> 15 модулей):

```typescript
// Используйте Lazy Loading с Custom Preloading
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectivePreloadingStrategy
  })]
})
export class AppRoutingModule { }
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Lazy Loading** для больших приложений
2. **Группируйте связанные компоненты** в один модуль
3. **Используйте Custom Preloading** для приоритетных модулей
4. **Мониторьте размер бандлов** — используйте source-map-explorer
5. **Тестируйте производительность** — измеряйте время загрузки

### ❌ Не делайте:

1. **Не используйте Eager Loading** для больших приложений
2. **Не создавайте слишком много маленьких модулей** — группируйте логически
3. **Не забывайте про оптимизацию** — минифицируйте и сжимайте код
4. **Не предзагружайте все модули** без необходимости

## Заключение

Типы стратегий загрузки в Angular:

- **Eager Loading** — загрузка всех модулей при старте, подходит для маленьких приложений
- **Lazy Loading** — загрузка модулей по требованию, подходит для больших приложений
- **Preloading Strategy** — предзагрузка модулей в фоне, баланс между производительностью и удобством
- **Custom Preloading** — собственная стратегия для тонкого контроля

**Помните:** правильный выбор стратегии загрузки критически важен для производительности приложения. Для большинства реальных приложений рекомендуется использовать Lazy Loading с умной стратегией предзагрузки, которая обеспечивает быструю начальную загрузку и удобную навигацию без задержек.

