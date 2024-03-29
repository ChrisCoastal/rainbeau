import styled from '@emotion/styled';
import { SpringValue } from '@react-spring/web';
import { ReactNode, TouchEvent } from 'react';

interface WrapperProps {
  children?: ReactNode;
  active: boolean;
  // colorLightness: number;
  num: number;
  tabIndex: number;
  onMouseDown: () => void;
  onTouchStart: (e: TouchEvent) => void;
  onMouseUp: () => void;
  onTouchEnd: () => void;
}

interface SvgProps {
  // y: number;
  // x: number;
  num: number;
  children?: React.ReactNode;
}

interface FillPathProps {
  active: boolean;
}

interface MarkerNumberProps {
  color: {
    r: SpringValue<number>;
    g: SpringValue<number>;
    b: SpringValue<number>;
  };
  children?: React.ReactNode;
}

export const Wrapper = styled.div<WrapperProps>`
  z-index: 100;

  cursor: ${(props) => (!props.active ? 'grab' : 'grabbing')};

  &::after {
    content: ${(props) => props.num + 1};
    position: absolute;
    text-align: center;
    transform: translate(-50%, -50%);
    height: 1rem;
    width: 1rem;
    top: -1.5rem;
    color: #111;
    font-size: 0.8rem;
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    opacity: ${(props) => (props.active ? 0.5 : 0.6)};
    z-index: 1000;
  }
`;

export const SvgMarker = styled.svg<SvgProps>`
  position: absolute;
  height: 36px;
  width: 27px;
  border-radius: 50%;
  transform: translate(-50%, -36px);
  transition: all 0.3s ease-in-out;
  transform-origin: left center;
  touch-action: none; /* prevent scrolling on touch devices */
`;

export const FillPath = styled.path<FillPathProps>`
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.active ? 0.5 : 0.8)};
`;

export const StrokePath = styled.path``;

export const MarkerNumber = styled.span<MarkerNumberProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transform: translate(-50%, -2.05rem);
  z-index: 10;
`;
