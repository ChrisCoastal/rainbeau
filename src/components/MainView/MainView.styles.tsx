import styled from '@emotion/styled';

import { BREAKPOINTS_X, MEDIA_QUERY } from '../../utils/constants';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 4rem 1rem 1rem 1rem;
  transition: all 0.6s ease-in;

  @media (min-width: ${BREAKPOINTS_X.md}px) {
    align-items: center;
  }
`;

export const MainGrid = styled.div`
  width: 100%;
  display: grid;
  row-gap: 1rem;
  column-gap: 2rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, auto) 20rem;
  grid-template-areas: 'actions' 'image' 'palette';

  @media ${MEDIA_QUERY.mobile} {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, auto) 20rem;
    grid-template-areas: 'actions' 'image' 'palette';
  }
  @media ${MEDIA_QUERY.tablet} {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, auto) 20rem;
    grid-template-areas: 'actions' 'image' 'palette';
  }
  @media ${MEDIA_QUERY.sm} {
    width: auto;
    height: 28rem;
    grid-template-columns: 28rem minmax(20rem, 24rem);
    grid-template-rows: 3.625rem 23.375rem;
    grid-template-areas: 'image actions' 'image palette';
  }
  @media ${MEDIA_QUERY.md} {
    width: auto;
    height: 36rem;
    grid-template-columns: 36rem minmax(20rem, 28rem);
    grid-template-rows: 3.625rem 31.375rem;
    grid-template-areas: 'image actions' 'image palette';
  }
  @media ${MEDIA_QUERY.lg} {
    width: auto;
    height: 40rem;
    grid-template-columns: 40rem minmax(20rem, 28rem);
    grid-template-rows: 3.625rem 19.375rem 15rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
  @media ${MEDIA_QUERY.xl} {
    width: auto;
    height: 52rem;
    grid-template-columns: 52rem minmax(20rem, 28rem);
    grid-template-rows: 3.625rem 27.375rem 19rem;
    grid-template-areas: 'image actions' 'image palette' 'image output';
  }
`;
