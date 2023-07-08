import type { FC, Dispatch, SetStateAction } from 'react';

// styles
import { MarkerTarget } from './Marker.styles';

interface MarkerProps {
  y: number;
  x: number;
  num: number;
  // canvasBound: DOMRect | undefined;
  setActive: Dispatch<SetStateAction<number | null>>;
  // clickHandler: (e: React.MouseEvent, num: number) => void;
}

const Marker: FC<MarkerProps> = ({ x, y, num, setActive }) => {
  function handleTouchStart(e: React.TouchEvent) {
    console.log(e);
    e.preventDefault();
    setActive(num);
  }

  return (
    <MarkerTarget
      x={x}
      y={y}
      num={num}
      tabIndex={1}
      onMouseDown={() => setActive(num)}
      onTouchStart={handleTouchStart}
      // onMouseEnter={(e) => clickHandler(e, num)}
      // onDragStart={() => false}
      onMouseUp={() => setActive(null)}
      onTouchEnd={() => setActive(null)}
    >
      <span></span>
      <span></span>
    </MarkerTarget>
  );
};

export default Marker;
