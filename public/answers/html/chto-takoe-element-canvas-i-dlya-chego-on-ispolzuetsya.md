# Что такое элемент `<canvas>`? И для чего он используется?

`<canvas>` — это HTML5 элемент, который предоставляет область для рисования графики с помощью JavaScript. Он используется для создания динамических изображений, анимаций, игр и интерактивной графики прямо в браузере.

## Что такое `<canvas>`?

`<canvas>` — это растровый элемент, который создает область для рисования. Сам по себе элемент пустой — вся графика создается через JavaScript API.

## Базовое использование

### HTML:

```html
<canvas id="myCanvas" width="800" height="600"></canvas>
```

### JavaScript:

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Рисование
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 100);
```

## Основные возможности

### 1. **2D графика**

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Прямоугольник
ctx.fillRect(10, 10, 100, 50);

// Круг
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.fill();

// Текст
ctx.fillText('Hello Canvas', 10, 200);
```

### 2. **Анимации**

```javascript
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисование кадра
    ctx.fillRect(x, y, 50, 50);
    
    // Обновление позиции
    x += 2;
    
    requestAnimationFrame(animate);
}

animate();
```

### 3. **Обработка изображений**

```javascript
const img = new Image();
img.src = 'photo.jpg';
img.onload = () => {
    ctx.drawImage(img, 0, 0);
};
```

### 4. **Интерактивность**

```javascript
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    ctx.fillRect(x, y, 10, 10);
});
```

## Практические применения

### Графики и диаграммы:

```javascript
// Рисование графика
ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(50, 80);
ctx.lineTo(100, 90);
ctx.stroke();
```

### Игры:

```javascript
// Игровая логика и отрисовка
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
```

### Редакторы изображений:

```javascript
// Фильтры, эффекты, редактирование
function applyFilter(imageData) {
    // Обработка пикселей
}
```

## Атрибуты

### `width` и `height`:

```html
<canvas width="800" height="600"></canvas>
```

**Важно:** Устанавливать через атрибуты, а не CSS (CSS масштабирует, атрибуты задают разрешение).

## Контексты рисования

### 2D контекст:

```javascript
const ctx = canvas.getContext('2d');
```

### WebGL контекст (3D):

```javascript
const gl = canvas.getContext('webgl');
```

## Заключение

**`<canvas>` используется для:**

1. ✅ **Динамической графики** — рисование через JavaScript
2. ✅ **Анимаций** — плавные анимации
3. ✅ **Игр** — браузерные игры
4. ✅ **Графиков** — визуализация данных
5. ✅ **Обработки изображений** — фильтры, эффекты
6. ✅ **Интерактивной графики** — рисование, редакторы

**Характеристики:**
- Растровая графика
- Рисование через JavaScript API
- Высокая производительность
- Поддержка 2D и 3D (WebGL)

`<canvas>` — мощный инструмент для создания динамической и интерактивной графики в веб-приложениях.

