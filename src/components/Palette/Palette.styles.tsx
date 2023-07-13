import styled from '@emotion/styled';

import { BREAKPOINTS_X, MEDIA_QUERY } from '../../utils/constants';

interface PaletteProps {
  activeMenuTab: string;
}

export const Wrapper = styled.div<PaletteProps>`
  position: relative;
  grid-area: palette;
  min-height: 0; // fixes overflow issue
  margin-top: 2rem;
  padding: 0.5rem 0.3rem 1.4rem 1rem;
  border-radius: 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  z-index: ${(props) => (props.activeMenuTab === 'palette' ? 10 : 1)};

  @media (min-width: ${BREAKPOINTS_X.md}px) {
    margin-top: 0;
    padding: 0.5rem 0.3rem 1rem 1rem;
  }

  @media ${MEDIA_QUERY.xs}, ${MEDIA_QUERY.sm} {
    margin-top: 2rem;
  }
`;

export const PaletteTab = styled.button<PaletteProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -32px;
  right: 5rem;
  width: 5rem;
  height: 2rem;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: solid 1px #ddd;
  border-bottom: none;
  z-index: 100;

  cursor: pointer;

  &:hover {
    border-color: ${(props) =>
      props.activeMenuTab === 'palette' ? '#ddd' : '#7dffbe'};
  }

  /* @media ${MEDIA_QUERY.xs}, ${MEDIA_QUERY.sm} {
    width: 5rem;
    height: 2rem;
    opacity: 1;
    visibility: visible;
  } */

  @media ${MEDIA_QUERY.md} {
    height: 0;
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

export const PaletteActions = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaletteItemsContainer = styled.div`
  /* height: 100%; */
  /* display: flex;
  flex-direction: column; */
  height: 88%;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
