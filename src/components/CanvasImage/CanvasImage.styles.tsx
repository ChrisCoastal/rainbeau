import type { ReactNode } from 'react';
import styled from '@emotion/styled';

interface BoxProps {
  canvasXY: { x: number; y: number };
}

interface BlurFallbackProps {
  children: ReactNode;
}

export const ImageBox = styled.div<BoxProps>`
  position: relative;
  align-self: center;
  overflow: hidden;
  width: 100%;
  grid-area: image;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  justify-self: right;
`;

export const Canvas = styled.canvas`
  position: relative;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: inherit;
  z-index: 10;
`;

export const BlurFallback = styled.div<BlurFallbackProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
  z-index: 50;
`;
