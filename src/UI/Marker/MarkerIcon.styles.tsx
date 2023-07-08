import styled from '@emotion/styled';

interface SvgProps {
  y: number;
  x: number;
  num: number;
  children?: React.ReactNode;
}

interface FillPathProps {
  active: boolean;
}

interface MarkerNumberProps {
  children?: React.ReactNode;
}

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
`;

export const SvgMarker = styled.svg<SvgProps>`
  position: relative;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  height: 36px;
  width: 27px;
  border-radius: 50%;
  transform: translate(-50%, -36px);
  transition: all 0.3s ease-in-out;
  transform-origin: left center;
  touch-action: none; /* prevent scrolling on touch devices */

  cursor: grab;

  &::after {
    /* content: '${(props) => props.num + 1}'; */
    content: '<div>3</div>';
    position: absolute;
    left: 0rem;
    top: 0rem;
    color: black;
    height: 4rem;
    width: 4rem;
    background-color: red;
    z-index: 10000;
  }
`;

export const FillPath = styled.path<FillPathProps>`
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.active ? 0.5 : 0.8)};
`;

export const StrokePath = styled.path``;

export const MarkerNumber = styled.span<MarkerNumberProps>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: white;
  z-index: 10;
`;
