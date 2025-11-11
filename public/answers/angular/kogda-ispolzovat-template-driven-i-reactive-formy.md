# Когда нужно использовать стандартные (template driven), а когда реактивные (reactive) формы?

Выбор между template-driven (стандартными) и reactive (реактивными) формами в Angular — это важное архитектурное решение, которое влияет на структуру кода, тестируемость и возможности приложения. Понимание различий между этими подходами и умение выбрать правильный подход для конкретной ситуации является ключевым навыком Angular разработчика.

## Template-Driven Forms (Стандартные формы)

Template-driven forms — это подход, при котором логика формы определяется в шаблоне с помощью директив, таких как `ngModel`, `ngForm`, `ngModelGroup`. Валидация и структура формы управляются через директивы в HTML.

### Характеристики:

- ✅ **Простота** — легко начать использовать
- ✅ **Меньше кода в TypeScript** — логика в шаблоне
- ✅ **Быстрое прототипирование** — быстро создать форму
- ⚠️ **Сложнее тестировать** — логика в шаблоне
- ⚠️ **Меньше контроля** — ограниченные возможности
- ⚠️ **Асинхронная валидация сложнее** — труднее реализовать

### Пример Template-Driven формы:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
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
      
      <div>
        <label>Возраст:</label>
        <input 
          name="age"
          type="number"
          [(ngModel)]="user.age"
          required
          min="18"
          max="100"
          #ageRef="ngModel">
        
        <div *ngIf="ageRef.invalid && ageRef.touched">
          <p *ngIf="ageRef.errors?.['required']">Возраст обязателен</p>
          <p *ngIf="ageRef.errors?.['min']">Минимальный возраст 18 лет</p>
          <p *ngIf="ageRef.errors?.['max']">Максимальный возраст 100 лет</p>
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
export class UserFormComponent {
  user = {
    name: '',
    email: '',
    age: null
  };
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Отправка формы:', form.value);
      // Отправка данных
    }
  }
}
```

## Reactive Forms (Реактивные формы)

Reactive forms — это подход, при котором структура и валидация формы определяются в TypeScript коде через `FormGroup`, `FormControl`, `FormArray`. Форма создается программно и полностью контролируется из кода.

### Характеристики:

- ✅ **Полный контроль** — вся логика в TypeScript
- ✅ **Легко тестировать** — логика отделена от шаблона
- ✅ **Мощная валидация** — синхронная и асинхронная
- ✅ **Динамические формы** — легко создавать динамически
- ✅ **Типобезопасность** — можно использовать типизацию
- ⚠️ **Больше кода** — требуется больше кода в TypeScript
- ⚠️ **Сложнее для простых форм** — избыточно для простых случаев

### Пример Reactive формы:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-form',
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
        <input formControlName="email" type="email">
        
        <div *ngIf="emailControl.invalid && emailControl.touched">
          <p *ngIf="emailControl.errors?.['required']">Email обязателен</p>
          <p *ngIf="emailControl.errors?.['email']">Некорректный email</p>
        </div>
      </div>
      
      <div>
        <label>Возраст:</label>
        <input formControlName="age" type="number">
        
        <div *ngIf="ageControl.invalid && ageControl.touched">
          <p *ngIf="ageControl.errors?.['required']">Возраст обязателен</p>
          <p *ngIf="ageControl.errors?.['min']">Минимальный возраст 18 лет</p>
          <p *ngIf="ageControl.errors?.['max']">Максимальный возраст 100 лет</p>
        </div>
      </div>
      
      <div formGroupName="address">
        <label>Адрес:</label>
        <input formControlName="street" placeholder="Улица">
        <input formControlName="city" placeholder="Город">
        <input formControlName="zip" placeholder="Индекс">
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
  imports: [ReactiveFormsModule]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      address: this.fb.group({
        street: [''],
        city: [''],
        zip: ['']
      })
    });
  }
  
  // Геттеры для удобного доступа к контролам
  get nameControl(): AbstractControl {
    return this.userForm.get('name')!;
  }
  
  get emailControl(): AbstractControl {
    return this.userForm.get('email')!;
  }
  
  get ageControl(): AbstractControl {
    return this.userForm.get('age')!;
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Отправка формы:', this.userForm.value);
      // Отправка данных
    } else {
      // Пометить все поля как touched для отображения ошибок
      this.userForm.markAllAsTouched();
    }
  }
}
```

## Когда использовать Template-Driven формы?

### ✅ Используйте Template-Driven когда:

1. **Простые формы** — формы с небольшим количеством полей
2. **Быстрое прототипирование** — нужно быстро создать форму
3. **Простая валидация** — только стандартная валидация
4. **Небольшие проекты** — простые приложения
5. **Минимальная логика** — нет сложной бизнес-логики

**Примеры:**
- Форма входа (логин/пароль)
- Форма обратной связи
- Простая форма регистрации
- Форма поиска

```typescript
// Простая форма входа - Template-Driven подходит
@Component({
  template: `
    <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)">
      <input name="email" [(ngModel)]="email" required email>
      <input name="password" type="password" [(ngModel)]="password" required>
      <button [disabled]="loginForm.invalid">Войти</button>
    </form>
  `
})
```

## Когда использовать Reactive формы?

### ✅ Используйте Reactive когда:

1. **Сложные формы** — много полей, вложенные группы
2. **Динамические формы** — поля добавляются/удаляются динамически
3. **Сложная валидация** — кастомные валидаторы, асинхронная валидация
4. **Тестирование важно** — нужны unit тесты для логики формы
5. **Типобезопасность** — нужна строгая типизация
6. **Большие проекты** — масштабируемые приложения
7. **Программное управление** — нужно программно управлять формой

**Примеры:**
- Многошаговые формы (wizard)
- Формы с динамическими полями
- Формы с сложной валидацией
- Формы с зависимыми полями

```typescript
// Сложная форма с динамическими полями - Reactive подходит
@Component({
  template: `
    <form [formGroup]="form">
      <div formArrayName="items">
        <div *ngFor="let item of items.controls; let i = index" [formGroupName]="i">
          <input formControlName="name">
          <input formControlName="quantity">
          <button (click)="removeItem(i)">Удалить</button>
        </div>
      </div>
      <button (click)="addItem()">Добавить элемент</button>
    </form>
  `
})
export class DynamicFormComponent {
  form = this.fb.group({
    items: this.fb.array([])
  });
  
  get items() {
    return this.form.get('items') as FormArray;
  }
  
  addItem() {
    this.items.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.min(1)]
    }));
  }
  
  removeItem(index: number) {
    this.items.removeAt(index);
  }
}
```

## Сравнительная таблица

| Характеристика | Template-Driven | Reactive |
|----------------|-----------------|----------|
| **Сложность** | Простая | Средняя/Высокая |
| **Код в шаблоне** | Много | Мало |
| **Код в TypeScript** | Мало | Много |
| **Тестируемость** | Сложнее | Легче |
| **Валидация** | Базовая | Продвинутая |
| **Динамические формы** | Сложно | Легко |
| **Типобезопасность** | Нет | Да |
| **Контроль** | Ограниченный | Полный |
| **Производительность** | Хорошая | Отличная |

## Продвинутые возможности Reactive форм

### Кастомные валидаторы:

```typescript
// Синхронный валидатор
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*]/.test(value);
  
  const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
  
  return valid ? null : { passwordStrength: true };
}

// Асинхронный валидатор
export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    
    return userService.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailExists: true } : null),
      catchError(() => of(null))
    );
  };
}

// Использование
this.userForm = this.fb.group({
  password: ['', [Validators.required, passwordValidator]],
  email: ['', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [emailExistsValidator(this.userService)],
    updateOn: 'blur'
  }]
});
```

### Зависимые поля:

```typescript
this.userForm = this.fb.group({
  country: [''],
  city: ['']
});

// Обновление города при изменении страны
this.userForm.get('country')?.valueChanges.subscribe(country => {
  const cityControl = this.userForm.get('city');
  cityControl?.setValue('');
  cityControl?.setValidators(country ? Validators.required : null);
  cityControl?.updateValueAndValidity();
});
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Template-Driven** для простых форм
2. **Используйте Reactive** для сложных форм
3. **Создавайте кастомные валидаторы** для повторяющейся логики
4. **Используйте FormBuilder** для упрощения создания форм
5. **Тестируйте валидаторы** отдельно от компонентов

### ❌ Не делайте:

1. **Не смешивайте подходы** в одной форме
2. **Не используйте Reactive** для очень простых форм
3. **Не дублируйте валидацию** — создавайте переиспользуемые валидаторы
4. **Не забывайте про доступность** — добавляйте aria-labels

## Заключение

Выбор между Template-Driven и Reactive формами:

- **Template-Driven** — для простых форм, быстрого прототипирования, минимальной логики
- **Reactive** — для сложных форм, динамических форм, сложной валидации, когда важна тестируемость

**Помните:** нет правильного или неправильного выбора — оба подхода имеют свои преимущества. Выбирайте подход в зависимости от сложности формы и требований проекта. Для большинства реальных приложений рекомендуется использовать Reactive формы, так как они предоставляют больше контроля и возможностей, особенно по мере роста приложения.

