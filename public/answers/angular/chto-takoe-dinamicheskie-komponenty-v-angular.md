# Что такое динамические компоненты в Angular?

Динамические компоненты в Angular — это компоненты, которые создаются и добавляются в DOM программно во время выполнения приложения, а не статически в шаблоне. Это позволяет создавать гибкие интерфейсы, где компоненты могут появляться и исчезать динамически.

## Когда использовать динамические компоненты?

- Модальные окна
- Всплывающие подсказки
- Динамические формы
- Виджеты, которые добавляются по требованию
- Контент, который загружается асинхронно

## Как создать динамический компонент?

### 1. **Использование ViewContainerRef и ComponentFactoryResolver**

```typescript
import { 
  Component, 
  ViewChild, 
  ViewContainerRef, 
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="loadComponent()">Загрузить компонент</button>
    <button (click)="removeComponent()">Удалить компонент</button>
    <ng-container #container></ng-container>
  `
})
export class ParentComponent {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
  
  private componentRef!: ComponentRef<DynamicComponent>;
  
  constructor(private resolver: ComponentFactoryResolver) {}
  
  loadComponent() {
    // Очистить контейнер
    this.container.clear();
    
    // Создать фабрику компонента
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    
    // Создать компонент
    this.componentRef = this.container.createComponent(factory);
    
    // Установить данные
    this.componentRef.instance.data = 'Динамические данные';
  }
  
  removeComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
```

### 2. **Использование ViewContainerRef.createComponent() (Angular 13+)**

В Angular 13+ можно использовать упрощенный API:

```typescript
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="loadComponent()">Загрузить компонент</button>
    <ng-container #container></ng-container>
  `
})
export class ParentComponent {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
  
  loadComponent() {
    // Очистить контейнер
    this.container.clear();
    
    // Создать компонент напрямую (Angular 13+)
    const componentRef = this.container.createComponent(DynamicComponent);
    
    // Установить данные
    componentRef.instance.data = 'Динамические данные';
  }
}
```

## Динамический компонент

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: `
    <div class="dynamic-component">
      <h3>Динамический компонент</h3>
      <p>{{ data }}</p>
      <p>Время создания: {{ createdAt | date:'medium' }}</p>
    </div>
  `
})
export class DynamicComponent {
  @Input() data: string = '';
  createdAt = new Date();
}
```

## Практические примеры

### Пример 1: Модальное окно

```typescript
import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-app',
  template: `
    <button (click)="openModal()">Открыть модальное окно</button>
    <ng-container #modalContainer></ng-container>
  `
})
export class AppComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef }) 
  modalContainer!: ViewContainerRef;
  
  private modalRef?: ComponentRef<ModalComponent>;
  
  openModal() {
    // Создать модальное окно
    this.modalRef = this.modalContainer.createComponent(ModalComponent);
    
    // Установить данные
    this.modalRef.instance.title = 'Заголовок';
    this.modalRef.instance.content = 'Содержимое модального окна';
    
    // Подписаться на событие закрытия
    this.modalRef.instance.close.subscribe(() => {
      this.closeModal();
    });
  }
  
  closeModal() {
    if (this.modalRef) {
      this.modalRef.destroy();
      this.modalRef = undefined;
    }
  }
}
```

### Пример 2: Динамическая загрузка по типу

```typescript
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { UserComponent } from './user.component';
import { ProductComponent } from './product.component';

type ComponentType = 'user' | 'product';

@Component({
  selector: 'app-dynamic-loader',
  template: `
    <select [(ngModel)]="selectedType" (change)="loadComponent()">
      <option value="user">Пользователь</option>
      <option value="product">Продукт</option>
    </select>
    <ng-container #container></ng-container>
  `
})
export class DynamicLoaderComponent {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
  
  selectedType: ComponentType = 'user';
  
  private componentMap = {
    user: UserComponent,
    product: ProductComponent
  };
  
  loadComponent() {
    this.container.clear();
    
    const componentClass = this.componentMap[this.selectedType];
    const componentRef = this.container.createComponent(componentClass);
    
    // Установить данные в зависимости от типа
    if (this.selectedType === 'user') {
      componentRef.instance.user = { id: 1, name: 'Иван' };
    } else {
      componentRef.instance.product = { id: 1, name: 'Товар' };
    }
  }
}
```

### Пример 3: Динамические виджеты

```typescript
import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';

interface WidgetConfig {
  type: string;
  data: any;
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div *ngFor="let widget of widgets; let i = index" class="widget-container">
        <ng-container #widgetContainer></ng-container>
      </div>
    </div>
  `
})
export class DashboardComponent {
  @ViewChild('widgetContainer', { read: ViewContainerRef }) 
  widgetContainer!: ViewContainerRef;
  
  @Input() widgets: WidgetConfig[] = [];
  
  ngAfterViewInit() {
    this.loadWidgets();
  }
  
  loadWidgets() {
    this.widgets.forEach(widget => {
      const widgetClass = this.getWidgetClass(widget.type);
      if (widgetClass) {
        const componentRef = this.widgetContainer.createComponent(widgetClass);
        componentRef.instance.data = widget.data;
      }
    });
  }
  
  private getWidgetClass(type: string): any {
    // Логика выбора класса компонента
    const widgetMap: { [key: string]: any } = {
      'chart': ChartWidgetComponent,
      'table': TableWidgetComponent,
      'card': CardWidgetComponent
    };
    return widgetMap[type];
  }
}
```

## Передача данных в динамический компонент

### Через @Input()

```typescript
// Создание компонента
const componentRef = this.container.createComponent(DynamicComponent);

// Установка данных
componentRef.instance.data = 'Значение';
componentRef.instance.user = { id: 1, name: 'Иван' };

// Обновление данных
componentRef.instance.data = 'Новое значение';
```

### Через setInput() (Angular 14+)

```typescript
// Angular 14+ поддерживает setInput()
componentRef.setInput('data', 'Значение');
componentRef.setInput('user', { id: 1, name: 'Иван' });
```

## Управление жизненным циклом

```typescript
loadComponent() {
  const componentRef = this.container.createComponent(DynamicComponent);
  
  // Подписка на события
  componentRef.instance.event.subscribe((data) => {
    console.log('Событие:', data);
  });
  
  // Сохранение ссылки для последующего управления
  this.componentRefs.push(componentRef);
}

destroyComponent(componentRef: ComponentRef<any>) {
  componentRef.destroy();
}

destroyAllComponents() {
  this.componentRefs.forEach(ref => ref.destroy());
  this.componentRefs = [];
}
```

## Лучшие практики

### ✅ Делайте:

1. **Очищайте контейнер** перед созданием нового компонента
2. **Уничтожайте компоненты** когда они больше не нужны
3. **Используйте типизацию** для ComponentRef
4. **Управляйте подписками** в динамических компонентах

### ❌ Не делайте:

1. **Не забывайте уничтожать** компоненты (утечки памяти)
2. **Не создавайте компоненты** без необходимости
3. **Не используйте динамические компоненты** когда можно использовать статические

## Заключение

Динамические компоненты в Angular:

- **Создаются программно** во время выполнения
- **Используют ViewContainerRef** для размещения
- **Гибкие и мощные** для создания динамических интерфейсов
- **Требуют управления** жизненным циклом

**Помните:** динамические компоненты — это мощный инструмент для создания гибких интерфейсов, но их нужно правильно управлять, чтобы избежать утечек памяти. Всегда уничтожайте компоненты, когда они больше не нужны.

