# Что такое регулярное выражение (Regular Expression)?

Регулярное выражение (Regular Expression, RegExp) — это паттерн, используемый для поиска и замены текста. Регулярные выражения — это мощный инструмент для работы с текстовыми данными, валидации, поиска и извлечения информации. Понимание регулярных выражений критически важно для эффективной работы с текстом в JavaScript.

## Что такое регулярное выражение?

Регулярное выражение — это последовательность символов, которая определяет паттерн поиска в тексте.

### Характеристики:

- ✅ **Паттерн поиска** — описание того, что искать
- ✅ **Мощный инструмент** — для работы с текстом
- ✅ **Гибкость** — сложные паттерны поиска
- ⚠️ **Сложность** — может быть сложно читать

## Создание регулярных выражений

### Литерал:

```javascript
const regex = /pattern/;
const regexWithFlags = /pattern/gi;
```

### Конструктор:

```javascript
const regex = new RegExp("pattern");
const regexWithFlags = new RegExp("pattern", "gi");
```

## Основные символы

### Специальные символы:

```javascript
// . - любой символ
/./.test("a"); // true

// ^ - начало строки
/^start/.test("start here"); // true

// $ - конец строки
/end$/.test("this is end"); // true

// * - ноль или более
/a*/.test(""); // true
/a*/.test("aaa"); // true

// + - один или более
/a+/.test("a"); // true
/a+/.test(""); // false

// ? - ноль или один
/a?/.test(""); // true
/a?/.test("a"); // true

// [] - набор символов
/[abc]/.test("a"); // true
/[0-9]/.test("5"); // true

// {} - количество
/a{3}/.test("aaa"); // true
/a{2,4}/.test("aaa"); // true

// | - или
/a|b/.test("a"); // true
/a|b/.test("b"); // true

// () - группа
/(ab)+/.test("abab"); // true
```

## Флаги

### i - игнорировать регистр:

```javascript
/hello/i.test("Hello"); // true
```

### g - глобальный поиск:

```javascript
"hello hello".match(/hello/g); // ["hello", "hello"]
```

### m - многострочный:

```javascript
/^start/m.test("line1\nstart"); // true
```

## Методы работы с регулярными выражениями

### test():

```javascript
const regex = /hello/;
regex.test("hello world"); // true
```

### exec():

```javascript
const regex = /hello/;
regex.exec("hello world"); // ["hello"]
```

### match():

```javascript
"hello world".match(/hello/); // ["hello"]
```

### replace():

```javascript
"hello world".replace(/hello/, "hi"); // "hi world"
```

### search():

```javascript
"hello world".search(/world/); // 6 (индекс)
```

### split():

```javascript
"a,b,c".split(/,/); // ["a", "b", "c"]
```

## Практические примеры

### Пример 1: Валидация email

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("test@example.com"); // true
emailRegex.test("invalid"); // false
```

### Пример 2: Поиск чисел

```javascript
const numbers = "I have 5 apples and 10 oranges";
const numberRegex = /\d+/g;
numbers.match(numberRegex); // ["5", "10"]
```

### Пример 3: Замена

```javascript
const text = "Hello World";
text.replace(/world/i, "JavaScript"); // "Hello JavaScript"
```

## Заключение

Регулярные выражения:

- **Паттерн поиска** — описание того, что искать
- **Мощный инструмент** — для работы с текстом
- **Специальные символы** — для создания паттернов
- **Методы** — test, exec, match, replace, search, split

**Помните:** регулярные выражения — это мощный инструмент для работы с текстом. Используйте их для валидации, поиска и замены текста. Понимание основных символов и методов критически важно для эффективной работы с регулярными выражениями.

