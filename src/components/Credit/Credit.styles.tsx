import styled from '@emotion/styled';

interface LinkProps {
  href: string;
}

export const Wrapper = styled.div`
  position: absolute;
`;

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: inherit;
`;
