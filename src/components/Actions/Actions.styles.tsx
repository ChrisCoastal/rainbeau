import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  border: solid 1px #ddd;
  grid-area: actions;
  background-color: #fff;
`;

export const DropArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8rem;
  border: 1px solid #999;
  border-radius: 8px;

  & p {
    font-size: small;
  }

  &:hover {
    box-shadow: 0, 0, 0.6rem, #0000009d;
  }
`;
