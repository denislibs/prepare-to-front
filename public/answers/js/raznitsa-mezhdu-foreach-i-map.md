# Разница между `.forEach()` и `.map()`?

`.forEach()` и `.map()` — это два популярных метода массивов в JavaScript, которые часто путают. Хотя они похожи, они имеют важные различия в назначении, возвращаемых значениях и использовании. Понимание различий критически важно для выбора правильного метода в каждой ситуации.

## .forEach()

`.forEach()` — это метод для итерации по массиву и выполнения действия для каждого элемента. Он не возвращает новый массив.

### Характеристики:

- ✅ **Итерация** — выполняет функцию для каждого элемента
- ❌ **Не возвращает значение** — возвращает `undefined`
- ✅ **Мутация возможна** — может изменять исходный массив
- ✅ **Для побочных эффектов** — логирование, обновление DOM, изменение переменных

### Синтаксис:

```javascript
array.forEach((element, index, array) => {
  // код для выполнения
});
```

### Примеры:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Простая итерация
numbers.forEach(num => {
  console.log(num);
});
// 1
// 2
// 3
// 4
// 5

// С индексом
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// Мутация исходного массива
const doubled = [];
numbers.forEach(num => {
  doubled.push(num * 2);
});
console.log(doubled); // [2, 4, 6, 8, 10]

// Возвращаемое значение
const result = numbers.forEach(num => num * 2);
console.log(result); // undefined
```

## .map()

`.map()` — это метод для преобразования каждого элемента массива и создания нового массива с результатами.

### Характеристики:

- ✅ **Трансформация** — преобразует каждый элемент
- ✅ **Возвращает новый массив** — с результатами преобразования
- ✅ **Не изменяет исходный массив** — создает новый
- ✅ **Для преобразования данных** — создание новых структур данных

### Синтаксис:

```javascript
const newArray = array.map((element, index, array) => {
  // возврат преобразованного элемента
  return transformedElement;
});
```

### Примеры:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Преобразование в новый массив
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] (не изменен)

// Преобразование объектов
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ["John", "Jane"]

// С индексом
const indexed = numbers.map((num, index) => `${index}: ${num}`);
console.log(indexed); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]
```

## Ключевые различия

### 1. **Возвращаемое значение**

```javascript
const numbers = [1, 2, 3];

// forEach - возвращает undefined
const forEachResult = numbers.forEach(n => n * 2);
console.log(forEachResult); // undefined

// map - возвращает новый массив
const mapResult = numbers.map(n => n * 2);
console.log(mapResult); // [2, 4, 6]
```

### 2. **Изменение исходного массива**

```javascript
const numbers = [1, 2, 3];

// forEach - может изменять исходный массив
numbers.forEach((num, index) => {
  numbers[index] = num * 2; // Мутация
});
console.log(numbers); // [2, 4, 6] (изменен)

// map - не изменяет исходный массив
const numbers2 = [1, 2, 3];
const doubled = numbers2.map(num => num * 2);
console.log(numbers2); // [1, 2, 3] (не изменен)
console.log(doubled); // [2, 4, 6]
```

### 3. **Цепочка методов**

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - можно использовать в цепочке
const result = numbers
  .map(n => n * 2) // [2, 4, 6, 8, 10]
  .filter(n => n > 5) // [6, 8, 10]
  .reduce((sum, n) => sum + n, 0); // 24

// forEach - нельзя использовать в цепочке
numbers.forEach(n => n * 2).filter(...); // TypeError
```

## Когда использовать что?

### ✅ Используйте `.forEach()` когда:

1. **Нужно выполнить действие** — для каждого элемента без создания нового массива
2. **Побочные эффекты** — логирование, обновление DOM, изменение внешних переменных
3. **Не нужен результат** — только выполнение кода

```javascript
// Логирование
users.forEach(user => {
  console.log(`User: ${user.name}`);
});

// Обновление DOM
items.forEach(item => {
  const element = document.createElement('div');
  element.textContent = item.name;
  container.appendChild(element);
});

// Изменение внешних переменных
let total = 0;
prices.forEach(price => {
  total += price;
});
```

### ✅ Используйте `.map()` когда:

1. **Нужно преобразовать данные** — создать новый массив с преобразованными элементами
2. **Нужен результат** — новый массив для дальнейшей обработки
3. **Цепочка методов** — для комбинирования с другими методами
4. **Функциональный стиль** — создание новых данных вместо мутации

```javascript
// Преобразование данных
const doubled = numbers.map(n => n * 2);

// Извлечение свойств
const names = users.map(user => user.name);

// Создание новых объектов
const formatted = users.map(user => ({
  id: user.id,
  displayName: `${user.firstName} ${user.lastName}`
}));

// Цепочка методов
const result = numbers
  .map(n => n * 2)
  .filter(n => n > 5)
  .reduce((sum, n) => sum + n, 0);
```

## Практические примеры

### Пример 1: forEach для побочных эффектов

```javascript
// ✅ forEach - для побочных эффектов
const users = [
  { name: "John", email: "john@example.com" },
  { name: "Jane", email: "jane@example.com" }
];

users.forEach(user => {
  sendEmail(user.email, `Hello, ${user.name}!`);
  logActivity(`Email sent to ${user.name}`);
});
```

### Пример 2: map для преобразования

```javascript
// ✅ map - для преобразования данных
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 }
];

const prices = products.map(product => product.price);
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 1500
```

### Пример 3: Неправильное использование

```javascript
// ❌ Неправильно - forEach для создания массива
const numbers = [1, 2, 3];
const doubled = [];
numbers.forEach(n => {
  doubled.push(n * 2);
});

// ✅ Правильно - map для создания массива
const doubled = numbers.map(n => n * 2);

// ❌ Неправильно - map для побочных эффектов
numbers.map(n => {
  console.log(n); // map создает массив с undefined
});

// ✅ Правильно - forEach для побочных эффектов
numbers.forEach(n => {
  console.log(n);
});
```

## Производительность

В большинстве случаев производительность схожа, но есть нюансы:

```javascript
// forEach - немного быстрее для простой итерации
const numbers = [1, 2, 3, 4, 5];

// forEach - не создает новый массив
numbers.forEach(n => console.log(n));

// map - создает новый массив (дополнительная память)
numbers.map(n => console.log(n)); // Неправильное использование
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте map** — когда нужен новый массив
2. **Используйте forEach** — для побочных эффектов
3. **Избегайте мутаций** — в map используйте возврат новых значений
4. **Используйте цепочки** — с map для функционального стиля

### ❌ Не делайте:

1. **Не используйте forEach** — для создания массивов (используйте map)
2. **Не используйте map** — для побочных эффектов (используйте forEach)
3. **Не мутируйте** — исходный массив в map

## Заключение

Разница между `.forEach()` и `.map()`:

- **forEach** — для итерации и побочных эффектов, возвращает `undefined`
- **map** — для преобразования данных, возвращает новый массив
- **Выбор зависит от задачи** — нужен ли новый массив или только действие
- **Цепочка методов** — map можно использовать в цепочке, forEach нет

**Помните:** используйте `.map()` когда нужно преобразовать данные и получить новый массив, и `.forEach()` когда нужно выполнить действие для каждого элемента без создания нового массива. Правильный выбор метода делает код более читаемым и эффективным.

