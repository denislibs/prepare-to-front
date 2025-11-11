# Разница между `Object` и `Map`?

`Object` и `Map` — это две структуры данных в JavaScript для хранения пар ключ-значение. Хотя они похожи, между ними есть важные различия, которые критически важны для понимания при выборе правильной структуры данных.

## Основные различия

### 1. **Типы ключей**

**Object:**
- Ключи могут быть только строками или символами
- Другие типы автоматически преобразуются в строки

**Map:**
- Ключи могут быть любого типа (объекты, функции, примитивы)
- Сохраняют оригинальный тип ключа

```javascript
// Object - ключи преобразуются в строки
const obj = {};
obj[1] = "one";
obj["1"] = "one string";
console.log(obj); // { "1": "one string" } (первое значение перезаписано)

// Map - ключи сохраняют тип
const map = new Map();
map.set(1, "one");
map.set("1", "one string");
console.log(map.get(1)); // "one"
console.log(map.get("1")); // "one string"
```

### 2. **Размер**

**Object:**
- Нет встроенного свойства для размера
- Нужно вычислять вручную (`Object.keys(obj).length`)

**Map:**
- Есть свойство `size` для получения размера

```javascript
// Object
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj).length); // 2

// Map
const map = new Map([["a", 1], ["b", 2]]);
console.log(map.size); // 2
```

### 3. **Итерация**

**Object:**
- Не гарантирует порядок ключей (хотя в современных движках порядок сохраняется)
- Нужно использовать `Object.keys()`, `Object.values()`, `Object.entries()`

**Map:**
- Гарантирует порядок вставки
- Итерируемый по умолчанию

```javascript
// Object
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]);
}

// Map
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const [key, value] of map) {
  console.log(key, value);
}
```

### 4. **Прототип**

**Object:**
- Имеет прототип с наследованными свойствами
- Может иметь конфликты с ключами из прототипа

**Map:**
- Не имеет прототипа
- Нет конфликтов с наследованными свойствами

```javascript
// Object - может иметь конфликты
const obj = {};
console.log(obj.toString); // [Function: toString] (из прототипа)

// Map - нет конфликтов
const map = new Map();
map.set("toString", "custom");
console.log(map.get("toString")); // "custom"
```

### 5. **Производительность**

**Object:**
- Оптимизирован для частых добавлений/удалений
- Быстрее для небольших коллекций

**Map:**
- Оптимизирован для частых операций добавления/удаления
- Лучше для больших коллекций

```javascript
// Object - быстрее для небольших данных
const obj = {};
obj.key = "value";
delete obj.key;

// Map - лучше для частых операций
const map = new Map();
map.set("key", "value");
map.delete("key");
```

## Практические примеры

### Пример 1: Разные типы ключей

```javascript
// Object - ключи преобразуются
const obj = {};
const key1 = { id: 1 };
const key2 = { id: 2 };
obj[key1] = "value1";
obj[key2] = "value2";
console.log(obj); // { "[object Object]": "value2" } (оба ключа стали "[object Object]")

// Map - ключи сохраняют тип
const map = new Map();
const key3 = { id: 1 };
const key4 = { id: 2 };
map.set(key3, "value1");
map.set(key4, "value2");
console.log(map.get(key3)); // "value1"
console.log(map.get(key4)); // "value2"
```

### Пример 2: Размер коллекции

```javascript
// Object - нужно вычислять
const obj = { a: 1, b: 2, c: 3 };
const size = Object.keys(obj).length; // 3

// Map - есть свойство size
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
const size2 = map.size; // 3
```

### Пример 3: Итерация

```javascript
// Object
const obj = { a: 1, b: 2, c: 3 };
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// Map - итерируемый по умолчанию
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
map.forEach((value, key) => {
  console.log(key, value);
});
```

### Пример 4: Прототип

```javascript
// Object - конфликт с прототипом
const obj = {};
obj.constructor = "custom";
console.log(obj.constructor); // "custom" (перезаписан)

// Map - нет конфликтов
const map = new Map();
map.set("constructor", "custom");
console.log(map.get("constructor")); // "custom"
```

## Когда использовать Object

### ✅ Используйте Object когда:

1. **Структурированные данные** — когда знаете структуру заранее
2. **JSON сериализация** — нужна сериализация в JSON
3. **Небольшие коллекции** — для небольших объемов данных
4. **Статические ключи** — когда ключи известны заранее

```javascript
// Хороший случай для Object
const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};
```

## Когда использовать Map

### ✅ Используйте Map когда:

1. **Динамические ключи** — ключи добавляются/удаляются часто
2. **Любые типы ключей** — нужны объекты или функции как ключи
3. **Большие коллекции** — для больших объемов данных
4. **Частые операции** — частые добавления/удаления

```javascript
// Хороший случай для Map
const cache = new Map();
const key = { id: 1 };
cache.set(key, "cached value");
```

## Сравнение методов

### Object методы:

```javascript
const obj = { a: 1, b: 2 };

// Получение
obj.a; // 1
obj["a"]; // 1

// Установка
obj.c = 3;

// Удаление
delete obj.a;

// Проверка наличия
"a" in obj; // true
obj.hasOwnProperty("a"); // true
```

### Map методы:

```javascript
const map = new Map([["a", 1], ["b", 2]]);

// Получение
map.get("a"); // 1

// Установка
map.set("c", 3);

// Удаление
map.delete("a");

// Проверка наличия
map.has("a"); // false

// Размер
map.size; // 2

// Очистка
map.clear();
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте Object** — для структурированных данных
2. **Используйте Map** — для динамических коллекций
3. **Учитывайте типы ключей** — Map для любых типов
4. **Учитывайте производительность** — для больших данных

### ❌ Не делайте:

1. **Не используйте Object** — когда нужны объекты как ключи
2. **Не используйте Map** — когда нужна JSON сериализация
3. **Не смешивайте** — будьте последовательны

## Заключение

Разница между Object и Map:

- **Типы ключей** — Object только строки, Map любые типы
- **Размер** — Object нужно вычислять, Map имеет size
- **Итерация** — Object через методы, Map итерируемый
- **Прототип** — Object имеет прототип, Map нет
- **Производительность** — Object для небольших данных, Map для больших

**Помните:** Object лучше для структурированных данных и JSON, Map лучше для динамических коллекций и любых типов ключей. Выбор зависит от конкретных требований и использования. Понимание различий критически важно для эффективной работы с данными в JavaScript.

