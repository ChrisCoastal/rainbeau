import styled from '@emotion/styled';

interface WrapperProps {
  bgColor: { r: number; g: number; b: number };
}

export const Color = styled.div<WrapperProps>`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;
  border-radius: 50%;
  background-color: ${(props) => `rgb(
    ${props.bgColor.r},
    ${props.bgColor.g},
    ${props.bgColor.b}
  )`};
  border: solid 1px #ddd;

  /* &:hover {
    border-color: #7dffbe;
    cursor: copy;
  } */
`;
