# Из чего состоит `HTTP`-запрос?

HTTP-запрос состоит из нескольких частей: стартовая строка, заголовки и тело запроса. Понимание структуры HTTP-запроса важно для работы с веб-API и отладки.

## Структура HTTP-запроса

### 1. **Стартовая строка (Request Line)**

Содержит метод, путь и версию протокола.

```
GET /api/users HTTP/1.1
```

### 2. **Заголовки (Headers)**

Метаданные запроса.

```
Host: example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Authorization: Bearer token123
```

### 3. **Тело запроса (Body)**

Данные запроса (опционально).

```json
{
    "name": "Иван",
    "email": "ivan@example.com"
}
```

## Пример полного запроса

```
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer token123
Content-Length: 45

{"name":"Иван","email":"ivan@example.com"}
```

## Основные заголовки

### 1. **Host**

Домен сервера.

```
Host: example.com
```

### 2. **Content-Type**

Тип содержимого.

```
Content-Type: application/json
```

### 3. **Authorization**

Токен аутентификации.

```
Authorization: Bearer token123
```

### 4. **User-Agent**

Информация о клиенте.

```
User-Agent: Mozilla/5.0
```

## Заключение

**HTTP-запрос состоит из:**

1. ✅ Стартовая строка
2. ✅ Заголовки
3. ✅ Тело запроса

**Основные части:**

- Метод, путь, версия
- Метаданные
- Данные

**Рекомендации:**

- Используйте правильные заголовки
- Указывайте Content-Type
- Добавляйте Authorization при необходимости

Понимание структуры HTTP-запроса важно для работы с API.

