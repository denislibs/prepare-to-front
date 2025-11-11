# Методы строк в JavaScript?

Строки в JavaScript имеют множество встроенных методов для работы с текстовыми данными. Понимание методов строк критически важно для эффективной работы с текстом, валидации, форматирования и обработки данных в JavaScript приложениях.

## Основные методы строк

### 1. **charAt() и charCodeAt()**

Получение символа по индексу и его кода.

```javascript
const str = "Hello";

str.charAt(0); // "H"
str.charAt(10); // "" (пустая строка, если индекс вне диапазона)

str.charCodeAt(0); // 72 (код символа 'H')
str.charCodeAt(1); // 101 (код символа 'e')
```

### 2. **concat()**

Объединение строк.

```javascript
const str1 = "Hello";
const str2 = "World";

str1.concat(" ", str2); // "Hello World"
str1.concat(", ", str2, "!"); // "Hello, World!"

// Обычно используется оператор +
"Hello" + " " + "World"; // "Hello World"
```

### 3. **indexOf() и lastIndexOf()**

Поиск подстроки в строке.

```javascript
const str = "Hello World";

str.indexOf("o"); // 4 (первое вхождение)
str.indexOf("o", 5); // 7 (поиск начиная с индекса 5)
str.indexOf("x"); // -1 (не найдено)

str.lastIndexOf("o"); // 7 (последнее вхождение)
str.lastIndexOf("o", 6); // 4 (поиск до индекса 6)
```

### 4. **includes()**

Проверка наличия подстроки.

```javascript
const str = "Hello World";

str.includes("World"); // true
str.includes("world"); // false (регистр важен)
str.includes("Hello", 1); // false (поиск начиная с индекса 1)
```

### 5. **startsWith() и endsWith()**

Проверка начала и конца строки.

```javascript
const str = "Hello World";

str.startsWith("Hello"); // true
str.startsWith("World"); // false
str.startsWith("World", 6); // true (начиная с индекса 6)

str.endsWith("World"); // true
str.endsWith("Hello"); // false
str.endsWith("Hello", 5); // true (первые 5 символов)
```

### 6. **slice(), substring(), substr()**

Извлечение подстроки.

```javascript
const str = "Hello World";

// slice(start, end) - рекомендуется
str.slice(0, 5); // "Hello"
str.slice(6); // "World"
str.slice(-5); // "World" (с конца)
str.slice(0, -6); // "Hello"

// substring(start, end)
str.substring(0, 5); // "Hello"
str.substring(6); // "World"
// Отрицательные индексы трактуются как 0

// substr(start, length) - устаревший
str.substr(0, 5); // "Hello"
str.substr(6, 5); // "World"
```

### 7. **split()**

Разделение строки на массив.

```javascript
const str = "apple,banana,orange";

str.split(","); // ["apple", "banana", "orange"]
str.split(",", 2); // ["apple", "banana"] (ограничение количества)
str.split(""); // ["a", "p", "p", "l", "e", ",", ...]

"Hello World".split(" "); // ["Hello", "World"]
"Hello".split(""); // ["H", "e", "l", "l", "o"]
```

### 8. **toLowerCase() и toUpperCase()**

Изменение регистра.

```javascript
const str = "Hello World";

str.toLowerCase(); // "hello world"
str.toUpperCase(); // "HELLO WORLD"

// Локаль-зависимое преобразование
"İ".toLowerCase(); // "i"
"i".toLocaleUpperCase("tr-TR"); // "İ"
```

### 9. **trim(), trimStart(), trimEnd()**

Удаление пробелов.

```javascript
const str = "  Hello World  ";

str.trim(); // "Hello World" (с обеих сторон)
str.trimStart(); // "Hello World  " (с начала)
str.trimEnd(); // "  Hello World" (с конца)
```

### 10. **replace() и replaceAll()**

Замена подстроки.

```javascript
const str = "Hello World World";

str.replace("World", "Universe"); // "Hello Universe World" (только первое)
str.replace(/World/g, "Universe"); // "Hello Universe Universe" (все с regex)
str.replaceAll("World", "Universe"); // "Hello Universe Universe" (все)

// С функцией замены
"Hello 123".replace(/\d+/g, (match) => {
  return parseInt(match) * 2;
}); // "Hello 246"
```

### 11. **repeat()**

Повторение строки.

```javascript
"Hello".repeat(3); // "HelloHelloHello"
"Hi ".repeat(2); // "Hi Hi "
"x".repeat(0); // ""
```

### 12. **padStart() и padEnd()**

Дополнение строки.

```javascript
"5".padStart(3, "0"); // "005"
"5".padStart(3); // "  5" (пробелы по умолчанию)

"5".padEnd(3, "0"); // "500"
"5".padEnd(3); // "5  "

"Hello".padStart(10, "-"); // "-----Hello"
```

### 13. **match(), matchAll()**

Поиск совпадений с регулярным выражением.

```javascript
const str = "Hello 123 World 456";

str.match(/\d+/); // ["123"] (первое совпадение)
str.match(/\d+/g); // ["123", "456"] (все совпадения)

// matchAll (возвращает итератор)
[...str.matchAll(/\d+/g)]; // [["123"], ["456"]]
```

### 14. **search()**

Поиск индекса совпадения.

```javascript
const str = "Hello World";

str.search("World"); // 6
str.search(/world/i); // 6 (без учета регистра)
str.search("x"); // -1 (не найдено)
```

### 15. **localeCompare()**

Сравнение строк с учетом локали.

```javascript
"a".localeCompare("b"); // -1 (a < b)
"b".localeCompare("a"); // 1 (b > a)
"a".localeCompare("a"); // 0 (равны)

// С локалью
"ä".localeCompare("z", "de"); // -1
"ä".localeCompare("z", "sv"); // 1
```

## Практические примеры

### Пример 1: Валидация email

```javascript
function isValidEmail(email) {
  return email.includes("@") && 
         email.includes(".") && 
         email.indexOf("@") < email.lastIndexOf(".");
}

console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid")); // false
```

### Пример 2: Форматирование текста

```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalize("hello")); // "Hello"
console.log(capitalize("WORLD")); // "World"
```

### Пример 3: Извлечение домена

```javascript
function getDomain(email) {
  return email.split("@")[1];
}

console.log(getDomain("user@example.com")); // "example.com"
```

### Пример 4: Обрезка текста

```javascript
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

console.log(truncate("Hello World", 8)); // "Hello..."
```

### Пример 5: Удаление HTML тегов

```javascript
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}

console.log(stripHtml("<p>Hello <b>World</b></p>")); // "Hello World"
```

### Пример 6: Форматирование чисел

```javascript
function formatNumber(num) {
  return num.toString().padStart(6, "0");
}

console.log(formatNumber(123)); // "000123"
```

### Пример 7: Разбор URL параметров

```javascript
function parseQueryString(queryString) {
  const params = {};
  queryString.slice(1).split("&").forEach(param => {
    const [key, value] = param.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
}

console.log(parseQueryString("?name=John&age=30"));
// { name: "John", age: "30" }
```

## Цепочка методов

Методы строк можно объединять в цепочки:

```javascript
const str = "  Hello World  ";

str.trim().toLowerCase().replace("world", "Universe");
// "hello universe"

"Hello World"
  .toLowerCase()
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
// "Hello World"
```

## Неизменяемость строк

Строки в JavaScript неизменяемы (immutable). Методы возвращают новые строки:

```javascript
const str = "Hello";
str.toUpperCase(); // "HELLO"
console.log(str); // "Hello" (не изменилась)

// Нужно присваивать
const upper = str.toUpperCase();
console.log(upper); // "HELLO"
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте современные методы** — `includes()` вместо `indexOf() !== -1`
2. **Используйте `slice()`** — вместо `substring()` и `substr()`
3. **Используйте `trim()`** — для очистки пользовательского ввода
4. **Используйте `replaceAll()`** — для замены всех вхождений

### ❌ Не делайте:

1. **Не используйте `substr()`** — устаревший метод
2. **Не забывайте про регистр** — используйте `toLowerCase()` для сравнений
3. **Не изменяйте строки напрямую** — они неизменяемы

## Заключение

Методы строк в JavaScript:

- **Множество методов** — для работы с текстом
- **Неизменяемость** — методы возвращают новые строки
- **Цепочка методов** — можно объединять в цепочки
- **Регулярные выражения** — для сложных операций

**Помните:** методы строк предоставляют мощные инструменты для работы с текстом. Используйте современные методы (`includes()`, `startsWith()`, `endsWith()`), помните о неизменяемости строк и используйте цепочки методов для создания читаемого кода.

