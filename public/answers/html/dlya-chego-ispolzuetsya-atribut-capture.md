# Для чего используется атрибут `capture`?

Атрибут `capture` в HTML используется для указания источника захвата медиа-файлов (камера или микрофон) при использовании элемента `<input type="file">` на мобильных устройствах.

## Что такое `capture`?

`capture` — это атрибут для элементов `<input type="file">`, который указывает, какое устройство использовать для захвата медиа-файлов.

## Использование

### Базовый синтаксис:

```html
<input type="file" capture>
```

## Значения

### `capture` (без значения) или `capture="user"`:

```html
<input type="file" accept="image/*" capture="user">
```

Использует фронтальную камеру (для селфи).

### `capture="environment"`:

```html
<input type="file" accept="image/*" capture="environment">
```

Использует заднюю камеру (для фотографий объектов).

### `capture="microphone"`:

```html
<input type="file" accept="audio/*" capture="microphone">
```

Использует микрофон для записи аудио.

## Примеры использования

### Фотография с камеры:

```html
<input type="file" 
       accept="image/*" 
       capture="environment">
```

### Селфи:

```html
<input type="file" 
       accept="image/*" 
       capture="user">
```

### Запись аудио:

```html
<input type="file" 
       accept="audio/*" 
       capture="microphone">
```

### Запись видео:

```html
<input type="file" 
       accept="video/*" 
       capture="environment">
```

## Совместимость

### Поддержка браузеров:

- ✅ Chrome/Edge (Android)
- ✅ Safari (iOS)
- ❌ Desktop браузеры (обычно открывают файловый менеджер)

## Комбинирование с `accept`

### Изображения:

```html
<input type="file" 
       accept="image/*" 
       capture="environment">
```

### Аудио:

```html
<input type="file" 
       accept="audio/*" 
       capture="microphone">
```

### Видео:

```html
<input type="file" 
       accept="video/*" 
       capture="environment">
```

## Обработка файлов

### JavaScript:

```javascript
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        console.log('Файл выбран:', file.name);
        // Обработка файла
    }
});
```

## Заключение

**`capture` используется для:**

1. ✅ Указания источника захвата медиа-файлов
2. ✅ Улучшения UX на мобильных устройствах
3. ✅ Прямого доступа к камере/микрофону

**Значения:**

- `user` — фронтальная камера
- `environment` — задняя камера
- `microphone` — микрофон

**Рекомендации:**

- Используйте на мобильных устройствах
- Комбинируйте с `accept` для фильтрации типов файлов
- Предоставляйте альтернативу для desktop

Правильное использование `capture` улучшает пользовательский опыт на мобильных устройствах.

