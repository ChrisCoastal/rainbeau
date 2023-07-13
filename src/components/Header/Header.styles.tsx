import styled from '@emotion/styled';
import Module from 'module';
import { BREAKPOINTS_X } from '../../utils/constants';

interface LogoProps {
  logoWidth: number;
  src: Module;
  alt: string;
}

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  z-index: 1000;
  pointer-events: none;

  @media (min-width: ${BREAKPOINTS_X.lg}) {
    padding: 0 2rem;
  }
`;

export const Logo = styled.img<LogoProps>`
  width: ${(props) => props.logoWidth / devicePixelRatio || 1}px;
  height: auto;
  pointer-events: none;
`;
