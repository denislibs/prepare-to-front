# Что такое doctype? И для чего он используется?

DOCTYPE (Document Type Declaration) — это декларация типа документа, которая указывает браузеру, какая версия HTML используется в документе. Это первая строка в HTML-документе и критически важна для правильного отображения страницы.

## Что такое DOCTYPE?

DOCTYPE — это инструкция для браузера, которая сообщает ему, какую версию HTML или XHTML использовать для интерпретации документа. Это не HTML-тег, а декларация, которая должна быть первой строкой в документе.

### Основные характеристики:

- ✅ **Первая строка документа** — должна быть до всех других элементов
- ✅ **Не HTML-тег** — это декларация, а не элемент
- ✅ **Определяет режим рендеринга** — влияет на то, как браузер обрабатывает документ
- ✅ **Обязательна для валидности** — без DOCTYPE документ не считается валидным

## Для чего используется DOCTYPE?

### 1. **Определение версии HTML**

DOCTYPE указывает браузеру, какую версию HTML использовать:

```html
<!DOCTYPE html>  <!-- HTML5 -->
```

### 2. **Режим рендеринга браузера**

DOCTYPE определяет режим рендеринга:

- **Standards Mode (Стандартный режим)** — современный режим с правильной обработкой CSS и JavaScript
- **Quirks Mode (Режим совместимости)** — режим для старых браузеров, имитирует баги старых версий

### 3. **Валидация документа**

Валидаторы используют DOCTYPE для проверки соответствия документа стандарту.

## Версии DOCTYPE

### HTML5 (современный стандарт)

```html
<!DOCTYPE html>
```

- Самая простая форма
- Не требует указания версии
- Используется для всех современных сайтов

### HTML 4.01

#### Strict (Строгий)

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

#### Transitional (Переходный)

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

#### Frameset (Фреймы)

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

### XHTML 1.0

#### Strict

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

#### Transitional

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

## Современное использование

### HTML5 DOCTYPE

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Документ</title>
</head>
<body>
    <!-- Контент -->
</body>
</html>
```

**Преимущества HTML5 DOCTYPE:**
- Короткий и простой
- Работает во всех современных браузерах
- Активирует стандартный режим рендеринга
- Не требует обновления при изменении стандарта

## Влияние на рендеринг

### С DOCTYPE (Standards Mode):

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        div { width: 100px; padding: 20px; }
    </style>
</head>
<body>
    <div>Контент</div>
    <!-- Ширина = 100px (без padding в box-sizing: content-box) -->
</body>
</html>
```

### Без DOCTYPE (Quirks Mode):

```html
<html>
<head>
    <style>
        div { width: 100px; padding: 20px; }
    </style>
</head>
<body>
    <div>Контент</div>
    <!-- Ширина может быть 140px (padding включен в width) -->
</body>
</html>
```

## Практические примеры

### Правильная структура документа:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя страница</title>
</head>
<body>
    <h1>Заголовок</h1>
    <p>Контент страницы</p>
</body>
</html>
```

### Ошибки использования:

```html
<!-- НЕПРАВИЛЬНО: DOCTYPE не первая строка -->
<!-- Комментарий -->
<!DOCTYPE html>

<!-- НЕПРАВИЛЬНО: Пробелы перед DOCTYPE -->
    <!DOCTYPE html>

<!-- НЕПРАВИЛЬНО: Отсутствует DOCTYPE -->
<html>
<head>
    <title>Страница</title>
</head>
</html>
```

## Проверка режима рендеринга

Можно проверить режим рендеринга через JavaScript:

```javascript
// Проверка режима рендеринга
if (document.compatMode === 'CSS1Compat') {
    console.log('Standards Mode');
} else {
    console.log('Quirks Mode');
}
```

## Заключение

DOCTYPE используется для:
- **Определения версии HTML** — указывает браузеру, какой стандарт использовать
- **Активации стандартного режима** — обеспечивает правильный рендеринг
- **Валидации документа** — позволяет валидаторам проверить соответствие стандарту
- **Совместимости** — обеспечивает единообразное отображение в разных браузерах

**Современный стандарт:**
```html
<!DOCTYPE html>
```

Всегда используйте DOCTYPE в начале HTML-документа для обеспечения правильного отображения и работы страницы во всех браузерах.

