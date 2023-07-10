import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../utils/constants';

interface WrapperProps {
  activeMenuTab: string;
}

export const Wrapper = styled.div<WrapperProps>`
  /* height: 36vh; */
  position: relative;
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px 0 8px 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  grid-area: palette;
  z-index: ${(props) => (props.activeMenuTab === 'output' ? 10 : 1)};

  @media (min-width: ${BREAKPOINTS.md}px) {
    margin-top: 0;
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    grid-area: output;
    border-radius: 8px;
  }
`;

export const OutputTab = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -33px;
  right: -1px;
  width: 5rem;
  height: 2rem;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: solid 1px #ddd;
  border-bottom: none;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 0;
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

export const CopyIconWrapper = styled.div`
  position: absolute;
  top: 10rem;
  right: 0.2rem;
`;

export const TextArea = styled.textarea`
  width: 98%;
  height: 60%;
  line-height: 125%;
  resize: none;
  font-size: 0.7rem;
  border-radius: 8px;
  border: solid 1px #ddd;
  box-shadow: inset 0px -0.5rem 0.6rem -0.7rem #dddddddd;
  /* overflow: scroll; */

  &:hover {
    border-color: #7dffbe;
  }
`;

export const FormatContainer = styled.div`
  position: relative;
  height: 100%;
  /* margin-top: 1rem; */
  text-align: right;
`;
