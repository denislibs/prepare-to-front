'use client';

import { useEffect, useState, ReactNode } from 'react';

interface FullscreenGuardProps {
  children: ReactNode;
}

export default function FullscreenGuard({ children }: FullscreenGuardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [warnings, setWarnings] = useState(0);
  
  useEffect(() => {
    // Проверяем fullscreen статус
    const checkFullscreen = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
      
      if (!isFs && warnings < 3) {
        setWarnings(prev => prev + 1);
        alert('ВНИМАНИЕ: Тест должен проходить в полноэкранном режиме!');
        requestFullscreen();
      }
    };
    
    // Проверяем видимость вкладки
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);
      
      if (!visible) {
        setWarnings(prev => prev + 1);
        alert('ВНИМАНИЕ: Переключение вкладок запрещено во время теста!');
      }
    };
    
    // Запрашиваем fullscreen при загрузке
    const requestFullscreen = async () => {
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
        } else if ((element as any).mozRequestFullScreen) {
          await (element as any).mozRequestFullScreen();
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
        }
      } catch (error) {
        console.error('Error requesting fullscreen:', error);
      }
    };
    
    // Слушаем события
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Блокируем контекстное меню и копирование
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Блокируем F12, Ctrl+Shift+I, Ctrl+U и т.д.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    
    // Запрашиваем fullscreen при монтировании
    requestFullscreen();
    
    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('MSFullscreenChange', checkFullscreen);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [warnings]);
  
  if (!isFullscreen && warnings < 3) {
    return (
      <div className="fullscreen-guard">
        <div className="fullscreen-guard__container">
          <div className="fullscreen-guard__icon">🔒</div>
          <p className="fullscreen-guard__title">
            Полноэкранный режим обязателен
          </p>
          <p className="fullscreen-guard__description">
            Пожалуйста, разрешите полноэкранный режим для прохождения теста
          </p>
          <p className="fullscreen-guard__hint">
            Нажмите F11 или используйте кнопку браузера
          </p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
