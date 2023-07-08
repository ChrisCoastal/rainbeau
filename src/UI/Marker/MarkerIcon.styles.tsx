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
  height: 36px;
  width: 27px;
  border-radius: 50%;
  transform: translate(-50%, -36px);
  /* background-color: #ffffff30; */
  touch-action: none; /* prevent scrolling on touch devices */
  transition: all 0.2s ease-in-out;
  transform-origin: left center;
  will-change: transform;

  cursor: grab;

  &:hover,
  &:active,
  &:focus {
    scale: 1.05;
  }

  &::after {
    content: '${(props) => props.num + 1}';
    position: absolute;
    left: 1.8rem;
    top: -1rem;
    color: white;
  }
`;
