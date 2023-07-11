import styled from '@emotion/styled';

interface WrapperProps {
  onMouseMove: (e: React.MouseEvent) => void;
}

export const Wrapper = styled.div<WrapperProps>`
  z-index: 100;
`;
