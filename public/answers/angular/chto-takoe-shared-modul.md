# Что такое Shared модуль?

Shared модуль (общий модуль) в Angular — это специальный модуль, который содержит переиспользуемые компоненты, директивы, пайпы и другие элементы, которые используются в нескольких feature модулях приложения. Shared модуль является важной частью архитектуры Angular приложения и помогает избежать дублирования кода, обеспечивая единообразие UI и функциональности по всему приложению.

## Что такое Shared модуль?

Shared модуль — это NgModule, который экспортирует общие компоненты, директивы, пайпы и модули, которые могут использоваться в различных частях приложения. Он служит централизованным местом для хранения переиспользуемых элементов.

### Характеристики Shared модуля:

- ✅ **Переиспользуемые элементы** — компоненты, директивы, пайпы
- ✅ **Экспорт функциональности** — делает элементы доступными другим модулям
- ✅ **Импорт общих модулей** — CommonModule, FormsModule и т.д.
- ✅ **Единообразие** — обеспечивает единый стиль и функциональность
- ✅ **Избежание дублирования** — код пишется один раз, используется везде

## Структура Shared модуля

### Базовый пример:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Компоненты
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

// Директивы
import { HighlightDirective } from './directives/highlight.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';

// Пайпы
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  // Объявление всех элементов, которые будут экспортированы
  declarations: [
    // Компоненты
    ButtonComponent,
    CardComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    
    // Директивы
    HighlightDirective,
    AutoFocusDirective,
    
    // Пайпы
    TruncatePipe,
    SafeHtmlPipe
  ],
  
  // Импорт модулей, необходимых для работы элементов
  imports: [
    CommonModule, // Для *ngIf, *ngFor и т.д.
    FormsModule,  // Если компоненты используют формы
    ReactiveFormsModule
  ],
  
  // Экспорт элементов для использования в других модулях
  exports: [
    // Компоненты
    ButtonComponent,
    CardComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    
    // Директивы
    HighlightDirective,
    AutoFocusDirective,
    
    // Пайпы
    TruncatePipe,
    SafeHtmlPipe,
    
    // Модули (чтобы другие модули могли использовать *ngIf, *ngFor)
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
```

## Что обычно включают в Shared модуль?

### 1. **Общие компоненты UI**

```typescript
// button.component.ts
@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="onClick.emit()">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() buttonClass = 'btn-primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();
}

// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header" *ngIf="title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() title?: string;
}
```

### 2. **Общие директивы**

```typescript
// highlight.directive.ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
```

### 3. **Общие пайпы**

```typescript
// truncate.pipe.ts
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

// Использование
// {{ longText | truncate:50 }}
```

### 4. **Общие модули**

```typescript
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // Если нужен в нескольких модулях
  ],
  exports: [
    CommonModule, // Для использования *ngIf, *ngFor
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
```

## Использование Shared модуля

### В feature модулях:

```typescript
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    SharedModule // Импорт Shared модуля
  ]
})
export class UserModule { }
```

**Теперь в UserListComponent можно использовать:**
```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <app-card title="Список пользователей">
      <app-button (onClick)="loadUsers()">Загрузить</app-button>
      <div *ngFor="let user of users">
        <p [appHighlight]="'lightblue'">{{ user.name | truncate:20 }}</p>
      </div>
    </app-card>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  loadUsers() {
    // Логика загрузки
  }
}
```

## Что НЕ должно быть в Shared модуле?

### ❌ Не включайте:

1. **Сервисы** — используйте `providedIn: 'root'` или отдельные модули
2. **Feature-специфичные компоненты** — только общие UI компоненты
3. **Бизнес-логику** — только переиспользуемые UI элементы
4. **Роутинг** — не включайте RouterModule в Shared модуль

### ✅ Правильная структура:

```typescript
// shared.module.ts - ТОЛЬКО UI элементы
@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ModalComponent
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    CommonModule
  ]
})
export class SharedModule { }

// core.module.ts - Сервисы (опционально, лучше использовать providedIn: 'root')
@NgModule({
  providers: [
    // Сервисы, если не используете providedIn: 'root'
  ]
})
export class CoreModule { }
```

## Лучшие практики

### ✅ Делайте:

1. **Экспортируйте CommonModule** — для использования *ngIf, *ngFor
2. **Группируйте связанные элементы** — логически организованные компоненты
3. **Документируйте модуль** — опишите, что содержит
4. **Используйте barrel exports** — для удобного импорта
5. **Экспортируйте только нужное** — не экспортируйте внутренние компоненты

### ❌ Не делайте:

1. **Не включайте сервисы** — используйте providedIn: 'root'
2. **Не включайте feature-специфичные элементы** — только общие
3. **Не создавайте циклические зависимости** — между модулями
4. **Не забывайте экспортировать** — элементы должны быть в exports

## Barrel exports (index.ts)

Для удобного импорта создайте barrel файл:

```typescript
// shared/index.ts
export * from './shared.module';
export * from './button/button.component';
export * from './card/card.component';
export * from './pipes/truncate.pipe';
```

**Использование:**
```typescript
import { SharedModule } from './shared';
```

## Пример полного Shared модуля

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Компоненты
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

// Директивы
import { HighlightDirective } from './directives/highlight.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Пайпы
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';

@NgModule({
  declarations: [
    // Компоненты
    ButtonComponent,
    CardComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    
    // Директивы
    HighlightDirective,
    AutoFocusDirective,
    ClickOutsideDirective,
    
    // Пайпы
    TruncatePipe,
    SafeHtmlPipe,
    FormatCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // Компоненты
    ButtonComponent,
    CardComponent,
    ModalComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    
    // Директивы
    HighlightDirective,
    AutoFocusDirective,
    ClickOutsideDirective,
    
    // Пайпы
    TruncatePipe,
    SafeHtmlPipe,
    FormatCurrencyPipe,
    
    // Модули
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
```

## Заключение

Shared модуль в Angular:

- **Содержит переиспользуемые элементы** — компоненты, директивы, пайпы
- **Экспортирует функциональность** — для использования в других модулях
- **Обеспечивает единообразие** — единый стиль и функциональность
- **Избегает дублирования** — код пишется один раз

**Помните:** Shared модуль — это важная часть архитектуры Angular приложения. Он помогает организовать код, избежать дублирования и обеспечить единообразие UI по всему приложению. Не включайте в Shared модуль сервисы и feature-специфичные элементы — только общие переиспользуемые UI компоненты, директивы и пайпы.

