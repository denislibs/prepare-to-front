# Как реализовать отложенную загрузку изображений?

Отложенная загрузка изображений (lazy loading) — это техника оптимизации, при которой изображения загружаются только когда они становятся видимыми в области просмотра (viewport). Понимание отложенной загрузки критически важно для улучшения производительности веб-страниц.

## Что такое отложенная загрузка?

Отложенная загрузка — это техника, при которой ресурсы (изображения) загружаются только когда они нужны, а не все сразу при загрузке страницы.

### Преимущества:

- ✅ **Улучшение производительности** — быстрее загрузка страницы
- ✅ **Экономия трафика** — загружаются только видимые изображения
- ✅ **Лучший UX** — быстрее отображается контент
- ✅ **Оптимизация SEO** — улучшение метрик производительности

## Нативные методы

### 1. **Атрибут loading="lazy"**

Современный нативный способ отложенной загрузки.

```html
<!-- Отложенная загрузка изображения -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Отложенная загрузка iframe -->
<iframe src="video.html" loading="lazy"></iframe>
```

### Характеристики:

- ✅ **Нативная поддержка** — в современных браузерах
- ✅ **Простота использования** — один атрибут
- ✅ **Автоматическая оптимизация** — браузер управляет загрузкой
- ✅ **Fallback** — можно комбинировать с JavaScript

## JavaScript методы

### 1. **Intersection Observer API**

Современный API для отслеживания видимости элементов.

```javascript
// Создание observer
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Загрузка изображения
      img.classList.remove("lazy");
      observer.unobserve(img); // Прекращение наблюдения
    }
  });
});

// Наблюдение за изображениями
document.querySelectorAll("img[data-src]").forEach(img => {
  imageObserver.observe(img);
});
```

### HTML:

```html
<!-- Изображение с data-src вместо src -->
<img data-src="image.jpg" alt="Description" class="lazy">
```

### CSS:

```css
.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy.loaded {
  opacity: 1;
}
```

### 2. **Событие scroll**

Классический способ отслеживания прокрутки.

```javascript
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    
    // Проверка видимости
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      img.removeAttribute("data-src");
    }
  });
}

// Обработчик прокрутки
window.addEventListener("scroll", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);

// Первоначальная загрузка
lazyLoadImages();
```

### 3. **Комбинированный подход**

```javascript
// Использование Intersection Observer с fallback
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  
  if ("IntersectionObserver" in window) {
    // Использование Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback для старых браузеров
    images.forEach(img => {
      if (isInViewport(img)) {
        loadImage(img);
      }
    });
    
    window.addEventListener("scroll", throttle(lazyLoadImages, 100));
  }
}

function loadImage(img) {
  img.src = img.dataset.src;
  img.classList.remove("lazy");
  img.removeAttribute("data-src");
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

## Практические примеры

### Пример 1: Простая реализация

```html
<!-- HTML -->
<img data-src="image1.jpg" alt="Image 1" class="lazy">
<img data-src="image2.jpg" alt="Image 2" class="lazy">
<img data-src="image3.jpg" alt="Image 3" class="lazy">
```

```javascript
// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img[data-src]");
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});
```

```css
/* CSS */
.lazy {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy.loaded {
  opacity: 1;
}
```

### Пример 2: С placeholder

```html
<!-- HTML с placeholder -->
<img 
  data-src="image.jpg" 
  src="placeholder.jpg" 
  alt="Description" 
  class="lazy">
```

```javascript
// JavaScript с обработкой загрузки
function loadImage(img) {
  const imageUrl = img.dataset.src;
  
  // Создание нового изображения для предзагрузки
  const image = new Image();
  image.onload = () => {
    img.src = imageUrl;
    img.classList.add("loaded");
  };
  image.onerror = () => {
    img.classList.add("error");
  };
  image.src = imageUrl;
}
```

### Пример 3: С прогресс-баром

```html
<!-- HTML -->
<div class="lazy-image-container">
  <img data-src="image.jpg" alt="Description" class="lazy">
  <div class="loading-spinner"></div>
</div>
```

```javascript
// JavaScript
function loadImage(img) {
  const container = img.parentElement;
  const spinner = container.querySelector(".loading-spinner");
  
  img.onload = () => {
    img.classList.add("loaded");
    spinner.style.display = "none";
  };
  
  img.src = img.dataset.src;
}
```

## Оптимизация

### 1. **Предзагрузка следующего изображения**

```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      loadImage(img);
      
      // Предзагрузка следующего изображения
      const nextImg = img.nextElementSibling;
      if (nextImg && nextImg.dataset.src) {
        preloadImage(nextImg);
      }
      
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: "50px" // Начинать загрузку за 50px до появления
});
```

### 2. **Кэширование загруженных изображений**

```javascript
const loadedImages = new Set();

function loadImage(img) {
  const src = img.dataset.src;
  
  if (loadedImages.has(src)) {
    img.src = src;
    return;
  }
  
  const image = new Image();
  image.onload = () => {
    img.src = src;
    loadedImages.add(src);
  };
  image.src = src;
}
```

## Лучшие практики

### ✅ Делайте:

1. **Используйте loading="lazy"** — для простых случаев
2. **Используйте Intersection Observer** — для гибкости
3. **Добавляйте placeholder** — для лучшего UX
4. **Оптимизируйте изображения** — сжатие и правильные форматы

### ❌ Не делайте:

1. **Не загружайте все изображения** — сразу при загрузке страницы
2. **Не забывайте про fallback** — для старых браузеров
3. **Не используйте тяжелые изображения** — оптимизируйте размер
4. **Не блокируйте рендеринг** — используйте асинхронную загрузку

## Заключение

Отложенная загрузка изображений:

- **Нативный способ** — атрибут loading="lazy"
- **JavaScript способ** — Intersection Observer API
- **Преимущества** — улучшение производительности и UX
- **Оптимизация** — предзагрузка и кэширование

**Помните:** отложенная загрузка изображений критически важна для производительности веб-страниц. Используйте нативный атрибут `loading="lazy"` для простых случаев и Intersection Observer API для более сложных сценариев. Понимание отложенной загрузки помогает создавать быстрые и эффективные веб-приложения.

