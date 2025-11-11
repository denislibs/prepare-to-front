# Как работает `JSONP`?

JSONP (JSON with Padding) — это техника обхода ограничений same-origin policy для загрузки данных с другого домена. JSONP использует тег `<script>` для выполнения JavaScript кода с другого домена.

## Что такое JSONP?

JSONP — это способ получения данных с другого домена через тег `<script>`, который не подчиняется same-origin policy.

## Как это работает

### 1. **Сервер возвращает функцию**

Сервер оборачивает JSON в вызов функции.

```javascript
// Сервер возвращает:
callback({"name": "Иван", "age": 30});
```

### 2. **Клиент создает script тег**

Клиент динамически создает `<script>` тег.

```javascript
const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleData';
document.head.appendChild(script);
```

### 3. **Обработка данных**

Функция обрабатывает полученные данные.

```javascript
function handleData(data) {
    console.log(data.name); // "Иван"
    console.log(data.age);  // 30
}
```

## Пример

### Клиент:

```javascript
function handleResponse(data) {
    console.log('Получено:', data);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/users?callback=handleResponse';
document.head.appendChild(script);
```

### Сервер:

```javascript
// Express.js пример
app.get('/users', (req, res) => {
    const callback = req.query.callback;
    const data = { users: [...] };
    res.send(`${callback}(${JSON.stringify(data)});`);
});
```

## Ограничения

### 1. **Только GET**

JSONP работает только с GET-запросами.

### 2. **Безопасность**

Нет контроля над выполняемым кодом.

### 3. **Ошибки**

Сложно обрабатывать ошибки.

## Современная альтернатива

### CORS:

```javascript
fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Заключение

**JSONP — это:**

1. ✅ Обход same-origin policy
2. ✅ Использование `<script>` тега
3. ✅ Вызов функции с данными

**Как работает:**

- Сервер возвращает функцию с данными
- Клиент создает script тег
- Функция обрабатывает данные

**Ограничения:**

- Только GET
- Проблемы безопасности
- Сложная обработка ошибок

**Рекомендации:**

- Используйте CORS вместо JSONP
- JSONP только для legacy систем
- Учитывайте безопасность

JSONP — устаревшая техника, используйте CORS для современных приложений.

