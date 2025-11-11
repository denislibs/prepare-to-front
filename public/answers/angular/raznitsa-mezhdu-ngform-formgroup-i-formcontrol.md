# Разница между NgForm, FormGroup, и FormControl?

Понимание различий между `NgForm`, `FormGroup` и `FormControl` критически важно для работы с формами в Angular. Эти классы являются основой для работы с формами и используются в разных контекстах: NgForm для template-driven форм, а FormGroup и FormControl для reactive форм. Каждый из них имеет свое назначение и особенности использования.

## Что такое FormControl?

`FormControl` — это базовый класс, который представляет одно поле формы. Он отслеживает значение, валидность и состояние одного элемента формы (input, select, textarea и т.д.).

### Характеристики FormControl:

- ✅ **Одно поле** — управляет одним элементом формы
- ✅ **Отслеживает значение** — текущее значение поля
- ✅ **Валидация** — проверка валидности поля
- ✅ **Состояние** — touched, dirty, pristine, valid, invalid
- ✅ **Используется в reactive forms** — программное создание

### Пример FormControl:

```typescript
import { FormControl, Validators } from '@angular/forms';

// Создание FormControl
const emailControl = new FormControl('', [
  Validators.required,
  Validators.email
]);

// Установка значения
emailControl.setValue('user@example.com');

// Получение значения
const value = emailControl.value;

// Проверка валидности
const isValid = emailControl.valid;
const isInvalid = emailControl.invalid;

// Проверка состояния
const isTouched = emailControl.touched; // Пользователь взаимодействовал
const isDirty = emailControl.dirty; // Значение изменено
const isPristine = emailControl.pristine; // Значение не изменялось

// Получение ошибок
const errors = emailControl.errors; // { required: true } или null

// Использование в шаблоне
@Component({
  template: `
    <input [formControl]="emailControl">
    <div *ngIf="emailControl.invalid && emailControl.touched">
      <p *ngIf="emailControl.errors?.['required']">Email обязателен</p>
      <p *ngIf="emailControl.errors?.['email']">Некорректный email</p>
    </div>
  `
})
export class MyComponent {
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
}
```

## Что такое FormGroup?

`FormGroup` — это группа FormControl'ов, которая управляет несколькими полями формы как единым целым. FormGroup отслеживает валидность всех своих контролов и предоставляет удобные методы для работы с группой полей.

### Характеристики FormGroup:

- ✅ **Группа полей** — управляет несколькими FormControl
- ✅ **Валидация группы** — проверка валидности всех полей
- ✅ **Вложенные группы** — может содержать другие FormGroup
- ✅ **Удобный доступ** — получение контролов по имени
- ✅ **Используется в reactive forms** — программное создание

### Пример FormGroup:

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Создание FormGroup
const userForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  age: new FormControl(null, [Validators.required, Validators.min(18)])
});

// Установка значений
userForm.patchValue({
  name: 'Иван',
  email: 'ivan@example.com',
  age: 30
});

// Получение значений
const formValue = userForm.value; // { name: 'Иван', email: 'ivan@example.com', age: 30 }

// Получение конкретного контрола
const nameControl = userForm.get('name');
const emailControl = userForm.get('email');

// Проверка валидности
const isFormValid = userForm.valid;
const isFormInvalid = userForm.invalid;

// Использование FormBuilder (рекомендуется)
import { FormBuilder } from '@angular/forms';

@Component({...})
export class UserFormComponent {
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]]
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Форма валидна:', this.userForm.value);
    }
  }
}
```

**Использование в шаблоне:**
```typescript
@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name">
      <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
        Имя обязательно
      </div>
      
      <input formControlName="email">
      <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
        Email обязателен
      </div>
      
      <input formControlName="age" type="number">
      <div *ngIf="userForm.get('age')?.invalid && userForm.get('age')?.touched">
        Возраст обязателен и должен быть не менее 18
      </div>
      
      <button type="submit" [disabled]="userForm.invalid">Отправить</button>
    </form>
  `
})
export class UserFormComponent {
  userForm: FormGroup;
  // ...
}
```

### Вложенные FormGroup:

```typescript
this.userForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', Validators.required],
  address: this.fb.group({
    street: [''],
    city: [''],
    zip: ['']
  })
});

// Доступ к вложенной группе
const addressGroup = this.userForm.get('address');
const streetControl = this.userForm.get('address.street');
```

**В шаблоне:**
```html
<form [formGroup]="userForm">
  <input formControlName="name">
  
  <div formGroupName="address">
    <input formControlName="street">
    <input formControlName="city">
    <input formControlName="zip">
  </div>
</form>
```

## Что такое NgForm?

`NgForm` — это директива Angular, которая автоматически создается для каждой формы в template-driven подходах. NgForm предоставляет функциональность, аналогичную FormGroup, но работает автоматически с директивами ngModel.

### Характеристики NgForm:

- ✅ **Автоматическое создание** — создается автоматически для <form>
- ✅ **Template-driven формы** — используется с ngModel
- ✅ **Template reference variable** — доступ через #formRef="ngForm"
- ✅ **Автоматическая валидация** — работает с HTML5 валидацией
- ✅ **Меньше кода в TypeScript** — логика в шаблоне

### Пример NgForm:

```typescript
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <input 
        name="name"
        [(ngModel)]="user.name"
        required
        #nameRef="ngModel">
      
      <div *ngIf="nameRef.invalid && nameRef.touched">
        Имя обязательно
      </div>
      
      <input 
        name="email"
        type="email"
        [(ngModel)]="user.email"
        required
        email
        #emailRef="ngModel">
      
      <div *ngIf="emailRef.invalid && emailRef.touched">
        <p *ngIf="emailRef.errors?.['required']">Email обязателен</p>
        <p *ngIf="emailRef.errors?.['email']">Некорректный email</p>
      </div>
      
      <button 
        type="submit" 
        [disabled]="userForm.invalid">
        Отправить
      </button>
      
      <p>Форма валидна: {{ userForm.valid }}</p>
      <pre>{{ userForm.value | json }}</pre>
    </form>
  `,
  imports: [FormsModule]
})
export class UserFormComponent {
  user = {
    name: '',
    email: ''
  };
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Форма отправлена:', form.value);
      // Отправка данных
    } else {
      // Форма невалидна
      console.log('Ошибки формы:', form.errors);
    }
  }
}
```

## Сравнительная таблица

| Характеристика | FormControl | FormGroup | NgForm |
|----------------|-------------|-----------|--------|
| **Назначение** | Одно поле | Группа полей | Вся форма (template-driven) |
| **Тип форм** | Reactive | Reactive | Template-driven |
| **Создание** | Программно | Программно | Автоматически |
| **Валидация** | Одно поле | Все поля группы | Вся форма |
| **Доступ** | Напрямую | Через get() | Через template variable |
| **Использование** | Отдельные поля | Группы полей | Template-driven формы |

## Практические примеры

### Пример 1: Reactive форма с FormGroup и FormControl

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Имя:</label>
        <input formControlName="name">
        <div *ngIf="nameControl.invalid && nameControl.touched">
          <p *ngIf="nameControl.errors?.['required']">Имя обязательно</p>
          <p *ngIf="nameControl.errors?.['minlength']">
            Минимум {{ nameControl.errors?.['minlength'].requiredLength }} символов
          </p>
        </div>
      </div>
      
      <div>
        <label>Email:</label>
        <input formControlName="email">
        <div *ngIf="emailControl.invalid && emailControl.touched">
          <p *ngIf="emailControl.errors?.['required']">Email обязателен</p>
          <p *ngIf="emailControl.errors?.['email']">Некорректный email</p>
        </div>
      </div>
      
      <div formGroupName="address">
        <h3>Адрес</h3>
        <input formControlName="street" placeholder="Улица">
        <input formControlName="city" placeholder="Город">
        <input formControlName="zip" placeholder="Индекс">
      </div>
      
      <button type="submit" [disabled]="userForm.invalid">Отправить</button>
    </form>
  `
})
export class ReactiveFormComponent implements OnInit {
  userForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: [''],
        zip: ['']
      })
    });
  }
  
  // Геттеры для удобного доступа к контролам
  get nameControl(): FormControl {
    return this.userForm.get('name') as FormControl;
  }
  
  get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Форма валидна:', this.userForm.value);
    } else {
      // Пометить все поля как touched для отображения ошибок
      this.userForm.markAllAsTouched();
    }
  }
}
```

### Пример 2: Template-driven форма с NgForm

```typescript
@Component({
  selector: 'app-template-form',
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <div>
        <label>Имя:</label>
        <input 
          name="name"
          [(ngModel)]="user.name"
          required
          minlength="3"
          #nameRef="ngModel">
        
        <div *ngIf="nameRef.invalid && nameRef.touched">
          <p *ngIf="nameRef.errors?.['required']">Имя обязательно</p>
          <p *ngIf="nameRef.errors?.['minlength']">
            Минимум {{ nameRef.errors?.['minlength'].requiredLength }} символов
          </p>
        </div>
      </div>
      
      <div>
        <label>Email:</label>
        <input 
          name="email"
          type="email"
          [(ngModel)]="user.email"
          required
          email
          #emailRef="ngModel">
        
        <div *ngIf="emailRef.invalid && emailRef.touched">
          <p *ngIf="emailRef.errors?.['required']">Email обязателен</p>
          <p *ngIf="emailRef.errors?.['email']">Некорректный email</p>
        </div>
      </div>
      
      <button 
        type="submit" 
        [disabled]="userForm.invalid">
        Отправить
      </button>
      
      <p>Форма валидна: {{ userForm.valid }}</p>
      <pre>{{ userForm.value | json }}</pre>
    </form>
  `,
  imports: [FormsModule]
})
export class TemplateFormComponent {
  user = {
    name: '',
    email: ''
  };
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Форма отправлена:', form.value);
    }
  }
}
```

### Пример 3: Комбинирование FormControl и FormGroup

```typescript
@Component({...})
export class ComplexFormComponent {
  // Отдельный FormControl
  searchControl = new FormControl('');
  
  // FormGroup для основной формы
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    preferences: this.fb.group({
      theme: ['light'],
      notifications: [true]
    })
  });
  
  constructor(private fb: FormBuilder) {
    // Подписка на изменения отдельного контрола
    this.searchControl.valueChanges.subscribe(value => {
      console.log('Поиск:', value);
    });
  }
  
  onSubmit() {
    console.log('Поиск:', this.searchControl.value);
    console.log('Форма:', this.userForm.value);
  }
}
```

## Когда использовать что?

### FormControl:
- ✅ Отдельное поле формы
- ✅ Динамические поля
- ✅ Простые случаи с одним полем

### FormGroup:
- ✅ Reactive формы
- ✅ Группы связанных полей
- ✅ Вложенные формы
- ✅ Когда нужен полный контроль

### NgForm:
- ✅ Template-driven формы
- ✅ Простые формы
- ✅ Быстрое прототипирование
- ✅ Когда логика в шаблоне

## Лучшие практики

### ✅ Делайте:

1. **Используйте FormBuilder** — для упрощения создания форм
2. **Используйте геттеры** — для удобного доступа к контролам
3. **Типизируйте формы** — для безопасности типов
4. **Используйте markAllAsTouched()** — для отображения ошибок
5. **Группируйте связанные поля** — в FormGroup

### ❌ Не делайте:

1. **Не мутируйте значения напрямую** — используйте setValue/patchValue
2. **Не забывайте валидировать** — на клиенте и сервере
3. **Не смешивайте подходы** — template-driven и reactive в одной форме
4. **Не забывайте отписываться** — от valueChanges подписок

## Заключение

Разница между NgForm, FormGroup и FormControl:

- **FormControl** — управляет одним полем формы, используется в reactive forms
- **FormGroup** — управляет группой FormControl'ов, используется в reactive forms
- **NgForm** — автоматически создается для template-driven форм, аналогичен FormGroup

**Помните:** FormControl и FormGroup используются для reactive форм (программное создание), а NgForm — для template-driven форм (логика в шаблоне). Выбор зависит от требований проекта и сложности формы.

