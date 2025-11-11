# Что такое `HTTP` cookie? Для чего они используются?

HTTP cookies — это небольшие текстовые файлы, которые хранятся в браузере и отправляются с каждым HTTP-запросом на сервер. Cookies используются для хранения состояния между запросами и сеансами.

## Что такое HTTP cookie?

HTTP cookie — это механизм хранения данных на стороне клиента, который позволяет серверу сохранять информацию о пользователе между запросами.

## Для чего используются

### 1. **Аутентификация**

Хранение токенов и сессий.

```javascript
// Установка cookie
document.cookie = "sessionId=abc123; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
```

### 2. **Персонализация**

Хранение предпочтений пользователя.

```javascript
document.cookie = "theme=dark; path=/";
```

### 3. **Отслеживание**

Аналитика и реклама.

### 4. **Корзина покупок**

Хранение товаров в корзине.

## Характеристики

### 1. **Размер**

Ограничение ~4 КБ на cookie.

### 2. **Срок действия**

Могут иметь срок действия или быть сессионными.

```javascript
// С сроком действия
document.cookie = "name=value; expires=Thu, 18 Dec 2024 12:00:00 UTC";

// Сессионная (удаляется при закрытии браузера)
document.cookie = "name=value";
```

### 3. **Домен**

Привязаны к домену.

```javascript
document.cookie = "name=value; domain=.example.com";
```

### 4. **Путь**

Ограничены путем.

```javascript
document.cookie = "name=value; path=/admin";
```

### 5. **Безопасность**

Могут быть защищены флагами.

```javascript
// HttpOnly — недоступен через JavaScript
// Secure — только через HTTPS
document.cookie = "name=value; HttpOnly; Secure";
```

## Работа с cookies

### Установка:

```javascript
document.cookie = "name=value; expires=date; path=/; domain=.example.com; Secure; HttpOnly";
```

### Чтение:

```javascript
const cookies = document.cookie;
// "name1=value1; name2=value2"
```

### Удаление:

```javascript
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

## Заключение

**HTTP cookies — это:**

1. ✅ Механизм хранения данных
2. ✅ Хранение состояния
3. ✅ Отправка с запросами

**Использование:**

- Аутентификация
- Персонализация
- Отслеживание
- Корзина покупок

**Рекомендации:**

- Используйте для аутентификации
- Устанавливайте срок действия
- Используйте HttpOnly и Secure
- Учитывайте ограничения размера

Cookies — важный инструмент для работы с состоянием в веб-приложениях.

