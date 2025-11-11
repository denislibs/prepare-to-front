# Методы массивов в JavaScript?

Массивы в JavaScript имеют множество встроенных методов для работы с данными. Понимание методов массивов критически важно для эффективной работы с коллекциями данных, трансформации, фильтрации и обработки массивов в JavaScript приложениях.

## Категории методов массивов

### Методы, изменяющие исходный массив (мутирующие)

### 1. **push() и pop()**

Добавление и удаление элементов с конца.

```javascript
const arr = [1, 2, 3];

arr.push(4); // [1, 2, 3, 4] - возвращает новую длину
arr.push(5, 6); // [1, 2, 3, 4, 5, 6]

arr.pop(); // [1, 2, 3, 4, 5] - возвращает удаленный элемент
```

### 2. **shift() и unshift()**

Удаление и добавление элементов с начала.

```javascript
const arr = [1, 2, 3];

arr.unshift(0); // [0, 1, 2, 3] - возвращает новую длину
arr.unshift(-1, -2); // [-1, -2, 0, 1, 2, 3]

arr.shift(); // [-2, 0, 1, 2, 3] - возвращает удаленный элемент
```

### 3. **splice()**

Удаление и вставка элементов.

```javascript
const arr = [1, 2, 3, 4, 5];

arr.splice(2, 1); // [1, 2, 4, 5] - удалить 1 элемент с индекса 2
arr.splice(1, 2, 10, 20); // [1, 10, 20, 5] - заменить 2 элемента
arr.splice(2, 0, 15); // [1, 10, 15, 20, 5] - вставить без удаления
```

### 4. **sort() и reverse()**

Сортировка и обращение порядка.

```javascript
const arr = [3, 1, 4, 1, 5];

arr.sort(); // [1, 1, 3, 4, 5] - лексикографическая сортировка
arr.sort((a, b) => a - b); // Числовая сортировка

arr.reverse(); // [5, 4, 3, 1, 1] - обращает порядок
```

### 5. **fill()**

Заполнение массива значением.

```javascript
const arr = new Array(5);
arr.fill(0); // [0, 0, 0, 0, 0]
arr.fill(1, 2, 4); // [0, 0, 1, 1, 0] - с индекса 2 до 4
```

## Методы, не изменяющие исходный массив (не-мутирующие)

### 6. **map()**

Преобразование каждого элемента.

```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]
const squared = numbers.map(n => n * n); // [1, 4, 9, 16]

// С индексом
const indexed = numbers.map((n, i) => `${i}: ${n}`);
// ["0: 1", "1: 2", "2: 3", "3: 4"]
```

### 7. **filter()**

Фильтрация элементов.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter(n => n % 2 === 0); // [2, 4, 6]
const odds = numbers.filter(n => n % 2 !== 0); // [1, 3, 5]
const greaterThan3 = numbers.filter(n => n > 3); // [4, 5, 6]
```

### 8. **reduce() и reduceRight()**

Аккумуляция значений.

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
const product = numbers.reduce((acc, n) => acc * n, 1); // 120
const max = numbers.reduce((acc, n) => Math.max(acc, n)); // 5

// reduceRight - справа налево
const reversed = numbers.reduceRight((acc, n) => [...acc, n], []);
// [5, 4, 3, 2, 1]
```

### 9. **forEach()**

Итерация по элементам.

```javascript
const numbers = [1, 2, 3];

numbers.forEach((n, i) => {
  console.log(`Index ${i}: ${n}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

### 10. **find() и findIndex()**

Поиск элемента.

```javascript
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" }
];

const user = users.find(u => u.id === 2); // { id: 2, name: "Jane" }
const index = users.findIndex(u => u.name === "Jane"); // 1
const notFound = users.find(u => u.id === 10); // undefined
```

### 11. **some() и every()**

Проверка условий.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.some(n => n > 3); // true (хотя бы один)
numbers.some(n => n > 10); // false

numbers.every(n => n > 0); // true (все)
numbers.every(n => n > 2); // false
```

### 12. **includes()**

Проверка наличия элемента.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.includes(3); // true
numbers.includes(10); // false
numbers.includes(2, 2); // false (поиск начиная с индекса 2)
```

### 13. **indexOf() и lastIndexOf()**

Поиск индекса элемента.

```javascript
const numbers = [1, 2, 3, 2, 1];

numbers.indexOf(2); // 1 (первое вхождение)
numbers.indexOf(2, 2); // 3 (поиск начиная с индекса 2)
numbers.indexOf(10); // -1 (не найдено)

numbers.lastIndexOf(2); // 3 (последнее вхождение)
```

### 14. **slice()**

Извлечение подмассива.

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.slice(1, 3); // [2, 3] (не изменяет исходный массив)
numbers.slice(2); // [3, 4, 5]
numbers.slice(-2); // [4, 5] (с конца)
numbers.slice(1, -1); // [2, 3, 4]
```

### 15. **concat()**

Объединение массивов.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

arr1.concat(arr2); // [1, 2, 3, 4]
arr1.concat(arr2, [5, 6]); // [1, 2, 3, 4, 5, 6]
// arr1 не изменяется
```

### 16. **join()**

Объединение элементов в строку.

```javascript
const arr = ["Hello", "World"];

arr.join(); // "Hello,World"
arr.join(" "); // "Hello World"
arr.join("-"); // "Hello-World"
arr.join(""); // "HelloWorld"
```

### 17. **flat() и flatMap()**

Выравнивание вложенных массивов.

```javascript
const arr = [1, [2, 3], [4, [5, 6]]];

arr.flat(); // [1, 2, 3, 4, [5, 6]]
arr.flat(2); // [1, 2, 3, 4, 5, 6]
arr.flat(Infinity); // [1, 2, 3, 4, 5, 6]

// flatMap = map + flat
const arr2 = [1, 2, 3];
arr2.flatMap(n => [n, n * 2]); // [1, 2, 2, 4, 3, 6]
```

## Цепочка методов

Методы можно объединять в цепочки:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(n => n % 2 === 0) // [2, 4, 6, 8, 10]
  .map(n => n * n) // [4, 16, 36, 64, 100]
  .reduce((acc, n) => acc + n, 0); // 220

console.log(result); // 220
```

## Практические примеры

### Пример 1: Обработка данных пользователей

```javascript
const users = [
  { id: 1, name: "John", age: 25, active: true },
  { id: 2, name: "Jane", age: 30, active: false },
  { id: 3, name: "Bob", age: 35, active: true }
];

// Активные пользователи старше 28
const result = users
  .filter(u => u.active && u.age > 28)
  .map(u => u.name);

console.log(result); // ["Bob"]
```

### Пример 2: Группировка данных

```javascript
const items = [
  { category: "fruit", name: "apple" },
  { category: "fruit", name: "banana" },
  { category: "vegetable", name: "carrot" }
];

const grouped = items.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item.name);
  return acc;
}, {});

console.log(grouped);
// { fruit: ["apple", "banana"], vegetable: ["carrot"] }
```

### Пример 3: Удаление дубликатов

```javascript
const numbers = [1, 2, 2, 3, 3, 3, 4];

// Способ 1: Set
const unique1 = [...new Set(numbers)]; // [1, 2, 3, 4]

// Способ 2: filter + indexOf
const unique2 = numbers.filter((n, i) => numbers.indexOf(n) === i);

// Способ 3: reduce
const unique3 = numbers.reduce((acc, n) => {
  if (!acc.includes(n)) {
    acc.push(n);
  }
  return acc;
}, []);
```

### Пример 4: Трансформация данных

```javascript
const data = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 }
];

// Преобразование в формат { x: [1, 3, 5], y: [2, 4, 6] }
const transformed = data.reduce((acc, point) => {
  acc.x.push(point.x);
  acc.y.push(point.y);
  return acc;
}, { x: [], y: [] });
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте не-мутирующие методы** — `map()`, `filter()`, `reduce()`
2. **Используйте цепочки методов** — для читаемости
3. **Используйте `find()`** — вместо `filter()[0]`
4. **Используйте `some()`/`every()`** — для проверок

### ❌ Не делайте:

1. **Не мутируйте массивы** — в функциях без необходимости
2. **Не используйте `forEach()`** — когда нужен результат
3. **Не забывайте про производительность** — для больших массивов

## Заключение

Методы массивов в JavaScript:

- **Множество методов** — для различных операций
- **Мутирующие и не-мутирующие** — важно понимать разницу
- **Цепочка методов** — для создания читаемого кода
- **Функциональный подход** — `map()`, `filter()`, `reduce()`

**Помните:** методы массивов предоставляют мощные инструменты для работы с данными. Используйте не-мутирующие методы для создания чистого кода, объединяйте методы в цепочки для читаемости и выбирайте правильный метод для каждой задачи.

