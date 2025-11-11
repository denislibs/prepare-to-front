# Что такое `WebSocket`? В чем принцип его работы?

WebSocket — это протокол для двусторонней связи между клиентом и сервером через одно постоянное соединение. WebSocket позволяет серверу отправлять данные клиенту без запроса, что делает его идеальным для real-time приложений.

## Что такое WebSocket?

WebSocket — это протокол связи, который обеспечивает полнодуплексную (двустороннюю) коммуникацию между клиентом и сервером через одно TCP-соединение.

## Принцип работы

### 1. **Установка соединения**

Клиент отправляет HTTP-запрос с заголовком Upgrade.

```javascript
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
```

### 2. **Подтверждение сервера**

Сервер подтверждает соединение.

```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### 3. **Обмен данными**

Двусторонняя передача данных.

```javascript
// Клиент → Сервер
ws.send("Привет");

// Сервер → Клиент
ws.onmessage = (event) => {
    console.log(event.data);
};
```

## Примеры

### Клиент:

```javascript
const ws = new WebSocket('ws://example.com/chat');

ws.onopen = () => {
    console.log('Соединение установлено');
    ws.send('Привет, сервер!');
};

ws.onmessage = (event) => {
    console.log('Получено:', event.data);
};

ws.onerror = (error) => {
    console.error('Ошибка:', error);
};

ws.onclose = () => {
    console.log('Соединение закрыто');
};
```

### Сервер (Node.js):

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Получено:', message);
        ws.send('Ответ от сервера');
    });
});
```

## Преимущества

### 1. **Низкая задержка**

Мгновенная передача данных.

### 2. **Эффективность**

Меньше overhead по сравнению с HTTP.

### 3. **Real-time**

Идеально для чатов, игр, уведомлений.

## Заключение

**WebSocket — это:**

1. ✅ Протокол двусторонней связи
2. ✅ Постоянное соединение
3. ✅ Real-time коммуникация

**Принцип работы:**

- Установка соединения через HTTP
- Обновление до WebSocket
- Двусторонняя передача данных

**Рекомендации:**

- Используйте для real-time приложений
- Обрабатывайте ошибки соединения
- Реализуйте переподключение

WebSocket — мощный инструмент для real-time веб-приложений.

