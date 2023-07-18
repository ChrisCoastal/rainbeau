import React, { CSSProperties, FC, useState } from 'react';
import { useSpring, animated, SpringValues } from '@react-spring/web';

import useMarkers from '../../hooks/useMarkers';

import {
  FillPath,
  MarkerNumber,
  StrokePath,
  SvgMarker,
  Wrapper,
} from './MarkerIcon.styles';

type MarkerIconProps = {
  // x: number;
  // y: number;
  num: number;
  color: string;
  active: boolean;
  // setActive: React.Dispatch<React.SetStateAction<number | null>>;
  animate?: boolean;
};

const MarkerIcon: FC<MarkerIconProps> = ({
  // x,
  // y,
  num,
  color,
  // setActive,
  active,
  animate = false,
}) => {
  // const [active, setActive] = useState<boolean>(false);
  const { moveMarker } = useMarkers();

  const handleTouchStart = (e: React.TouchEvent) => {
    // e.preventDefault();
    // setActive(num);
  };

  const handleMouse = () => {
    return (event: React.MouseEvent) => {};
  };

  return (
    <SvgMarker
      xmlns="http://www.w3.org/2000/svg"
      width="36px"
      height="48px"
      // x={x}
      // y={y}
      num={num}
      viewBox="0 0 36 48"
      enable-background="new 0 0 36 48"
    >
      <g>
        <g>
          <FillPath
            fill="#fff"
            active={active}
            d="M3.82,22.74c-0.14-0.29-0.55-1.37-0.55-1.37c-0.6-1.71-0.91-3.46-0.91-5.21C2.35,7.53,9.37,0.51,18,0.51
			c8.63,0,15.65,7.02,15.65,15.65c0,1.8-0.87,5.17-0.89,5.23l0,0c0,0-0.44,1.06-0.58,1.36L18,47.26L3.82,22.74z"
          />
          <StrokePath
            fill="#000000dd"
            d="M18,0.76c8.49,0,15.4,6.91,15.4,15.4c0,1.68-0.78,4.79-0.87,5.14c-0.08,0.18-0.45,1.07-0.56,1.31L18,46.76L4.05,22.65
			c-0.11-0.24-0.44-1.07-0.55-1.36c-0.6-1.69-0.9-3.41-0.9-5.13C2.6,7.67,9.51,0.76,18,0.76 M18,0.26c-8.78,0-15.9,7.12-15.9,15.9
			c0,1.86,0.34,3.64,0.93,5.3c0,0,0.42,1.09,0.57,1.4L18,47.76l14.4-24.9c0.15-0.31,0.6-1.4,0.6-1.4s0.9-3.44,0.9-5.3
			C33.9,7.38,26.78,0.26,18,0.26L18,0.26z"
          />
        </g>

        <path
          fill={color}
          d="M27.14,15.11c0,5.05-4.1,9.14-9.15,9.14c-5.04,0-9.13-4.09-9.13-9.14c0-5.05,4.09-9.15,9.13-9.15
		C23.04,5.97,27.14,10.06,27.14,15.11"
        />
      </g>
    </SvgMarker>
  );
};

export default MarkerIcon;
