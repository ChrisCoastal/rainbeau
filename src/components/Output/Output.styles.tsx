import styled from '@emotion/styled';
import {
  BREAKPOINTS_X,
  BREAKPOINTS_Y,
  MEDIA_QUERY,
} from '../../utils/constants';

interface OutputProps {
  activeMenuTab: string;
}

export const Wrapper = styled.div<OutputProps>`
  /* height: 36vh; */
  position: relative;
  grid-area: palette;
  justify-self: stretch;
  margin-top: 2rem;
  padding: 1rem 1rem;
  border-radius: 8px 0 8px 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  z-index: ${(props) => (props.activeMenuTab === 'output' ? 10 : 1)};
  /* z-index: 0; */

  /* @media (min-width: ${BREAKPOINTS_X.md}px) {
    margin-top: 0;
  }

  @media (min-width: ${BREAKPOINTS_X.lg}px) and (min-height: ${BREAKPOINTS_Y.md}px) {
    grid-area: output;
    border-radius: 8px;
  } */

  @media ${MEDIA_QUERY.sm},
    ${MEDIA_QUERY.md},
    ${MEDIA_QUERY.mobile},
    ${MEDIA_QUERY.tablet} {
    margin-top: 2rem;
    grid-area: palette;
    border-radius: 8px 0 8px 8px;
  }

  @media ${MEDIA_QUERY.lg} {
    margin-top: 0;
    grid-area: output;
    border-radius: 8px;
  }
`;

export const OutputTab = styled.button<OutputProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -32px;
  right: -1px;
  width: 5rem;
  height: 2rem;

  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: solid 1px #ddd;
  border-bottom: none;
  cursor: pointer;

  &:hover {
    border-color: ${(props) =>
      props.activeMenuTab === 'output' ? '#ddd' : '#7dffbe'};
  }

  @media ${MEDIA_QUERY.lg} {
    height: 0;
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

export const CopyIconWrapper = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
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
