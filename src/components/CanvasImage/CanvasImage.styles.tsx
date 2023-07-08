import styled from '@emotion/styled';

import { BREAKPOINTS, CANVAS_SIZE } from '../../utils/config';

export const Canvas = styled.canvas`
  height: 100%;
  width: 100%;
  object-fit: fit;
  /* overflow: hidden; */
  /* border-radius: 8px; */
`;

export const ImageBox = styled.div`
  /* margin-bottom: 3rem; */
  /* position: relative; */
  overflow: hidden;
  /* overflow: visible; */
  border-radius: 8px;

  /* text-align: right; */
  width: ${CANVAS_SIZE.med}px;
  height: ${CANVAS_SIZE.med}px;
  /* width: ${CANVAS_SIZE.med}px; */
  /* height: ${CANVAS_SIZE.med}px; */
  grid-area: image;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    /* margin-bottom: 1rem; */
    /* grid-row: 1 / span 3; */
  }
`;

export const MarkersBox = styled.div`
  /* margin-bottom: 3rem; */
  position: relative;
  /* overflow: hidden; */
  overflow: visible;
  border-radius: 8px;

  /* text-align: right; */
  width: ${CANVAS_SIZE.med}px;
  height: ${CANVAS_SIZE.med}px;
  grid-area: image;
  z-index: 10;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    /* margin-bottom: 1rem; */
    /* grid-row: 1 / span 3; */
  }
`;
