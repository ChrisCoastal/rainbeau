import styled from '@emotion/styled';

interface CircleProps {
  y: number;
  x: number;
  num: number;
}

export const Circle = styled.div<CircleProps>`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  /* background-color: pink; */
  border: 3px solid pink;
  mix-blend-mode: exclusion;

  cursor: grab;

  &::after {
    /* content: ${(props) => props.num}; */
    content: '1';
    position: absolute;
    left: 1.8rem;
    top: -1rem;
    color: pink;
  }
`;
