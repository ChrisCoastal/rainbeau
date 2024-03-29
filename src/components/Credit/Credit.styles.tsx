import styled from '@emotion/styled';

interface LinkProps {
  href: string;
}

export const Wrapper = styled.div`
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  margin-top: 1rem;
  margin-left: 0.8rem;
`;

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: inherit;
`;
