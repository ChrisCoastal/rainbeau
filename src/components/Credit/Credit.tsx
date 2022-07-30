import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { Wrapper } from './Credit.styles';
interface CreditProps {
  name: string;
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
