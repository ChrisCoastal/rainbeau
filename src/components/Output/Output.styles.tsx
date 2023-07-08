import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../utils/constants';

export const Wrapper = styled.div`
  /* height: 36vh; */
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  grid-area: palette;

  @media (min-width: ${BREAKPOINTS.lg}px) {
    grid-area: output;
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
