# Разница между компонентом и директивой?

Понимание разницы между компонентами и директивами в Angular является фундаментальным для правильной архитектуры приложения. Хотя компоненты технически являются директивой с шаблоном, они имеют важные различия в назначении и использовании. Правильное понимание этих различий помогает создавать правильную структуру приложения.

## Что такое компонент?

Компонент — это специальный тип директивы, который имеет шаблон и определяет часть пользовательского интерфейса приложения.

### Характеристики компонента:

- ✅ **Имеет шаблон** — определяет HTML разметку
- ✅ **Имеет стили** — CSS/SCSS стили
- ✅ **Создает элемент** — создает собственный элемент в DOM
- ✅ **Имеет селектор** — используется как HTML элемент
- ✅ **Содержит логику** — TypeScript класс с методами
- ✅ **Имеет жизненный цикл** — ngOnInit, ngOnDestroy и т.д.

### Пример компонента:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card', // Селектор для использования
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ccc;
      padding: 16px;
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
}
```

**Использование:**
```html
<app-user-card [user]="currentUser" (edit)="handleEdit($event)"></app-user-card>
```

## Что такое директива?

Директива — это класс, который добавляет поведение к существующим элементам DOM. Директивы не имеют шаблона и работают с уже существующими элементами.

### Характеристики директивы:

- ❌ **Нет шаблона** — не определяет HTML разметку
- ❌ **Не создает элемент** — работает с существующими элементами
- ✅ **Добавляет поведение** — изменяет внешний вид или поведение
- ✅ **Имеет селектор** — используется как атрибут
- ✅ **Может быть структурной** — изменяет структуру DOM
- ✅ **Может быть атрибутной** — изменяет свойства элемента

### Пример директивы:

```typescript
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]' // Селектор как атрибут
})
export class HighlightDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
```

**Использование:**
```html
<p appHighlight>Текст с выделением при наведении</p>
```

## Ключевые различия

### 1. **Наличие шаблона**

**Компонент:**
```typescript
@Component({
  selector: 'app-user',
  template: '<p>Пользователь</p>' // ✅ Есть шаблон
})
export class UserComponent { }
```

**Директива:**
```typescript
@Directive({
  selector: '[appHighlight]'
  // ❌ Нет шаблона
})
export class HighlightDirective { }
```

### 2. **Создание элементов**

**Компонент:**
```html
<!-- Создает новый элемент -->
<app-user></app-user>
```

**Директива:**
```html
<!-- Работает с существующим элементом -->
<p appHighlight>Текст</p>
```

### 3. **Назначение**

**Компонент:**
- Определяет часть UI
- Создает структуру
- Отображает данные

**Директива:**
- Добавляет поведение
- Изменяет существующие элементы
- Переиспользуемая функциональность

### 4. **Использование**

**Компонент:**
```html
<!-- Используется как элемент -->
<app-button>Текст</app-button>
<app-modal [isOpen]="true"></app-modal>
```

**Директива:**
```html
<!-- Используется как атрибут -->
<button appAutoFocus>Кнопка</button>
<div [appHighlight]="'yellow'">Текст</div>
```

## Типы директив

### 1. **Компоненты (Components)**

Компоненты — это директивы с шаблоном.

```typescript
@Component({
  selector: 'app-card',
  template: '<div class="card"><ng-content></ng-content></div>'
})
export class CardComponent { }
```

### 2. **Структурные директивы**

Изменяют структуру DOM, добавляя или удаляя элементы.

```typescript
// *ngIf, *ngFor - встроенные структурные директивы

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

### 3. **Атрибутные директивы**

Изменяют внешний вид или поведение элемента.

```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  
  @HostListener('mouseenter') onMouseEnter() {
    // Изменение стиля
  }
}
```

## Сравнительная таблица

| Характеристика | Компонент | Директива |
|----------------|-----------|-----------|
| **Шаблон** | Да | Нет |
| **Стили** | Да | Нет (через Renderer2) |
| **Создает элемент** | Да | Нет |
| **Работает с элементами** | Нет | Да |
| **Селектор** | Элемент (app-user) | Атрибут ([appHighlight]) |
| **Назначение** | UI представление | Поведение |
| **Жизненный цикл** | Полный | Ограниченный |

## Практические примеры

### Пример 1: Компонент для UI элемента

```typescript
@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="onClick.emit()">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      border-radius: 4px;
    }
  `]
})
export class ButtonComponent {
  @Input() buttonClass = 'btn-primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<void>();
}
```

**Использование:**
```html
<app-button (onClick)="handleClick()">Нажми меня</app-button>
```

### Пример 2: Директива для поведения

```typescript
@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
```

**Использование:**
```html
<input appAutoFocus type="text" placeholder="Автофокус">
```

### Пример 3: Когда использовать компонент vs директиву

```typescript
// ✅ Компонент - создает UI элемент
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" *ngIf="isOpen">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
}

// ✅ Директива - добавляет поведение
@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();
  
  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.clickOutside.emit();
    }
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте компоненты** — для создания UI элементов
2. **Используйте директивы** — для переиспользуемого поведения
3. **Разделяйте ответственность** — компоненты для UI, директивы для поведения
4. **Создавайте переиспользуемые директивы** — для общей функциональности

### ❌ Не делайте:

1. **Не создавайте директиву** — когда нужен компонент
2. **Не создавайте компонент** — когда достаточно директивы
3. **Не смешивайте логику** — четко разделяйте назначение

## Заключение

Разница между компонентом и директивой:

- **Компонент** — директива с шаблоном, создает UI элемент, имеет стили
- **Директива** — добавляет поведение к существующим элементам, нет шаблона

**Помните:** компоненты используются для создания UI элементов, а директивы — для добавления переиспользуемого поведения к существующим элементам. Компоненты создают структуру, директивы добавляют функциональность.

