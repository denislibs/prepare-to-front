# Как передать данные из дочернего компонента в родительский?

Передача данных из дочернего компонента в родительский — это одна из основных задач при работе с компонентами в Angular. В отличие от передачи данных от родителя к ребенку через @Input(), передача данных от ребенка к родителю осуществляется через события с использованием @Output() и EventEmitter. Понимание различных способов передачи данных и умение выбрать правильный подход критически важно для создания правильно работающих Angular приложений.

## Основной способ: @Output() и EventEmitter

Самый распространенный и рекомендуемый способ — использование декоратора @Output() с EventEmitter.

### Базовый пример:

```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      <input [(ngModel)]="childData" placeholder="Введите данные">
      <button (click)="sendDataToParent()">Отправить родителю</button>
    </div>
  `
})
export class ChildComponent {
  childData = '';
  
  // Создание EventEmitter для отправки данных
  @Output() dataEvent = new EventEmitter<string>();
  
  sendDataToParent() {
    // Отправка данных родительскому компоненту
    this.dataEvent.emit(this.childData);
  }
}
```

**Использование в родительском компоненте:**
```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div>
      <h2>Родительский компонент</h2>
      <p>Данные от ребенка: {{ receivedData }}</p>
      
      <!-- Подписка на событие дочернего компонента -->
      <app-child (dataEvent)="handleDataFromChild($event)"></app-child>
    </div>
  `
})
export class ParentComponent {
  receivedData = '';
  
  // Обработка события от дочернего компонента
  handleDataFromChild(data: string) {
    this.receivedData = data;
    console.log('Получены данные от ребенка:', data);
  }
}
```

## Различные способы передачи данных

### 1. **Передача простых значений**

```typescript
// child.component.ts
@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendNumber()">Отправить число</button>
    <button (click)="sendString()">Отправить строку</button>
    <button (click)="sendBoolean()">Отправить boolean</button>
  `
})
export class ChildComponent {
  @Output() numberEvent = new EventEmitter<number>();
  @Output() stringEvent = new EventEmitter<string>();
  @Output() booleanEvent = new EventEmitter<boolean>();
  
  sendNumber() {
    this.numberEvent.emit(42);
  }
  
  sendString() {
    this.stringEvent.emit('Привет от ребенка!');
  }
  
  sendBoolean() {
    this.booleanEvent.emit(true);
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: `
    <app-child
      (numberEvent)="handleNumber($event)"
      (stringEvent)="handleString($event)"
      (booleanEvent)="handleBoolean($event)">
    </app-child>
  `
})
export class ParentComponent {
  handleNumber(num: number) {
    console.log('Число:', num);
  }
  
  handleString(str: string) {
    console.log('Строка:', str);
  }
  
  handleBoolean(bool: boolean) {
    console.log('Boolean:', bool);
  }
}
```

### 2. **Передача объектов**

```typescript
// child.component.ts
interface UserData {
  name: string;
  email: string;
  age: number;
}

@Component({
  selector: 'app-user-form',
  template: `
    <form (ngSubmit)="submitForm()">
      <input [(ngModel)]="user.name" name="name" placeholder="Имя">
      <input [(ngModel)]="user.email" name="email" placeholder="Email">
      <input [(ngModel)]="user.age" name="age" type="number" placeholder="Возраст">
      <button type="submit">Отправить</button>
    </form>
  `
})
export class UserFormComponent {
  user: UserData = {
    name: '',
    email: '',
    age: 0
  };
  
  @Output() userSubmitted = new EventEmitter<UserData>();
  
  submitForm() {
    this.userSubmitted.emit({ ...this.user });
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: `
    <app-user-form (userSubmitted)="handleUserSubmit($event)"></app-user-form>
    <div *ngIf="submittedUser">
      <p>Имя: {{ submittedUser.name }}</p>
      <p>Email: {{ submittedUser.email }}</p>
      <p>Возраст: {{ submittedUser.age }}</p>
    </div>
  `
})
export class ParentComponent {
  submittedUser: UserData | null = null;
  
  handleUserSubmit(user: UserData) {
    this.submittedUser = user;
    // Отправка на сервер
    this.userService.createUser(user).subscribe();
  }
}
```

### 3. **Передача данных с дополнительной информацией**

```typescript
// child.component.ts
interface DataWithAction {
  data: any;
  action: 'add' | 'update' | 'delete';
}

@Component({
  selector: 'app-item-list',
  template: `
    <div *ngFor="let item of items">
      {{ item.name }}
      <button (click)="editItem(item)">Редактировать</button>
      <button (click)="deleteItem(item)">Удалить</button>
    </div>
  `
})
export class ItemListComponent {
  items: Item[] = [];
  
  @Output() itemAction = new EventEmitter<DataWithAction>();
  
  editItem(item: Item) {
    this.itemAction.emit({
      data: item,
      action: 'update'
    });
  }
  
  deleteItem(item: Item) {
    this.itemAction.emit({
      data: item,
      action: 'delete'
    });
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: `
    <app-item-list (itemAction)="handleItemAction($event)"></app-item-list>
  `
})
export class ParentComponent {
  handleItemAction(event: DataWithAction) {
    switch (event.action) {
      case 'update':
        this.updateItem(event.data);
        break;
      case 'delete':
        this.deleteItem(event.data);
        break;
    }
  }
  
  updateItem(item: Item) {
    // Логика обновления
  }
  
  deleteItem(item: Item) {
    // Логика удаления
  }
}
```

### 4. **Использование template reference variable**

Получение доступа к дочернему компоненту через template reference variable.

```typescript
// child.component.ts
@Component({
  selector: 'app-child',
  template: '<p>Дочерний компонент</p>'
})
export class ChildComponent {
  childData = 'Данные от ребенка';
  
  getData(): string {
    return this.childData;
  }
  
  @Output() dataChanged = new EventEmitter<string>();
  
  updateData(newData: string) {
    this.childData = newData;
    this.dataChanged.emit(newData);
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: `
    <app-child 
      #childRef
      (dataChanged)="handleDataChange($event)">
    </app-child>
    <button (click)="getDataFromChild()">Получить данные</button>
    <button (click)="updateChildData()">Обновить данные ребенка</button>
  `
})
export class ParentComponent {
  @ViewChild('childRef') childComponent!: ChildComponent;
  
  handleDataChange(data: string) {
    console.log('Данные изменились:', data);
  }
  
  getDataFromChild() {
    // Прямой доступ к методу дочернего компонента
    const data = this.childComponent.getData();
    console.log('Данные от ребенка:', data);
  }
  
  updateChildData() {
    // Вызов метода дочернего компонента
    this.childComponent.updateData('Новые данные');
  }
}
```

### 5. **Использование сервиса для обмена данными**

Для более сложных случаев можно использовать сервис.

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Subject для передачи данных от ребенка к родителю
  private childToParentSubject = new Subject<any>();
  public childToParent$ = this.childToParentSubject.asObservable();
  
  sendDataToParent(data: any) {
    this.childToParentSubject.next(data);
  }
}
```

**Дочерний компонент:**
```typescript
@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendData()">Отправить данные через сервис</button>
  `
})
export class ChildComponent {
  constructor(private dataService: DataService) {}
  
  sendData() {
    this.dataService.sendDataToParent({
      message: 'Данные от ребенка',
      timestamp: new Date()
    });
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: '<app-child></app-child>'
})
export class ParentComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.subscription = this.dataService.childToParent$.subscribe(data => {
      console.log('Получены данные от ребенка:', data);
      this.handleDataFromChild(data);
    });
  }
  
  handleDataFromChild(data: any) {
    // Обработка данных
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

## Практические примеры

### Пример 1: Форма с валидацией

```typescript
// user-form.component.ts
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name">
      <div *ngIf="form.get('name')?.invalid">Имя обязательно</div>
      
      <input formControlName="email">
      <div *ngIf="form.get('email')?.invalid">Email обязателен</div>
      
      <button type="submit" [disabled]="form.invalid">Отправить</button>
    </form>
  `
})
export class UserFormComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancelled = new EventEmitter<void>();
  
  constructor(private fb: FormBuilder) {}
  
  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
  
  onCancel() {
    this.formCancelled.emit();
  }
}
```

**Родительский компонент:**
```typescript
@Component({
  template: `
    <app-user-form
      (formSubmitted)="handleFormSubmit($event)"
      (formCancelled)="handleFormCancel()">
    </app-user-form>
  `
})
export class ParentComponent {
  handleFormSubmit(userData: any) {
    this.userService.createUser(userData).subscribe();
  }
  
  handleFormCancel() {
    this.router.navigate(['/users']);
  }
}
```

### Пример 2: Модальное окно

```typescript
// modal.component.ts
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal" *ngIf="isOpen">
      <div class="modal-content">
        <ng-content></ng-content>
        <button (click)="close()">Закрыть</button>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<any>();
  
  close() {
    this.isOpen = false;
    this.closed.emit();
  }
  
  confirm(data?: any) {
    this.isOpen = false;
    this.confirmed.emit(data);
  }
}
```

**Использование:**
```typescript
@Component({
  template: `
    <button (click)="openModal()">Открыть модальное окно</button>
    <app-modal
      [isOpen]="modalOpen"
      (closed)="handleModalClose()"
      (confirmed)="handleModalConfirm($event)">
      <p>Содержимое модального окна</p>
    </app-modal>
  `
})
export class ParentComponent {
  modalOpen = false;
  
  openModal() {
    this.modalOpen = true;
  }
  
  handleModalClose() {
    this.modalOpen = false;
  }
  
  handleModalConfirm(data: any) {
    console.log('Подтверждено:', data);
    this.modalOpen = false;
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте @Output() и EventEmitter** — стандартный способ
2. **Используйте типизацию** — EventEmitter<Type>
3. **Используйте сервисы** — для сложных случаев
4. **Именуйте события понятно** — userSubmitted, dataChanged
5. **Передавайте неизменяемые данные** — используйте spread operator

### ❌ Не делайте:

1. **Не мутируйте данные** — создавайте новые объекты
2. **Не используйте сервисы** — когда достаточно @Output()
3. **Не забывайте отписываться** — от подписок в сервисах
4. **Не создавайте слишком много событий** — группируйте связанные

## Заключение

Передача данных из дочернего компонента в родительский:

- **@Output() и EventEmitter** — основной и рекомендуемый способ
- **Template reference variable** — для прямого доступа к дочернему компоненту
- **Сервисы** — для сложных случаев с множеством компонентов
- **Типизация** — для безопасности типов

**Помните:** @Output() и EventEmitter — это стандартный и рекомендуемый способ передачи данных от ребенка к родителю. Используйте сервисы только когда нужно обмениваться данными между компонентами, которые не связаны напрямую через иерархию.

