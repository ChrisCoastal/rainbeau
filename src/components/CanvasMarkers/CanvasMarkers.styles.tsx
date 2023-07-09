import styled from '@emotion/styled';

// import { BREAKPOINTS, CANVAS_SIZE } from '../../utils/constants';

interface WrapperProps {
  onMouseMove: (e: React.MouseEvent) => void;
}

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* width: 100%; */
  /* height: 100%; */
  /* overflow: visible; */
  z-index: 100;
`;

// export const MarkersBox = styled.div`
//   /* margin-bottom: 3rem; */
//   position: relative;
//   /* overflow: hidden; */
//   overflow: visible;
//   border-radius: 8px;

//   /* text-align: right; */
//   width: ${CANVAS_SIZE.lg}px;
//   height: ${CANVAS_SIZE.lg}px;
//   grid-area: image;
//   z-index: 10;
//   @media (min-width: ${BREAKPOINTS.lg}px) {
//     /* margin-bottom: 1rem; */
//     /* grid-row: 1 / span 3; */
//   }
// `;
