import React, { FC } from 'react';

import { Wrapper } from './Credit.styles';
interface CreditProps {
  name: string;
}

const Credit: FC<CreditProps> = ({ name }) => {
  return (
    <Wrapper>
      <p>by {name} on UnSplash</p>
    </Wrapper>
  );
};

export default Credit;
