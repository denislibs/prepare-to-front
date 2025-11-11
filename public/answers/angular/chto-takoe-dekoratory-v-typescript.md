# Что такое декораторы в TypeScript?

Декораторы (Decorators) в TypeScript — это специальный синтаксис, который позволяет добавлять метаданные и изменять поведение классов, методов, свойств и параметров. Декораторы широко используются в Angular для определения компонентов, сервисов, директив и других элементов.

## Что такое декораторы?

Декораторы — это функции, которые применяются к классам, методам, свойствам или параметрам для добавления дополнительной функциональности или метаданных.

## Синтаксис декораторов

```typescript
// Декоратор класса
@decorator
class MyClass {}

// Декоратор метода
class MyClass {
  @decorator
  myMethod() {}
}

// Декоратор свойства
class MyClass {
  @decorator
  myProperty: string;
}

// Декоратор параметра
class MyClass {
  myMethod(@decorator param: string) {}
}
```

## Типы декораторов

### 1. **Class Decorators (Декораторы классов)**

Применяются к классам.

```typescript
// Простой декоратор класса
function Component(target: any) {
  console.log('Компонент создан:', target);
}

@Component
class MyComponent {}

// Декоратор с параметрами (фабрика декораторов)
function Component(config: any) {
  return function(target: any) {
    console.log('Конфигурация:', config);
    console.log('Класс:', target);
  };
}

@Component({
  selector: 'app-my',
  template: '<p>Привет</p>'
})
class MyComponent {}
```

### 2. **Method Decorators (Декораторы методов)**

Применяются к методам.

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Вызов метода ${propertyKey} с аргументами:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Результат:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### 3. **Property Decorators (Декораторы свойств)**

Применяются к свойствам.

```typescript
function ReadOnly(target: any, propertyKey: string) {
  const descriptor: PropertyDescriptor = {
    writable: false
  };
  return descriptor;
}

class User {
  @ReadOnly
  id: number = 1;
  
  name: string = 'Иван';
}

const user = new User();
// user.id = 2; // Ошибка: нельзя изменить
user.name = 'Петр'; // OK
```

### 4. **Parameter Decorators (Декораторы параметров)**

Применяются к параметрам методов.

```typescript
function Required(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Параметр ${parameterIndex} метода ${propertyKey} обязателен`);
}

class UserService {
  getUser(@Required id: number, name?: string) {
    return { id, name };
  }
}
```

## Декораторы в Angular

### 1. **@Component**

Декоратор для создания компонентов.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>{{ name }}</p>',
  styles: ['p { color: blue; }']
})
export class UserComponent {
  name = 'Иван';
}
```

### 2. **@Injectable**

Декоратор для создания сервисов.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton на уровне приложения
})
export class UserService {
  getUsers() {
    return ['Иван', 'Мария'];
  }
}
```

### 3. **@Directive**

Декоратор для создания директив.

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### 4. **@Input и @Output**

Декораторы для входных и выходных свойств.

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <p>{{ user.name }}</p>
    <button (click)="onDelete()">Удалить</button>
  `
})
export class UserComponent {
  @Input() user: any;
  @Output() delete = new EventEmitter();
  
  onDelete() {
    this.delete.emit(this.user.id);
  }
}
```

### 5. **@ViewChild и @ContentChild**

Декораторы для доступа к дочерним элементам.

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<input #inputRef>'
})
export class ParentComponent {
  @ViewChild('inputRef') inputRef!: ElementRef;
  
  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();
  }
}
```

## Создание собственных декораторов

### Пример 1: Декоратор для логирования

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`[LOG] Вызов ${propertyKey}`, args);
    const result = originalMethod.apply(this, args);
    console.log(`[LOG] Результат ${propertyKey}:`, result);
    return result;
  };
  
  return descriptor;
}

class UserService {
  @Log
  getUser(id: number) {
    return { id, name: 'Иван' };
  }
}
```

### Пример 2: Декоратор для кеширования

```typescript
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();
  
  descriptor.value = function(...args: any[]) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Из кеша');
      return cache.get(key);
    }
    
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
  
  return descriptor;
}

class DataService {
  @Cache
  getData(id: number) {
    // Тяжелая операция
    return { id, data: 'Данные' };
  }
}
```

### Пример 3: Декоратор для валидации

```typescript
function Validate(min: number, max: number) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(value: number) {
      if (value < min || value > max) {
        throw new Error(`Значение должно быть между ${min} и ${max}`);
      }
      return originalMethod.apply(this, [value]);
    };
    
    return descriptor;
  };
}

class Calculator {
  @Validate(0, 100)
  setPercentage(value: number) {
    this.percentage = value;
  }
}
```

## Включение декораторов в TypeScript

Для использования декораторов нужно включить их в `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте декораторы** для метаданных (как в Angular)
2. **Создавайте переиспользуемые декораторы** для общей функциональности
3. **Документируйте декораторы** для понимания их назначения

### ❌ Не делайте:

1. **Не злоупотребляйте декораторами** — используйте только когда необходимо
2. **Не создавайте сложные декораторы** — они могут усложнить код
3. **Не забывайте про производительность** — декораторы выполняются во время выполнения

## Заключение

Декораторы в TypeScript:

- **Специальный синтаксис** для добавления метаданных и изменения поведения
- **Типы**: Class, Method, Property, Parameter
- **Широко используются в Angular** для компонентов, сервисов, директив
- **Можно создавать собственные** декораторы для переиспользования функциональности

**Помните:** декораторы — это мощный инструмент, который делает код более декларативным и переиспользуемым. В Angular декораторы являются основой для определения компонентов, сервисов и других элементов приложения.

