# Методы перехвата и обработки ошибок в веб-приложениях?

Обработка ошибок — это критически важная часть разработки веб-приложений. Понимание различных методов перехвата и обработки ошибок критически важно для создания стабильных и надежных приложений.

## Основные методы обработки ошибок

### 1. **try-catch**

Базовый механизм обработки ошибок в синхронном коде.

```javascript
try {
  // Код, который может выбросить ошибку
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Обработка ошибки
  console.error("Error occurred:", error.message);
} finally {
  // Код, который выполнится в любом случае
  console.log("Cleanup");
}
```

### 2. **try-catch с async/await**

Обработка ошибок в асинхронном коде.

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Пробрасывание ошибки дальше
  }
}
```

### 3. **Promise.catch()**

Обработка ошибок в промисах.

```javascript
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

### 4. **window.onerror**

Глобальный обработчик ошибок в браузере.

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error:", {
    message,
    source,
    lineno,
    colno,
    error
  });
  
  // Отправка ошибки на сервер
  sendErrorToServer({
    message,
    source,
    lineno,
    colno,
    stack: error?.stack
  });
  
  return true; // Предотвратить стандартную обработку ошибки
};
```

### 5. **window.addEventListener('error')**

Современный способ обработки глобальных ошибок.

```javascript
window.addEventListener("error", (event) => {
  console.error("Global error:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
  
  // Отправка ошибки на сервер
  sendErrorToServer({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack
  });
});
```

### 6. **window.addEventListener('unhandledrejection')**

Обработка необработанных отклоненных промисов.

```javascript
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", {
    reason: event.reason,
    promise: event.promise
  });
  
  // Отправка ошибки на сервер
  sendErrorToServer({
    type: "unhandledrejection",
    reason: event.reason,
    stack: event.reason?.stack
  });
  
  // Предотвратить вывод ошибки в консоль
  event.preventDefault();
});
```

## Практические примеры

### Пример 1: Централизованная обработка ошибок

```javascript
class ErrorHandler {
  static handle(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Логирование в консоль
    console.error("Error:", errorInfo);
    
    // Отправка на сервер
    this.sendToServer(errorInfo);
    
    // Показ пользователю (опционально)
    this.showUserMessage(error);
  }
  
  static sendToServer(errorInfo) {
    fetch("/api/errors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(errorInfo)
    }).catch(err => {
      console.error("Failed to send error to server:", err);
    });
  }
  
  static showUserMessage(error) {
    // Показ дружественного сообщения пользователю
    const message = "Произошла ошибка. Пожалуйста, попробуйте позже.";
    // Использование toast, modal и т.д.
  }
}

// Использование
try {
  riskyOperation();
} catch (error) {
  ErrorHandler.handle(error, { operation: "riskyOperation" });
}
```

### Пример 2: Обработка ошибок в React

```javascript
// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Логирование ошибки
    console.error("Error caught by boundary:", error, errorInfo);
    
    // Отправка на сервер
    ErrorHandler.handle(error, { componentStack: errorInfo.componentStack });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}

// Использование
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Пример 3: Обработка ошибок в API запросах

```javascript
class ApiClient {
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Сетевая ошибка
      throw new NetworkError("Network request failed", error);
    }
  }
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

class NetworkError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = "NetworkError";
    this.originalError = originalError;
  }
}
```

### Пример 4: Обработка ошибок в формах

```javascript
function validateForm(formData) {
  const errors = {};
  
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

async function submitForm(formData) {
  try {
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }
    
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        errors: errorData.errors || { general: "Submission failed" }
      };
    }
    
    return {
      success: true,
      data: await response.json()
    };
  } catch (error) {
    ErrorHandler.handle(error, { formData });
    return {
      success: false,
      errors: { general: "An unexpected error occurred" }
    };
  }
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте try-catch** — для синхронного кода
2. **Используйте async/await** — для асинхронного кода
3. **Обрабатывайте глобальные ошибки** — window.onerror, unhandledrejection
4. **Логируйте ошибки** — для отладки
5. **Отправляйте на сервер** — для мониторинга
6. **Показывайте пользователю** — дружественные сообщения

### ❌ Не делайте:

1. **Не игнорируйте ошибки** — всегда обрабатывайте
2. **Не показывайте технические детали** — пользователю
3. **Не забывайте про finally** — для очистки ресурсов
4. **Не создавайте пустые catch** — всегда логируйте ошибки

## Заключение

Методы обработки ошибок:

- **try-catch** — для синхронного кода
- **async/await** — для асинхронного кода
- **Promise.catch()** — для промисов
- **window.onerror** — глобальные ошибки
- **unhandledrejection** — необработанные промисы
- **Error Boundaries** — для React компонентов

**Помните:** правильная обработка ошибок критически важна для создания стабильных приложений. Используйте различные методы в зависимости от контекста, логируйте ошибки, отправляйте на сервер для мониторинга и показывайте пользователю дружественные сообщения. Понимание методов обработки ошибок критически важно для создания надежных веб-приложений.

