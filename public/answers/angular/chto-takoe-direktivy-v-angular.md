# Что такое директивы в Angular?

Директивы в Angular — это классы, которые добавляют дополнительное поведение к элементам в DOM. Директивы позволяют изменять структуру DOM, добавлять стили, обрабатывать события и создавать переиспользуемую функциональность.

## Типы директив

### 1. **Компоненты (Components)**

Компоненты — это директивы с шаблоном. Это самый распространенный тип директив.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {
  user = { name: 'Иван' };
}
```

### 2. **Атрибутные директивы (Attribute Directives)**

Изменяют внешний вид или поведение элемента.

```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Изменение стиля элемента
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

**Использование:**
```html
<p appHighlight>Выделенный текст</p>
```

### 3. **Структурные директивы (Structural Directives)**

Изменяют структуру DOM, добавляя или удаляя элементы.

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

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
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

**Использование:**
```html
<div *appUnless="isHidden">Контент</div>
```

## Встроенные директивы

### 1. **Структурные директивы**

#### *ngIf

```html
<div *ngIf="isVisible">Видимый контент</div>
<div *ngIf="user; else noUser">
  <p>{{ user.name }}</p>
</div>
<ng-template #noUser>
  <p>Пользователь не найден</p>
</ng-template>
```

#### *ngFor

```html
<ul>
  <li *ngFor="let user of users; let i = index; trackBy: trackById">
    {{ i + 1 }}. {{ user.name }}
  </li>
</ul>
```

#### *ngSwitch

```html
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Загрузка...</p>
  <p *ngSwitchCase="'success'">Успешно</p>
  <p *ngSwitchDefault>Неизвестный статус</p>
</div>
```

### 2. **Атрибутные директивы**

#### [ngClass]

```html
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Контент
</div>

<div [ngClass]="getClasses()">Контент</div>
```

#### [ngStyle]

```html
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
  Текст
</div>

<div [ngStyle]="getStyles()">Текст</div>
```

#### [ngModel]

```html
<input [(ngModel)]="name" placeholder="Имя">
<p>Привет, {{ name }}!</p>
```

## Создание собственных директив

### Пример 1: Атрибутная директива для фокуса

```typescript
import { Directive, ElementRef, AfterViewInit } from '@angular/core';

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
<input appAutoFocus placeholder="Автофокус">
```

### Пример 2: Атрибутная директива для выделения

```typescript
import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Input() appHighlight: string = 'yellow';
  private mouseEnterListener?: () => void;
  private mouseLeaveListener?: () => void;
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  
  ngOnInit() {
    this.mouseEnterListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseenter',
      () => this.highlight(this.appHighlight)
    );
    
    this.mouseLeaveListener = this.renderer.listen(
      this.el.nativeElement,
      'mouseleave',
      () => this.highlight(null)
    );
  }
  
  ngOnDestroy() {
    if (this.mouseEnterListener) {
      this.mouseEnterListener();
    }
    if (this.mouseLeaveListener) {
      this.mouseLeaveListener();
    }
  }
  
  private highlight(color: string | null) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      color
    );
  }
}
```

**Использование:**
```html
<p appHighlight="lightblue">Наведите для выделения</p>
```

### Пример 3: Структурная директива для условного отображения

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIf]'
})
export class ShowIfDirective {
  private hasView = false;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  
  @Input() set appShowIf(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

**Использование:**
```html
<div *appShowIf="isVisible">Видимый контент</div>
```

## Разница между директивами и компонентами

### Компоненты

- Имеют шаблон (template)
- Создают собственный элемент в DOM
- Используются для создания UI элементов

```typescript
@Component({
  selector: 'app-user',
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {}
```

### Директивы

- Не имеют шаблона
- Работают с существующими элементами
- Используются для добавления поведения

```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте директивы** для переиспользуемой функциональности
2. **Используйте Renderer2** вместо прямого доступа к DOM
3. **Очищайте подписки** в ngOnDestroy
4. **Используйте @HostListener** для событий

### ❌ Не делайте:

1. **Не обращайтесь напрямую к DOM** (используйте Renderer2)
2. **Не забывайте очищать** подписки и слушатели
3. **Не создавайте директивы** когда нужен компонент

## Заключение

Директивы в Angular:

- **Компоненты** — директивы с шаблоном
- **Атрибутные директивы** — изменяют внешний вид или поведение
- **Структурные директивы** — изменяют структуру DOM
- **Встроенные директивы** — *ngIf, *ngFor, [ngClass], [ngStyle]
- **Собственные директивы** — для переиспользуемой функциональности

**Помните:** директивы — это мощный инструмент для создания переиспользуемой функциональности и изменения поведения элементов в Angular приложениях.

