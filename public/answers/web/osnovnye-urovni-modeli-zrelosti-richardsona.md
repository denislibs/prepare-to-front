# Основные уровни модели зрелости Ричардсона?

Модель зрелости Ричардсона определяет четыре уровня зрелости REST API. Понимание каждого уровня помогает оценить и улучшить качество API.

## Уровень 0: HTTP как туннель

Использование HTTP только как транспортного протокола. Все запросы идут через один endpoint.

```javascript
// Все через POST
POST /api/service
Body: { action: "getUser", userId: 1 }

POST /api/service
Body: { action: "createUser", name: "Иван" }
```

## Уровень 1: Ресурсы

Использование разных URL для разных ресурсов.

```javascript
GET /api/users/1
GET /api/users/2
GET /api/posts/5
```

## Уровень 2: HTTP-методы

Использование правильных HTTP-методов и статус-кодов.

```javascript
GET    /api/users/1      → 200 OK
POST   /api/users       → 201 Created
PUT    /api/users/1      → 200 OK
DELETE /api/users/1      → 204 No Content
```

## Уровень 3: HATEOAS

Использование гипермедиа для навигации по API.

```json
{
    "id": 1,
    "name": "Иван",
    "_links": {
        "self": "/api/users/1",
        "posts": "/api/users/1/posts",
        "update": "/api/users/1",
        "delete": "/api/users/1"
    }
}
```

## Заключение

**Уровни зрелости:**

1. ✅ Уровень 0: HTTP как туннель
2. ✅ Уровень 1: Ресурсы
3. ✅ Уровень 2: HTTP-методы
4. ✅ Уровень 3: HATEOAS

**Рекомендации:**

- Стремитесь к уровню 2-3
- Используйте правильные HTTP-методы
- Рассмотрите HATEOAS для сложных API

Понимание уровней помогает создать качественный REST API.

