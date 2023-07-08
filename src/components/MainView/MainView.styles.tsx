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
  grid-template-columns: 1fr;
  row-gap: 1rem;

  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 30rem;
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    /* grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr 1fr; */
    column-gap: 3rem;
    height: 50rem;
  }
`;

export const FlipBox = styled.div`
  position: relative;
  perspective: 150rem;
  width: ${CANVAS_SIZE.med}px;
  height: ${CANVAS_SIZE.med}px;
`;

export const ImageBox = styled.div`
  margin-bottom: 3rem;
  text-align: right;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-bottom: 1rem;
    grid-row: 1 / span 3;
  }
`;
