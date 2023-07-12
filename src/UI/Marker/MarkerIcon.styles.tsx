import styled from '@emotion/styled';
import { CSSProperties, ReactNode, TouchEvent } from 'react';

interface WrapperProps {
  style?: CSSProperties;
  children?: ReactNode;
  active: boolean;
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
  children?: React.ReactNode;
}

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  display: flex;
  z-index: 100;
  cursor: ${(props) => (!props.active ? 'grab' : 'grabbing')};

  &:active {
    cursor: grabbing;
  }

  &::after {
    content: '${(props) => props.num + 1}';
    position: absolute;
    text-align: center;
    left: 0.7rem;
    top: -2.8rem;
    color: black;
    font-size: 0.8rem;
    /* height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #333; */
    mix-blend-mode: exclusion;
    opacity: ${(props) => (props.active ? 0.5 : 0.8)};
    z-index: 100;
  }
`;

export const SvgMarker = styled.svg<SvgProps>`
  /* position: relative; */
  /* top: ${(props) => `${props.y}px`}; */
  /* left: ${(props) => `${props.x}px`}; */
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
  top: 1rem;
  left: 1rem;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: white;
  z-index: 10;
`;
