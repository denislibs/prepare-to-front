# Что такое View Encapsulation?

View Encapsulation (инкапсуляция представления) в Angular — это механизм, который изолирует стили компонента от остальной части приложения, предотвращая конфликты стилей между компонентами. Понимание View Encapsulation критически важно для правильной работы со стилями в Angular приложениях и предотвращения непредвиденных конфликтов CSS.

## Что такое View Encapsulation?

View Encapsulation — это механизм Angular, который обеспечивает изоляцию стилей компонента, гарантируя, что стили, определенные в одном компоненте, не влияют на другие компоненты приложения. Это достигается через различные стратегии инкапсуляции, каждая из которых имеет свои особенности и применение.

## Стратегии View Encapsulation

Angular предоставляет три стратегии инкапсуляции:

### 1. **Emulated (Эмулированная)** — По умолчанию

Emulated — это стратегия по умолчанию в Angular. Она эмулирует Shadow DOM, добавляя уникальные атрибуты к элементам и стилям компонента.

#### Как это работает:

```typescript
@Component({
  selector: 'app-user',
  template: '<h1>Пользователь</h1>',
  styles: ['h1 { color: blue; }'],
  encapsulation: ViewEncapsulation.Emulated // По умолчанию
})
export class UserComponent {}
```

**Результат в DOM:**
```html
<!-- Angular добавляет уникальные атрибуты -->
<h1 _ngcontent-c0>Пользователь</h1>

<style>
  h1[_ngcontent-c0] { color: blue; }
</style>
```

#### Характеристики:

- ✅ **Изоляция стилей** — стили компонента не влияют на другие компоненты
- ✅ **Совместимость** — работает во всех браузерах
- ✅ **Автоматическая изоляция** — не требует дополнительной настройки
- ⚠️ **Глобальные стили** — все еще могут влиять на компонент

### 2. **None (Отсутствие инкапсуляции)**

None — отключает инкапсуляцию, делая стили компонента глобальными и доступными для всего приложения.

#### Как это работает:

```typescript
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<h1>Пользователь</h1>',
  styles: ['h1 { color: blue; }'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {}
```

**Результат в DOM:**
```html
<h1>Пользователь</h1>

<style>
  h1 { color: blue; } /* Глобальный стиль */
</style>
```

#### Характеристики:

- ⚠️ **Нет изоляции** — стили применяются глобально
- ⚠️ **Конфликты стилей** — возможны конфликты между компонентами
- ✅ **Глобальные стили** — можно создавать глобальные стили
- ⚠️ **Требует осторожности** — нужно быть осторожным с селекторами

#### Когда использовать:

- Создание глобальных стилей
- Библиотеки компонентов, которые должны влиять на стили приложения
- Когда нужен полный контроль над стилями

### 3. **ShadowDom (Shadow DOM)**

ShadowDom — использует нативную поддержку Shadow DOM браузера для полной изоляции стилей и DOM.

#### Как это работает:

```typescript
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<h1>Пользователь</h1>',
  styles: ['h1 { color: blue; }'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserComponent {}
```

**Результат в DOM:**
```html
<app-user>
  #shadow-root (open)
    <h1>Пользователь</h1>
    <style>h1 { color: blue; }</style>
</app-user>
```

#### Характеристики:

- ✅ **Полная изоляция** — стили полностью изолированы
- ✅ **Нативная поддержка** — использует возможности браузера
- ⚠️ **Поддержка браузеров** — не все браузеры поддерживают Shadow DOM
- ⚠️ **Глобальные стили** — не применяются к Shadow DOM

#### Когда использовать:

- Когда нужна полная изоляция
- Современные браузеры с поддержкой Shadow DOM
- Создание изолированных виджетов

## Сравнительная таблица

| Стратегия | Изоляция | Совместимость | Глобальные стили | Производительность |
|-----------|----------|---------------|------------------|-------------------|
| **Emulated** | Частичная | Все браузеры | Применяются | Хорошая |
| **None** | Нет | Все браузеры | Применяются | Отличная |
| **ShadowDom** | Полная | Современные браузеры | Не применяются | Отличная |

## Практические примеры

### Пример 1: Emulated (по умолчанию)

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h2 class="title">Заголовок</h2>
      <p class="content">Содержимое</p>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
    }
    .title {
      color: blue;
      font-size: 24px;
    }
    .content {
      color: gray;
    }
  `]
  // encapsulation: ViewEncapsulation.Emulated (по умолчанию)
})
export class CardComponent {}
```

**Результат:**
- Стили изолированы от других компонентов
- Глобальные стили все еще могут влиять
- Работает во всех браузерах

### Пример 2: None (глобальные стили)

```typescript
@Component({
  selector: 'app-theme',
  template: `
    <div class="theme-container">
      <h1>Тема приложения</h1>
    </div>
  `,
  styles: [`
    .theme-container {
      font-family: 'Arial', sans-serif;
      color: #333;
    }
    h1 {
      margin: 0;
      padding: 16px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent {}
```

**Результат:**
- Стили применяются глобально
- Могут влиять на другие компоненты
- Полезно для тем и глобальных стилей

### Пример 3: ShadowDom (полная изоляция)

```typescript
@Component({
  selector: 'app-widget',
  template: `
    <div class="widget">
      <h2>Виджет</h2>
      <p>Изолированный контент</p>
    </div>
  `,
  styles: [`
    .widget {
      background: white;
      border: 2px solid black;
      padding: 20px;
    }
    h2 {
      color: red;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WidgetComponent {}
```

**Результат:**
- Полная изоляция стилей и DOM
- Глобальные стили не применяются
- Работает только в современных браузерах

## Работа с глобальными стилями

### Применение глобальных стилей к компонентам

Даже при использовании Emulated или ShadowDom, можно применять глобальные стили:

```typescript
// styles.css (глобальный файл)
:host {
  display: block;
}

:host-context(.dark-theme) {
  background: black;
  color: white;
}

// В компоненте
@Component({
  selector: 'app-user',
  template: '<h1>Пользователь</h1>',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
    
    :host-context(.dark-theme) h1 {
      color: white;
    }
  `]
})
export class UserComponent {}
```

### Псевдоклассы :host и :host-context

- **:host** — стилизует сам элемент компонента
- **:host-context()** — применяет стили в зависимости от контекста родителя

```typescript
@Component({
  selector: 'app-button',
  template: '<button>Кнопка</button>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host-context(.primary) button {
      background: blue;
      color: white;
    }
    
    :host-context(.secondary) button {
      background: gray;
      color: black;
    }
  `]
})
export class ButtonComponent {}
```

## Отключение инкапсуляции для конкретных стилей

Можно использовать `/deep/`, `::ng-deep` или `:host ::ng-deep` для проникновения через инкапсуляцию:

```typescript
@Component({
  selector: 'app-parent',
  template: '<app-child></app-child>',
  styles: [`
    // Стилизация дочернего компонента
    ::ng-deep app-child {
      border: 1px solid red;
    }
    
    // Стилизация элементов внутри дочернего компонента
    :host ::ng-deep .child-element {
      color: blue;
    }
  `]
})
export class ParentComponent {}
```

**⚠️ Важно:** `::ng-deep` устарел, но все еще работает. Рекомендуется использовать другие подходы.

## Лучшие практики

### ✅ Делайте:

1. **Используйте Emulated по умолчанию** — для большинства случаев
2. **Используйте :host** — для стилизации самого компонента
3. **Используйте :host-context()** — для контекстных стилей
4. **Используйте None** — только когда нужны глобальные стили
5. **Используйте ShadowDom** — для полной изоляции в современных браузерах

### ❌ Не делайте:

1. **Не используйте ::ng-deep** без необходимости — это нарушает инкапсуляцию
2. **Не используйте None** без необходимости — может вызвать конфликты
3. **Не полагайтесь на глобальные стили** — используйте инкапсуляцию
4. **Не смешивайте стратегии** — будьте последовательны

## Заключение

View Encapsulation в Angular:

- **Emulated** — по умолчанию, эмулирует Shadow DOM, работает везде
- **None** — отключает инкапсуляцию, глобальные стили
- **ShadowDom** — использует нативный Shadow DOM, полная изоляция

**Помните:** правильное использование View Encapsulation обеспечивает изоляцию стилей компонентов, предотвращает конфликты и делает приложение более поддерживаемым. В большинстве случаев достаточно стратегии Emulated по умолчанию, которая обеспечивает хорошую изоляцию при сохранении совместимости со всеми браузерами.

