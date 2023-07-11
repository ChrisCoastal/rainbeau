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
  /* overflow: visible; */

  /* text-align: right; */
  /* width: ${(props) => props.canvasXY.x}px; */
  /* height: ${(props) => props.canvasXY.y}px; */
  /* height: 100%; */
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  /* height: 100%; */
  /* width: 100%; */
  /* object-fit: cover; */
  /* overflow: visible; */
  /* border-radius: 8px; */
`;

export const MarkersBox = styled.div<BoxProps>`
  position: relative;
  /* overflow: hidden; */
  overflow: visible;
  border-radius: 8px;
  /* text-align: right; */
  /* width: ${(props) => props.canvasXY.x}px; */
  /* height: ${(props) => props.canvasXY.y}px; */
  width: 100%;
  height: 100%;
  grid-area: image;
  z-index: 10;
`;
