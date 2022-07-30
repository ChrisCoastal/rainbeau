import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  padding: 0.4rem 0.4rem 0.4rem 0.8rem;
  border-radius: 0.4rem;
  border: solid 1px #ddd;

  &:hover {
    border-color: #7dffbe;
  }

  & input {
    width: 50%;
    padding: 0.2rem;
    border-radius: 0.2rem;
    border: solid 1px #ddd;
  }
`;

export const ItemContent = styled.div`
  width: 100%;
`;

export const ColorValue = styled.div`
  display: inline-block;
  &:hover {
    cursor: copy;
  }
`;

export const SwatchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

export const ItemControls = styled.div`
  display: flex;
  flex-direction: column;
`;
