# Для чего нужны директивы `<ng-template>`, `<ng-container>`, `<ng-content>`?

Эти три директивы Angular используются для работы с шаблонами и проекцией контента. Каждая из них имеет свое назначение и используется в разных сценариях.

## `<ng-template>`

`<ng-template>` — это директива, которая определяет шаблон, который не рендерится сразу, а используется для условного рендеринга или передачи в другие компоненты.

### Характеристики:

- Не рендерится в DOM по умолчанию
- Используется для условного рендеринга
- Может содержать любую разметку
- Работает с `*ngIf`, `*ngFor`, `*ngSwitch`

### Примеры использования:

#### 1. С *ngIf

```html
<div *ngIf="user; else noUser">
  <p>{{ user.name }}</p>
</div>

<ng-template #noUser>
  <p>Пользователь не найден</p>
</ng-template>
```

#### 2. С *ngFor

```html
<div *ngFor="let user of users; let first = first">
  <ng-template [ngIf]="first">
    <h2>Первый пользователь</h2>
  </ng-template>
  <p>{{ user.name }}</p>
</div>
```

#### 3. Передача шаблона в компонент

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() headerTemplate!: TemplateRef<any>;
}
```

**Использование:**
```html
<app-card [headerTemplate]="header">
  <p>Содержимое карточки</p>
</app-card>

<ng-template #header>
  <h2>Заголовок</h2>
</ng-template>
```

## `<ng-container>`

`<ng-container>` — это логический контейнер, который не создает элемент в DOM, но позволяет группировать элементы и применять директивы.

### Характеристики:

- Не создает элемент в DOM
- Используется для группировки без лишних элементов
- Может использоваться с структурными директивами
- Полезен для условного рендеринга нескольких элементов

### Примеры использования:

#### 1. Группировка с *ngIf

```html
<!-- ❌ Плохо - лишний div -->
<div *ngIf="isVisible">
  <h2>Заголовок</h2>
  <p>Текст</p>
</div>

<!-- ✅ Хорошо - без лишнего элемента -->
<ng-container *ngIf="isVisible">
  <h2>Заголовок</h2>
  <p>Текст</p>
</ng-container>
```

#### 2. Использование нескольких структурных директив

```html
<!-- ❌ Ошибка - нельзя использовать две структурные директивы на одном элементе -->
<div *ngIf="isVisible" *ngFor="let item of items">
  {{ item }}
</div>

<!-- ✅ Хорошо - используем ng-container -->
<ng-container *ngIf="isVisible">
  <div *ngFor="let item of items">
    {{ item }}
  </div>
</ng-container>
```

#### 3. Условный рендеринг с else

```html
<ng-container *ngIf="user; else loading">
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
</ng-container>

<ng-template #loading>
  <p>Загрузка...</p>
</ng-template>
```

#### 4. Группировка для стилизации

```html
<ng-container *ngFor="let user of users">
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</ng-container>
```

## `<ng-content>`

`<ng-content>` — это директива для проекции контента (content projection), которая позволяет вставлять контент из родительского компонента в дочерний.

### Характеристики:

- Проекция контента из родителя в дочерний компонент
- Может иметь селекторы для выборочной проекции
- Используется для создания переиспользуемых компонентов
- Не создает элемент в DOM

### Примеры использования:

#### 1. Простая проекция

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}
```

**Использование:**
```html
<app-card>
  <h2>Заголовок карточки</h2>
</app-card>
```

#### 2. Множественная проекция с селекторами

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}
```

**Использование:**
```html
<app-card>
  <h2 header>Заголовок</h2>
  <p>Основной контент</p>
  <button footer>Действие</button>
</app-card>
```

#### 3. Условная проекция

```typescript
@Component({
  selector: 'app-tab',
  template: `
    <div class="tab" *ngIf="isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input() isActive = false;
}
```

#### 4. Проекция с контекстом

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">
        <ng-content [user]="user"></ng-content>
      </li>
    </ul>
  `
})
export class UserListComponent {
  @Input() users: User[] = [];
}
```

## Сравнение

| Директива | Назначение | Рендерится в DOM | Использование |
|-----------|-----------|------------------|---------------|
| `<ng-template>` | Шаблон для условного рендеринга | Нет (по умолчанию) | Условный рендеринг, передача шаблонов |
| `<ng-container>` | Логическая группировка | Нет | Группировка без лишних элементов |
| `<ng-content>` | Проекция контента | Нет | Вставка контента из родителя |

## Практические примеры

### Пример 1: Комбинирование всех трех

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
export class ModalComponent {
  @Input() isOpen = false;
}
```

**Использование:**
```html
<app-modal [isOpen]="showModal">
  <h2 modal-header>Заголовок модального окна</h2>
  <p>Содержимое модального окна</p>
  <button modal-footer (click)="closeModal()">Закрыть</button>
</app-modal>
```

### Пример 2: ng-container для оптимизации

```html
<!-- Оптимизация структуры DOM -->
<ng-container *ngIf="isLoggedIn">
  <ng-container *ngFor="let item of items">
    <app-item [item]="item"></app-item>
  </ng-container>
</ng-container>
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте `<ng-container>`** для группировки без лишних элементов
2. **Используйте `<ng-template>`** для условного рендеринга
3. **Используйте `<ng-content>`** для создания переиспользуемых компонентов
4. **Используйте селекторы** в `<ng-content>` для множественной проекции

### ❌ Не делайте:

1. **Не создавайте лишние элементы** — используйте `<ng-container>`
2. **Не используйте `<ng-template>`** без необходимости
3. **Не забывайте про селекторы** в `<ng-content>` для гибкости

## Заключение

Три директивы для работы с шаблонами:

- **`<ng-template>`** — шаблон для условного рендеринга, не рендерится по умолчанию
- **`<ng-container>`** — логическая группировка без создания элемента в DOM
- **`<ng-content>`** — проекция контента из родителя в дочерний компонент

**Помните:** правильное использование этих директив помогает создавать более чистую структуру DOM, переиспользуемые компоненты и оптимизированные шаблоны.

