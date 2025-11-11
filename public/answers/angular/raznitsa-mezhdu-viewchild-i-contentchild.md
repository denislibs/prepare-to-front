# Разница между @ViewChild() и @ContentChild()?

`@ViewChild()` и `@ContentChild()` — это декораторы в Angular, которые позволяют получать ссылки на дочерние элементы в компоненте. Хотя они похожи по назначению, они работают с разными типами дочерних элементов и имеют важные различия в использовании. Понимание разницы между ними критически важно для правильной работы с компонентами и их содержимым.

## Что такое @ViewChild()?

`@ViewChild()` — это декоратор, который позволяет получить ссылку на дочерний элемент, который определен **внутри шаблона компонента** (в его `template` или `templateUrl`). Это элементы, которые являются частью самого компонента.

### Характеристики @ViewChild():

- **Работает с элементами в шаблоне компонента** — элементы, определенные в template
- **Доступен после ngAfterViewInit** — элементы доступны после инициализации представления
- **Используется для элементов компонента** — для работы с собственными дочерними элементами
- **Может получать компоненты, директивы, элементы** — различные типы дочерних элементов

### Пример использования @ViewChild():

```typescript
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <div>
      <h2>Родительский компонент</h2>
      <!-- Это элемент в шаблоне компонента -->
      <app-child #childRef></app-child>
      <input #inputRef type="text" placeholder="Введите текст">
      <button (click)="accessChild()">Доступ к дочернему элементу</button>
    </div>
  `
})
export class ParentComponent implements AfterViewInit {
  // Получение ссылки на дочерний компонент
  @ViewChild(ChildComponent) childComponent!: ChildComponent;
  
  // Получение ссылки по template reference variable
  @ViewChild('childRef') childByRef!: ChildComponent;
  
  // Получение ссылки на DOM элемент
  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;
  
  ngAfterViewInit() {
    // @ViewChild доступен после ngAfterViewInit
    console.log('Child Component:', this.childComponent);
    console.log('Input Element:', this.inputElement.nativeElement.value);
    
    // Можно вызывать методы дочернего компонента
    this.childComponent.someMethod();
    
    // Можно работать с DOM элементом
    this.inputElement.nativeElement.focus();
  }
  
  accessChild() {
    // Доступ к дочернему компоненту
    this.childComponent.doSomething();
  }
}
```

### Дочерний компонент:

```typescript
@Component({
  selector: 'app-child',
  template: '<p>Дочерний компонент</p>'
})
export class ChildComponent {
  someMethod() {
    console.log('Метод дочернего компонента вызван');
  }
  
  doSomething() {
    console.log('Выполнение действия');
  }
}
```

## Что такое @ContentChild()?

`@ContentChild()` — это декоратор, который позволяет получить ссылку на дочерний элемент, который был **спроецирован в компонент** через `<ng-content>`. Это элементы, которые передаются из родительского компонента.

### Характеристики @ContentChild():

- **Работает с проектируемым контентом** — элементы, переданные через `<ng-content>`
- **Доступен после ngAfterContentInit** — элементы доступны после инициализации контента
- **Используется для проектируемого контента** — для работы с контентом, переданным извне
- **Может получать компоненты, директивы, элементы** — различные типы проектируемых элементов

### Пример использования @ContentChild():

```typescript
import { Component, ContentChild, AfterContentInit, ElementRef } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <!-- Проектируемый контент -->
      <ng-content></ng-content>
      <div class="card-body">
        <p>Тело карточки</p>
      </div>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  // Получение ссылки на проектируемый компонент
  @ContentChild(HeaderComponent) headerComponent!: HeaderComponent;
  
  // Получение ссылки по template reference variable
  @ContentChild('headerRef') headerByRef!: HeaderComponent;
  
  // Получение ссылки на проектируемый DOM элемент
  @ContentChild('contentRef') contentElement!: ElementRef<HTMLElement>;
  
  ngAfterContentInit() {
    // @ContentChild доступен после ngAfterContentInit
    console.log('Header Component:', this.headerComponent);
    console.log('Content Element:', this.contentElement);
    
    // Можно работать с проектируемым контентом
    if (this.headerComponent) {
      this.headerComponent.setTitle('Новый заголовок');
    }
  }
}
```

### Использование компонента с проектируемым контентом:

```typescript
@Component({
  selector: 'app-app',
  template: `
    <app-card>
      <!-- Это проектируемый контент -->
      <app-header #headerRef></app-header>
      <div #contentRef>Проектируемый контент</div>
    </app-card>
  `
})
export class AppComponent {}
```

### Компонент заголовка:

```typescript
@Component({
  selector: 'app-header',
  template: '<h2>{{ title }}</h2>'
})
export class HeaderComponent {
  title = 'Заголовок';
  
  setTitle(newTitle: string) {
    this.title = newTitle;
  }
}
```

## Ключевые различия

### 1. **Источник элементов**

```typescript
// @ViewChild - элементы в шаблоне компонента
@Component({
  template: `
    <app-child></app-child> <!-- Это ViewChild -->
  `
})
export class ParentComponent {
  @ViewChild(ChildComponent) child!: ChildComponent;
}

// @ContentChild - элементы, спроецированные через ng-content
@Component({
  template: `
    <ng-content></ng-content> <!-- Это ContentChild -->
  `
})
export class CardComponent {
  @ContentChild(HeaderComponent) header!: HeaderComponent;
}

// Использование
@Component({
  template: `
    <app-card>
      <app-header></app-header> <!-- Это ContentChild для CardComponent -->
    </app-card>
  `
})
export class AppComponent {}
```

### 2. **Время доступности**

```typescript
// @ViewChild доступен после ngAfterViewInit
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child!: ChildComponent;
  
  ngAfterViewInit() {
    // ✅ Доступен здесь
    this.child.doSomething();
  }
  
  ngOnInit() {
    // ❌ Еще не доступен
    // this.child.doSomething(); // Ошибка!
  }
}

// @ContentChild доступен после ngAfterContentInit
export class CardComponent implements AfterContentInit {
  @ContentChild(HeaderComponent) header!: HeaderComponent;
  
  ngAfterContentInit() {
    // ✅ Доступен здесь
    this.header.setTitle('Заголовок');
  }
  
  ngOnInit() {
    // ❌ Еще не доступен
    // this.header.setTitle('Заголовок'); // Ошибка!
  }
}
```

### 3. **Жизненный цикл**

Последовательность хуков жизненного цикла:

```
1. constructor
2. ngOnChanges (если есть @Input)
3. ngOnInit
4. ngDoCheck
5. ngAfterContentInit  ← @ContentChild доступен
6. ngAfterContentChecked
7. ngAfterViewInit      ← @ViewChild доступен
8. ngAfterViewChecked
9. ngOnDestroy
```

## Практические примеры

### Пример 1: Использование @ViewChild для доступа к дочернему компоненту

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Счетчик: {{ count }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
    </div>
  `
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
  
  reset() {
    this.count = 0;
  }
}

@Component({
  selector: 'app-parent',
  template: `
    <app-counter #counter></app-counter>
    <button (click)="resetCounter()">Сбросить счетчик</button>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(CounterComponent) counterComponent!: CounterComponent;
  @ViewChild('counter') counterByRef!: CounterComponent;
  
  ngAfterViewInit() {
    // Оба способа работают
    console.log(this.counterComponent === this.counterByRef); // true
  }
  
  resetCounter() {
    this.counterComponent.reset();
  }
}
```

### Пример 2: Использование @ContentChild для работы с проектируемым контентом

```typescript
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" *ngIf="isOpen">
      <div class="modal-header">
        <ng-content select="[modal-header]"></ng-content>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <ng-content select="[modal-footer]"></ng-content>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterContentInit {
  @ContentChild('header') headerElement!: ElementRef<HTMLElement>;
  @ContentChild('footer') footerElement!: ElementRef<HTMLElement>;
  
  isOpen = false;
  
  ngAfterContentInit() {
    // Работа с проектируемым контентом
    if (this.headerElement) {
      this.headerElement.nativeElement.style.color = 'blue';
    }
  }
  
  open() {
    this.isOpen = true;
  }
  
  close() {
    this.isOpen = false;
  }
}

// Использование
@Component({
  template: `
    <app-modal>
      <h2 modal-header #header>Заголовок модального окна</h2>
      <p>Содержимое модального окна</p>
      <button modal-footer #footer (click)="closeModal()">Закрыть</button>
    </app-modal>
  `
})
export class AppComponent {
  closeModal() {
    // Логика закрытия
  }
}
```

### Пример 3: Комбинированное использование

```typescript
@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div class="tab-headers">
        <!-- ViewChild - элементы в шаблоне -->
        <button 
          *ngFor="let tab of tabs" 
          (click)="selectTab(tab)"
          [class.active]="activeTab === tab">
          {{ tab.title }}
        </button>
      </div>
      <div class="tab-content">
        <!-- ContentChild - проектируемый контент -->
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent implements AfterViewInit, AfterContentInit {
  @ViewChild('tabContent') tabContentElement!: ElementRef<HTMLElement>;
  @ContentChild(TabComponent) firstTab!: TabComponent;
  
  tabs: TabComponent[] = [];
  activeTab: TabComponent | null = null;
  
  ngAfterViewInit() {
    // Работа с элементами шаблона
    console.log('Tab content element:', this.tabContentElement);
  }
  
  ngAfterContentInit() {
    // Работа с проектируемым контентом
    if (this.firstTab) {
      this.selectTab(this.firstTab);
    }
  }
  
  selectTab(tab: TabComponent) {
    this.activeTab = tab;
  }
}
```

## Множественные элементы

### @ViewChildren и @ContentChildren

Для получения множественных элементов используются `@ViewChildren()` и `@ContentChildren()`:

```typescript
import { ViewChildren, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <div>
      <!-- ViewChildren -->
      <app-item *ngFor="let item of items" #itemRef></app-item>
    </div>
    <div>
      <!-- ContentChildren -->
      <ng-content></ng-content>
    </div>
  `
})
export class ListComponent implements AfterViewInit, AfterContentInit {
  // Множественные ViewChild
  @ViewChildren(ItemComponent) viewItems!: QueryList<ItemComponent>;
  @ViewChildren('itemRef') viewItemsByRef!: QueryList<ItemComponent>;
  
  // Множественные ContentChild
  @ContentChildren(ItemComponent) contentItems!: QueryList<ItemComponent>;
  
  items = [1, 2, 3];
  
  ngAfterViewInit() {
    console.log('View Items:', this.viewItems.length);
    this.viewItems.forEach(item => {
      item.doSomething();
    });
  }
  
  ngAfterContentInit() {
    console.log('Content Items:', this.contentItems.length);
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте @ViewChild** для элементов в шаблоне компонента
2. **Используйте @ContentChild** для проектируемого контента
3. **Проверяйте доступность** в соответствующих хуках жизненного цикла
4. **Используйте template reference variables** для более явного доступа
5. **Проверяйте на null** перед использованием

### ❌ Не делайте:

1. **Не используйте @ViewChild** для проектируемого контента
2. **Не используйте @ContentChild** для элементов шаблона
3. **Не обращайтесь к элементам** до соответствующих хуков
4. **Не забывайте про типизацию** — используйте правильные типы

## Заключение

Разница между `@ViewChild()` и `@ContentChild()`:

- **@ViewChild()** — для элементов в шаблоне компонента, доступен после `ngAfterViewInit`
- **@ContentChild()** — для проектируемого контента через `<ng-content>`, доступен после `ngAfterContentInit`

**Помните:** правильное использование `@ViewChild()` и `@ContentChild()` позволяет эффективно работать с дочерними элементами компонента. Используйте `@ViewChild()` для элементов, определенных в шаблоне компонента, и `@ContentChild()` для контента, который проектируется из родительского компонента. Всегда обращайтесь к этим элементам в соответствующих хуках жизненного цикла.

