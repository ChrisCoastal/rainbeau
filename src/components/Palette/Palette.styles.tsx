import styled from '@emotion/styled';

import { BREAKPOINTS } from '../../utils/constants';

export const Wrapper = styled.div`
  /* height: 36vh; */
  padding: 0.5rem 1rem 1rem 1rem;
  grid-area: palette;
  border-radius: 8px;
  border: solid 1px #ddd;
  overflow: hidden;
  background-color: #fff;
`;

export const PaletteActions = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaletteItemsContainer = styled.div`
  height: 81%;
  padding: 0.8rem 0 0 0.8rem;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;
  border: solid 1px #eee;
  background-color: #eee;
  box-shadow: inset 0px -0.5rem 0.6rem -0.7rem #dddddddd;

  &not:first-of-type {
    padding-top: 0.8rem;
  }

  &::-webkit-scrollbar {
    height: 12px;
    width: 14px;
  }
`;
