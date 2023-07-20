import { useEffect, useState } from 'react';

const useResizeWindow = (callback?: Function): WindowSize => {
  const [windowSize, setWindowSize] = useState<{
    innerHeight: number;
    innerWidth: number;
  }>({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      const { innerHeight, innerWidth } = window;
      setWindowSize({
        innerHeight,
        innerWidth,
      });
      callback && callback();
    };

    window.addEventListener('resize', handleSize);

    // set initial size
    handleSize();

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return windowSize;
};

export default useResizeWindow;
