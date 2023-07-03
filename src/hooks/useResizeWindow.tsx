import { useEffect, useState } from 'react';

const useResizeWindow = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<{
    clientHeight: number;
    clientWidth: number;
  }>({
    clientHeight: 0,
    clientWidth: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      const { clientHeight, clientWidth } = document.documentElement;
      setWindowSize({
        clientHeight,
        clientWidth,
      });
    };

    document.addEventListener('resize', handleSize);

    // set initial size
    handleSize();

    return () => document.removeEventListener('resize', handleSize);
  }, []);

  return windowSize;
};

export default useResizeWindow;
