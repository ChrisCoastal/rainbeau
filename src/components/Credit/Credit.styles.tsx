import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../utils/config';
interface LinkProps {
  href: string;
}

export const Wrapper = styled.div`
  position: absolute;
  margin-top: 1rem;
  margin-left: 0.8rem;
`;

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: inherit;
`;
