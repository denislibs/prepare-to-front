# Что такое веб-хранилище (web storage)?

Веб-хранилище (Web Storage) — это API браузера для хранения данных на стороне клиента. Оно включает localStorage и sessionStorage, которые позволяют хранить данные между сеансами или в рамках одного сеанса.

## Что такое веб-хранилище?

Веб-хранилище — это механизм хранения данных в браузере, который предоставляет более удобный и мощный способ хранения данных по сравнению с cookies.

## Типы веб-хранилища

### 1. **localStorage**

Хранение данных без срока действия.

```javascript
// Сохранение
localStorage.setItem('key', 'value');

// Получение
const value = localStorage.getItem('key');

// Удаление
localStorage.removeItem('key');

// Очистка
localStorage.clear();
```

### 2. **sessionStorage**

Хранение данных в рамках сеанса.

```javascript
// Сохранение
sessionStorage.setItem('key', 'value');

// Получение
const value = sessionStorage.getItem('key');

// Удаление
sessionStorage.removeItem('key');
```

## Особенности

### 1. **Объем данных**

До 5-10 МБ (зависит от браузера).

### 2. **Доступность**

Доступно только через JavaScript.

### 3. **Домен**

Данные привязаны к домену.

### 4. **Формат**

Только строки (JSON для объектов).

```javascript
// Сохранение объекта
localStorage.setItem('user', JSON.stringify({ name: 'Иван' }));

// Получение объекта
const user = JSON.parse(localStorage.getItem('user'));
```

## Заключение

**Веб-хранилище — это:**

1. ✅ API для хранения данных в браузере
2. ✅ localStorage и sessionStorage
3. ✅ Больше объема, чем cookies

**Типы:**

- localStorage (постоянное)
- sessionStorage (сеансовое)

**Рекомендации:**

- Используйте для хранения настроек
- Применяйте JSON для объектов
- Учитывайте ограничения объема

Веб-хранилище — удобный способ хранения данных на клиенте.

