# Что такое "Declarative UI"? Какие фреймворки поддерживают этот подход?

Declarative UI (Декларативный UI) — это подход к разработке пользовательских интерфейсов, при котором разработчик описывает, как должен выглядеть UI, а не как его создавать итеративно. Это противоположность императивному подходу.

## Что такое Declarative UI?

Declarative UI — это подход, при котором UI описывается декларативно (что должно быть), а не императивно (как это сделать). Фреймворк сам управляет обновлениями DOM.

## Императивный vs Декларативный

### Императивный подход:

```javascript
// Как сделать
const button = document.createElement('button');
button.textContent = 'Нажми меня';
button.addEventListener('click', () => {
    alert('Нажато!');
});
document.body.appendChild(button);
```

### Декларативный подход:

```jsx
// Что должно быть
<button onClick={() => alert('Нажато!')}>
    Нажми меня
</button>
```

## Фреймворки

### 1. **React**

```jsx
function Component() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Счет: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Увеличить
            </button>
        </div>
    );
}
```

### 2. **Vue**

```vue
<template>
    <div>
        <p>Счет: {{ count }}</p>
        <button @click="increment">Увеличить</button>
    </div>
</template>

<script>
export default {
    data() {
        return { count: 0 };
    },
    methods: {
        increment() {
            this.count++;
        }
    }
};
</script>
```

### 3. **Angular**

```typescript
@Component({
    selector: 'app-counter',
    template: `
        <div>
            <p>Счет: {{ count }}</p>
            <button (click)="increment()">Увеличить</button>
        </div>
    `
})
export class CounterComponent {
    count = 0;
    
    increment() {
        this.count++;
    }
}
```

### 4. **Svelte**

```svelte
<script>
    let count = 0;
    
    function increment() {
        count++;
    }
</script>

<div>
    <p>Счет: {count}</p>
    <button on:click={increment}>Увеличить</button>
</div>
```

## Преимущества

### 1. **Простота**

Легче читать и понимать код.

### 2. **Предсказуемость**

Легче предсказать результат.

### 3. **Меньше ошибок**

Меньше ручного управления DOM.

### 4. **Переиспользование**

Легче создавать переиспользуемые компоненты.

## Заключение

**Declarative UI — это:**

1. ✅ Описание UI декларативно
2. ✅ Фреймворк управляет DOM
3. ✅ Фокус на "что", а не "как"

**Фреймворки:**

- React
- Vue
- Angular
- Svelte

**Преимущества:**

- Простота
- Предсказуемость
- Меньше ошибок
- Переиспользование

**Рекомендации:**

- Используйте декларативный подход
- Выбирайте подходящий фреймворк
- Понимайте принципы работы

Declarative UI — современный подход к разработке пользовательских интерфейсов.

