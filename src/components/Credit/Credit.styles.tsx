import styled from '@emotion/styled';

interface LinkProps {
  href: string;
}

export const Wrapper = styled.div`
  position: absolute;
  margin-top: 0.6rem;
`;

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: inherit;
`;
