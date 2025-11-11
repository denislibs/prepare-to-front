# Разница между `Object.freeze()` и `Object.seal()`?

`Object.freeze()` и `Object.seal()` — это методы в JavaScript, которые ограничивают изменения объектов, но делают это по-разному. Понимание различий между этими методами критически важно для создания неизменяемых (immutable) объектов и контроля над изменениями свойств объектов.

## Object.freeze()

`Object.freeze()` делает объект полностью неизменяемым. Замораживает объект, предотвращая добавление, удаление и изменение свойств.

### Характеристики:

- ✅ **Запрещает добавление** — новых свойств
- ✅ **Запрещает удаление** — существующих свойств
- ✅ **Запрещает изменение** — значений свойств
- ✅ **Запрещает изменение дескрипторов** — свойств
- ✅ **Поверхностное** — не замораживает вложенные объекты

### Примеры:

```javascript
const obj = {
  name: "John",
  age: 30
};

Object.freeze(obj);

// ❌ Нельзя добавить
obj.email = "john@example.com";
console.log(obj.email); // undefined

// ❌ Нельзя изменить
obj.name = "Jane";
console.log(obj.name); // "John" (не изменилось)

// ❌ Нельзя удалить
delete obj.age;
console.log(obj.age); // 30 (не удалилось)

// ✅ Можно проверить
console.log(Object.isFrozen(obj)); // true
```

## Object.seal()

`Object.seal()` запечатывает объект, предотвращая добавление и удаление свойств, но позволяет изменять значения существующих свойств.

### Характеристики:

- ✅ **Запрещает добавление** — новых свойств
- ✅ **Запрещает удаление** — существующих свойств
- ✅ **Разрешает изменение** — значений существующих свойств
- ✅ **Запрещает изменение конфигурации** — дескрипторов свойств
- ✅ **Поверхностное** — не запечатывает вложенные объекты

### Примеры:

```javascript
const obj = {
  name: "John",
  age: 30
};

Object.seal(obj);

// ❌ Нельзя добавить
obj.email = "john@example.com";
console.log(obj.email); // undefined

// ✅ Можно изменить
obj.name = "Jane";
console.log(obj.name); // "Jane" (изменилось!)

// ❌ Нельзя удалить
delete obj.age;
console.log(obj.age); // 30 (не удалилось)

// ✅ Можно проверить
console.log(Object.isSealed(obj)); // true
```

## Сравнительная таблица

| Операция | Обычный объект | Object.seal() | Object.freeze() |
|----------|----------------|--------------|-----------------|
| **Добавление свойств** | ✅ Да | ❌ Нет | ❌ Нет |
| **Удаление свойств** | ✅ Да | ❌ Нет | ❌ Нет |
| **Изменение значений** | ✅ Да | ✅ Да | ❌ Нет |
| **Изменение дескрипторов** | ✅ Да | ❌ Нет | ❌ Нет |

## Практические примеры

### Пример 1: Object.freeze()

```javascript
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

Object.freeze(config);

// ❌ Все изменения игнорируются
config.apiUrl = "https://other.com";
config.newProp = "value";
delete config.timeout;

console.log(config); // { apiUrl: "https://api.example.com", timeout: 5000 }
```

### Пример 2: Object.seal()

```javascript
const user = {
  name: "John",
  age: 30
};

Object.seal(user);

// ✅ Можно изменить значения
user.name = "Jane";
user.age = 25;

// ❌ Нельзя добавить или удалить
user.email = "jane@example.com";
delete user.age;

console.log(user); // { name: "Jane", age: 25 }
```

### Пример 3: Вложенные объекты

```javascript
const obj = {
  name: "John",
  address: {
    city: "New York",
    country: "USA"
  }
};

Object.freeze(obj);

// ❌ Нельзя изменить свойства первого уровня
obj.name = "Jane"; // Игнорируется

// ✅ Можно изменить вложенные объекты (не заморожены)
obj.address.city = "London"; // Работает!
console.log(obj.address.city); // "London"

// Для глубокой заморозки нужна рекурсия
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}
```

### Пример 4: Массивы

```javascript
const arr = [1, 2, 3];

Object.freeze(arr);

// ❌ Нельзя изменить элементы
arr[0] = 10;
console.log(arr); // [1, 2, 3] (не изменилось)

// ❌ Нельзя добавить
arr.push(4);
console.log(arr); // [1, 2, 3] (не добавилось)

// ❌ Нельзя удалить
arr.pop();
console.log(arr); // [1, 2, 3] (не удалилось)
```

## Проверка состояния

### Object.isFrozen():

```javascript
const obj = { name: "John" };
console.log(Object.isFrozen(obj)); // false

Object.freeze(obj);
console.log(Object.isFrozen(obj)); // true
```

### Object.isSealed():

```javascript
const obj = { name: "John" };
console.log(Object.isSealed(obj)); // false

Object.seal(obj);
console.log(Object.isSealed(obj)); // true
```

## Глубокая заморозка

### Рекурсивная функция:

```javascript
function deepFreeze(obj) {
  // Получаем имена свойств
  const propNames = Object.getOwnPropertyNames(obj);
  
  // Замораживаем сам объект
  Object.freeze(obj);
  
  // Рекурсивно замораживаем вложенные объекты
  propNames.forEach(name => {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  });
  
  return obj;
}

const obj = {
  name: "John",
  address: {
    city: "New York",
    country: "USA"
  }
};

deepFreeze(obj);

// Теперь вложенные объекты тоже заморожены
obj.address.city = "London"; // Игнорируется
console.log(obj.address.city); // "New York"
```

## Когда использовать что?

### ✅ Используйте Object.freeze() когда:

1. **Нужна полная неизменяемость** — константы, конфигурация
2. **Защита от изменений** — предотвращение случайных мутаций
3. **Иммутабельные данные** — в функциональном программировании

### ✅ Используйте Object.seal() когда:

1. **Нужно запретить добавление/удаление** — но разрешить изменение значений
2. **Фиксированная структура** — но изменяемые значения
3. **Частичная защита** — от структурных изменений

## Лучшие практики

### ✅ Делайте:

1. **Используйте для констант** — Object.freeze() для неизменяемых данных
2. **Используйте для защиты** — от случайных изменений
3. **Используйте глубокую заморозку** — для вложенных объектов
4. **Проверяйте состояние** — Object.isFrozen(), Object.isSealed()

### ❌ Не делайте:

1. **Не ожидайте глубокой заморозки** — по умолчанию только первый уровень
2. **Не используйте для производительности** — может замедлить код
3. **Не забывайте про вложенные объекты** — используйте рекурсию

## Заключение

Разница между `Object.freeze()` и `Object.seal()`:

- **Object.freeze()** — полная неизменяемость (нельзя добавить, удалить, изменить)
- **Object.seal()** — частичная защита (нельзя добавить, удалить, но можно изменить значения)
- **Поверхностное действие** — не применяется к вложенным объектам
- **Использование** — для защиты данных и создания констант

**Помните:** `Object.freeze()` делает объект полностью неизменяемым, а `Object.seal()` только предотвращает структурные изменения, но позволяет изменять значения. Используйте `Object.freeze()` для констант и неизменяемых данных, и `Object.seal()` когда нужна фиксированная структура, но изменяемые значения. Оба метода работают только на первом уровне, для вложенных объектов нужна рекурсия.

