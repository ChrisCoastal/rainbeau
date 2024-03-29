import styled from '@emotion/styled';

import { MEDIA_QUERY } from '../../utils/constants';

interface PaletteProps {
  activeMenuTab: string;
}

export const Wrapper = styled.div<PaletteProps>`
  position: relative;
  grid-area: palette;
  margin-top: 2rem;
  padding: 0.5rem 0.3rem 1.4rem 1rem;
  border-radius: 8px;
  border: solid 1px #ddd;
  background-color: #fff;
  z-index: ${(props) => (props.activeMenuTab === 'palette' ? 10 : 1)};

  @media ${MEDIA_QUERY.sm} {
    margin-top: 2rem;
  }

  @media ${MEDIA_QUERY.lg} {
    margin-top: 0;
  }
`;

export const PaletteTab = styled.button<PaletteProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -32px;
  right: 5rem;
  width: 5rem;
  height: 2rem;
  color: ${(props) => (props.activeMenuTab === 'palette' ? '#444' : '#777')};
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  border: solid 1px #ddd;
  border-bottom: none;
  z-index: 100;

  cursor: pointer;

  &:hover {
    border-color: ${(props) =>
      props.activeMenuTab === 'palette' ? '#ddd' : '#7dffbe'};
  }

  @media ${MEDIA_QUERY.lg} {
    height: 0;
    width: 0;
    opacity: 0;
    visibility: hidden;
  }
`;

export const PaletteActions = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PaletteItemsContainer = styled.div`
  height: 88%;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 8px;

  &not:first-of-type {
    padding-top: 0.8rem;
  }
`;
