import styled from '@emotion/styled';

interface WrapperProps {
  onMouseMove: (e: React.MouseEvent) => void;
}

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  /* overflow: visible; */
  z-index: 1000;
  mix-blend-mode: exclusion;
`;
