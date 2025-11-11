# Как сделать компонент для показа сообщений об ошибках?

Создание компонента для отображения сообщений об ошибках — это важная часть пользовательского опыта в Angular приложениях. Такой компонент должен быть переиспользуемым, гибким и легко интегрируемым в приложение. Понимание различных подходов к созданию компонента ошибок и умение выбрать правильный подход критически важно для создания качественных Angular приложений.

## Подходы к созданию компонента ошибок

### Подход 1: Простой компонент с @Input()

Самый простой подход — компонент, который получает сообщение об ошибке через @Input().

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="error-message" *ngIf="message">
      <div class="error-icon">⚠️</div>
      <div class="error-text">{{ message }}</div>
      <button *ngIf="dismissible" (click)="dismiss()" class="dismiss-btn">×</button>
    </div>
  `,
  styles: [`
    .error-message {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background-color: #fee;
      border: 1px solid #fcc;
      border-radius: 4px;
      color: #c33;
      margin: 8px 0;
    }
    .error-icon {
      margin-right: 8px;
      font-size: 20px;
    }
    .error-text {
      flex: 1;
    }
    .dismiss-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #c33;
      padding: 0 8px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();
  
  dismiss() {
    this.message = null;
    this.dismissed.emit();
  }
}
```

**Использование:**
```typescript
@Component({
  template: `
    <app-error-message 
      [message]="errorMessage"
      [dismissible]="true"
      (dismissed)="clearError()">
    </app-error-message>
  `
})
export class MyComponent {
  errorMessage: string | null = null;
  
  clearError() {
    this.errorMessage = null;
  }
}
```

### Подход 2: Сервис для управления ошибками

Более продвинутый подход — централизованный сервис для управления ошибками.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorInfo {
  message: string;
  type?: 'error' | 'warning' | 'info';
  duration?: number;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorsSubject = new BehaviorSubject<ErrorInfo[]>([]);
  public errors$: Observable<ErrorInfo[]> = this.errorsSubject.asObservable();
  
  showError(message: string, type: 'error' | 'warning' | 'info' = 'error', duration?: number) {
    const error: ErrorInfo = {
      message,
      type,
      duration,
      id: Date.now().toString()
    };
    
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, error]);
    
    // Автоматическое удаление через duration
    if (duration) {
      setTimeout(() => {
        this.removeError(error.id!);
      }, duration);
    }
    
    return error.id;
  }
  
  removeError(id: string) {
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next(currentErrors.filter(e => e.id !== id));
  }
  
  clearAll() {
    this.errorsSubject.next([]);
  }
}
```

**Компонент для отображения ошибок:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService, ErrorInfo } from './error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-container',
  template: `
    <div class="error-container">
      <app-error-message
        *ngFor="let error of errors"
        [message]="error.message"
        [type]="error.type"
        [dismissible]="true"
        (dismissed)="removeError(error.id!)">
      </app-error-message>
    </div>
  `,
  styles: [`
    .error-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 400px;
    }
  `]
})
export class ErrorContainerComponent implements OnInit, OnDestroy {
  errors: ErrorInfo[] = [];
  private subscription!: Subscription;
  
  constructor(private errorService: ErrorService) {}
  
  ngOnInit() {
    this.subscription = this.errorService.errors$.subscribe(errors => {
      this.errors = errors;
    });
  }
  
  removeError(id: string) {
    this.errorService.removeError(id);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**Улучшенный компонент ошибки:**
```typescript
@Component({
  selector: 'app-error-message',
  template: `
    <div [class]="getErrorClass()" *ngIf="message">
      <div class="error-icon">{{ getIcon() }}</div>
      <div class="error-text">{{ message }}</div>
      <button *ngIf="dismissible" (click)="dismiss()" class="dismiss-btn">×</button>
    </div>
  `,
  styles: [`
    .error-message {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 8px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .error-type-error {
      background-color: #fee;
      border: 1px solid #fcc;
      color: #c33;
    }
    .error-type-warning {
      background-color: #ffd;
      border: 1px solid #fc9;
      color: #963;
    }
    .error-type-info {
      background-color: #eef;
      border: 1px solid #ccf;
      color: #339;
    }
    .error-icon {
      margin-right: 8px;
      font-size: 20px;
    }
    .error-text {
      flex: 1;
    }
    .dismiss-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0 8px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
  @Input() type: 'error' | 'warning' | 'info' = 'error';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();
  
  getErrorClass(): string {
    return `error-message error-type-${this.type}`;
  }
  
  getIcon(): string {
    switch (this.type) {
      case 'error': return '⚠️';
      case 'warning': return '⚠';
      case 'info': return 'ℹ️';
      default: return '⚠️';
    }
  }
  
  dismiss() {
    this.dismissed.emit();
  }
}
```

### Подход 3: Глобальный компонент ошибок

Компонент, который отображается на уровне приложения.

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <app-error-container></app-error-container>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

// Использование в любом месте приложения
@Component({...})
export class UserComponent {
  constructor(private errorService: ErrorService) {}
  
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: error => {
        this.errorService.showError(
          'Не удалось загрузить пользователей',
          'error',
          5000
        );
      }
    });
  }
}
```

### Подход 4: HTTP Interceptor для автоматической обработки ошибок

Автоматическая обработка HTTP ошибок.

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Произошла ошибка';
        
        if (error.error instanceof ErrorEvent) {
          // Клиентская ошибка
          errorMessage = `Ошибка: ${error.error.message}`;
        } else {
          // Серверная ошибка
          switch (error.status) {
            case 400:
              errorMessage = 'Неверный запрос';
              break;
            case 401:
              errorMessage = 'Необходима авторизация';
              break;
            case 403:
              errorMessage = 'Доступ запрещен';
              break;
            case 404:
              errorMessage = 'Ресурс не найден';
              break;
            case 500:
              errorMessage = 'Ошибка сервера';
              break;
            default:
              errorMessage = `Ошибка ${error.status}: ${error.message}`;
          }
        }
        
        this.errorService.showError(errorMessage, 'error', 5000);
        
        return throwError(() => error);
      })
    );
  }
}
```

**Регистрация interceptor:**
```typescript
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

### Подход 5: Toast-уведомления

Компонент для toast-уведомлений с анимацией.

```typescript
@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" [@slideInOut] *ngIf="message">
      <div class="toast-content">
        <span class="toast-icon">{{ getIcon() }}</span>
        <span class="toast-message">{{ message }}</span>
        <button class="toast-close" (click)="dismiss()">×</button>
      </div>
    </div>
  `,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      min-width: 300px;
      max-width: 500px;
    }
    .toast-content {
      display: flex;
      align-items: center;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .toast-icon {
      margin-right: 12px;
      font-size: 24px;
    }
    .toast-message {
      flex: 1;
    }
    .toast-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0 8px;
    }
  `]
})
export class ToastComponent {
  @Input() message: string | null = null;
  @Input() type: 'error' | 'warning' | 'info' | 'success' = 'error';
  @Output() dismissed = new EventEmitter<void>();
  
  getIcon(): string {
    const icons = {
      error: '⚠️',
      warning: '⚠',
      info: 'ℹ️',
      success: '✅'
    };
    return icons[this.type];
  }
  
  dismiss() {
    this.dismissed.emit();
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте сервис** — для централизованного управления
2. **Поддерживайте разные типы** — error, warning, info
3. **Добавляйте автоудаление** — через duration
4. **Используйте HTTP Interceptor** — для автоматической обработки
5. **Добавляйте анимации** — для лучшего UX

### ❌ Не делайте:

1. **Не показывайте технические детали** — пользователю не нужны stack traces
2. **Не создавайте слишком много ошибок** — ограничивайте количество
3. **Не забывайте очищать** — удаляйте ошибки после показа
4. **Не блокируйте UI** — используйте неблокирующие уведомления

## Заключение

Создание компонента для ошибок:

- **Простой компонент** — для базовых случаев
- **Сервис управления** — для централизованного управления
- **HTTP Interceptor** — для автоматической обработки
- **Toast-уведомления** — для неблокирующих сообщений

**Помните:** хороший компонент ошибок должен быть переиспользуемым, информативным и не мешать пользователю. Используйте централизованный сервис для управления ошибками и HTTP Interceptor для автоматической обработки HTTP ошибок.

