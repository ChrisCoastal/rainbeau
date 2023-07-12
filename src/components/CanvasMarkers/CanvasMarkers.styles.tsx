import styled from '@emotion/styled';

interface WrapperProps {
  onMouseMove: (e: React.MouseEvent) => void;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  z-index: 100;
`;
