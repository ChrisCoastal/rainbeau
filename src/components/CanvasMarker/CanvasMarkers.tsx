// react
import { useState } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// config
import { CANVAS_RESOLUTION } from '../../utils/config';

// styles
import { Wrapper, Marker } from './CanvasMarkers.styles';

interface CanvasMarkerProps {
  palette: indexRgbType[];
  dispatch: React.Dispatch<ReducerActions>;
}

const CanvasMarkers: FC<CanvasMarkerProps> = ({ palette, dispatch }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPos, setDragPos] = useState<number | null>(null);

  const getXY = (markerIndex: number) => {
    const yPos = markerIndex / CANVAS_RESOLUTION.high;
    const xPos = markerIndex % CANVAS_RESOLUTION.high;
    return [xPos, yPos];
  };
  // const dragPosition = useRef([xPos, yPos]);

  const markerDragHandler = () => {
    setIsDragging((prev) => !prev);
  };

  const markers: indexRgbType[] = [{ r: 100, g: 100, b: 100, i: 98000 }];
  const markersPos = markers.map((marker) => {
    const [xPos, yPos] = getXY(marker.i);

    console.log(xPos, yPos);

    return (
      <Marker
        key={uuidv4()}
        y={yPos}
        x={xPos}
        onMouseDown={markerDragHandler}
      />
    );
  });

  return <Wrapper>{markersPos}</Wrapper>;
};

export default CanvasMarkers;
