# Что такое внедрение зависимостей (dependency injection) в Angular?

Dependency Injection (DI) — это паттерн проектирования, который позволяет классам получать свои зависимости извне, а не создавать их самостоятельно. Angular имеет встроенную систему DI, которая упрощает управление зависимостями и делает код более тестируемым и поддерживаемым.

## Что такое Dependency Injection?

Dependency Injection — это процесс предоставления зависимостей объекту извне, а не создание их внутри объекта.

### Без DI (плохо):

```typescript
// ❌ Плохо - создание зависимостей внутри класса
class UserComponent {
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService(); // Жесткая связь
  }
}
```

### С DI (хорошо):

```typescript
// ✅ Хорошо - внедрение зависимостей
class UserComponent {
  constructor(private userService: UserService) {
    // Зависимость внедряется извне
  }
}
```

## Как работает DI в Angular?

### 1. **Создание сервиса**

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton на уровне приложения
})
export class UserService {
  getUsers() {
    return ['Иван', 'Мария', 'Петр'];
  }
}
```

### 2. **Внедрение в компонент**

```typescript
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: '<ul><li *ngFor="let user of users">{{ user }}</li></ul>'
})
export class UsersComponent {
  users: string[] = [];
  
  constructor(private userService: UserService) {
    // Angular автоматически создаст экземпляр UserService
    // и внедрит его в компонент
    this.users = this.userService.getUsers();
  }
}
```

## Уровни предоставления (Providers)

### 1. **root (по умолчанию)**

Singleton на уровне всего приложения.

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Один экземпляр на все приложение
}
```

### 2. **platform**

Singleton на уровне платформы (для нескольких приложений).

```typescript
@Injectable({
  providedIn: 'platform'
})
export class PlatformService {
  // Один экземпляр на платформу
}
```

### 3. **any**

Новый экземпляр для каждого компонента/модуля.

```typescript
@Injectable({
  providedIn: 'any'
})
export class UserService {
  // Новый экземпляр для каждого компонента
}
```

### 4. **Модуль**

Предоставление на уровне модуля.

```typescript
@NgModule({
  providers: [UserService] // Экземпляр для модуля
})
export class UserModule {}
```

### 5. **Компонент**

Предоставление на уровне компонента.

```typescript
@Component({
  selector: 'app-user',
  providers: [UserService] // Новый экземпляр для каждого компонента
})
export class UserComponent {}
```

## Иерархия инжекторов

Angular создает иерархию инжекторов:

```
Root Injector (AppModule)
  ↓
Component Injector
  ↓
Child Component Injector
```

```typescript
// Родительский компонент
@Component({
  selector: 'app-parent',
  providers: [UserService] // Свой инжектор
})
export class ParentComponent {}

// Дочерний компонент
@Component({
  selector: 'app-child'
})
export class ChildComponent {
  constructor(private userService: UserService) {
    // Получит UserService из родительского инжектора
  }
}
```

## Внедрение нескольких зависимостей

```typescript
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-example'
})
export class ExampleComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private logger: LoggerService
  ) {
    // Все зависимости внедряются автоматически
  }
}
```

## Создание токенов для DI

### 1. **Строковые токены (устарело)**

```typescript
// ❌ Устарело, не рекомендуется
const USER_SERVICE = 'UserService';

@NgModule({
  providers: [
    { provide: USER_SERVICE, useClass: UserService }
  ]
})
```

### 2. **InjectionToken (рекомендуется)**

```typescript
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' }
  ]
})
export class AppModule {}

// Использование
@Component({
  selector: 'app-api'
})
export class ApiComponent {
  constructor(@Inject(API_URL) private apiUrl: string) {
    console.log(this.apiUrl); // 'https://api.example.com'
  }
}
```

## Стратегии предоставления

### 1. **useClass**

Использование класса.

```typescript
@NgModule({
  providers: [
    { provide: UserService, useClass: UserService }
  ]
})
```

### 2. **useValue**

Использование значения.

```typescript
const config = { apiUrl: 'https://api.example.com' };

@NgModule({
  providers: [
    { provide: 'APP_CONFIG', useValue: config }
  ]
})
```

### 3. **useFactory**

Использование фабрики.

```typescript
function userServiceFactory(http: HttpClient) {
  return new UserService(http);
}

@NgModule({
  providers: [
    {
      provide: UserService,
      useFactory: userServiceFactory,
      deps: [HttpClient]
    }
  ]
})
```

### 4. **useExisting**

Использование существующего провайдера.

```typescript
@NgModule({
  providers: [
    UserService,
    { provide: 'UserServiceAlias', useExisting: UserService }
  ]
})
```

## Опциональные зависимости

```typescript
import { Optional } from '@angular/core';

@Component({
  selector: 'app-example'
})
export class ExampleComponent {
  constructor(@Optional() private logger?: LoggerService) {
    // logger может быть undefined
    if (this.logger) {
      this.logger.log('Сообщение');
    }
  }
}
```

## Практические примеры

### Пример 1: Базовое использование

```typescript
// Сервис
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['Данные 1', 'Данные 2'];
  }
}

// Компонент
@Component({
  selector: 'app-data',
  template: '<ul><li *ngFor="let item of data">{{ item }}</li></ul>'
})
export class DataComponent {
  data: string[] = [];
  
  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
  }
}
```

### Пример 2: Вложенные зависимости

```typescript
// Сервис с зависимостью
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  get(url: string) {
    // HTTP запрос
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) {
    // HttpService внедряется автоматически
  }
  
  getUsers() {
    return this.http.get('/api/users');
  }
}

// Компонент
@Component({
  selector: 'app-users'
})
export class UsersComponent {
  constructor(private userService: UserService) {
    // UserService внедряется, HttpService тоже
  }
}
```

### Пример 3: Фабрика с зависимостями

```typescript
function createLogger(isDev: boolean): LoggerService {
  return isDev ? new ConsoleLogger() : new FileLogger();
}

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: createLogger,
      deps: [/* зависимости */]
    }
  ]
})
```

## Преимущества DI

1. **Тестируемость** — легко мокировать зависимости
2. **Гибкость** — легко заменять реализации
3. **Переиспользование** — сервисы можно использовать везде
4. **Разделение ответственности** — компоненты не создают зависимости

## Лучшие практики

### ✅ Делайте:

1. **Используйте providedIn: 'root'** для singleton сервисов
2. **Создавайте InjectionToken** для значений
3. **Используйте фабрики** для сложной логики создания
4. **Тестируйте с моками** зависимостей

### ❌ Не делайте:

1. **Не создавайте зависимости внутри классов**
2. **Не используйте строковые токены** (устарело)
3. **Не злоупотребляйте** предоставлением на уровне компонента

## Заключение

Dependency Injection в Angular:

- **Встроенная система DI** для управления зависимостями
- **Иерархия инжекторов** для гибкого предоставления
- **Различные стратегии** (useClass, useValue, useFactory)
- **Улучшает тестируемость** и поддерживаемость кода

**Помните:** DI — это основа архитектуры Angular. Правильное использование DI делает код более модульным, тестируемым и поддерживаемым.

