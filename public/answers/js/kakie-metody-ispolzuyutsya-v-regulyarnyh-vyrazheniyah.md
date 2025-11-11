# Какие методы используются в регулярных выражениях?

В JavaScript существует несколько методов для работы с регулярными выражениями. Эти методы позволяют искать, заменять и извлекать данные из текста. Понимание методов регулярных выражений критически важно для эффективной работы с текстовыми данными.

## Методы регулярных выражений

### 1. **test()**

Проверяет, есть ли совпадение в строке. Возвращает `true` или `false`.

```javascript
const regex = /hello/;
regex.test("hello world"); // true
regex.test("hi there"); // false
```

### 2. **exec()**

Выполняет поиск совпадения и возвращает результат или `null`.

```javascript
const regex = /hello/;
regex.exec("hello world"); // ["hello", index: 0, input: "hello world"]
regex.exec("hi there"); // null
```

### 3. **match()** (метод строки)

Ищет совпадения в строке и возвращает массив результатов.

```javascript
"hello world".match(/hello/); // ["hello"]
"hello hello".match(/hello/g); // ["hello", "hello"]
```

### 4. **replace()** (метод строки)

Заменяет совпадения в строке.

```javascript
"hello world".replace(/hello/, "hi"); // "hi world"
"hello hello".replace(/hello/g, "hi"); // "hi hi"
```

### 5. **search()** (метод строки)

Ищет совпадение и возвращает индекс или `-1`.

```javascript
"hello world".search(/world/); // 6
"hello world".search(/notfound/); // -1
```

### 6. **split()** (метод строки)

Разделяет строку по паттерну.

```javascript
"a,b,c".split(/,/); // ["a", "b", "c"]
"hello world".split(/\s/); // ["hello", "world"]
```

## Практические примеры

### Пример 1: Валидация

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("test@example.com"); // true
```

### Пример 2: Поиск всех совпадений

```javascript
const text = "I have 5 apples and 10 oranges";
const numbers = text.match(/\d+/g); // ["5", "10"]
```

### Пример 3: Замена

```javascript
const text = "Hello World";
text.replace(/world/i, "JavaScript"); // "Hello JavaScript"
```

## Заключение

Методы регулярных выражений:

- **test()** — проверка совпадения (true/false)
- **exec()** — поиск совпадения (результат или null)
- **match()** — поиск в строке (массив результатов)
- **replace()** — замена совпадений
- **search()** — поиск индекса
- **split()** — разделение строки

**Помните:** методы регулярных выражений предоставляют мощные инструменты для работы с текстом. Используйте `test()` для проверки, `match()` для поиска, `replace()` для замены и `search()` для поиска индекса. Понимание методов критически важно для эффективной работы с регулярными выражениями.

