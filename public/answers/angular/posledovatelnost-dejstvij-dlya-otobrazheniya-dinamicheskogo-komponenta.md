# Назовите последовательность действий для отображения динамического компонента?

Создание и отображение динамического компонента в Angular требует выполнения определенной последовательности действий. Вот пошаговый процесс.

## Последовательность действий

### 1. **Получить ссылку на ViewContainerRef**

Используйте `@ViewChild` для получения ссылки на контейнер, где будет размещен компонент.

```typescript
import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <ng-container #container></ng-container>
  `
})
export class ParentComponent {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
}
```

### 2. **Очистить контейнер (опционально)**

Очистите контейнер, если нужно удалить предыдущие компоненты.

```typescript
loadComponent() {
  // Очистить контейнер от предыдущих компонентов
  this.container.clear();
}
```

### 3. **Создать компонент**

Используйте `createComponent()` для создания экземпляра компонента.

```typescript
import { DynamicComponent } from './dynamic.component';

loadComponent() {
  this.container.clear();
  
  // Создать компонент
  const componentRef = this.container.createComponent(DynamicComponent);
}
```

### 4. **Установить данные (опционально)**

Установите данные в созданный компонент через его свойства.

```typescript
loadComponent() {
  this.container.clear();
  
  const componentRef = this.container.createComponent(DynamicComponent);
  
  // Установить данные
  componentRef.instance.data = 'Динамические данные';
  componentRef.instance.user = { id: 1, name: 'Иван' };
}
```

### 5. **Подписаться на события (опционально)**

Подпишитесь на события компонента, если необходимо.

```typescript
loadComponent() {
  this.container.clear();
  
  const componentRef = this.container.createComponent(DynamicComponent);
  
  // Установить данные
  componentRef.instance.data = 'Данные';
  
  // Подписаться на события
  componentRef.instance.event.subscribe((data) => {
    console.log('Событие:', data);
  });
}
```

### 6. **Сохранить ссылку (опционально)**

Сохраните ссылку на компонент для последующего управления.

```typescript
private componentRef?: ComponentRef<DynamicComponent>;

loadComponent() {
  this.container.clear();
  
  this.componentRef = this.container.createComponent(DynamicComponent);
  this.componentRef.instance.data = 'Данные';
}
```

### 7. **Уничтожить компонент (когда не нужен)**

Уничтожьте компонент, когда он больше не нужен.

```typescript
destroyComponent() {
  if (this.componentRef) {
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
```

## Полный пример

```typescript
import { 
  Component, 
  ViewChild, 
  ViewContainerRef, 
  ComponentRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="loadComponent()">Загрузить компонент</button>
    <button (click)="updateComponent()">Обновить данные</button>
    <button (click)="destroyComponent()">Удалить компонент</button>
    <ng-container #container></ng-container>
  `
})
export class ParentComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) 
  container!: ViewContainerRef;
  
  private componentRef?: ComponentRef<DynamicComponent>;
  
  ngAfterViewInit() {
    // Контейнер доступен после инициализации представления
    this.loadComponent();
  }
  
  loadComponent() {
    // 1. Очистить контейнер
    this.container.clear();
    
    // 2. Создать компонент
    this.componentRef = this.container.createComponent(DynamicComponent);
    
    // 3. Установить данные
    this.componentRef.instance.data = 'Начальные данные';
    this.componentRef.instance.user = { id: 1, name: 'Иван' };
    
    // 4. Подписаться на события
    this.componentRef.instance.close.subscribe(() => {
      this.destroyComponent();
    });
  }
  
  updateComponent() {
    if (this.componentRef) {
      // Обновить данные существующего компонента
      this.componentRef.instance.data = 'Обновленные данные';
    }
  }
  
  destroyComponent() {
    if (this.componentRef) {
      // 5. Уничтожить компонент
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
  
  ngOnDestroy() {
    // Очистка при уничтожении родительского компонента
    this.destroyComponent();
  }
}
```

## Пошаговая схема

```
1. Получить ViewContainerRef
   ↓
2. Очистить контейнер (clear())
   ↓
3. Создать компонент (createComponent())
   ↓
4. Установить данные (instance.property)
   ↓
5. Подписаться на события (instance.event.subscribe())
   ↓
6. Сохранить ссылку (ComponentRef)
   ↓
7. Уничтожить компонент (destroy()) когда не нужен
```

## Важные моменты

### 1. **ViewContainerRef доступен после ngAfterViewInit**

```typescript
// ❌ Плохо - container еще undefined
ngOnInit() {
  this.container.createComponent(DynamicComponent); // Ошибка!
}

// ✅ Хорошо - container доступен
ngAfterViewInit() {
  this.container.createComponent(DynamicComponent); // OK
}
```

### 2. **Очистка перед созданием**

```typescript
// ✅ Всегда очищайте перед созданием нового компонента
this.container.clear();
const componentRef = this.container.createComponent(DynamicComponent);
```

### 3. **Уничтожение компонентов**

```typescript
// ✅ Всегда уничтожайте компоненты
ngOnDestroy() {
  if (this.componentRef) {
    this.componentRef.destroy();
  }
}
```

## Практический пример: Модальное окно

```typescript
import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-app',
  template: `
    <button (click)="openModal()">Открыть</button>
    <ng-container #modalContainer></ng-container>
  `
})
export class AppComponent {
  @ViewChild('modalContainer', { read: ViewContainerRef }) 
  modalContainer!: ViewContainerRef;
  
  private modalRef?: ComponentRef<ModalComponent>;
  
  openModal() {
    // 1. Очистить контейнер
    this.modalContainer.clear();
    
    // 2. Создать модальное окно
    this.modalRef = this.modalContainer.createComponent(ModalComponent);
    
    // 3. Установить данные
    this.modalRef.instance.title = 'Заголовок';
    this.modalRef.instance.content = 'Содержимое';
    
    // 4. Подписаться на закрытие
    this.modalRef.instance.close.subscribe(() => {
      this.closeModal();
    });
  }
  
  closeModal() {
    // 5. Уничтожить компонент
    if (this.modalRef) {
      this.modalRef.destroy();
      this.modalRef = undefined;
    }
  }
}
```

## Заключение

Последовательность действий для отображения динамического компонента:

1. **Получить ViewContainerRef** через @ViewChild
2. **Очистить контейнер** (clear())
3. **Создать компонент** (createComponent())
4. **Установить данные** (instance.property)
5. **Подписаться на события** (instance.event.subscribe())
6. **Сохранить ссылку** (ComponentRef)
7. **Уничтожить компонент** (destroy()) когда не нужен

**Помните:** правильная последовательность действий и управление жизненным циклом критически важны для работы с динамическими компонентами. Всегда уничтожайте компоненты, чтобы избежать утечек памяти.

