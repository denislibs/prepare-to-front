# Что такое свойство `valueAsNumber`?

`valueAsNumber` — это свойство элементов `<input>` типа `number`, `range`, `date`, `time` и других числовых типов, которое возвращает значение как число вместо строки.

## Что такое valueAsNumber?

`valueAsNumber` — это свойство DOM, которое возвращает числовое значение элемента формы вместо строкового значения из `value`.

## Использование

### Получение числового значения:

```javascript
const input = document.querySelector('input[type="number"]');

// Строковое значение
const stringValue = input.value; // "123" (строка)

// Числовое значение
const numberValue = input.valueAsNumber; // 123 (число)
```

### Установка числового значения:

```javascript
input.valueAsNumber = 456; // Устанавливает числовое значение
```

## Примеры

### Input type="number":

```html
<input type="number" id="age" value="25">
```

```javascript
const ageInput = document.getElementById('age');

console.log(ageInput.value);        // "25" (строка)
console.log(ageInput.valueAsNumber); // 25 (число)

// Математические операции
const nextYear = ageInput.valueAsNumber + 1; // 26
```

### Input type="range":

```html
<input type="range" id="volume" min="0" max="100" value="50">
```

```javascript
const volume = document.getElementById('volume');

volume.addEventListener('input', () => {
    const value = volume.valueAsNumber; // Число, не строка
    console.log(`Громкость: ${value}%`);
});
```

### Input type="date":

```html
<input type="date" id="birthday">
```

```javascript
const dateInput = document.getElementById('birthday');

// valueAsNumber возвращает timestamp
const timestamp = dateInput.valueAsNumber;
const date = new Date(timestamp);
```

## Преимущества

### 1. **Нет необходимости в parseInt/parseFloat**

```javascript
// Без valueAsNumber
const value = parseInt(input.value, 10);

// С valueAsNumber
const value = input.valueAsNumber;
```

### 2. **Прямые математические операции**

```javascript
const sum = input1.valueAsNumber + input2.valueAsNumber;
const product = input1.valueAsNumber * input2.valueAsNumber;
```

### 3. **Работа с NaN**

Если значение невалидно, возвращается `NaN`:

```javascript
const input = document.querySelector('input[type="number"]');
input.value = "abc";

console.log(input.valueAsNumber); // NaN
```

## Обработка ошибок

```javascript
const value = input.valueAsNumber;

if (isNaN(value)) {
    console.error('Невалидное значение');
} else {
    console.log('Значение:', value);
}
```

## Заключение

**`valueAsNumber` используется для:**

1. ✅ Получения числового значения из input
2. ✅ Упрощения работы с числами
3. ✅ Избежания parseInt/parseFloat
4. ✅ Прямых математических операций

**Преимущества:**
- Удобство работы с числами
- Нет необходимости в преобразовании типов
- Работает с типами: `number`, `range`, `date`, `time`

`valueAsNumber` — удобное свойство для работы с числовыми значениями форм.

