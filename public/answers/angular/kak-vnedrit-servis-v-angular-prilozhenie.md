# Как внедрить сервис в Angular приложение?

Внедрение сервисов (Dependency Injection) в Angular — это фундаментальный механизм, который позволяет создавать переиспользуемые компоненты и обеспечивать слабую связанность между частями приложения. Понимание различных способов внедрения сервисов и правильного их использования критически важно для создания масштабируемых Angular приложений.

## Что такое сервис в Angular?

Сервис в Angular — это класс, помеченный декоратором `@Injectable()`, который содержит бизнес-логику, работу с данными, HTTP запросы и другую функциональность, которая может быть переиспользована в различных компонентах.

## Базовое создание сервиса

### Шаг 1: Создание сервиса

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Автоматическая регистрация в корневом инжекторе
})
export class UserService {
  private users: User[] = [];
  
  getUsers(): User[] {
    return this.users;
  }
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
```

### Шаг 2: Внедрение сервиса в компонент

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  
  // Внедрение сервиса через конструктор
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
```

## Способы предоставления сервисов

### 1. **providedIn: 'root'** (Рекомендуемый способ)

Сервис предоставляется на уровне всего приложения как singleton.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton для всего приложения
})
export class DataService {
  private data: any = {};
  
  setData(key: string, value: any): void {
    this.data[key] = value;
  }
  
  getData(key: string): any {
    return this.data[key];
  }
}
```

**Преимущества:**
- ✅ Автоматическая регистрация
- ✅ Tree-shaking — неиспользуемые сервисы удаляются
- ✅ Singleton — один экземпляр на все приложение
- ✅ Не нужно добавлять в providers массив

**Использование:**
```typescript
@Component({
  selector: 'app-component',
  template: '...'
})
export class MyComponent {
  constructor(private dataService: DataService) {}
}
```

### 2. **providedIn: 'platform'**

Сервис предоставляется на уровне платформы, общий для всех приложений на странице.

```typescript
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'platform'
})
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('Platform ID:', this.platformId);
  }
}
```

**Использование:**
- Когда нужно разделить сервис между несколькими Angular приложениями на одной странице
- Редко используется в обычных приложениях

### 3. **providedIn: 'any'**

Создается новый экземпляр сервиса для каждого lazy-loaded модуля.

```typescript
@Injectable({
  providedIn: 'any'
})
export class ModuleService {
  constructor() {
    console.log('ModuleService создан');
  }
}
```

**Использование:**
- Когда нужен отдельный экземпляр для каждого lazy-loaded модуля
- Полезно для изоляции состояния между модулями

### 4. **Через providers в NgModule**

Регистрация сервиса в модуле через массив `providers`.

```typescript
import { NgModule } from '@angular/core';
import { UserService } from './user.service';

@NgModule({
  declarations: [UserListComponent],
  providers: [UserService] // Регистрация в модуле
})
export class UserModule { }
```

**Использование:**
- Когда нужно ограничить область видимости сервиса модулем
- Для создания отдельного экземпляра в модуле

### 5. **Через providers в компоненте**

Регистрация сервиса на уровне компонента — создается новый экземпляр для каждого экземпляра компонента.

```typescript
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: '...',
  providers: [UserService] // Новый экземпляр для каждого компонента
})
export class UserComponent {
  constructor(private userService: UserService) {}
}
```

**Использование:**
- Когда нужен отдельный экземпляр сервиса для каждого компонента
- Для изоляции состояния компонента

## Иерархия инжекторов

Angular использует иерархию инжекторов для поиска сервисов:

```
Root Injector (providedIn: 'root')
  ↓
Platform Injector (providedIn: 'platform')
  ↓
Module Injector (providers в NgModule)
  ↓
Component Injector (providers в Component)
```

Angular ищет сервис снизу вверх по иерархии.

## Практические примеры

### Пример 1: Singleton сервис

```typescript
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
  };
  
  getConfig(): any {
    return this.config;
  }
  
  updateConfig(newConfig: Partial<any>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Использование в компонентах
@Component({...})
export class ComponentA {
  constructor(private configService: ConfigService) {
    console.log('Config:', this.configService.getConfig());
  }
}

@Component({...})
export class ComponentB {
  constructor(private configService: ConfigService) {
    // Тот же экземпляр, что и в ComponentA
    console.log('Config:', this.configService.getConfig());
  }
}
```

### Пример 2: Сервис с зависимостями

```typescript
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}
  
  get<T>(url: string): Observable<T> {
    const fullUrl = `${this.configService.getConfig().apiUrl}${url}`;
    return this.http.get<T>(fullUrl);
  }
}

// Angular автоматически внедрит зависимости
```

### Пример 3: Сервис на уровне модуля

```typescript
// user.service.ts
@Injectable() // Без providedIn
export class UserService {
  private users: User[] = [];
  
  getUsers(): User[] {
    return this.users;
  }
}

// user.module.ts
@NgModule({
  declarations: [UserListComponent],
  providers: [UserService] // Регистрация в модуле
})
export class UserModule { }

// Использование
@Component({...})
export class UserListComponent {
  constructor(private userService: UserService) {}
}
```

### Пример 4: Сервис на уровне компонента

```typescript
@Injectable()
export class ComponentStateService {
  private state: any = {};
  
  setState(key: string, value: any): void {
    this.state[key] = value;
  }
  
  getState(key: string): any {
    return this.state[key];
  }
}

@Component({
  selector: 'app-user',
  template: '...',
  providers: [ComponentStateService] // Отдельный экземпляр для каждого компонента
})
export class UserComponent {
  constructor(private stateService: ComponentStateService) {
    // У каждого экземпляра UserComponent свой экземпляр ComponentStateService
  }
}
```

### Пример 5: Использование InjectionToken

Для внедрения примитивных значений или конфигурации.

```typescript
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
export const API_TIMEOUT = new InjectionToken<number>('API_TIMEOUT');

// В модуле или компоненте
@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' },
    { provide: API_TIMEOUT, useValue: 5000 }
  ]
})
export class AppModule { }

// Использование
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(API_TIMEOUT) private timeout: number
  ) {}
  
  getUrl(): string {
    return this.apiUrl;
  }
}
```

### Пример 6: Factory провайдер

Для создания сервиса с дополнительной логикой.

```typescript
export function createLoggerService(config: any): LoggerService {
  return new LoggerService(config.logLevel);
}

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: createLoggerService,
      deps: [AppConfig]
    }
  ]
})
export class AppModule { }
```

### Пример 7: Class провайдер

Для использования другого класса как реализации.

```typescript
abstract class DataService {
  abstract getData(): any;
}

class HttpDataService extends DataService {
  getData(): any {
    return 'HTTP Data';
  }
}

class MockDataService extends DataService {
  getData(): any {
    return 'Mock Data';
  }
}

@NgModule({
  providers: [
    {
      provide: DataService,
      useClass: environment.production ? HttpDataService : MockDataService
    }
  ]
})
export class AppModule { }
```

## Опциональное внедрение

Использование `@Optional()` для сервисов, которые могут отсутствовать.

```typescript
import { Optional } from '@angular/core';

@Component({...})
export class MyComponent {
  constructor(@Optional() private optionalService: OptionalService) {
    if (this.optionalService) {
      this.optionalService.doSomething();
    }
  }
}
```

## Внедрение с дефолтным значением

Использование `@Inject()` с дефолтным значением.

```typescript
import { Inject, Optional } from '@angular/core';

@Component({...})
export class MyComponent {
  constructor(
    @Optional() @Inject(API_URL) private apiUrl: string = 'https://default-api.com'
  ) {}
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте `providedIn: 'root'`** для большинства сервисов
2. **Создавайте сервисы для бизнес-логики** — не в компонентах
3. **Используйте InjectionToken** для конфигурации
4. **Тестируйте сервисы отдельно** — легче тестировать
5. **Используйте интерфейсы** — для абстракции

### ❌ Не делайте:

1. **Не создавайте сервисы в компонентах** — выносите в отдельные файлы
2. **Не используйте providers в компонентах** без необходимости
3. **Не создавайте циклические зависимости** — избегайте взаимных зависимостей
4. **Не забывайте про tree-shaking** — используйте `providedIn: 'root'`

## Заключение

Внедрение сервисов в Angular:

- **providedIn: 'root'** — рекомендуемый способ, singleton для всего приложения
- **providedIn: 'platform'** — для платформенных сервисов
- **providedIn: 'any'** — отдельный экземпляр для каждого lazy модуля
- **providers в NgModule** — ограничение области видимости модулем
- **providers в Component** — отдельный экземпляр для каждого компонента

**Помните:** правильное использование Dependency Injection делает код более модульным, тестируемым и поддерживаемым. Используйте `providedIn: 'root'` для большинства сервисов, это обеспечивает автоматическую регистрацию, tree-shaking и singleton поведение.

