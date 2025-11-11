# Что такое платформа в Angular?

Платформа в Angular — это абстракция, которая определяет, где и как выполняется Angular приложение. Платформа обеспечивает изоляцию кода приложения от конкретной среды выполнения (браузер, сервер, мобильное устройство) и предоставляет единый API для работы с различными платформами. Понимание концепции платформы критически важно для создания кроссплатформенных Angular приложений.

## Что такое платформа?

Платформа в Angular — это слой абстракции, который предоставляет базовые сервисы и функциональность для работы Angular приложения в конкретной среде. Платформа определяет, как Angular взаимодействует с окружением выполнения.

### Основные платформы:

1. **Browser** — выполнение в браузере
2. **Server** — выполнение на сервере (SSR)
3. **Web Worker** — выполнение в Web Worker
4. **Mobile** — выполнение на мобильных устройствах

## Browser Platform

Платформа браузера — это стандартная платформа для выполнения Angular приложений в браузере.

### Характеристики:

- ✅ **DOM манипуляции** — работа с DOM
- ✅ **События браузера** — обработка событий
- ✅ **Рендеринг** — отображение в браузере
- ✅ **Стандартное использование** — большинство приложений

### Пример:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// Запуск приложения в браузере
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

## Server Platform

Платформа сервера используется для Server-Side Rendering (SSR) с Angular Universal.

### Характеристики:

- ✅ **SSR** — рендеринг на сервере
- ✅ **SEO** — улучшенная индексация
- ✅ **Быстрая первоначальная загрузка** — HTML с контентом
- ✅ **Универсальные приложения** — работа на сервере и клиенте

### Пример:

```typescript
import { platformServer } from '@angular/platform-server';
import { AppModule } from './app.module';

// Запуск приложения на сервере
platformServer()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    const appRef = moduleRef.injector.get(ApplicationRef);
    // Рендеринг на сервере
  });
```

## Платформенные сервисы

Платформа предоставляет различные сервисы для работы с окружением.

### 1. **DOCUMENT**

Абстракция для работы с документом.

```typescript
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

constructor(@Inject(DOCUMENT) private document: Document) {
  // Работа с document
  this.document.title = 'Новый заголовок';
}
```

### 2. **LOCATION**

Абстракция для работы с URL и навигацией.

```typescript
import { Location } from '@angular/common';

constructor(private location: Location) {
  // Работа с location
  this.location.back();
  this.location.forward();
}
```

### 3. **PLATFORM_ID**

Идентификатор текущей платформы.

```typescript
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  if (isPlatformBrowser(this.platformId)) {
    // Код для браузера
    console.log('Выполняется в браузере');
  }
  
  if (isPlatformServer(this.platformId)) {
    // Код для сервера
    console.log('Выполняется на сервере');
  }
}
```

## Определение платформы

### Проверка платформы:

```typescript
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({...})
export class MyComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Код только для браузера
      // Например, работа с localStorage
      localStorage.setItem('key', 'value');
    }
    
    if (isPlatformServer(this.platformId)) {
      // Код только для сервера
      // Например, работа с серверными API
    }
  }
}
```

## Практические примеры

### Пример 1: Условная логика для платформы

```typescript
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
    // На сервере ничего не делаем
  }
  
  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }
}
```

### Пример 2: Платформенные зависимости

```typescript
import { PLATFORM_ID, Inject, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  get window(): Window | null {
    if (isPlatformBrowser(this.platformId)) {
      return window;
    }
    return null;
  }
  
  scrollToTop() {
    if (isPlatformBrowser(this.platformId) && this.window) {
      this.window.scrollTo(0, 0);
    }
  }
}
```

### Пример 3: Универсальное приложение

```typescript
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Универсальное приложение</h1>
      <p>Платформа: {{ platform }}</p>
    </div>
  `
})
export class AppComponent implements OnInit {
  platform = '';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.platform = 'Браузер';
      // Браузер-специфичная логика
    } else if (isPlatformServer(this.platformId)) {
      this.platform = 'Сервер';
      // Сервер-специфичная логика
    }
  }
}
```

## Преимущества платформенной абстракции

### 1. **Кроссплатформенность**

Один код может работать на разных платформах.

### 2. **Изоляция**

Код приложения изолирован от конкретной платформы.

### 3. **Тестируемость**

Легче тестировать с различными платформами.

### 4. **Гибкость**

Легко переключаться между платформами.

## Заключение

Платформа в Angular:

- **Абстракция окружения** — определяет среду выполнения
- **Различные платформы** — Browser, Server, Web Worker
- **Платформенные сервисы** — DOCUMENT, LOCATION, PLATFORM_ID
- **Универсальные приложения** — работа на разных платформах

**Помните:** платформа в Angular обеспечивает абстракцию для работы с различными средами выполнения. Используйте платформенные проверки для создания универсальных приложений, которые работают как в браузере, так и на сервере.

