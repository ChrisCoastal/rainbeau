import { Typography, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
        }}
        href={link}
        underline="none"
        rel="noreferrer"
        target="_blank"
        color="#333"
      >
        <Typography fontSize="small" pt={0.8}>
          via {name} on UnSplash
        </Typography>
        <OpenInNewIcon sx={{ marginTop: '0.3rem' }} fontSize="inherit" />
      </Link>
    </Wrapper>
  );
};

export default Credit;
