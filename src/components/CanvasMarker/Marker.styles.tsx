import styled from '@emotion/styled';

interface MarkerProps {
  y: number;
  x: number;
}

export const Circle = styled.div<MarkerProps>`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  /* background-color: pink; */
  border: 2px solid red;
  /* mix-blend-mode: exclusion; */

  cursor: grab;
`;
