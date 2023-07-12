import styled from '@emotion/styled';

import { BREAKPOINTS } from '../../utils/constants';

interface WrapperProps {
  activeMenuTab: string;
}

export const Wrapper = styled.div<WrapperProps>`
  min-height: 0; /* fixes overflow issue */
  margin-top: 2rem;
  position: relative;
  padding: 0.5rem 0.3rem 1rem 1rem;
  grid-area: palette;
  border-radius: 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  z-index: ${(props) => (props.activeMenuTab === 'palette' ? 10 : 1)};

  @media (min-width: ${BREAKPOINTS.md}px) {
    margin-top: 0;
  }
`;

export const PaletteTab = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -33px;
  right: 5rem;
  width: 5rem;
  height: 2rem;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: solid 1px #ddd;
  border-bottom: none;
  z-index: 100;

  @media (min-width: ${BREAKPOINTS.lg}px) and (min-height: 680px) {
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
  min-height: 0;
  height: 88%;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
