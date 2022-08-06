import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3vh;
  padding: 1rem;
  border-radius: 6px;
  border: solid 1px #ddd;
`;

export const DropArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8rem;
  border: 1px solid #999;
  border-radius: 6px;

  & p {
    font-size: small;
  }

  &:hover {
    box-shadow: 0, 0, 0.6rem, #0000009d;
  }
`;
