/*
import React, { useEffect, useRef } from 'react';
? Опишіть Props
export function Observer({ children, onContentEndVisible }: Props) {
? Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef(null);

  useEffect(() => {
? Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
*/

import React, { useEffect, useRef, ReactNode } from "react";

//* Інтерфейс для пропсів компонента Observer
interface ObserverProps {
  children: ReactNode; // Вміст, який буде спостерігатися
  onContentEndVisible: () => void; // Ф-ція, яка викликається, коли кінець контенту буде видимий
}

//* Компонент Observer, який використовує IntersectionObserver
export function Observer({ children, onContentEndVisible }: ObserverProps) {
  // useRef для посилання на кінцевий div
  const endContentRef = useRef<HTMLDivElement>(null);

  //* useEffect для встановлення та видалення спостереження
  useEffect(() => {
    // Опції для IntersectionObserver
    const options: IntersectionObserverInit = {
      rootMargin: "0px", // Область навколо кореневого елемента
      threshold: 1.0, // Визначення того, яка частина елемента повинна бути видимою
      root: null, // Кореневий елемент, відносно якого відбувається спостереження
    };

    //* Створення нового екземпляра IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          // Якщо частина вмісту стає видимою, викликати функцію
          onContentEndVisible();
          // Відключення спостерігача після виклику функції
          observer.disconnect();
        }
      });
    }, options);

    //* Початок спостереження за кінцевим div, якщо він існує
    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    //* Прибирання спостереження при зміні залежності (onContentEndVisible)
    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  //* Повертає обгортку з вмістом та кінцевим div для спостереження
  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
