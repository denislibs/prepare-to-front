# Разница между AngularJS и Angular?

AngularJS (версия 1.x) и Angular (версия 2+) — это два разных фреймворка, хотя и от одной компании (Google). Они имеют существенные различия в архитектуре, синтаксисе и подходах к разработке.

## Основные различия

### 1. **Язык программирования**

**AngularJS (1.x):**
- Использует **JavaScript (ES5)**
- Можно использовать TypeScript, но не обязательно

```javascript
// ✅ AngularJS - JavaScript
angular.module('myApp', [])
  .controller('MyController', function($scope) {
    $scope.message = 'Привет, AngularJS!';
  });
```

**Angular (2+):**
- Использует **TypeScript** (рекомендуется)
- Можно использовать JavaScript, но TypeScript предпочтительнее

```typescript
// ✅ Angular - TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Привет, Angular!</h1>'
})
export class AppComponent {
  message = 'Привет, Angular!';
}
```

### 2. **Архитектура**

**AngularJS (1.x):**
- **MVC (Model-View-Controller)** архитектура
- Использует контроллеры, scope, директивы

```javascript
// ✅ AngularJS - MVC
angular.module('myApp', [])
  .controller('UserController', function($scope) {
    $scope.users = ['Иван', 'Мария'];
  });
```

**Angular (2+):**
- **Компонентная архитектура**
- Использует компоненты, сервисы, модули

```typescript
// ✅ Angular - Компоненты
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UserComponent {
  users = ['Иван', 'Мария'];
}
```

### 3. **Связывание данных**

**AngularJS (1.x):**
- **Двустороннее связывание** через `ng-model`
- Использует "грязную проверку" (dirty checking)

```html
<!-- ✅ AngularJS -->
<div ng-controller="MyController">
  <input ng-model="name">
  <p>{{ name }}</p>
</div>
```

**Angular (2+):**
- **Двустороннее связывание** через `[(ngModel)]`
- Использует Zone.js для обнаружения изменений

```html
<!-- ✅ Angular -->
<input [(ngModel)]="name">
<p>{{ name }}</p>
```

### 4. **Директивы**

**AngularJS (1.x):**
- Директивы создаются через `.directive()`
- Сложный синтаксис

```javascript
// ✅ AngularJS - Директива
angular.module('myApp', [])
  .directive('myDirective', function() {
    return {
      restrict: 'E',
      template: '<div>Моя директива</div>'
    };
  });
```

**Angular (2+):**
- Директивы создаются через декоратор `@Directive()`
- Компоненты — это директивы с шаблоном

```typescript
// ✅ Angular - Директива
import { Directive } from '@angular/core';

@Directive({
  selector: '[appMyDirective]'
})
export class MyDirective {
  // Логика директивы
}
```

### 5. **Внедрение зависимостей**

**AngularJS (1.x):**
- DI через имена параметров (string-based)
- Может сломаться при минификации

```javascript
// ✅ AngularJS - DI
angular.module('myApp', [])
  .controller('MyController', function($scope, $http) {
    // $scope и $http внедряются автоматически
  });
```

**Angular (2+):**
- DI через TypeScript типы (type-based)
- Безопасно при минификации

```typescript
// ✅ Angular - DI
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root'
})
export class AppComponent {
  constructor(private http: HttpClient) {
    // http внедряется автоматически
  }
}
```

### 6. **Роутинг**

**AngularJS (1.x):**
- Использует `ngRoute` или `ui-router`
- Настройка через `.config()`

```javascript
// ✅ AngularJS - Роутинг
angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<h1>Главная</h1>'
      })
      .when('/about', {
        template: '<h1>О нас</h1>'
      });
  });
```

**Angular (2+):**
- Встроенный `RouterModule`
- Настройка через массив routes

```typescript
// ✅ Angular - Роутинг
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
```

### 7. **Производительность**

**AngularJS (1.x):**
- Медленнее из-за dirty checking
- Проблемы с производительностью на больших приложениях

**Angular (2+):**
- Быстрее благодаря:
  - Zone.js для обнаружения изменений
  - AOT компиляции
  - Tree-shaking
  - Lazy loading

### 8. **Мобильная поддержка**

**AngularJS (1.x):**
- Ограниченная поддержка мобильных устройств

**Angular (2+):**
- Лучшая поддержка мобильных устройств
- Ionic framework для мобильных приложений
- NativeScript для нативных приложений

## Сравнительная таблица

| Характеристика | AngularJS (1.x) | Angular (2+) |
|---------------|-----------------|--------------|
| Язык | JavaScript | TypeScript |
| Архитектура | MVC | Компонентная |
| Связывание | ng-model | [(ngModel)] |
| DI | String-based | Type-based |
| Производительность | Медленнее | Быстрее |
| Размер | Больше | Меньше (tree-shaking) |
| Обучение | Проще | Сложнее |
| Поддержка | Устарела | Активная |

## Миграция

### Можно ли мигрировать?

**Частичная миграция:**
- Можно использовать оба фреймворка вместе через `ngUpgrade`
- Постепенная миграция компонентов

**Полная миграция:**
- Требует переписывания большей части кода
- Рекомендуется для новых проектов использовать Angular 2+

## Заключение

**AngularJS (1.x)** и **Angular (2+)** — это разные фреймворки:

- **AngularJS** — устаревший, использует JavaScript, MVC архитектура
- **Angular** — современный, использует TypeScript, компонентная архитектура

**Рекомендации:**
- Для новых проектов используйте **Angular 2+**
- AngularJS больше не поддерживается активно
- Angular предлагает лучшую производительность и современные возможности

**Помните:** Angular 2+ — это не обновление AngularJS, а полностью новый фреймворк с другой архитектурой и подходами к разработке.

