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
  border: 2px solid white;
  mix-blend-mode: exclusion;

  cursor: grab;

  & span {
    /* content: ${(props) => props.num}; */
    top: 51%;
    left: 50%;
    height: 2px;
    width: 1.7rem;
    position: absolute;
    background-color: white;

    &:nth-of-type(odd) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:nth-of-type(even) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &::after {
    /* content: ${(props) => props.num}; */
    content: '1';
    position: absolute;
    left: 1.8rem;
    top: -1rem;
    color: white;
  }
`;
