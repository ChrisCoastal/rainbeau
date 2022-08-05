import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 36vh;
  padding: 1rem;
  border-radius: 6px;
  border: solid 1px #ddd;
`;
export const CopyIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const TextArea = styled.textarea`
  width: 98%;
  height: 75%;
  line-height: 125%;
  resize: none;
  border-radius: 6px;
  border: solid 1px #ddd;
  overflow: scroll;

  &:hover {
    border-color: #7dffbe;
  }
`;

export const FormatContainer = styled.div`
  position: relative;
  height: 100%;
  margin-top: 1rem;
`;
