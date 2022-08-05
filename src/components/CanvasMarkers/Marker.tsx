import type { FC } from 'react';

// styles
import { Circle } from './Marker.styles';

interface MarkerProps {
  y: number;
  x: number;
  num: number;
  // canvasBound: DOMRect | undefined;
  clickHandler: (e: React.MouseEvent, num: number) => void;
}

const Marker: FC<MarkerProps> = ({ x, y, num, clickHandler }) => {
  return (
    <Circle
      x={x}
      y={y}
      num={num}
      tabIndex={1}
      onMouseDown={(e) => clickHandler(e, num)}
      onMouseEnter={(e) => clickHandler(e, num)}
      onDragStart={() => false}
      onMouseUp={(e) => clickHandler(e, num)}
    >
      <span></span>
      <span></span>
    </Circle>
  );
};

export default Marker;
