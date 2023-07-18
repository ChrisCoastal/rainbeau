import { useRef, useEffect, useState } from 'react';

export function useThrottle(value: any, interval = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}

// import { useRef, useCallback } from 'react';

// export function useThrottle() {
//   const prevArgsRef = useRef<unknown[] | null>(null);

//   const throttled = useCallback(
//     (
//       args: unknown[],
//       callback: (...args: unknown[]) => any,
//       interval = 200
//     ) => {
//       const throttle = !!prevArgsRef.current;
//       prevArgsRef.current = args;

//       if (throttle) return;

//       window.setTimeout(() => {
//         if (!prevArgsRef.current) return;
//         console.log(prevArgsRef.current);
//         callback(prevArgsRef.current);
//         prevArgsRef.current = null;
//       }, interval);
//     },
//     []
//   );

//   return throttled;
// }
