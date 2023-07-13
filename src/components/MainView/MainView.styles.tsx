import styled from '@emotion/styled';

import {
  BREAKPOINTS_X,
  BREAKPOINTS_Y,
  MEDIA_QUERY,
} from '../../utils/constants';

interface MainGridProps {
  windowSize: WindowSize;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 4rem 1rem 0 1rem;
  transition: all 0.6s ease-in;
  background-color: blue;

  @media (min-width: ${BREAKPOINTS_X.md}px) {
    align-items: center;
  }
`;

export const MainGrid = styled.div<MainGridProps>`
  display: grid;
  row-gap: 1rem;
  column-gap: 2rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, auto) 20rem;
  grid-template-areas: 'actions' 'image' 'palette';
  background-color: red;

  @media ${MEDIA_QUERY.mobile} {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, auto) 20rem;
    grid-template-areas: 'actions' 'image' 'palette';
    background-color: red;
  }
  @media ${MEDIA_QUERY.tablet} {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, auto) 20rem;
    grid-template-areas: 'actions' 'image' 'palette';
    background-color: green;
  }
  @media ${MEDIA_QUERY.xs} {
    height: 25rem;
    grid-template-columns: 25rem minmax(20rem, 30rem);
    grid-template-rows: 3.625rem 20.375rem;
    grid-template-areas: 'image actions' 'image palette';
    background-color: green;
  }
  @media ${MEDIA_QUERY.sm} {
    height: 38rem;
    grid-template-columns: 38rem minmax(20rem, 30rem);
    grid-template-rows: 3.625rem 33.375rem;
    grid-template-areas: 'image actions' 'image palette';
    background-color: green;
  }
  @media ${MEDIA_QUERY.md} {
    height: 44rem;
    grid-template-columns: 44rem minmax(20rem, 30rem);
    grid-template-rows: 3.625rem 22.375rem 16rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
    background-color: orange;
  }
  @media ${MEDIA_QUERY.lg} {
    height: 54rem;
    grid-template-columns: 54rem minmax(20rem, 30rem);
    grid-template-rows: 3.625rem 28.375rem 20rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
    background-color: brown;
  }
  /* @media ${MEDIA_QUERY.xl} {
    height: 25rem;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, auto) 20rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
    background-color: black;
  } */
`;
