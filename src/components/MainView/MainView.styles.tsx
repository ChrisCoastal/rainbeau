import styled from '@emotion/styled';

import { BREAKPOINTS } from '../../utils/constants';

interface MainGridProps {
  windowSize: WindowSize;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 4rem 1rem 0 1rem;
  transition: all 0.6s ease-in;

  @media (min-width: ${BREAKPOINTS.md}px) {
    align-items: center;
  }
`;

export const MainGrid = styled.div<MainGridProps>`
  display: grid;
  min-height: 0;
  row-gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, 4fr) minmax(0, 2fr);
  grid-template-areas: 'actions' 'image' 'palette';

  @media (min-width: ${BREAKPOINTS.md}px) {
    grid-template-columns: minmax(400px, auto) minmax(20rem, 30rem);
    grid-template-rows: auto minmax(0, 1fr);
    column-gap: 2rem;
    row-gap: 3rem;
    grid-template-areas: 'image actions' 'image palette';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) and (min-height: 680px) {
    width: auto;
    row-gap: 1rem;
    grid-template-columns: minmax(680px, auto) minmax(20rem, 30rem);
    grid-template-rows: auto minmax(0, 3fr) minmax(0, 2fr);
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) and (min-height: ${BREAKPOINTS.lg}px) {
    grid-template-columns: minmax(800px, auto) minmax(20rem, 30rem);
    grid-template-rows: auto minmax(0, 3fr) minmax(0, 2fr);
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;
