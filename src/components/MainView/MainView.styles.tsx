import styled from '@emotion/styled';

import { REM_RATIO, BREAKPOINTS, CANVAS_SIZE } from '../../utils/config';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  transition: all 0.6s ease-in;
`;

export const MainGrid = styled.div`
  display: grid;
  /* grid-template-columns: 1fr; */
  row-gap: 1rem;
  grid-template-areas: 'actions' 'image' 'palette';

  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 30rem;
    column-gap: 2rem;
    grid-template-areas: 'image actions' 'image palette';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    /* grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr 1fr; */
    column-gap: 3rem;
    height: 50rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;

export const ImageBox = styled.div`
  /* margin-bottom: 3rem; */
  position: relative;
  overflow: hidden;
  /* overflow: visible; */
  border-radius: 8px;

  /* text-align: right; */
  width: ${CANVAS_SIZE.med}px;
  height: ${CANVAS_SIZE.med}px;
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
  width: 100%;
  height: 100%;
  grid-area: image;
  z-index: 10;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    /* margin-bottom: 1rem; */
    /* grid-row: 1 / span 3; */
  }
`;
