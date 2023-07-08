import styled from '@emotion/styled';

export const Wrapper = styled.div`
  /* height: 36vh; */
  padding: 0rem 0rem 1rem 1rem;
  grid-area: palette;
  border-radius: 8px;
  border: solid 1px #ddd;
  overflow: hidden;
  background-color: #fff;
`;

export const PaletteActions = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaletteItemsContainer = styled.div`
  height: 84%;
  margin: 0.5rem 0;
  padding-right: 0.5rem;
  overflow-x: hidden;
  overflow-y: scroll;
  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
