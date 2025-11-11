# Что такое интерполяция в Angular?

Интерполяция в Angular — это один из основных механизмов привязки данных, который позволяет встраивать выражения TypeScript непосредственно в HTML шаблоны. Интерполяция является самым простым и наиболее часто используемым способом отображения данных из компонента в шаблон. Понимание работы интерполяции и всех ее возможностей является фундаментальным для разработки Angular приложений.

## Что такое интерполяция?

Интерполяция — это синтаксис двойных фигурных скобок `{{ }}`, который Angular использует для вычисления выражений и отображения их результатов в DOM. Когда Angular встречает интерполяцию в шаблоне, он автоматически создает привязку данных, которая обновляется при изменении значений в компоненте.

## Базовый синтаксис

Синтаксис интерполяции очень простой: вы просто заключаете выражение в двойные фигурные скобки `{{ }}`. Angular автоматически вычисляет выражение и заменяет его результатом в DOM.

```typescript
@Component({
  selector: 'app-example',
  template: '<p>Привет, {{ name }}!</p>'
})
export class ExampleComponent {
  name = 'Иван';
}
```

В результате в браузере будет отображено: `<p>Привет, Иван!</p>`

## Как работает интерполяция?

### Процесс работы:

1. **Парсинг шаблона**: Angular парсит шаблон и находит все выражения в двойных фигурных скобках
2. **Создание привязки**: Для каждого выражения создается привязка данных (data binding)
3. **Вычисление выражения**: Angular вычисляет выражение в контексте компонента
4. **Отображение результата**: Результат вычисления вставляется в DOM
5. **Отслеживание изменений**: Angular отслеживает изменения и обновляет DOM при необходимости

### Механизм обновления:

Angular использует механизм Change Detection для отслеживания изменений. Когда значение свойства компонента изменяется, Angular автоматически пересчитывает интерполяцию и обновляет соответствующий элемент в DOM.

```typescript
@Component({
  selector: 'app-counter',
  template: '<p>Счетчик: {{ count }}</p>'
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++; // Изменение значения
    // Angular автоматически обновит DOM
  }
}
```

## Типы выражений в интерполяции

### 1. **Отображение свойств компонента**

Самый простой и распространенный случай — отображение свойств компонента.

```typescript
@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Возраст: {{ user.age }}</p>
    </div>
  `
})
export class UserComponent {
  user = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    age: 30
  };
}
```

### 2. **Математические выражения**

Интерполяция поддерживает простые математические операции.

```typescript
@Component({
  selector: 'app-calculator',
  template: `
    <p>Сумма: {{ 5 + 3 }}</p>
    <p>Произведение: {{ 5 * 3 }}</p>
    <p>Деление: {{ 10 / 2 }}</p>
    <p>Остаток: {{ 10 % 3 }}</p>
  `
})
export class CalculatorComponent {}
```

**Результат:**
- Сумма: 8
- Произведение: 15
- Деление: 5
- Остаток: 1

### 3. **Вызов методов компонента**

Можно вызывать методы компонента, но нужно быть осторожным с производительностью.

```typescript
@Component({
  selector: 'app-greeting',
  template: `
    <p>{{ getGreeting() }}</p>
    <p>Текущее время: {{ getCurrentTime() }}</p>
  `
})
export class GreetingComponent {
  name = 'Иван';
  
  getGreeting(): string {
    return `Привет, ${this.name}!`;
  }
  
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
```

**⚠️ Важно:** Методы в интерполяции вызываются при каждом цикле Change Detection, что может негативно повлиять на производительность. Для сложных вычислений лучше использовать геттеры или вычисляемые свойства.

### 4. **Работа с массивами и объектами**

Интерполяция может отображать элементы массивов и свойства объектов.

```typescript
@Component({
  selector: 'app-data',
  template: `
    <p>Первый элемент: {{ items[0] }}</p>
    <p>Количество элементов: {{ items.length }}</p>
    <p>Пользователь: {{ user.name }} ({{ user.email }})</p>
  `
})
export class DataComponent {
  items = ['Элемент 1', 'Элемент 2', 'Элемент 3'];
  user = {
    name: 'Иван',
    email: 'ivan@example.com'
  };
}
```

### 5. **Условные выражения (тернарный оператор)**

Можно использовать тернарный оператор для условного отображения.

```typescript
@Component({
  selector: 'app-status',
  template: `
    <p>Статус: {{ isActive ? 'Активен' : 'Неактивен' }}</p>
    <p>Сообщение: {{ count > 0 ? 'Есть элементы' : 'Нет элементов' }}</p>
  `
})
export class StatusComponent {
  isActive = true;
  count = 5;
}
```

### 6. **Использование пайпов (pipes)**

Интерполяция отлично работает с пайпами для преобразования данных.

```typescript
@Component({
  selector: 'app-formatted',
  template: `
    <p>Имя: {{ name | uppercase }}</p>
    <p>Цена: {{ price | currency:'RUB':'symbol':'1.2-2' }}</p>
    <p>Дата: {{ date | date:'fullDate' }}</p>
    <p>Процент: {{ percentage | percent:'1.2-2' }}</p>
  `
})
export class FormattedComponent {
  name = 'иван';
  price = 1234.56;
  date = new Date();
  percentage = 0.25;
}
```

**Результат:**
- Имя: ИВАН
- Цена: ₽1,234.56
- Дата: понедельник, 1 января 2024 г.
- Процент: 25.00%

### 7. **Цепочка пайпов**

Можно использовать несколько пайпов подряд.

```typescript
@Component({
  selector: 'app-chained',
  template: `
    <p>{{ message | uppercase | slice:0:10 }}</p>
    <p>{{ price | currency | lowercase }}</p>
  `
})
export class ChainedComponent {
  message = 'Привет, мир!';
  price = 1000;
}
```

## Ограничения интерполяции

### Что НЕЛЬЗЯ делать в интерполяции:

1. **Присваивание значений**
```typescript
// ❌ Ошибка
{{ name = 'Новое имя' }}

// ✅ Правильно
{{ name }}
```

2. **Использование операторов new, typeof, instanceof**
```typescript
// ❌ Ошибка
{{ new Date() }}
{{ typeof name }}

// ✅ Правильно
{{ getDate() }}
{{ getType() }}
```

3. **Использование операторов ++ и --**
```typescript
// ❌ Ошибка
{{ count++ }}

// ✅ Правильно
{{ count }}
```

4. **Импорт и экспорт**
```typescript
// ❌ Ошибка
{{ import * as something }}

// ✅ Правильно
// Импорты делаются в TypeScript коде
```

5. **Сложные выражения с побочными эффектами**
```typescript
// ❌ Плохо - побочные эффекты
{{ console.log('test') }}

// ✅ Правильно
{{ getValue() }}
```

## Безопасность интерполяции

Angular автоматически экранирует HTML в интерполяции для защиты от XSS атак.

```typescript
@Component({
  selector: 'app-safe',
  template: '<p>{{ htmlContent }}</p>'
})
export class SafeComponent {
  htmlContent = '<script>alert("XSS")</script>';
}
```

**Результат:** Angular экранирует HTML, и в браузере будет отображено: `<script>alert("XSS")</script>` как текст, а не выполнится как код.

Если нужно отобразить HTML, используйте `[innerHTML]`:

```typescript
@Component({
  selector: 'app-html',
  template: '<div [innerHTML]="htmlContent"></div>'
})
export class HtmlComponent {
  htmlContent = '<p>Безопасный HTML</p>';
}
```

## Производительность интерполяции

### Оптимизация:

1. **Избегайте сложных вычислений в интерполяции**
```typescript
// ❌ Плохо - вычисление при каждом Change Detection
{{ heavyCalculation() }}

// ✅ Хорошо - вычисление один раз
{{ computedValue }}
```

2. **Используйте геттеры для вычисляемых значений**
```typescript
@Component({
  selector: 'app-optimized',
  template: '<p>{{ fullName }}</p>'
})
export class OptimizedComponent {
  firstName = 'Иван';
  lastName = 'Иванов';
  
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

3. **Кешируйте результаты сложных вычислений**
```typescript
@Component({
  selector: 'app-cached',
  template: '<p>{{ cachedResult }}</p>'
})
export class CachedComponent {
  private _cachedResult: string | null = null;
  
  get cachedResult(): string {
    if (!this._cachedResult) {
      this._cachedResult = this.computeResult();
    }
    return this._cachedResult;
  }
  
  private computeResult(): string {
    // Тяжелое вычисление
    return 'Результат';
  }
}
```

## Практические примеры

### Пример 1: Отображение пользователя

```typescript
@Component({
  selector: 'app-user-profile',
  template: `
    <div class="user-profile">
      <h2>{{ user.name | titlecase }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Возраст: {{ user.age }} {{ user.age === 1 ? 'год' : user.age < 5 ? 'года' : 'лет' }}</p>
      <p>Статус: {{ user.isActive ? 'Активен' : 'Неактивен' }}</p>
      <p>Дата регистрации: {{ user.registrationDate | date:'longDate' }}</p>
    </div>
  `
})
export class UserProfileComponent {
  user = {
    name: 'иван иванов',
    email: 'ivan@example.com',
    age: 30,
    isActive: true,
    registrationDate: new Date('2023-01-15')
  };
}
```

### Пример 2: Отображение списка с подсчетом

```typescript
@Component({
  selector: 'app-shopping-cart',
  template: `
    <div class="cart">
      <h3>Корзина ({{ items.length }} {{ items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров' }})</h3>
      <p>Общая сумма: {{ totalPrice | currency:'RUB':'symbol':'1.2-2' }}</p>
      <p>Скидка: {{ discount }}% ({{ discountAmount | currency:'RUB':'symbol':'1.2-2' }})</p>
      <p>Итого: {{ finalPrice | currency:'RUB':'symbol':'1.2-2' }}</p>
    </div>
  `
})
export class ShoppingCartComponent {
  items = [
    { name: 'Товар 1', price: 100 },
    { name: 'Товар 2', price: 200 },
    { name: 'Товар 3', price: 300 }
  ];
  discount = 10;
  
  get totalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  get discountAmount(): number {
    return this.totalPrice * (this.discount / 100);
  }
  
  get finalPrice(): number {
    return this.totalPrice - this.discountAmount;
  }
}
```

### Пример 3: Форматирование данных

```typescript
@Component({
  selector: 'app-formatted-data',
  template: `
    <div class="data-display">
      <p>Число: {{ number | number:'1.2-2' }}</p>
      <p>Процент: {{ percentage | percent:'1.2-2' }}</p>
      <p>Валюта: {{ amount | currency:'USD':'symbol':'1.2-2' }}</p>
      <p>Дата: {{ date | date:'full' }}</p>
      <p>JSON: {{ object | json }}</p>
      <p>Текст: {{ text | uppercase | slice:0:20 }}...</p>
    </div>
  `
})
export class FormattedDataComponent {
  number = 1234.5678;
  percentage = 0.1234;
  amount = 1000;
  date = new Date();
  object = { name: 'Иван', age: 30 };
  text = 'Это длинный текст для демонстрации работы пайпов';
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте интерполяцию** для простого отображения данных
2. **Используйте пайпы** для форматирования
3. **Используйте геттеры** для вычисляемых значений
4. **Экранируйте пользовательский ввод** (Angular делает это автоматически)
5. **Используйте тернарный оператор** для простых условий

### ❌ Не делайте:

1. **Не делайте сложные вычисления** в интерполяции
2. **Не вызывайте методы с побочными эффектами** в интерполяции
3. **Не используйте присваивание** в интерполяции
4. **Не забывайте про производительность** — избегайте тяжелых операций
5. **Не смешивайте логику** — выносите сложную логику в методы компонента

## Заключение

Интерполяция в Angular — это мощный и простой механизм отображения данных:

- **Простой синтаксис** — `{{ expression }}`
- **Автоматическое обновление** — при изменении данных
- **Безопасность** — автоматическое экранирование HTML
- **Поддержка выражений** — математические операции, методы, пайпы
- **Производительность** — нужно учитывать при использовании методов

**Помните:** интерполяция — это основа отображения данных в Angular. Правильное использование интерполяции делает код более читаемым и поддерживаемым, но важно помнить о производительности и не использовать сложные вычисления или методы с побочными эффектами непосредственно в выражениях интерполяции.

