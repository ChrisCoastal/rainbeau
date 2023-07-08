import styled from '@emotion/styled';

import { REM_RATIO, BREAKPOINTS, CANVAS_SIZE } from '../../utils/constants';

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
    grid-template-columns: 45rem 24rem;
    height: ${CANVAS_SIZE.md}px;
    column-gap: 2rem;
    grid-template-areas: 'image actions' 'image palette';
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    grid-template-columns: 45rem 24rem;
    grid-template-rows: auto 4fr 3fr;
    height: ${CANVAS_SIZE.lg}px;
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;
