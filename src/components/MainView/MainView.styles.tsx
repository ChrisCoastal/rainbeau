import styled from '@emotion/styled';

import { REM_RATIO, BREAKPOINTS, CANVAS_SIZE } from '../../utils/constants';

interface MainGridProps {
  windowSize: WindowSize;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 4rem 1rem 0 1rem;
  transition: all 0.6s ease-in;
  background-color: red;

  @media (min-width: ${BREAKPOINTS.md}px) {
    align-items: center;
  }
`;

export const MainGrid = styled.div<MainGridProps>`
  display: grid;
  min-height: 0;
  width: 100%;
  row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, 3fr) minmax(0, 2fr);
  grid-template-areas: 'actions' 'image' 'palette';

  @media (min-width: ${BREAKPOINTS.md}px) {
    max-height: ${(props) => props.windowSize.innerHeight * 0.9}px;
    grid-template-columns: minmax(400px, auto) 20rem;
    grid-template-rows: auto minmax(0, 1fr);
    column-gap: 2rem;
    row-gap: 3rem;
    grid-template-areas: 'image actions' 'image palette';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) and (min-height: 680px) {
    width: auto;
    row-gap: 1rem;
    /* max-height: ${CANVAS_SIZE.lg}px; */
    grid-template-columns: minmax(680px, 1fr) 24rem;
    grid-template-rows: auto minmax(0, 3fr) minmax(0, 2fr);
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) and (min-height: ${BREAKPOINTS.lg}px) {
    /* width: auto; */
    /* row-gap: 1rem; */
    /* height: ${CANVAS_SIZE.lg}px; */
    grid-template-columns: minmax(800px, 1fr) 24rem;
    grid-template-rows: auto minmax(0, 3fr) minmax(0, 2fr);
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;
