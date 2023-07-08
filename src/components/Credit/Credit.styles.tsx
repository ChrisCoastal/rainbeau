import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../utils/config';
interface LinkProps {
  href: string;
}

export const Wrapper = styled.div`
  position: absolute;
  transform: translateY(-2.5rem);
  margin-left: 0.8rem;
  border-radius: 8px;
  background-color: #ffffff99;

  @media (min-width: ${BREAKPOINTS.md}px) {
    margin-top: 1rem;
    transform: translateY(0rem);
  }
`;

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: inherit;
`;
