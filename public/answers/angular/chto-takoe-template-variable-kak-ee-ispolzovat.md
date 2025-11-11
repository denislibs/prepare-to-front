# Что такое template variable? Как ее использовать?

Template variable (переменная шаблона) в Angular — это способ создания ссылки на элемент DOM, компонент или директиву непосредственно в шаблоне. Template variables предоставляют мощный механизм для доступа к элементам и их свойствам без необходимости использования `@ViewChild()` или `@ContentChild()` в некоторых случаях. Понимание template variables и умение их правильно использовать является важным навыком для эффективной работы с Angular шаблонами.

## Что такое template variable?

Template variable — это переменная, которая создается в шаблоне с помощью символа `#` (решетка) и позволяет получить ссылку на элемент DOM, компонент, директиву или Angular template. Эта переменная доступна только в том шаблоне, где она была объявлена.

### Синтаксис:

```html
<!-- Базовый синтаксис -->
<element #variableName></element>

<!-- Или с явным указанием типа -->
<element #variableName="exportAsName"></element>
```

## Типы template variables

### 1. **Ссылка на DOM элемент**

Самая простая форма template variable — ссылка на обычный HTML элемент.

```typescript
@Component({
  selector: 'app-example',
  template: `
    <input #inputRef type="text" placeholder="Введите текст">
    <button (click)="focusInput()">Фокус на input</button>
    <p>Значение: {{ inputRef.value }}</p>
  `
})
export class ExampleComponent {
  focusInput() {
    // Доступ к элементу через template variable
    // В TypeScript коде нужно использовать @ViewChild
  }
}
```

**В шаблоне можно использовать напрямую:**
```html
<input #inputRef type="text">
<button (click)="inputRef.focus()">Фокус</button>
<p>{{ inputRef.value }}</p>
```

### 2. **Ссылка на компонент**

Template variable может ссылаться на дочерний компонент, что позволяет вызывать его методы и обращаться к его свойствам.

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
    <button (click)="counter.reset()">Сбросить счетчик</button>
    <p>Текущее значение: {{ counter.count }}</p>
  `
})
export class ParentComponent {
  // Можно также использовать @ViewChild для доступа в TypeScript
}
```

### 3. **Ссылка на директиву**

Template variable может ссылаться на директиву, если она имеет `exportAs`.

```typescript
@Directive({
  selector: '[appHighlight]',
  exportAs: 'highlight' // Позволяет использовать template variable
})
export class HighlightDirective {
  isHighlighted = false;
  
  toggle() {
    this.isHighlighted = !this.isHighlighted;
  }
}

@Component({
  selector: 'app-example',
  template: `
    <div appHighlight #highlight="highlight">
      Элемент с директивой
    </div>
    <button (click)="highlight.toggle()">Переключить выделение</button>
    <p>Выделен: {{ highlight.isHighlighted }}</p>
  `
})
export class ExampleComponent {}
```

### 4. **Ссылка на ng-template**

Template variable может ссылаться на `<ng-template>` для условного рендеринга.

```typescript
@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="user; else noUser">
      <p>Пользователь: {{ user.name }}</p>
    </div>
    
    <ng-template #noUser>
      <p>Пользователь не найден</p>
    </ng-template>
  `
})
export class ExampleComponent {
  user: User | null = null;
}
```

### 5. **Ссылка на ng-container**

Template variable может использоваться с `<ng-container>` для группировки без создания DOM элемента.

```typescript
@Component({
  selector: 'app-example',
  template: `
    <ng-container #container>
      <h2>Заголовок</h2>
      <p>Текст</p>
    </ng-container>
    <button (click)="logContainer()">Логировать контейнер</button>
  `
})
export class ExampleComponent {
  @ViewChild('container') container!: ElementRef;
  
  logContainer() {
    console.log(this.container);
  }
}
```

## Практические примеры использования

### Пример 1: Работа с формами

```typescript
@Component({
  selector: 'app-form',
  template: `
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef)">
      <input 
        name="email" 
        [(ngModel)]="email" 
        required 
        email
        #emailRef="ngModel">
      
      <div *ngIf="emailRef.invalid && emailRef.touched">
        <p *ngIf="emailRef.errors?.['required']">Email обязателен</p>
        <p *ngIf="emailRef.errors?.['email']">Некорректный email</p>
      </div>
      
      <input 
        name="password" 
        type="password"
        [(ngModel)]="password" 
        required
        minlength="6"
        #passwordRef="ngModel">
      
      <div *ngIf="passwordRef.invalid && passwordRef.touched">
        <p *ngIf="passwordRef.errors?.['required']">Пароль обязателен</p>
        <p *ngIf="passwordRef.errors?.['minlength']">
          Минимум {{ passwordRef.errors?.['minlength'].requiredLength }} символов
        </p>
      </div>
      
      <button 
        type="submit" 
        [disabled]="formRef.invalid">
        Отправить
      </button>
      
      <p>Форма валидна: {{ formRef.valid }}</p>
    </form>
  `
})
export class FormComponent {
  email = '';
  password = '';
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Отправка формы:', form.value);
    }
  }
}
```

### Пример 2: Доступ к дочернему компоненту

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="edit()">Редактировать</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() editClick = new EventEmitter<User>();
  
  edit() {
    this.editClick.emit(this.user);
  }
  
  highlight() {
    console.log('Выделение карточки');
  }
}

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <app-user-card
        *ngFor="let user of users; let i = index"
        #card
        [user]="user"
        (editClick)="handleEdit($event)">
      </app-user-card>
      
      <!-- Доступ к свойствам и методам дочернего компонента -->
      <button (click)="card.highlight()">Выделить первую карточку</button>
    </div>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  handleEdit(user: User) {
    console.log('Редактирование:', user);
  }
}
```

### Пример 3: Работа с реактивными формами

```typescript
@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="form" #formRef="ngForm" (ngSubmit)="onSubmit()">
      <input 
        formControlName="username"
        #usernameRef>
      
      <div *ngIf="form.get('username')?.invalid && form.get('username')?.touched">
        <p *ngIf="form.get('username')?.errors?.['required']">
          Имя пользователя обязательно
        </p>
      </div>
      
      <input 
        formControlName="email"
        type="email"
        #emailRef>
      
      <button 
        type="submit" 
        [disabled]="form.invalid">
        Отправить
      </button>
      
      <!-- Использование template variable для доступа к значению -->
      <p>Имя пользователя: {{ usernameRef.value }}</p>
      <p>Email: {{ emailRef.value }}</p>
    </form>
  `
})
export class ReactiveFormComponent implements OnInit {
  form!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit() {
    if (this.form.valid) {
      console.log('Форма отправлена:', this.form.value);
    }
  }
}
```

### Пример 4: Использование с *ngFor

```typescript
@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let item of items; let i = index; let first = first; let last = last">
      <div #itemRef [class.first]="first" [class.last]="last">
        <p>Элемент {{ i + 1 }}: {{ item.name }}</p>
        <button (click)="removeItem(i)">Удалить</button>
      </div>
    </div>
  `
})
export class ListComponent {
  items = [
    { name: 'Элемент 1' },
    { name: 'Элемент 2' },
    { name: 'Элемент 3' }
  ];
  
  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}
```

### Пример 5: Комбинирование с @ViewChild

```typescript
@Component({
  selector: 'app-example',
  template: `
    <input #inputRef type="text" placeholder="Введите текст">
    <button (click)="focusInput()">Фокус</button>
    <button (click)="clearInput()">Очистить</button>
    <p>Значение: {{ inputRef.value }}</p>
  `
})
export class ExampleComponent implements AfterViewInit {
  // Получение ссылки через @ViewChild для использования в TypeScript
  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;
  
  ngAfterViewInit() {
    // Автоматический фокус при инициализации
    this.inputElement.nativeElement.focus();
  }
  
  focusInput() {
    // Использование ссылки из @ViewChild
    this.inputElement.nativeElement.focus();
  }
  
  clearInput() {
    this.inputElement.nativeElement.value = '';
  }
}
```

## Использование в условных блоках

Template variables можно использовать в условных блоках для доступа к контексту.

```typescript
@Component({
  selector: 'app-example',
  template: `
    <div *ngIf="user as userRef">
      <!-- userRef доступен в этом блоке -->
      <p>Имя: {{ userRef.name }}</p>
      <p>Email: {{ userRef.email }}</p>
    </div>
    
    <div *ngIf="items$ | async as items">
      <!-- items доступен в этом блоке -->
      <div *ngFor="let item of items">
        {{ item.name }}
      </div>
    </div>
  `
})
export class ExampleComponent {
  user: User | null = null;
  items$ = of([{ name: 'Item 1' }, { name: 'Item 2' }]);
}
```

## Ограничения и особенности

### 1. **Область видимости**

Template variable доступна только в том шаблоне, где она была объявлена.

```html
<!-- ✅ Правильно -->
<div>
  <input #inputRef>
  <button (click)="inputRef.focus()">Фокус</button>
</div>

<!-- ❌ Неправильно - inputRef не доступна здесь -->
<div>
  <input #inputRef>
</div>
<button (click)="inputRef.focus()">Фокус</button>
```

### 2. **Уникальность имени**

В пределах одного шаблона имя template variable должно быть уникальным.

```html
<!-- ❌ Ошибка - дублирование имени -->
<input #ref>
<input #ref>

<!-- ✅ Правильно -->
<input #inputRef>
<button #buttonRef>
```

### 3. **Доступ в TypeScript**

Для доступа к template variable в TypeScript коде нужно использовать `@ViewChild()` или `@ViewChildren()`.

```typescript
@Component({
  template: '<input #inputRef>'
})
export class Component {
  @ViewChild('inputRef') input!: ElementRef;
  
  ngAfterViewInit() {
    // Доступ в TypeScript
    this.input.nativeElement.focus();
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте описательные имена** — `#userCard` вместо `#card`
2. **Используйте для простого доступа** в шаблоне
3. **Используйте с формами** для валидации и отображения ошибок
4. **Используйте с условными блоками** для доступа к контексту
5. **Комбинируйте с @ViewChild** когда нужен доступ в TypeScript

### ❌ Не делайте:

1. **Не используйте для сложной логики** — выносите в методы компонента
2. **Не создавайте слишком много** template variables в одном шаблоне
3. **Не забывайте про область видимости** — переменная доступна только в своем контексте
4. **Не используйте одинаковые имена** в одном шаблоне

## Заключение

Template variable в Angular:

- **Создается с помощью `#`** — `#variableName`
- **Ссылается на элементы** — DOM, компоненты, директивы, шаблоны
- **Доступна в шаблоне** — для использования в выражениях и событиях
- **Имеет область видимости** — доступна только в своем контексте
- **Комбинируется с @ViewChild** — для доступа в TypeScript коде

**Помните:** template variables — это мощный инструмент для работы с элементами в шаблоне. Используйте их для простого доступа к элементам, валидации форм, работы с дочерними компонентами и условного рендеринга. Они делают шаблоны более выразительными и позволяют избежать лишнего кода в компонентах.

