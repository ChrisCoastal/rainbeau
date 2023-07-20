import { useRef } from 'react';

function useThrottle(callback: (...args: any[]) => unknown, interval = 500) {
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const argsRef = useRef<unknown[] | null>(null);

  function throttled(args: unknown[]) {
    argsRef.current = args;
    if (throttleRef.current) return;

    const throttle = setTimeout(() => {
      const args = argsRef.current;
      args && callback(...args);
      throttleRef.current = null;
    }, 50);

    throttleRef.current = throttle;
  }

  function cancelThrottle() {
    throttleRef.current && clearTimeout(throttleRef.current);
    throttleRef.current = null;
  }

  return { throttled, cancelThrottle };
}

export default useThrottle;
