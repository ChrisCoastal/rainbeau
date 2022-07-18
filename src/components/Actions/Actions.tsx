import React, { useContext } from 'react';

// mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Wrapper } from './Actions.styles';
type Props = {};

const Actions = (props: Props) => {
  const flipHandler = () => {
    console.log('FLIP');
    // update context to sl
  };

  return (
    <Wrapper>
      Actions{' '}
      <Button onClick={() => flipHandler()}>
        <Typography>New Image</Typography>
      </Button>
      <Button>
        <Typography>Reset</Typography>
      </Button>
      <Button>
        <Typography>Save</Typography>
      </Button>
    </Wrapper>
  );
};

export default Actions;
