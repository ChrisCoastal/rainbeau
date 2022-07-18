import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface MarkerProps {
  y: number;
  x: number;
}

export const Marker = styled.canvas<MarkerProps>`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 50%;
  /* background-color: pink; */
  border: 2px solid pink;
  mix-blend-mode: exclusion;
  cursor: grab;
`;
