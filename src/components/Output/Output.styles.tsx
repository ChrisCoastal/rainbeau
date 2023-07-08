import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../utils/config';

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
  top: 10px;
  right: 10px;
`;

export const TextArea = styled.textarea`
  width: 98%;
  height: 60%;
  line-height: 125%;
  resize: none;
  border-radius: 8px;
  border: solid 1px #ddd;
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
