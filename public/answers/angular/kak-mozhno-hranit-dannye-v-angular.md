# Как можно хранить данные в Angular?

Хранение данных в Angular приложении — это фундаментальный аспект разработки. Angular предоставляет множество способов хранения данных, каждый из которых подходит для разных сценариев. Понимание различных подходов к хранению данных и умение выбрать правильный способ критически важно для создания эффективных и масштабируемых приложений.

## Способы хранения данных в Angular

### 1. **Свойства компонента (Component Properties)**

Самый простой способ — хранить данные как свойства компонента. Подходит для локальных данных компонента.

```typescript
@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>Счетчик: {{ count }}</p>
    </div>
  `
})
export class UserComponent {
  // Простые данные
  count = 0;
  isActive = true;
  
  // Объекты
  user = {
    name: 'Иван',
    email: 'ivan@example.com'
  };
  
  // Массивы
  items: string[] = ['Элемент 1', 'Элемент 2'];
  
  increment() {
    this.count++;
  }
}
```

**Характеристики:**
- ✅ Простота использования
- ✅ Локальная область видимости
- ❌ Не сохраняется при перезагрузке
- ❌ Не доступно другим компонентам

### 2. **Сервисы (Services)**

Сервисы — основной способ хранения и управления данными в Angular. Данные хранятся в сервисе и могут быть доступны множеству компонентов.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Singleton сервис
})
export class DataService {
  // Простые данные
  private data: any = {};
  
  // Реактивные данные с BehaviorSubject
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();
  
  // Приватные данные
  private currentUser: User | null = null;
  
  // Методы для работы с данными
  setData(key: string, value: any) {
    this.data[key] = value;
  }
  
  getData(key: string) {
    return this.data[key];
  }
  
  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }
  
  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
  
  setCurrentUser(user: User) {
    this.currentUser = user;
  }
  
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
```

**Использование в компоненте:**
```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users$ = this.dataService.users$;
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.dataService.setUsers([
      { id: 1, name: 'Иван', email: 'ivan@example.com' },
      { id: 2, name: 'Мария', email: 'maria@example.com' }
    ]);
  }
}
```

**Характеристики:**
- ✅ Доступно множеству компонентов
- ✅ Централизованное управление
- ✅ Можно использовать DI
- ❌ Не сохраняется при перезагрузке (если не использовать localStorage)

### 3. **BehaviorSubject и Observable**

Использование RxJS для реактивного хранения данных.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // BehaviorSubject хранит текущее значение
  private stateSubject = new BehaviorSubject<AppState>({
    users: [],
    loading: false,
    error: null
  });
  
  // Observable для подписки
  public state$: Observable<AppState> = this.stateSubject.asObservable();
  
  // Геттер для текущего значения
  get currentState(): AppState {
    return this.stateSubject.value;
  }
  
  // Методы для обновления состояния
  updateUsers(users: User[]) {
    this.stateSubject.next({
      ...this.currentState,
      users
    });
  }
  
  setLoading(loading: boolean) {
    this.stateSubject.next({
      ...this.currentState,
      loading
    });
  }
  
  setError(error: string | null) {
    this.stateSubject.next({
      ...this.currentState,
      error
    });
  }
}
```

**Использование:**
```typescript
@Component({
  selector: 'app-app',
  template: `
    <div *ngIf="state$ | async as state">
      <div *ngIf="state.loading">Загрузка...</div>
      <div *ngIf="state.error">{{ state.error }}</div>
      <div *ngFor="let user of state.users">
        {{ user.name }}
      </div>
    </div>
  `
})
export class AppComponent {
  state$ = this.stateService.state$;
  
  constructor(private stateService: StateService) {}
}
```

### 4. **LocalStorage и SessionStorage**

Хранение данных в браузере для сохранения между сессиями.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // LocalStorage - сохраняется после закрытия браузера
  setLocalItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  getLocalItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  removeLocalItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  clearLocalStorage(): void {
    localStorage.clear();
  }
  
  // SessionStorage - сохраняется только на время сессии
  setSessionItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  getSessionItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
```

**Использование:**
```typescript
@Component({
  selector: 'app-settings',
  template: `
    <input [(ngModel)]="theme" (change)="saveTheme()">
  `
})
export class SettingsComponent implements OnInit {
  theme = 'light';
  
  constructor(private storageService: StorageService) {}
  
  ngOnInit() {
    // Загрузка из localStorage
    const savedTheme = this.storageService.getLocalItem<string>('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    }
  }
  
  saveTheme() {
    // Сохранение в localStorage
    this.storageService.setLocalItem('theme', this.theme);
  }
}
```

**Характеристики:**
- ✅ Сохраняется между сессиями (localStorage)
- ✅ Простота использования
- ⚠️ Ограниченный размер (~5-10MB)
- ⚠️ Только строки (нужна сериализация)

### 5. **NgRx Store**

Централизованное управление состоянием для больших приложений.

```typescript
// actions/user.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
);

// reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  }))
);

// selectors/user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);
```

**Использование:**
```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
  
  addUser(user: User) {
    this.store.dispatch(addUser({ user }));
  }
}
```

### 6. **IndexedDB**

Для хранения больших объемов данных в браузере.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'MyAppDB';
  private dbVersion = 1;
  private db!: IDBDatabase;
  
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'id' });
        }
      };
    });
  }
  
  async addUser(user: User): Promise<void> {
    const transaction = this.db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    return store.add(user);
  }
  
  async getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
```

### 7. **Cookies**

Для небольших данных, которые отправляются с каждым запросом.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookie(name: string, value: string, days: number = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}
```

## Сравнительная таблица

| Способ | Область видимости | Сохранение | Размер | Сложность | Использование |
|--------|-------------------|------------|--------|-----------|---------------|
| **Свойства компонента** | Компонент | Нет | Неограничен | Низкая | Локальные данные |
| **Сервисы** | Приложение | Нет* | Неограничен | Средняя | Общие данные |
| **BehaviorSubject** | Приложение | Нет* | Неограничен | Средняя | Реактивные данные |
| **LocalStorage** | Браузер | Да | ~5-10MB | Низкая | Постоянные данные |
| **SessionStorage** | Сессия | Сессия | ~5-10MB | Низкая | Временные данные |
| **NgRx Store** | Приложение | Нет* | Неограничен | Высокая | Большие приложения |
| **IndexedDB** | Браузер | Да | Большой | Высокая | Большие объемы |
| **Cookies** | Браузер | Да | ~4KB | Низкая | Маленькие данные |

*Можно комбинировать с localStorage для сохранения

## Рекомендации по выбору

### Для локальных данных компонента:
```typescript
// Используйте свойства компонента
export class Component {
  localData = 'данные';
}
```

### Для общих данных приложения:
```typescript
// Используйте сервисы с BehaviorSubject
@Injectable({ providedIn: 'root' })
export class DataService {
  private data$ = new BehaviorSubject<any>(null);
}
```

### Для постоянного хранения:
```typescript
// Используйте localStorage
localStorage.setItem('key', JSON.stringify(data));
```

### Для больших приложений:
```typescript
// Используйте NgRx Store
this.store.dispatch(loadData());
```

## Заключение

Способы хранения данных в Angular:

- **Свойства компонента** — для локальных данных
- **Сервисы** — для общих данных приложения
- **BehaviorSubject/Observable** — для реактивных данных
- **LocalStorage/SessionStorage** — для постоянного хранения
- **NgRx Store** — для больших приложений
- **IndexedDB** — для больших объемов данных
- **Cookies** — для маленьких данных

**Помните:** выбор способа хранения данных зависит от требований приложения. Используйте простые решения для простых задач и более сложные (NgRx) для больших приложений с сложной логикой управления состоянием.

