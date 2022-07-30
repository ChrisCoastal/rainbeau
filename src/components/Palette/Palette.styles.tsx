import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 36vh;
  padding: 1rem;
  border-radius: 6px;
  border: solid 1px #ddd;
  overflow: hidden;
`;
export const PaletteActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaletteItemsContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
