# Как улучшить производительность Angular приложения?

Оптимизация производительности Angular приложения — это комплексная задача, которая включает множество аспектов: от оптимизации загрузки и рендеринга до управления памятью и оптимизации работы с данными. Понимание различных техник оптимизации и умение их применять критически важно для создания быстрых и отзывчивых Angular приложений.

## Стратегии оптимизации производительности

### 1. **Lazy Loading модулей**

Ленивая загрузка модулей уменьшает начальный размер бандла и ускоряет первоначальную загрузку приложения.

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];
```

**Преимущества:**
- ✅ Меньший начальный бандл
- ✅ Быстрее первоначальная загрузка
- ✅ Загружаются только нужные модули

### 2. **OnPush Change Detection Strategy**

Использование `OnPush` стратегии уменьшает количество проверок изменений.

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div>
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
}
```

**Преимущества:**
- ✅ Меньше проверок изменений
- ✅ Лучшая производительность
- ✅ Предсказуемое поведение

**Требования:**
- Использовать неизменяемые объекты
- Использовать Observable с async pipe

### 3. **TrackBy функция в *ngFor**

Использование `trackBy` предотвращает ненужное пересоздание DOM элементов.

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  trackByUserId(index: number, user: User): number {
    return user.id; // Уникальный идентификатор
  }
  
  updateUsers() {
    // Angular переиспользует существующие элементы вместо создания новых
    this.users = [...this.users, newUser];
  }
}
```

**Преимущества:**
- ✅ Переиспользование DOM элементов
- ✅ Меньше операций с DOM
- ✅ Плавная анимация

### 4. **Async Pipe вместо подписок**

Использование `async` pipe автоматически управляет подписками.

```typescript
// ❌ Плохо - ручное управление подписками
@Component({...})
export class BadComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subscription!: Subscription;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.subscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// ✅ Хорошо - async pipe
@Component({...})
export class GoodComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
  // Автоматическая отписка при уничтожении компонента
}
```

**В шаблоне:**
```html
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

### 5. **Оптимизация бандла**

Использование tree-shaking и оптимизация импортов.

```typescript
// ❌ Плохо - импорт всего модуля
import { BrowserModule } from '@angular/platform-browser';

// ✅ Хорошо - импорт только нужного
import { CommonModule } from '@angular/common';

// ❌ Плохо - импорт всего RxJS
import { Observable, Subject, BehaviorSubject } from 'rxjs';

// ✅ Хорошо - импорт из конкретных модулей
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
```

### 6. **Virtual Scrolling**

Для больших списков используйте виртуальный скроллинг.

```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-large-list',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
    }
  `]
})
export class LargeListComponent {
  items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`
  }));
}
```

### 7. **OnPush с Immutable Data**

Использование неизменяемых структур данных.

```typescript
@Component({
  selector: 'app-user-list',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  @Input() users: User[] = [];
  
  addUser(newUser: User) {
    // ✅ Создание нового массива вместо мутации
    this.users = [...this.users, newUser];
    
    // ❌ Не делать так:
    // this.users.push(newUser); // Мутация не обнаружит OnPush
  }
}
```

### 8. **Debounce и Throttle для событий**

Ограничение частоты обработки событий.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({...})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300), // Ждать 300ms после последнего события
        distinctUntilChanged() // Только если значение изменилось
      )
      .subscribe(event => {
        this.performSearch((event.target as HTMLInputElement).value);
      });
  }
}
```

### 9. **Использование Pure Pipes**

Чистые пайпы кешируются и пересчитываются только при изменении входных данных.

```typescript
@Pipe({
  name: 'filter',
  pure: true // По умолчанию
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    return items.filter(item => item.name.includes(filter));
  }
}
```

### 10. **Оптимизация изображений**

Использование lazy loading для изображений.

```typescript
@Component({
  selector: 'app-image',
  template: `
    <img 
      [src]="imageSrc" 
      [loading]="'lazy'"
      [alt]="alt">
  `
})
export class ImageComponent {
  @Input() imageSrc!: string;
  @Input() alt!: string;
}
```

### 11. **Preloading Strategy**

Предзагрузка модулей для быстрой навигации.

```typescript
import { PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
export class AppRoutingModule { }
```

### 12. **Оптимизация HTTP запросов**

Использование кеширования и оптимизация запросов.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cache$!: Observable<any>;
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    if (!this.cache$) {
      this.cache$ = this.http.get('/api/data').pipe(
        shareReplay(1) // Кеширование результата
      );
    }
    return this.cache$;
  }
}
```

### 13. **Использование Web Workers**

Вынос тяжелых вычислений в Web Workers.

```typescript
// worker.ts
self.onmessage = function(e) {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// component.ts
@Component({...})
export class HeavyComponent {
  private worker: Worker;
  
  constructor() {
    this.worker = new Worker('./worker', { type: 'module' });
    this.worker.onmessage = (e) => {
      console.log('Result:', e.data);
    };
  }
  
  doHeavyWork(data: any) {
    this.worker.postMessage(data);
  }
}
```

### 14. **AOT компиляция**

Использование Ahead-of-Time компиляции для production.

```bash
ng build --configuration production
```

**Преимущества:**
- ✅ Меньший размер бандла
- ✅ Быстрее загрузка
- ✅ Раннее обнаружение ошибок

### 15. **Оптимизация шаблонов**

Избегание сложных вычислений в шаблонах.

```typescript
// ❌ Плохо - вычисление при каждом Change Detection
@Component({
  template: `
    <div *ngFor="let item of items">
      {{ expensiveCalculation(item) }}
    </div>
  `
})
export class BadComponent {
  expensiveCalculation(item: any) {
    // Тяжелое вычисление
    return item.value * 1000;
  }
}

// ✅ Хорошо - предварительное вычисление
@Component({
  template: `
    <div *ngFor="let item of processedItems">
      {{ item.calculatedValue }}
    </div>
  `
})
export class GoodComponent {
  processedItems = this.items.map(item => ({
    ...item,
    calculatedValue: this.expensiveCalculation(item)
  }));
}
```

### 16. **Использование ng-container**

Избегание лишних DOM элементов.

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

### 17. **Оптимизация сервисов**

Использование singleton сервисов и правильное управление подписками.

```typescript
@Injectable({
  providedIn: 'root' // Singleton
})
export class OptimizedService {
  private data$ = new BehaviorSubject<any>(null);
  
  getData$(): Observable<any> {
    return this.data$.asObservable();
  }
  
  // Использование shareReplay для кеширования
  private cachedData$ = this.http.get('/api/data').pipe(
    shareReplay(1)
  );
}
```

## Инструменты для анализа производительности

### 1. **Angular DevTools**

Расширение для браузера для профилирования приложения.

### 2. **Chrome DevTools Performance**

Профилирование производительности в Chrome.

### 3. **Source Map Explorer**

Анализ размера бандла.

```bash
npm install -g source-map-explorer
source-map-explorer dist/app/main.*.js
```

### 4. **Webpack Bundle Analyzer**

Визуализация размера бандла.

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Чеклист оптимизации

### Загрузка:
- [ ] Lazy loading модулей
- [ ] Preloading strategy
- [ ] Оптимизация бандла
- [ ] AOT компиляция

### Рендеринг:
- [ ] OnPush change detection
- [ ] TrackBy в *ngFor
- [ ] Async pipe
- [ ] Virtual scrolling для больших списков

### Память:
- [ ] Правильное управление подписками
- [ ] Очистка ресурсов в ngOnDestroy
- [ ] Избегание утечек памяти

### Сеть:
- [ ] Кеширование HTTP запросов
- [ ] Оптимизация размера запросов
- [ ] Использование compression

## Заключение

Оптимизация производительности Angular приложения включает:

- **Lazy Loading** — уменьшение начального бандла
- **OnPush Strategy** — уменьшение проверок изменений
- **TrackBy** — оптимизация *ngFor
- **Async Pipe** — автоматическое управление подписками
- **Оптимизация бандла** — tree-shaking, минификация
- **Virtual Scrolling** — для больших списков
- **Кеширование** — HTTP запросов и данных
- **AOT компиляция** — для production

**Помните:** оптимизация производительности — это итеративный процесс. Начните с измерения текущей производительности, определите узкие места и применяйте соответствующие техники оптимизации. Не оптимизируйте преждевременно — сначала измерьте, затем оптимизируйте.

