# Чем отличаются события `input` и `change`?

События `input` и `change` — это два разных события в JavaScript, которые срабатывают при взаимодействии с элементами форм. Понимание различий между ними критически важно для правильной обработки пользовательского ввода.

## Событие `input`

Событие `input` срабатывает каждый раз, когда значение элемента изменяется, включая каждое нажатие клавиши.

### Характеристики:

- ✅ **Срабатывает сразу** — при каждом изменении значения
- ✅ **Для каждого символа** — при каждом вводе
- ✅ **Не ждет потери фокуса** — срабатывает в реальном времени
- ✅ **Для всех элементов** — input, textarea, contenteditable

### Пример:

```javascript
const input = document.querySelector("input");

input.addEventListener("input", (e) => {
  console.log("Input value:", e.target.value);
  // Срабатывает при каждом изменении
});

// Пользователь вводит "Hello"
// Срабатывает 5 раз: H, e, l, l, o
```

## Событие `change`

Событие `change` срабатывает когда значение элемента изменяется и элемент теряет фокус (для текстовых полей) или сразу при изменении (для select, checkbox, radio).

### Характеристики:

- ✅ **Срабатывает после изменения** — когда значение изменилось
- ✅ **Ждет потери фокуса** — для текстовых полей
- ✅ **Сразу для select/checkbox** — без потери фокуса
- ✅ **Только при реальном изменении** — если значение изменилось

### Пример:

```javascript
const input = document.querySelector("input");

input.addEventListener("change", (e) => {
  console.log("Changed value:", e.target.value);
  // Срабатывает только после потери фокуса
});

// Пользователь вводит "Hello" и нажимает Tab
// Срабатывает 1 раз после потери фокуса
```

## Основные различия

### 1. **Момент срабатывания**

**input:**

```javascript
// Срабатывает при каждом изменении
input.addEventListener("input", (e) => {
  console.log("Input:", e.target.value);
  // Срабатывает: H, He, Hel, Hell, Hello
});
```

**change:**

```javascript
// Срабатывает после потери фокуса
input.addEventListener("change", (e) => {
  console.log("Change:", e.target.value);
  // Срабатывает: Hello (после потери фокуса)
});
```

### 2. **Частота срабатывания**

**input:**

```javascript
// Срабатывает много раз
input.addEventListener("input", () => {
  console.log("Input event");
  // Для "Hello" сработает 5 раз
});
```

**change:**

```javascript
// Срабатывает один раз
input.addEventListener("change", () => {
  console.log("Change event");
  // Для "Hello" сработает 1 раз (после потери фокуса)
});
```

### 3. **Поведение для разных элементов**

**input:**

```javascript
// Для всех элементов одинаково
input.addEventListener("input", handler);
textarea.addEventListener("input", handler);
select.addEventListener("input", handler); // Не срабатывает для select
```

**change:**

```javascript
// Разное поведение для разных элементов
input.addEventListener("change", handler); // После потери фокуса
select.addEventListener("change", handler); // Сразу при изменении
checkbox.addEventListener("change", handler); // Сразу при изменении
```

## Практические примеры

### Пример 1: Поиск в реальном времени

```javascript
// ✅ Использование input для поиска в реальном времени
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  // Поиск при каждом изменении
  performSearch(query);
});

function performSearch(query) {
  // Выполнение поиска
  console.log("Searching for:", query);
}
```

### Пример 2: Валидация формы

```javascript
// ✅ Использование change для валидации после ввода
const emailInput = document.querySelector("#email");

emailInput.addEventListener("change", (e) => {
  const email = e.target.value;
  // Валидация после завершения ввода
  if (isValidEmail(email)) {
    e.target.classList.remove("error");
  } else {
    e.target.classList.add("error");
  }
});
```

### Пример 3: Комбинированное использование

```javascript
// ✅ Использование обоих событий
const input = document.querySelector("input");
let timeoutId;

// input - для отображения в реальном времени
input.addEventListener("input", (e) => {
  // Показываем значение в реальном времени
  updatePreview(e.target.value);
  
  // Очищаем предыдущий таймер
  clearTimeout(timeoutId);
  
  // Устанавливаем таймер для сохранения
  timeoutId = setTimeout(() => {
    saveValue(e.target.value);
  }, 500);
});

// change - для финальной валидации
input.addEventListener("change", (e) => {
  validateInput(e.target.value);
});
```

### Пример 4: Select элемент

```javascript
// ✅ change для select срабатывает сразу
const select = document.querySelector("select");

select.addEventListener("change", (e) => {
  console.log("Selected:", e.target.value);
  // Срабатывает сразу при выборе опции
});

// input для select не срабатывает
select.addEventListener("input", (e) => {
  console.log("This won't fire for select");
  // Не срабатывает для select
});
```

### Пример 5: Checkbox и Radio

```javascript
// ✅ change для checkbox/radio срабатывает сразу
const checkbox = document.querySelector("#checkbox");

checkbox.addEventListener("change", (e) => {
  console.log("Checked:", e.target.checked);
  // Срабатывает сразу при изменении
});

// input тоже срабатывает для checkbox/radio
checkbox.addEventListener("input", (e) => {
  console.log("Input:", e.target.checked);
  // Срабатывает сразу при изменении
});
```

## Когда использовать

### Используйте `input` когда:

1. **Поиск в реальном времени** — нужно реагировать на каждое изменение
2. **Валидация в реальном времени** — показывать ошибки сразу
3. **Автозаполнение** — предлагать варианты при вводе
4. **Счетчик символов** — обновлять счетчик при каждом изменении

### Используйте `change` когда:

1. **Валидация формы** — после завершения ввода
2. **Сохранение данных** — когда пользователь закончил ввод
3. **Отправка формы** — после изменения значения
4. **Select элементы** — при выборе опции

## Лучшие практики

### ✅ Делайте:

1. **Используйте input** — для реакций в реальном времени
2. **Используйте change** — для валидации и сохранения
3. **Комбинируйте события** — для разных целей
4. **Дебаунсируйте input** — для оптимизации производительности

### ❌ Не делайте:

1. **Не используйте change** — для реакций в реальном времени
2. **Не используйте input** — для валидации после ввода
3. **Не забывайте про производительность** — дебаунсируйте частые события
4. **Не смешивайте логику** — разделяйте обработчики

## Заключение

Разница между `input` и `change`:

- **input** — срабатывает при каждом изменении, в реальном времени
- **change** — срабатывает после изменения, для текстовых полей после потери фокуса
- **Использование** — input для реального времени, change для валидации
- **Частота** — input чаще, change реже

**Помните:** `input` срабатывает при каждом изменении значения, а `change` срабатывает после изменения (для текстовых полей после потери фокуса). Используйте `input` для реакций в реальном времени и `change` для валидации и сохранения данных. Понимание различий критически важно для правильной обработки пользовательского ввода.

