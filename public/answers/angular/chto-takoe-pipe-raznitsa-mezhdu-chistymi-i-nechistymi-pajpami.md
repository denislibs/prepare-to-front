# Что такое пайп (pipe) в Angular? Разница между чистыми и нечистыми пайпами?

Пайпы (pipes) в Angular — это механизм для трансформации данных в шаблонах. Пайпы позволяют форматировать, фильтровать и преобразовывать данные перед их отображением в шаблоне. Понимание работы пайпов и различий между чистыми (pure) и нечистыми (impure) пайпами критически важно для создания эффективных и производительных Angular приложений.

## Что такое пайп?

Пайп — это класс, который реализует интерфейс `PipeTransform` и используется для трансформации данных в шаблонах Angular. Пайпы применяются к данным через оператор `|` (pipe operator) в шаблонах.

### Базовый синтаксис:

```typescript
{{ value | pipeName }}
{{ value | pipeName:arg1:arg2 }}
{{ value | pipe1 | pipe2 }} // Цепочка пайпов
```

## Создание пайпа

### Базовый пример:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.toUpperCase();
  }
}
```

**Использование:**
```html
<p>{{ 'привет мир' | uppercase }}</p>
<!-- Результат: ПРИВЕТ МИР -->
```

## Встроенные пайпы Angular

Angular предоставляет множество встроенных пайпов:

### 1. **DatePipe** — форматирование дат

```html
{{ date | date }}
{{ date | date:'short' }}
{{ date | date:'fullDate' }}
{{ date | date:'dd/MM/yyyy' }}
```

### 2. **CurrencyPipe** — форматирование валюты

```html
{{ price | currency }}
{{ price | currency:'USD' }}
{{ price | currency:'RUB':'symbol':'1.2-2' }}
```

### 3. **DecimalPipe** — форматирование чисел

```html
{{ number | number }}
{{ number | number:'1.2-2' }}
{{ number | number:'1.0-0' }}
```

### 4. **PercentPipe** — форматирование процентов

```html
{{ 0.25 | percent }}
{{ 0.25 | percent:'1.2-2' }}
```

### 5. **UpperCasePipe / LowerCasePipe** — регистр

```html
{{ text | uppercase }}
{{ text | lowercase }}
```

### 6. **JsonPipe** — JSON форматирование

```html
{{ object | json }}
```

### 7. **SlicePipe** — обрезка массива/строки

```html
{{ array | slice:0:5 }}
{{ string | slice:0:10 }}
```

### 8. **AsyncPipe** — работа с Observable/Promise

```html
<div *ngFor="let item of items$ | async">
  {{ item.name }}
</div>
```

## Чистые пайпы (Pure Pipes)

Чистые пайпы — это пайпы по умолчанию, которые пересчитываются только при изменении входных данных (ссылки на объект/примитив).

### Характеристики чистых пайпов:

- ✅ **Кешируются** — результат кешируется между вызовами
- ✅ **Пересчитываются** — только при изменении входных данных
- ✅ **Производительность** — быстрые, так как кешируются
- ✅ **Детерминированные** — одинаковые входные данные = одинаковый результат
- ✅ **Без побочных эффектов** — не изменяют состояние

### Пример чистого пайпа:

```typescript
@Pipe({
  name: 'multiply',
  pure: true // По умолчанию
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, factor: number = 2): number {
    return value * factor;
  }
}
```

**Использование:**
```html
<p>{{ 5 | multiply }}</p> <!-- 10 -->
<p>{{ 5 | multiply:3 }}</p> <!-- 15 -->
```

**Как работает кеширование:**
```typescript
// Первый вызов с value=5, factor=2
{{ 5 | multiply:2 }} // Вычисляется: 10

// Второй вызов с теми же параметрами
{{ 5 | multiply:2 }} // Используется кеш: 10 (не вычисляется)

// Изменение параметров
{{ 6 | multiply:2 }} // Вычисляется: 12 (новые параметры)
```

### Работа с объектами в чистых пайпах:

```typescript
@Pipe({
  name: 'userName',
  pure: true
})
export class UserNamePipe implements PipeTransform {
  transform(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
```

**Важно:** Чистый пайп пересчитается только если изменилась ссылка на объект:

```typescript
// ❌ Не пересчитается
user.name = 'Новое имя'; // Мутация объекта
{{ user | userName }} // Используется старый кеш

// ✅ Пересчитается
user = { ...user, name: 'Новое имя' }; // Новая ссылка
{{ user | userName }} // Вычисляется заново
```

## Нечистые пайпы (Impure Pipes)

Нечистые пайпы пересчитываются при каждом цикле Change Detection, независимо от того, изменились ли входные данные.

### Характеристики нечистых пайпов:

- ⚠️ **Не кешируются** — пересчитываются каждый раз
- ⚠️ **Пересчитываются часто** — при каждом Change Detection
- ⚠️ **Медленнее** — нет кеширования
- ⚠️ **Могут иметь побочные эффекты** — могут изменять состояние
- ✅ **Реагируют на мутации** — работают с мутируемыми объектами

### Пример нечистого пайпа:

```typescript
@Pipe({
  name: 'filter',
  pure: false // Нечистый пайп
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    if (!items || !filter) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
```

**Использование:**
```html
<div *ngFor="let item of items | filter:searchText">
  {{ item.name }}
</div>
```

**Как работает:**
```typescript
// Пересчитывается при КАЖДОМ Change Detection
// Даже если items и searchText не изменились
// Это может быть медленно для больших массивов
```

## Сравнительная таблица

| Характеристика | Чистые пайпы | Нечистые пайпы |
|----------------|--------------|----------------|
| **Кеширование** | Да | Нет |
| **Пересчет** | Только при изменении входных | При каждом Change Detection |
| **Производительность** | Высокая | Низкая |
| **Побочные эффекты** | Нет | Могут быть |
| **Работа с мутациями** | Нет (только ссылки) | Да |
| **Использование** | Рекомендуется | Только когда необходимо |

## Практические примеры

### Пример 1: Чистый пайп для форматирования

```typescript
@Pipe({
  name: 'formatPhone',
  pure: true
})
export class FormatPhonePipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) return '';
    
    // Удаление всех нецифровых символов
    const digits = phone.replace(/\D/g, '');
    
    // Форматирование: +7 (XXX) XXX-XX-XX
    if (digits.length === 11 && digits[0] === '7') {
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
    }
    
    return phone;
  }
}
```

**Использование:**
```html
<p>{{ '79123456789' | formatPhone }}</p>
<!-- Результат: +7 (912) 345-67-89 -->
```

### Пример 2: Нечистый пайп для фильтрации

```typescript
@Pipe({
  name: 'filterBy',
  pure: false // Нечистый, так как нужно реагировать на мутации
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], field: string, value: any): any[] {
    if (!items || !field) return items;
    
    return items.filter(item => item[field] === value);
  }
}
```

**Использование:**
```html
<div *ngFor="let user of users | filterBy:'active':true">
  {{ user.name }}
</div>
```

### Пример 3: Чистый пайп с параметрами

```typescript
@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + trail;
  }
}
```

**Использование:**
```html
<p>{{ longText | truncate:50 }}</p>
<p>{{ longText | truncate:30:'...' }}</p>
```

### Пример 4: Комбинирование пайпов

```html
<!-- Цепочка пайпов -->
<p>{{ user.name | uppercase | truncate:20 }}</p>
<p>{{ price | currency:'RUB' | lowercase }}</p>
<p>{{ date | date:'fullDate' | uppercase }}</p>
```

## Когда использовать чистые пайпы?

### ✅ Используйте чистые пайпы когда:

- Форматирование данных (даты, валюты, чисел)
- Простые трансформации (uppercase, lowercase)
- Математические операции
- Работа с примитивами
- Когда нужна производительность

## Когда использовать нечистые пайпы?

### ⚠️ Используйте нечистые пайпы когда:

- Фильтрация массивов (но лучше в компоненте!)
- Сортировка массивов (но лучше в компоненте!)
- Когда нужно реагировать на мутации объектов
- Когда нужны побочные эффекты

**⚠️ Важно:** Нечистые пайпы для фильтрации и сортировки могут быть медленными. Лучше делать это в компоненте!

## Оптимизация нечистых пайпов

Если нужен нечистый пайп, оптимизируйте его:

```typescript
@Pipe({
  name: 'optimizedFilter',
  pure: false
})
export class OptimizedFilterPipe implements PipeTransform {
  private lastItems: any[] = [];
  private lastFilter: string = '';
  private lastResult: any[] = [];
  
  transform(items: any[], filter: string): any[] {
    // Проверка, изменились ли входные данные
    if (items === this.lastItems && filter === this.lastFilter) {
      return this.lastResult; // Возврат кешированного результата
    }
    
    // Вычисление
    this.lastItems = items;
    this.lastFilter = filter;
    this.lastResult = items.filter(item => 
      item.name.includes(filter)
    );
    
    return this.lastResult;
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте чистые пайпы** — по умолчанию
2. **Используйте для форматирования** — даты, валюты, числа
3. **Избегайте нечистых пайпов** — для фильтрации/сортировки (лучше в компоненте)
4. **Оптимизируйте нечистые пайпы** — если они необходимы
5. **Документируйте пайпы** — опишите параметры и поведение

### ❌ Не делайте:

1. **Не используйте нечистые пайпы** — без необходимости
2. **Не делайте тяжелые вычисления** — в пайпах (лучше в компоненте)
3. **Не создавайте побочные эффекты** — в чистых пайпах
4. **Не забывайте про производительность** — нечистые пайпы медленные

## Альтернатива нечистым пайпам

Вместо нечистых пайпов для фильтрации/сортировки лучше использовать методы компонента:

```typescript
// ❌ Плохо - нечистый пайп
@Component({
  template: `
    <div *ngFor="let item of items | filter:searchText">
      {{ item.name }}
    </div>
  `
})

// ✅ Хорошо - метод компонента
@Component({
  template: `
    <div *ngFor="let item of getFilteredItems()">
      {{ item.name }}
    </div>
  `
})
export class MyComponent {
  items: Item[] = [];
  searchText = '';
  
  getFilteredItems(): Item[] {
    if (!this.searchText) return this.items;
    return this.items.filter(item => 
      item.name.includes(this.searchText)
    );
  }
}
```

## Заключение

Пайпы в Angular:

- **Чистые пайпы** — кешируются, пересчитываются только при изменении входных данных, высокая производительность
- **Нечистые пайпы** — не кешируются, пересчитываются при каждом Change Detection, низкая производительность

**Помните:** используйте чистые пайпы по умолчанию для форматирования и трансформации данных. Избегайте нечистых пайпов, особенно для фильтрации и сортировки — лучше делать это в компоненте. Нечистые пайпы следует использовать только когда действительно необходимо реагировать на мутации объектов или когда нужны побочные эффекты.

