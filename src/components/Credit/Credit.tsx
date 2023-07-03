import { Typography, Link } from '@mui/material';
import React, { FC } from 'react';

import { Wrapper } from './Credit.styles';
interface CreditProps {
  link: string;
  name: string | null;
}

const Credit: FC<CreditProps> = ({ link, name }) => {
  return (
    <Wrapper>
      <Link
        href={link}
        underline="none"
        rel="noreferrer"
        target="_blank"
        color="#333"
      >
        <Typography fontSize="small" pt={0.8}>
          via {name} on UnSplash
        </Typography>
      </Link>
    </Wrapper>
  );
};

export default Credit;
