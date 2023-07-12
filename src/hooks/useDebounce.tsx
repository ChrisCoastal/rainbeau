import React, { useEffect, useRef } from 'react';

export function useDebounce(callback: Function, delay: number) {
  const timerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);

  return;
}
