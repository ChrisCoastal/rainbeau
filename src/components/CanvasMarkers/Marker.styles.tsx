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
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff30;
  border: 2px solid white;
  mix-blend-mode: exclusion;

  cursor: grab;

  & span {
    /* content: ${(props) => props.num}; */
    top: 50%;
    left: 50%;
    height: 1px;
    width: 2.4rem;
    /* width: 1.7rem; */
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
    content: '${(props) => props.num + 1}';
    position: absolute;
    left: 1.8rem;
    top: -1rem;
    color: white;
  }
`;
