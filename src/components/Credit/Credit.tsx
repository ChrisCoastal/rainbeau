import React, { FC } from 'react';
import { Typography, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
        color="#444"
      >
        <Typography fontSize="small">via {name?.split(' ')[0]}</Typography>
        <OpenInNewIcon fontSize="inherit" />
      </Link>
    </Wrapper>
  );
};

export default Credit;
