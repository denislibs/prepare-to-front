# Правила (ограничения) использования хуков?

Хуки в React имеют строгие правила использования, которые необходимо соблюдать. Нарушение этих правил может привести к ошибкам и непредсказуемому поведению.

## Правила хуков

### 1. **Вызывать только на верхнем уровне**

Хуки должны вызываться на верхнем уровне функции, не внутри условий, циклов или вложенных функций.

```jsx
// ❌ Неправильно
function Component() {
    if (condition) {
        const [state, setState] = useState(0); // Ошибка!
    }
}

// ✅ Правильно
function Component() {
    const [state, setState] = useState(0);
    if (condition) {
        // Использование state
    }
}
```

### 2. **Вызывать только из React-функций**

Хуки можно вызывать только из:
- Функциональных компонентов React
- Кастомных хуков

```jsx
// ❌ Неправильно
function regularFunction() {
    const [state, setState] = useState(0); // Ошибка!
}

// ✅ Правильно
function Component() {
    const [state, setState] = useState(0);
}

function useCustomHook() {
    const [state, setState] = useState(0);
    return state;
}
```

### 3. **Одинаковый порядок вызова**

Хуки должны вызываться в одинаковом порядке при каждом рендере.

```jsx
// ❌ Неправильно
function Component({ condition }) {
    const [a, setA] = useState(0);
    if (condition) {
        const [b, setB] = useState(0); // Разный порядок!
    }
}

// ✅ Правильно
function Component({ condition }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    if (condition) {
        // Использование
    }
}
```

## Почему эти правила важны?

### React отслеживает хуки:

React использует порядок вызова хуков для отслеживания состояния. Нарушение порядка может привести к ошибкам.

## ESLint плагин

### eslint-plugin-react-hooks:

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## Заключение

**Правила хуков:**

1. ✅ Вызывать только на верхнем уровне
2. ✅ Вызывать только из React-функций
3. ✅ Одинаковый порядок вызова

**Рекомендации:**

- Следуйте правилам хуков
- Используйте ESLint плагин
- Понимайте причины правил

Соблюдение правил хуков критично для корректной работы React-приложений.



