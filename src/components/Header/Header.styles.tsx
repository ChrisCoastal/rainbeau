import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  /* background-color: red;  */
  z-index: 1000;

  & p {
    margin: 0;
  }
`;
