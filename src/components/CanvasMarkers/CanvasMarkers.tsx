// react
import { useState, useRef } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useMarkers from '../../hooks/useMarkers';

// styles
import { Wrapper } from './CanvasMarkers.styles';
import MarkerIcon from '../../UI/Marker/MarkerIcon';

const CanvasMarkers: FC = () => {
  const [activeMarkerNum, setActiveMarkerNum] = useState<number | null>(null);
  const { state } = useAppContext();
  const { paletteMarkers } = state;
  const { moveMarker } = useMarkers();
  const markers = paletteMarkers.map((marker, index) => {
    const { xPos, yPos } = marker.xy;
    const { r, g, b } = marker.color;

    return (
      <MarkerIcon
        key={uuidv4()}
        y={yPos}
        x={xPos}
        num={index}
        color={`rgb(${r}, ${g}, ${b})`}
        active={activeMarkerNum === index}
        setActive={setActiveMarkerNum}
      />
    );
  });

  return (
    <Wrapper
      className="field"
      onMouseMove={(e) => moveMarker(e, activeMarkerNum)}
      onTouchMove={(e) => moveMarker(e, activeMarkerNum)}
      onMouseUp={() => setActiveMarkerNum(null)}
      onMouseLeave={() => setActiveMarkerNum(null)}
    >
      {markers}
    </Wrapper>
  );
};

export default CanvasMarkers;
