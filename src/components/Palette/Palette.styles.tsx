import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 36vh;
  padding: 1rem;
  border-radius: 6px;
  border: solid 1px #ddd;
`;

export const PaletteItemsContainer = styled.div`
  overflow-y: scroll;
  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
