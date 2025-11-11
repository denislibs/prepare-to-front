# Что такое ngZone?

`NgZone` — это сервис Angular, который является оберткой над Zone.js и управляет выполнением кода внутри или вне контекста Angular. NgZone позволяет контролировать, когда Angular должен запускать Change Detection.

## Что такое Zone.js?

Zone.js — это библиотека, которая перехватывает асинхронные операции (setTimeout, Promise, события и т.д.) и уведомляет Angular о необходимости запустить Change Detection.

## NgZone в Angular

NgZone — это сервис Angular, который:
- Обертывает Zone.js
- Управляет контекстом выполнения кода
- Контролирует запуск Change Detection

## Основные методы NgZone

### 1. **run()** — выполнить код внутри Angular

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<p>{{ message }}</p>'
})
export class ExampleComponent {
  message = '';
  
  constructor(private ngZone: NgZone) {}
  
  updateMessage() {
    // Выполнить код внутри Angular
    // Change Detection запустится автоматически
    this.ngZone.run(() => {
      this.message = 'Новое сообщение';
      // Angular автоматически обновит DOM
    });
  }
}
```

### 2. **runOutsideAngular()** — выполнить код вне Angular

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<canvas #canvas></canvas>'
})
export class ExampleComponent {
  constructor(private ngZone: NgZone) {}
  
  startAnimation() {
    // Выполнить код вне Angular
    // Change Detection НЕ запустится
    this.ngZone.runOutsideAngular(() => {
      // Тяжелая анимация, которая не должна триггерить Change Detection
      this.animate();
    });
  }
  
  animate() {
    // Анимация canvas, requestAnimationFrame и т.д.
    // Change Detection не запускается
  }
}
```

### 3. **onStable** — подписка на стабильность

```typescript
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<p>Загрузка завершена</p>'
})
export class ExampleComponent implements OnInit, OnDestroy {
  private subscription: any;
  
  constructor(private ngZone: NgZone) {}
  
  ngOnInit() {
    // Подписка на событие стабильности
    this.subscription = this.ngZone.onStable.subscribe(() => {
      console.log('Angular стабилен, все асинхронные операции завершены');
    });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

### 4. **onUnstable** — подписка на нестабильность

```typescript
ngOnInit() {
  this.ngZone.onUnstable.subscribe(() => {
    console.log('Angular нестабилен, выполняются асинхронные операции');
  });
}
```

## Практические примеры

### Пример 1: Оптимизация анимации

```typescript
import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation',
  template: '<canvas #canvas></canvas>'
})
export class AnimationComponent {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private animationId: number | null = null;
  
  constructor(private ngZone: NgZone) {}
  
  startAnimation() {
    // Запустить анимацию вне Angular
    // Это предотвратит запуск Change Detection на каждом кадре
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }
  
  animate() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;
    
    const animateFrame = () => {
      // Рисование на canvas
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillRect(10, 10, 50, 50);
      
      this.animationId = requestAnimationFrame(animateFrame);
    };
    
    animateFrame();
  }
  
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
  
  updateData() {
    // Если нужно обновить данные компонента
    // Выполнить внутри Angular
    this.ngZone.run(() => {
      this.data = newData;
      // Change Detection запустится
    });
  }
}
```

### Пример 2: Работа с WebSocket

```typescript
import { Component, NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat',
  template: '<div *ngFor="let message of messages">{{ message }}</div>'
})
export class ChatComponent implements OnDestroy {
  messages: string[] = [];
  private ws!: WebSocket;
  
  constructor(private ngZone: NgZone) {
    this.connectWebSocket();
  }
  
  connectWebSocket() {
    this.ws = new WebSocket('ws://example.com/chat');
    
    this.ws.onmessage = (event) => {
      // WebSocket события выполняются вне Angular
      // Нужно явно запустить Change Detection
      this.ngZone.run(() => {
        this.messages.push(event.data);
        // Change Detection запустится
      });
    };
  }
  
  ngOnDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
```

### Пример 3: Тяжелые вычисления

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-calculator',
  template: '<p>Результат: {{ result }}</p>'
})
export class CalculatorComponent {
  result = 0;
  
  constructor(private ngZone: NgZone) {}
  
  calculate() {
    // Тяжелые вычисления вне Angular
    this.ngZone.runOutsideAngular(() => {
      const heavyResult = this.heavyCalculation();
      
      // После завершения обновить данные внутри Angular
      this.ngZone.run(() => {
        this.result = heavyResult;
        // Change Detection запустится только один раз
      });
    });
  }
  
  heavyCalculation(): number {
    // Тяжелые вычисления
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }
}
```

## Когда использовать NgZone?

### Используйте `runOutsideAngular()` для:

1. **Анимации** — requestAnimationFrame, canvas анимации
2. **Тяжелых вычислений** — которые не должны блокировать UI
3. **Сторонних библиотек** — которые не должны триггерить Change Detection
4. **Оптимизации производительности** — когда нужно избежать лишних проверок

### Используйте `run()` для:

1. **Обновления данных** — после операций вне Angular
2. **Явного запуска Change Detection** — когда нужно обновить DOM
3. **Синхронизации** — между кодом вне и внутри Angular

## Лучшие практики

### ✅ Делайте:

1. **Используйте runOutsideAngular** для тяжелых операций
2. **Используйте run** для обновления данных после операций вне Angular
3. **Минимизируйте Change Detection** для оптимизации

### ❌ Не делайте:

1. **Не используйте runOutsideAngular** без необходимости
2. **Не забывайте использовать run** для обновления данных
3. **Не злоупотребляйте** ручным управлением Zone

## Заключение

NgZone — это мощный инструмент для управления Change Detection:

- **run()** — выполнить код внутри Angular, запустить Change Detection
- **runOutsideAngular()** — выполнить код вне Angular, не запускать Change Detection
- **onStable/onUnstable** — подписки на состояние Angular

**Помните:** используйте NgZone для оптимизации производительности, особенно при работе с анимациями, тяжелыми вычислениями и сторонними библиотеками. Это поможет избежать лишних проверок Change Detection и улучшить производительность приложения.

