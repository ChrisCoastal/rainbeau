import styled from '@emotion/styled';

import { REM_RATIO, BREAKPOINTS, CANVAS_SIZE } from '../../utils/constants';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 4rem 1rem 0 1rem;
  transition: all 0.6s ease-in;
`;

export const MainGrid = styled.div`
  display: grid;
  width: 100%;
  row-gap: 1rem;
  grid-template-areas: 'actions' 'image' 'palette';

  @media (min-width: ${BREAKPOINTS.md}px) {
    /* width: fit-content; */
    grid-template-columns: minmax(400px, auto) 20rem;
    grid-template-rows: auto 4fr 3fr;
    column-gap: 2rem;
    grid-template-areas: 'image actions' 'image palette';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: ${CANVAS_SIZE.lg}px;
    grid-template-columns: ${CANVAS_SIZE.lg}px 24rem;
    grid-template-rows: auto 4fr 3fr;
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;
