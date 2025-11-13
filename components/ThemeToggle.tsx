'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [mounted, setMounted] = useState(false);

  const updateTheme = useCallback((newTheme: 'light' | 'dark' | 'auto') => {
    if (newTheme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemTheme);
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    localStorage.setItem('color-theme', newTheme);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Получаем сохраненную тему
    const savedTheme = localStorage.getItem('color-theme') || localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    const initialTheme = savedTheme || 'auto';
    
    setTheme(initialTheme);
    updateTheme(initialTheme);

    // Слушаем изменения системной темы для режима "auto"
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem('color-theme') || localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
      if (currentTheme === 'auto' || !currentTheme) {
        updateTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [updateTheme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value as 'light' | 'dark' | 'auto';
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  // Избегаем рендера на сервере
  if (!mounted) {
    return (
      <div className="theme-toggle">
        <label className="theme-toggle__item">
          <input className="theme-toggle__control" type="radio" name="color-theme" value="light" defaultChecked={false} />
          <span className="theme-toggle__text">Светлая</span>
        </label>
        <label className="theme-toggle__item">
          <input className="theme-toggle__control" type="radio" name="color-theme" value="auto" defaultChecked={true} />
          <span className="theme-toggle__text">Авто</span>
        </label>
        <label className="theme-toggle__item">
          <input className="theme-toggle__control" type="radio" name="color-theme" value="dark" defaultChecked={false} />
          <span className="theme-toggle__text">Тёмная</span>
        </label>
      </div>
    );
  }

  return (
    <div className="theme-toggle">
      <label className="theme-toggle__item">
        <input 
          className="theme-toggle__control" 
          type="radio" 
          name="color-theme" 
          value="light"
          checked={theme === 'light'}
          onChange={handleChange}
        />
        <span className="theme-toggle__text">Светлая</span>
      </label>
      <label className="theme-toggle__item">
        <input 
          className="theme-toggle__control" 
          type="radio" 
          name="color-theme" 
          value="auto"
          checked={theme === 'auto'}
          onChange={handleChange}
        />
        <span className="theme-toggle__text">Авто</span>
      </label>
      <label className="theme-toggle__item">
        <input 
          className="theme-toggle__control" 
          type="radio" 
          name="color-theme" 
          value="dark"
          checked={theme === 'dark'}
          onChange={handleChange}
        />
        <span className="theme-toggle__text">Тёмная</span>
      </label>
    </div>
  );
}
