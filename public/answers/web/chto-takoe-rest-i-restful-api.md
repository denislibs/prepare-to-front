# Что такое REST и RESTful API?

REST (Representational State Transfer) — это архитектурный стиль, а RESTful API — это API, который следует принципам REST. Понимание различий и принципов помогает создавать правильные веб-сервисы.

## Что такое REST?

REST — это архитектурный стиль для проектирования распределенных систем, основанный на использовании стандартных HTTP-методов и принципах простоты.

## Что такое RESTful API?

RESTful API — это API, который следует принципам REST и использует HTTP-методы для работы с ресурсами.

## Принципы RESTful API

### 1. **Ресурсы**

Все сущности представлены как ресурсы.

```
GET /api/users
GET /api/users/1
GET /api/users/1/posts
```

### 2. **HTTP-методы**

```
GET    /api/users      - получить список
GET    /api/users/1    - получить одного
POST   /api/users      - создать
PUT    /api/users/1    - обновить
DELETE /api/users/1    - удалить
```

### 3. **Статус-коды**

```
200 OK           - успешно
201 Created      - создано
204 No Content   - успешно без контента
400 Bad Request  - ошибка запроса
404 Not Found    - не найдено
500 Server Error - ошибка сервера
```

### 4. **Формат данных**

Обычно JSON.

```json
{
    "id": 1,
    "name": "Иван",
    "email": "ivan@example.com"
}
```

## Примеры

### RESTful API:

```javascript
// Получение списка
GET /api/users
Response: [{ id: 1, name: "Иван" }, { id: 2, name: "Петр" }]

// Получение одного
GET /api/users/1
Response: { id: 1, name: "Иван", email: "ivan@example.com" }

// Создание
POST /api/users
Body: { name: "Сергей", email: "sergey@example.com" }
Response: 201 Created

// Обновление
PUT /api/users/1
Body: { name: "Иван Иванов" }
Response: 200 OK

// Удаление
DELETE /api/users/1
Response: 204 No Content
```

## Заключение

**REST:**

1. ✅ Архитектурный стиль
2. ✅ Принципы проектирования
3. ✅ Концепция

**RESTful API:**

1. ✅ Реализация REST
2. ✅ Следование принципам
3. ✅ Практическое применение

**Принципы:**

- Ресурсы через URL
- HTTP-методы
- Статус-коды
- Без состояния

**Рекомендации:**

- Следуйте принципам REST
- Используйте правильные HTTP-методы
- Документируйте API
- Тестируйте endpoints

RESTful API — стандартный подход к созданию веб-сервисов.

