import { Typography } from '@mui/material';
import { StdioNull } from 'child_process';
import React, { FC } from 'react';

import { Wrapper } from './Credit.styles';
interface CreditProps {
  name: string | null;
}

const Credit: FC<CreditProps> = ({ name }) => {
  return (
    <Wrapper>
      <Typography fontSize="small" pt={0.8}>
        via {name} on UnSplash
      </Typography>
    </Wrapper>
  );
};

export default Credit;
