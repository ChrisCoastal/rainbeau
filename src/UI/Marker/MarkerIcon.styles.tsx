import styled from '@emotion/styled';

interface MarkerTargetProps {
  y: number;
  x: number;
  num: number;
  children?: React.ReactNode;
}

export const SvgMarker = styled.svg<MarkerTargetProps>`
  position: absolute;
  /* display: 'flex'; */
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: 48px;
  width: 36px;
  border-radius: 50%;
  transform: translate(-50%, -48px);
  /* background-color: #ffffff30; */
  touch-action: none; /* prevent scrolling on touch devices */

  cursor: grab;
`;
