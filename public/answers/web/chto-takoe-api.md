# Что Такое API?

API (Application Programming Interface) — это набор правил и протоколов, которые позволяют различным приложениям взаимодействовать друг с другом. API определяет, как приложения могут запрашивать и получать данные или функциональность.

## Что такое API?

API — это интерфейс, который позволяет приложениям обмениваться данными и функциональностью. API определяет формат запросов и ответов между различными системами.

## Типы API

### 1. **REST API**

Использует HTTP-методы для работы с ресурсами.

```javascript
GET /api/users/1
POST /api/users
PUT /api/users/1
DELETE /api/users/1
```

### 2. **GraphQL API**

Запросы данных через единую точку входа.

```graphql
query {
    user(id: 1) {
        name
        email
    }
}
```

### 3. **SOAP API**

XML-based протокол для веб-сервисов.

### 4. **WebSocket API**

Двусторонняя связь в реальном времени.

```javascript
const ws = new WebSocket('ws://api.example.com');
```

## Примеры использования

### Fetch API:

```javascript
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Axios:

```javascript
axios.get('https://api.example.com/users')
    .then(response => console.log(response.data));
```

## Заключение

**API — это:**

1. ✅ Интерфейс для взаимодействия
2. ✅ Набор правил и протоколов
3. ✅ Обмен данными между приложениями

**Типы:**

- REST API
- GraphQL API
- SOAP API
- WebSocket API

**Рекомендации:**

- Используйте REST для простых случаев
- Используйте GraphQL для сложных запросов
- Документируйте API
- Обеспечивайте безопасность

API — основа современной веб-разработки.

