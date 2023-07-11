import styled from '@emotion/styled';

import { BREAKPOINTS, CANVAS_SIZE } from '../../utils/constants';

interface BoxProps {
  canvasXY: { x: number; y: number };
}

export const ImageBox = styled.div<BoxProps>`
  position: relative;
  overflow: hidden;
  width: 100%;
  grid-area: image;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  justify-self: right;
`;

export const Canvas = styled.canvas`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: inherit;
`;

export const MarkersBox = styled.div<BoxProps>`
  position: relative;
  overflow: visible;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  grid-area: image;
  z-index: 10;
`;
